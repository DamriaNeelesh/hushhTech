// Phase 3: MCP Server - Main Entry Point
// Investor Agent MCP Server with A2A Protocol Support

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { tools, executeTool } from './tools.ts';
import { callLLM } from './llm.ts';

// Public chat endpoint - no authentication required
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Health check
    if (pathname.endsWith('/health')) {
      return new Response(
        JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // MCP Protocol Endpoint
    if (pathname.endsWith('/mcp')) {
      return await handleMCP(req, url);
    }

    // Chat Endpoint (public or private)
    if (pathname.endsWith('/chat')) {
      return await handleChat(req, url);
    }

    // A2A Protocol - AgentCard
    if (pathname.endsWith('/a2a/agent-card.json')) {
      return await handleAgentCard(req, url);
    }

    // A2A Protocol - JSON-RPC
    if (pathname.endsWith('/a2a/rpc')) {
      return await handleA2ARPC(req, url);
    }

    return new Response(
      JSON.stringify({ error: 'Not found', available_endpoints: ['/health', '/mcp', '/chat', '/a2a/agent-card.json', '/a2a/rpc'] }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// ============================================================================
// MCP PROTOCOL HANDLER
// ============================================================================

async function handleMCP(req: Request, url: URL) {
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Missing slug parameter' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Check auth for private mode
  const authHeader = req.headers.get('Authorization');
  const isPrivate = !!authHeader;

  // Fetch investor profile
  const { data: profile, error } = await supabase
    .from('investor_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !profile) {
    return new Response(
      JSON.stringify({ error: 'Profile not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // If private mode, verify user owns this profile
  if (isPrivate) {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (!user || user.id !== profile.user_id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  // Build MCP response
  const mcpResponse = {
    version: '1.0',
    serverInfo: {
      name: `investor-agent-${slug}`,
      version: '1.0.0',
      description: `Personal data agent for ${profile.name}`,
      capabilities: {
        tools: true,
        resources: true,
        prompts: true
      }
    },
    tools: isPrivate ? tools : tools.filter(t => t.name.includes('public')),
    resources: [
      {
        uri: `hushh://investor/public/${slug}`,
        name: 'Public Profile',
        description: 'Public investor profile data',
        mimeType: 'application/json'
      }
    ],
    prompts: [
      {
        name: 'public_spokesperson',
        description: 'Act as public spokesperson for this investor',
        arguments: []
      },
      {
        name: 'private_assistant',
        description: 'Act as private assistant with full access',
        arguments: []
      }
    ]
  };

  return new Response(
    JSON.stringify(mcpResponse),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// CHAT ENDPOINT
// ============================================================================

async function handleChat(req: Request, url: URL) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Missing slug parameter' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { message, history = [], tools: requestedTools = [] } = await req.json();

  // Check auth for private mode
  const authHeader = req.headers.get('Authorization');
  const isPrivate = !!authHeader;

  // Fetch investor profile
  const { data: profile } = await supabase
    .from('investor_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!profile) {
    return new Response(
      JSON.stringify({ error: 'Profile not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Fetch onboarding_data for this user
  const { data: onboardingData } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('user_id', profile.user_id)
    .maybeSingle();

  // Filter onboarding data based on privacy settings
  const privacySettings = profile.privacy_settings || {};
  const privacyData = privacySettings?.onboarding_data || {};
  const visibleOnboardingData: any = {};

  if (onboardingData) {
    console.log('MCP DEBUG: Onboarding data exists for user:', profile.user_id);
    
    Object.keys(onboardingData).forEach(fieldName => {
      if (['id', 'user_id', 'created_at', 'updated_at', 'is_completed', 'current_step', 'completed_steps'].includes(fieldName)) {
        return;
      }
      
      if (onboardingData[fieldName] == null) {
        return;
      }
      
      const isVisible = privacyData[fieldName] === true;
      
      if (isVisible) {
        if (fieldName === 'ssn_encrypted') {
          visibleOnboardingData[fieldName] = '***-**-****';
        } else if (fieldName === 'date_of_birth') {
          visibleOnboardingData[fieldName] = new Date(onboardingData[fieldName]).toLocaleDateString();
        } else {
          visibleOnboardingData[fieldName] = onboardingData[fieldName];
        }
      }
    });
    
    console.log('MCP DEBUG: Visible onboarding fields:', Object.keys(visibleOnboardingData));
  }

  // Build system prompt
  let systemPrompt = '';
  if (isPrivate) {
    const { data: agent } = await supabase
      .from('investor_agents')
      .select('private_prompt')
      .eq('slug', slug)
      .single();
    
    systemPrompt = agent?.private_prompt || 'You are a helpful AI assistant.';
  } else {
    const { data: agent } = await supabase
      .from('investor_agents')
      .select('public_prompt')
      .eq('slug', slug)
      .single();
    
    systemPrompt = agent?.public_prompt || 'You are a professional spokesperson.';
  }

  // Add profile context to system prompt
  systemPrompt += `\n\nInvestor Profile:\nName: ${profile.name}\nOrganisation: ${profile.organisation || 'N/A'}\n`;
  
  if (profile.investor_profile) {
    systemPrompt += `\nInvestment Preferences:\n${JSON.stringify(profile.investor_profile, null, 2)}`;
  }

  // Add onboarding data if available
  if (Object.keys(visibleOnboardingData).length > 0) {
    systemPrompt += `\n\nOnboarding & Personal Information:\n${JSON.stringify(visibleOnboardingData, null, 2)}`;
    console.log('MCP DEBUG: Onboarding data added to system prompt');
  }

  // Call LLM
  const response = await callLLM({
    systemPrompt,
    userMessage: message,
    history,
    availableTools: requestedTools.length > 0 ? requestedTools : undefined
  });

  // Log conversation
  if (isPrivate) {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (user) {
      await supabase.from('agent_messages').insert([
        { user_id: user.id, slug, mode: 'private', role: 'user', content: message },
        { user_id: user.id, slug, mode: 'private', role: 'assistant', content: response }
      ]);
    }
  }

  return new Response(
    JSON.stringify({ response, slug, mode: isPrivate ? 'private' : 'public' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// A2A PROTOCOL - AgentCard
// ============================================================================

async function handleAgentCard(req: Request, url: URL) {
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Missing slug parameter' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Fetch investor profile
  const { data: profile } = await supabase
    .from('investor_profiles')
    .select('name, organisation')
    .eq('slug', slug)
    .eq('is_public', true)
    .eq('user_confirmed', true)
    .single();

  if (!profile) {
    return new Response(
      JSON.stringify({ error: 'Public profile not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const agentCard = {
    name: profile.name,
    description: `Personal data agent for ${profile.name}${profile.organisation ? ` at ${profile.organisation}` : ''}`,
    protocolVersion: '1.0',
    endpoints: [
      {
        url: `${supabaseUrl}/functions/v1/investor-agent-mcp/a2a/rpc?slug=${slug}`,
        protocol: 'http+json-rpc',
        methods: ['SendMessage', 'SendStreamingMessage']
      }
    ],
    capabilities: {
      streaming: false,
      toolCalling: true,
      contextWindow: 4096
    }
  };

  return new Response(
    JSON.stringify(agentCard),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// A2A PROTOCOL - JSON-RPC
// ============================================================================

async function handleA2ARPC(req: Request, url: URL) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Missing slug parameter' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const rpcRequest = await req.json();
  const { jsonrpc, method, params, id } = rpcRequest;

  if (jsonrpc !== '2.0') {
    return new Response(
      JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    let result;

    switch (method) {
      case 'SendMessage':
        result = await handleSendMessage(slug, params);
        break;
      
      case 'GetTask':
        result = { task: null, message: 'Task management coming in Phase 4' };
        break;
      
      default:
        return new Response(
          JSON.stringify({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ jsonrpc: '2.0', result, id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: error.message }, id }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleSendMessage(slug: string, params: any) {
  const { message, context = {} } = params;

  // Fetch profile
  const { data: profile } = await supabase
    .from('investor_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!profile) {
    throw new Error('Profile not found');
  }

  // Fetch onboarding_data for this user
  const { data: onboardingData } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('user_id', profile.user_id)
    .maybeSingle();

  // Filter onboarding data based on privacy settings
  const privacySettings = profile.privacy_settings || {};
  const privacyData = privacySettings?.onboarding_data || {};
  const visibleOnboardingData: any = {};

  if (onboardingData) {
    console.log('A2A DEBUG: Onboarding data exists for user:', profile.user_id);
    
    Object.keys(onboardingData).forEach(fieldName => {
      if (['id', 'user_id', 'created_at', 'updated_at', 'is_completed', 'current_step', 'completed_steps'].includes(fieldName)) {
        return;
      }
      
      if (onboardingData[fieldName] == null) {
        return;
      }
      
      const isVisible = privacyData[fieldName] === true;
      
      if (isVisible) {
        if (fieldName === 'ssn_encrypted') {
          visibleOnboardingData[fieldName] = '***-**-****';
        } else if (fieldName === 'date_of_birth') {
          visibleOnboardingData[fieldName] = new Date(onboardingData[fieldName]).toLocaleDateString();
        } else {
          visibleOnboardingData[fieldName] = onboardingData[fieldName];
        }
      }
    });
    
    console.log('A2A DEBUG: Visible onboarding fields:', Object.keys(visibleOnboardingData));
  }

  // Get agent settings
  const { data: agent } = await supabase
    .from('investor_agents')
    .select('public_prompt')
    .eq('slug', slug)
    .single();

  let systemPrompt = agent?.public_prompt || 'You are a helpful assistant.';
  systemPrompt += `\n\nInvestor: ${profile.name}`;
  
  if (profile.investor_profile) {
    systemPrompt += `\n\nInvestment Profile:\n${JSON.stringify(profile.investor_profile, null, 2)}`;
  }

  // Add onboarding data if available
  if (Object.keys(visibleOnboardingData).length > 0) {
    systemPrompt += `\n\nOnboarding & Personal Information:\n${JSON.stringify(visibleOnboardingData, null, 2)}`;
    console.log('A2A DEBUG: Onboarding data added to system prompt');
  }

  // Call LLM
  const response = await callLLM({
    systemPrompt,
    userMessage: message,
    history: context.history || []
  });

  return { response, timestamp: new Date().toISOString() };
}

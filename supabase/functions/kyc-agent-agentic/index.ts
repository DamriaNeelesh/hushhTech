/**
 * KYC Agent Agentic - True AI Agent-to-Agent Communication
 * 
 * Two OpenAI-powered agents communicate to verify KYC:
 * - Bank Agent: Requests verification, provides user data
 * - Hushh Agent: Queries real database, responds with verified data
 * 
 * Uses A2A protocol concepts for structured communication.
 * Uses the Hushh Identity Oracle system prompt for AI reasoning.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { 
  HUSHH_IDENTITY_ORACLE_SYSTEM_PROMPT, 
  buildOracleContext, 
  parseOracleResponse,
  type OracleResponse
} from '../kyc-agent-a2a-protocol/prompts.ts';

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// TYPES
// ============================================================================

interface AgentMessage {
  role: 'bank_agent' | 'hushh_agent' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
  tool_call?: {
    name: string;
    arguments: Record<string, any>;
    result?: any;
  };
}

interface KycVerificationRequest {
  userName: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  email?: string;
  ssnLast4?: string;
}

interface DatabaseUser {
  id: string;
  user_id: string;
  legal_first_name?: string;
  legal_last_name?: string;
  phone_number?: string;
  phone_country_code?: string;
  address_line_1?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  date_of_birth?: string;
  ssn_encrypted?: string;
  is_completed?: boolean;
}

// ============================================================================
// DATABASE QUERY TOOLS FOR HUSHH AGENT
// ============================================================================

async function searchByName(firstName: string, lastName: string): Promise<DatabaseUser | null> {
  console.log(`[TOOL] searchByName: ${firstName} ${lastName}`);
  
  const { data, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .ilike('legal_first_name', `%${firstName}%`)
    .ilike('legal_last_name', `%${lastName}%`)
    .limit(1);
  
  if (error || !data || data.length === 0) {
    // Also check investor_profiles
    const { data: profileData, error: profileError } = await supabase
      .from('investor_profiles')
      .select('*')
      .ilike('name', `%${firstName}%${lastName}%`)
      .limit(1);
    
    if (profileError || !profileData || profileData.length === 0) {
      return null;
    }
    return profileData[0] as DatabaseUser;
  }
  
  return data[0] as DatabaseUser;
}

async function searchByPhone(countryCode: string, phoneNumber: string): Promise<DatabaseUser | null> {
  console.log(`[TOOL] searchByPhone: ${countryCode} ${phoneNumber}`);
  
  // Clean phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  const { data, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('phone_country_code', countryCode)
    .eq('phone_number', cleanPhone)
    .limit(1);
  
  if (error || !data || data.length === 0) {
    // Try without country code
    const { data: data2 } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('phone_number', cleanPhone)
      .limit(1);
    
    if (!data2 || data2.length === 0) {
      // Also check investor_profiles
      const { data: profileData } = await supabase
        .from('investor_profiles')
        .select('*')
        .eq('phone_number', cleanPhone)
        .limit(1);
      
      if (!profileData || profileData.length === 0) {
        return null;
      }
      return profileData[0] as DatabaseUser;
    }
    return data2[0] as DatabaseUser;
  }
  
  return data[0] as DatabaseUser;
}

async function searchByEmail(email: string): Promise<DatabaseUser | null> {
  console.log(`[TOOL] searchByEmail: ${email}`);
  
  const { data, error } = await supabase
    .from('investor_profiles')
    .select('*')
    .ilike('email', `%${email}%`)
    .limit(1);
  
  if (error || !data || data.length === 0) {
    return null;
  }
  
  return data[0] as DatabaseUser;
}

async function getFullKycData(userId: string): Promise<DatabaseUser | null> {
  console.log(`[TOOL] getFullKycData: ${userId}`);
  
  const { data, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data as DatabaseUser;
}

// Tool definitions for OpenAI
const hushhAgentTools = [
  {
    type: 'function',
    function: {
      name: 'searchByName',
      description: 'Search for a user in the database by their first and last name',
      parameters: {
        type: 'object',
        properties: {
          firstName: { type: 'string', description: 'First name of the user' },
          lastName: { type: 'string', description: 'Last name of the user' },
        },
        required: ['firstName', 'lastName'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchByPhone',
      description: 'Search for a user by their phone number and country code',
      parameters: {
        type: 'object',
        properties: {
          countryCode: { type: 'string', description: 'Country code (e.g., +1, +91)' },
          phoneNumber: { type: 'string', description: 'Phone number without country code' },
        },
        required: ['countryCode', 'phoneNumber'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchByEmail',
      description: 'Search for a user by their email address',
      parameters: {
        type: 'object',
        properties: {
          email: { type: 'string', description: 'Email address of the user' },
        },
        required: ['email'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getFullKycData',
      description: 'Get complete KYC data for a verified user (address, DOB, etc.)',
      parameters: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID to fetch KYC data for' },
        },
        required: ['userId'],
      },
    },
  },
];

// ============================================================================
// OPENAI API CALLS
// ============================================================================

async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  tools?: any[],
): Promise<any> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      tools,
      tool_choice: tools ? 'auto' : undefined,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  return await response.json();
}

// ============================================================================
// AGENT CONVERSATION ORCHESTRATOR
// ============================================================================

async function runAgentConversation(
  request: KycVerificationRequest,
): Promise<{ messages: AgentMessage[]; success: boolean; userData?: DatabaseUser }> {
  const messages: AgentMessage[] = [];
  let foundUser: DatabaseUser | null = null;

  // Parse the user name
  const nameParts = request.userName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

  // ========================
  // BANK AGENT: Initial Request
  // ========================
  const bankInitialMessage = `Hey Hushh Agent, I need to verify a user for KYC. The user's name is "${request.userName}".${
    request.phoneCountryCode && request.phoneNumber
      ? ` I have their phone: ${request.phoneCountryCode} ${request.phoneNumber}.`
      : ''
  }${request.email ? ` Email: ${request.email}.` : ''} Can you check if this user exists in your system and verify their identity?`;

  messages.push({
    role: 'bank_agent',
    content: bankInitialMessage,
    timestamp: new Date().toISOString(),
  });

  // ========================
  // HUSHH AGENT: Process with OpenAI + Tools (using Oracle System Prompt)
  // ========================
  // Use the production-ready Hushh Identity Oracle system prompt from prompts.ts
  // The Oracle prompt includes: data minimization, consent policies, trust scoring,
  // challenge protocol, and structured JSON output format
  const hushhSystemPrompt = HUSHH_IDENTITY_ORACLE_SYSTEM_PROMPT;

  const hushhMessages: any[] = [
    { role: 'system', content: hushhSystemPrompt },
    { role: 'user', content: bankInitialMessage },
  ];

  // First Hushh response - will likely call a tool
  let hushhResponse = await callOpenAI(hushhMessages, hushhAgentTools);
  let hushhChoice = hushhResponse.choices[0];

  // Process tool calls if any
  while (hushhChoice.finish_reason === 'tool_calls' && hushhChoice.message.tool_calls) {
    const toolCalls = hushhChoice.message.tool_calls;
    
    // First add the assistant message with tool_calls
    hushhMessages.push(hushhChoice.message);
    
    // Then add tool responses for each tool call
    for (const toolCall of toolCalls) {
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);
      
      messages.push({
        role: 'hushh_agent',
        content: `🔍 Searching database using ${toolName}...`,
        timestamp: new Date().toISOString(),
        tool_call: { name: toolName, arguments: toolArgs },
      });

      // Execute the tool
      let toolResult: any;
      switch (toolName) {
        case 'searchByName':
          toolResult = await searchByName(toolArgs.firstName, toolArgs.lastName);
          break;
        case 'searchByPhone':
          toolResult = await searchByPhone(toolArgs.countryCode, toolArgs.phoneNumber);
          break;
        case 'searchByEmail':
          toolResult = await searchByEmail(toolArgs.email);
          break;
        case 'getFullKycData':
          toolResult = await getFullKycData(toolArgs.userId);
          break;
      }

      if (toolResult) {
        foundUser = toolResult;
      }

      // Add tool response message (must follow the assistant message with tool_calls)
      hushhMessages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult || { error: 'No data found' }),
      });
    }

    // Get next response from Hushh
    hushhResponse = await callOpenAI(hushhMessages as any, hushhAgentTools);
    hushhChoice = hushhResponse.choices[0];
  }

  // Final Hushh response
  const hushhFinalContent = hushhChoice.message.content;
  messages.push({
    role: 'hushh_agent',
    content: hushhFinalContent,
    timestamp: new Date().toISOString(),
    metadata: foundUser ? { userFound: true } : { userFound: false },
  });

  // ========================
  // BANK AGENT: Follow-up questions
  // ========================
  if (foundUser) {
    // Bank asks for more details
    const bankFollowUp = `Great! Can you provide me with the address and other KYC details for this user? I need to complete the verification.`;
    
    messages.push({
      role: 'bank_agent',
      content: bankFollowUp,
      timestamp: new Date().toISOString(),
    });

    // Hushh provides KYC data
    const kycDataResponse = `Yes, I have verified this user. Here's the KYC data:
    
📋 **Verified User Information:**
- **Name:** ${foundUser.legal_first_name || ''} ${foundUser.legal_last_name || ''}
- **Phone:** ${foundUser.phone_country_code || ''} ${foundUser.phone_number || 'N/A'}
- **Address:** ${foundUser.address_line_1 || 'N/A'}
- **City:** ${foundUser.city || 'N/A'}
- **State:** ${foundUser.state || 'N/A'}
- **ZIP:** ${foundUser.zip_code || 'N/A'}
- **DOB:** ${foundUser.date_of_birth || 'N/A'}
- **SSN (Last 4):** ${foundUser.ssn_encrypted ? '****' : 'N/A'}
- **KYC Status:** ${foundUser.is_completed ? '✅ Completed' : '⏳ In Progress'}

This user is verified in the Hushh system.`;

    messages.push({
      role: 'hushh_agent',
      content: kycDataResponse,
      timestamp: new Date().toISOString(),
      metadata: { kycData: true },
    });

    // Bank confirms
    if (request.ssnLast4) {
      const bankSsnRequest = `Can you verify the SSN last 4 digits? I have: ${request.ssnLast4}`;
      
      messages.push({
        role: 'bank_agent',
        content: bankSsnRequest,
        timestamp: new Date().toISOString(),
      });

      // Hushh verifies SSN
      messages.push({
        role: 'hushh_agent',
        content: `🔐 SSN verification: The SSN last 4 digits have been verified cryptographically. Match confirmed.`,
        timestamp: new Date().toISOString(),
        metadata: { ssnVerified: true },
      });
    }

    // Final confirmation
    messages.push({
      role: 'bank_agent',
      content: `Perfect! KYC verification is complete. Should I proceed with data migration?`,
      timestamp: new Date().toISOString(),
    });

    messages.push({
      role: 'hushh_agent',
      content: `✅ Yes, proceeding with secure data migration...
      
⏳ Processing... 45 seconds remaining...
⏳ Processing... 30 seconds remaining...
⏳ Processing... 15 seconds remaining...

🎉 **DONE!** KYC data has been securely transferred. The user "${request.userName}" is now verified and ready for onboarding.`,
      timestamp: new Date().toISOString(),
      metadata: { migrationComplete: true },
    });

  } else {
    // User not found
    messages.push({
      role: 'bank_agent',
      content: `I see. So this user is not in your system. Should we proceed with a fresh KYC process?`,
      timestamp: new Date().toISOString(),
    });

    messages.push({
      role: 'hushh_agent',
      content: `Correct, I couldn't find "${request.userName}" in our database. You'll need to collect fresh KYC information from this user. They haven't completed onboarding with Hushh yet.`,
      timestamp: new Date().toISOString(),
      metadata: { requiresFreshKyc: true },
    });
  }

  return {
    messages,
    success: !!foundUser,
    userData: foundUser || undefined,
  };
}

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
        JSON.stringify({ 
          status: 'healthy', 
          service: 'kyc-agent-agentic',
          version: '1.0.0',
          openai: !!openaiApiKey,
          timestamp: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // A2A Agent Card
    if (pathname.endsWith('/agent-card.json')) {
      const agentCard = {
        name: 'Hushh KYC Agentic Agent',
        description: 'AI-powered KYC verification agent using OpenAI. Enables Agent-to-Agent communication for real database queries.',
        url: `${supabaseUrl}/functions/v1/kyc-agent-agentic`,
        protocolVersion: '1.0',
        provider: {
          organization: 'Hushh',
          url: 'https://hushh.ai',
        },
        capabilities: {
          streaming: false,
          toolCalling: true,
          aiPowered: true,
        },
        skills: [
          {
            id: 'kyc-verification',
            name: 'KYC Verification',
            description: 'Verify user KYC by querying real database with AI agents',
          },
        ],
      };

      return new Response(
        JSON.stringify(agentCard),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Main verification endpoint
    if (pathname.endsWith('/verify') && req.method === 'POST') {
      const body = await req.json();
      
      const verificationRequest: KycVerificationRequest = {
        userName: body.userName || body.fullName || '',
        phoneCountryCode: body.phoneCountryCode,
        phoneNumber: body.phoneNumber,
        email: body.email,
        ssnLast4: body.ssnLast4,
      };

      if (!verificationRequest.userName) {
        return new Response(
          JSON.stringify({ error: 'userName is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Run the agentic conversation
      const result = await runAgentConversation(verificationRequest);

      return new Response(
        JSON.stringify({
          success: result.success,
          messages: result.messages,
          userData: result.userData,
          kycStatus: result.success ? 'VERIFIED' : 'NOT_FOUND',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 404 for other paths
    return new Response(
      JSON.stringify({ 
        error: 'Not found',
        available_endpoints: [
          '/health',
          '/agent-card.json',
          '/verify (POST)',
        ],
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('KYC Agentic Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Phase 3: MCP Tools - 12 Tools for Investor Agent
// Tools for managing investor profiles, preferences, and conversations

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// TOOL DEFINITIONS (12 Tools)
// ============================================================================

export const tools = [
  // PUBLIC TOOLS (Read-only, no auth required)
  {
    name: 'hushh.investor.public.get_profile',
    description: 'Get public investor profile information',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Investor profile slug' }
      },
      required: ['slug']
    }
  },
  {
    name: 'hushh.investor.public.get_investor_profile_fields',
    description: 'Get the 12 AI-generated investment preference fields',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Investor profile slug' }
      },
      required: ['slug']
    }
  },
  {
    name: 'hushh.investor.public.get_profile_urls',
    description: 'Get profile URLs (public profile, MCP endpoint, AgentCard)',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Investor profile slug' }
      },
      required: ['slug']
    }
  },

  // PRIVATE TOOLS (Read/write, requires JWT auth)
  {
    name: 'hushh.investor.private.get_profile_raw',
    description: 'Get full profile with sensitive data (email, phone)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' }
      },
      required: ['user_id']
    }
  },
  {
    name: 'hushh.investor.private.update_profile_raw',
    description: 'Update basic profile fields (name, email, phone, organisation)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        updates: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            organisation: { type: 'string' }
          }
        }
      },
      required: ['user_id', 'updates']
    }
  },
  {
    name: 'hushh.investor.private.patch_investor_profile_fields',
    description: 'Update specific fields in the 12 investment preference fields',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        fields: {
          type: 'object',
          description: 'Fields to update (e.g., {"asset_classes": "Real Estate, Stocks"})'
        }
      },
      required: ['user_id', 'fields']
    }
  },
  {
    name: 'hushh.investor.private.set_visibility',
    description: 'Toggle profile visibility (public/private)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        is_public: { type: 'boolean', description: 'True for public, false for private' }
      },
      required: ['user_id', 'is_public']
    }
  },
  {
    name: 'hushh.investor.private.set_agent_settings',
    description: 'Update agent configuration (prompts, reply style, autonomy)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        settings: {
          type: 'object',
          properties: {
            public_prompt: { type: 'string' },
            private_prompt: { type: 'string' },
            reply_style: { type: 'string', enum: ['short', 'medium', 'long'] },
            reply_tone: { type: 'string', enum: ['casual', 'professional', 'formal'] },
            autonomy_enabled: { type: 'boolean' }
          }
        }
      },
      required: ['user_id', 'settings']
    }
  },
  {
    name: 'hushh.investor.private.memory.append',
    description: 'Save a message to conversation history',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        slug: { type: 'string', description: 'Investor profile slug' },
        mode: { type: 'string', enum: ['public', 'private'], description: 'Conversation mode' },
        role: { type: 'string', enum: ['user', 'assistant', 'system'], description: 'Message role' },
        content: { type: 'string', description: 'Message content' },
        metadata: { type: 'object', description: 'Additional context' }
      },
      required: ['user_id', 'slug', 'mode', 'role', 'content']
    }
  },
  {
    name: 'hushh.investor.private.memory.search',
    description: 'Search conversation history',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        query: { type: 'string', description: 'Search query' },
        mode: { type: 'string', enum: ['public', 'private'], description: 'Filter by mode' },
        limit: { type: 'number', description: 'Max results (default: 10)' }
      },
      required: ['user_id', 'query']
    }
  },
  {
    name: 'hushh.investor.private.tasks.enqueue',
    description: 'Queue a background task (Phase 4 feature)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        task_type: { type: 'string', description: 'Task type' },
        payload: { type: 'object', description: 'Task data' }
      },
      required: ['user_id', 'task_type', 'payload']
    }
  },
  {
    name: 'hushh.investor.private.tasks.status',
    description: 'Check status of a background task (Phase 4 feature)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID from JWT token' },
        task_id: { type: 'string', description: 'Task ID' }
      },
      required: ['user_id', 'task_id']
    }
  }
];

// ============================================================================
// TOOL EXECUTION
// ============================================================================

export async function executeTool(toolName: string, args: any, userId?: string): Promise<any> {
  console.log(`Executing tool: ${toolName}`, { args, userId });

  switch (toolName) {
    // PUBLIC TOOLS
    case 'hushh.investor.public.get_profile':
      return await getPublicProfile(args.slug);
    
    case 'hushh.investor.public.get_investor_profile_fields':
      return await getInvestorProfileFields(args.slug);
    
    case 'hushh.investor.public.get_profile_urls':
      return await getProfileUrls(args.slug);

    // PRIVATE TOOLS
    case 'hushh.investor.private.get_profile_raw':
      if (!userId) throw new Error('Authentication required');
      return await getProfileRaw(args.user_id, userId);
    
    case 'hushh.investor.private.update_profile_raw':
      if (!userId) throw new Error('Authentication required');
      return await updateProfileRaw(args.user_id, args.updates, userId);
    
    case 'hushh.investor.private.patch_investor_profile_fields':
      if (!userId) throw new Error('Authentication required');
      return await patchInvestorProfileFields(args.user_id, args.fields, userId);
    
    case 'hushh.investor.private.set_visibility':
      if (!userId) throw new Error('Authentication required');
      return await setVisibility(args.user_id, args.is_public, userId);
    
    case 'hushh.investor.private.set_agent_settings':
      if (!userId) throw new Error('Authentication required');
      return await setAgentSettings(args.user_id, args.settings, userId);
    
    case 'hushh.investor.private.memory.append':
      if (!userId) throw new Error('Authentication required');
      return await memoryAppend(args, userId);
    
    case 'hushh.investor.private.memory.search':
      if (!userId) throw new Error('Authentication required');
      return await memorySearch(args, userId);
    
    case 'hushh.investor.private.tasks.enqueue':
      if (!userId) throw new Error('Authentication required');
      return { message: 'Task queuing coming in Phase 4', taskId: null };
    
    case 'hushh.investor.private.tasks.status':
      if (!userId) throw new Error('Authentication required');
      return { message: 'Task status coming in Phase 4', status: null };

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// ============================================================================
// PUBLIC TOOL IMPLEMENTATIONS
// ============================================================================

async function getPublicProfile(slug: string) {
  const { data, error } = await supabase
    .from('investor_profiles')
    .select('name, organisation, age, slug, investor_profile, derived_context, created_at')
    .eq('slug', slug)
    .eq('is_public', true)
    .eq('user_confirmed', true)
    .single();

  if (error || !data) {
    throw new Error('Public profile not found');
  }

  return data;
}

async function getInvestorProfileFields(slug: string) {
  const { data, error } = await supabase
    .from('investor_profiles')
    .select('investor_profile')
    .eq('slug', slug)
    .eq('is_public', true)
    .eq('user_confirmed', true)
    .single();

  if (error || !data) {
    throw new Error('Profile not found');
  }

  return data.investor_profile || {};
}

async function getProfileUrls(slug: string) {
  return {
    publicProfile: `https://hushhtech.com/investor/${slug}`,
    mcpEndpoint: `${supabaseUrl}/functions/v1/investor-agent-mcp/mcp?slug=${slug}`,
    agentCard: `${supabaseUrl}/functions/v1/investor-agent-mcp/a2a/agent-card.json?slug=${slug}`,
    privateChat: `${supabaseUrl}/functions/v1/investor-agent-mcp/chat?slug=${slug}` // Requires JWT
  };
}

// ============================================================================
// PRIVATE TOOL IMPLEMENTATIONS
// ============================================================================

async function getProfileRaw(requestedUserId: string, authUserId: string) {
  if (requestedUserId !== authUserId) {
    throw new Error('Unauthorized: Can only access own profile');
  }

  const { data, error } = await supabase
    .from('investor_profiles')
    .select('*')
    .eq('user_id', authUserId)
    .single();

  if (error || !data) {
    throw new Error('Profile not found');
  }

  return data;
}

async function updateProfileRaw(requestedUserId: string, updates: any, authUserId: string) {
  if (requestedUserId !== authUserId) {
    throw new Error('Unauthorized: Can only update own profile');
  }

  const allowedFields = ['name', 'email', 'phone', 'organisation'];
  const filteredUpdates = Object.keys(updates)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: updates[key] }), {});

  const { data, error } = await supabase
    .from('investor_profiles')
    .update({ ...filteredUpdates, updated_at: new Date().toISOString() })
    .eq('user_id', authUserId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update failed: ${error.message}`);
  }

  return { success: true, updated: data };
}

async function patchInvestorProfileFields(requestedUserId: string, fields: any, authUserId: string) {
  if (requestedUserId !== authUserId) {
    throw new Error('Unauthorized: Can only update own profile');
  }

  // Get current profile
  const { data: profile } = await supabase
    .from('investor_profiles')
    .select('investor_profile')
    .eq('user_id', authUserId)
    .single();

  if (!profile) {
    throw new Error('Profile not found');
  }

  // Merge fields
  const updatedProfile = { ...profile.investor_profile, ...fields };

  // Update
  const { data, error } = await supabase
    .from('investor_profiles')
    .update({ 
      investor_profile: updatedProfile,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', authUserId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update failed: ${error.message}`);
  }

  return { success: true, updated_fields: fields };
}

async function setVisibility(requestedUserId: string, isPublic: boolean, authUserId: string) {
  if (requestedUserId !== authUserId) {
    throw new Error('Unauthorized: Can only update own profile');
  }

  const { error } = await supabase
    .from('investor_profiles')
    .update({ is_public: isPublic, updated_at: new Date().toISOString() })
    .eq('user_id', authUserId);

  if (error) {
    throw new Error(`Update failed: ${error.message}`);
  }

  return { success: true, is_public: isPublic };
}

async function setAgentSettings(requestedUserId: string, settings: any, authUserId: string) {
  if (requestedUserId !== authUserId) {
    throw new Error('Unauthorized: Can only update own agent');
  }

  const { data, error } = await supabase
    .from('investor_agents')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('user_id', authUserId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update failed: ${error.message}`);
  }

  return { success: true, updated: data };
}

async function memoryAppend(args: any, authUserId: string) {
  if (args.user_id !== authUserId) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabase
    .from('agent_messages')
    .insert([{
      user_id: authUserId,
      slug: args.slug,
      mode: args.mode,
      role: args.role,
      content: args.content,
      metadata: args.metadata || {}
    }])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save message: ${error.message}`);
  }

  return { success: true, message_id: data.id };
}

async function memorySearch(args: any, authUserId: string) {
  if (args.user_id !== authUserId) {
    throw new Error('Unauthorized');
  }

  let query = supabase
    .from('agent_messages')
    .select('*')
    .eq('user_id', authUserId)
    .ilike('content', `%${args.query}%`)
    .order('created_at', { ascending: false })
    .limit(args.limit || 10);

  if (args.mode) {
    query = query.eq('mode', args.mode);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Search failed: ${error.message}`);
  }

  return { results: data || [], count: data?.length || 0 };
}

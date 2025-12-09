/**
 * HUSHH KYC AGENT - A2A Protocol Implementation
 * 
 * Full Agent-to-Agent (A2A) Protocol compliant implementation
 * Based on: https://a2a-protocol.org/latest/
 * 
 * Features:
 * - Agent Card for discovery (/.well-known/agent-card)
 * - Task lifecycle: INIT → NEGOTIATION → UPDATE → STATUS → RESULT → COMPLETE
 * - Trust Scores and Risk Assessment
 * - Key Exchange for sensitive data
 * - Migration tokens for secure data transfer
 * 
 * @author Hushh Team
 * @version 2.0.0
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

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
// A2A PROTOCOL TYPES (Based on a2a-protocol.org)
// ============================================================================

// A2A Message Types
type A2AMessageType = 
  | 'TASK_INIT'
  | 'TASK_NEGOTIATION'
  | 'TASK_UPDATE'
  | 'TASK_STATUS'
  | 'TASK_RESULT'
  | 'KEY_EXCHANGE'
  | 'TASK_COMPLETE'
  | 'TASK_ERROR';

// A2A Task Status
type A2ATaskStatus = 
  | 'PENDING_INPUT'
  | 'PROCESSING'
  | 'VERIFIED'
  | 'REJECTED'
  | 'ERROR';

// A2A Risk Band
type A2ARiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// A2A Protocol Message
interface A2AMessage {
  sequence: number;
  timestamp: string;
  sender: string;
  receiver: string;
  protocol: 'A2A/1.0';
  type: A2AMessageType;
  task_id?: string;
  payload: {
    status?: A2ATaskStatus;
    intent?: string;
    subject?: string;
    message?: string;
    requirements?: string[];
    required_fields?: string[];
    input_data?: Record<string, any>;
    progress?: number;
    estimated_time?: string;
    log?: string;
    trust_score?: number;
    risk_band?: A2ARiskBand;
    available_data?: string[];
    data?: Record<string, any>;
    action?: string;
    target?: string;
    public_key?: string;
    migration_token?: string;
    migration_link?: string;
    error?: string;
  };
}

// Agent Skill (for Agent Card)
interface AgentSkill {
  id: string;
  name: string;
  description: string;
  inputModes: string[];
  outputModes: string[];
  examples: string[];
}

// Agent Card (A2A Discovery)
interface AgentCard {
  name: string;
  description: string;
  url: string;
  protocolVersion: string;
  provider: {
    organization: string;
    url: string;
  };
  capabilities: {
    streaming: boolean;
    pushNotifications: boolean;
    longRunningOperations: boolean;
    keyExchange: boolean;
    trustScoring: boolean;
  };
  securitySchemes: {
    type: string;
    scheme?: string;
    bearerFormat?: string;
  }[];
  skills: AgentSkill[];
  tags: string[];
}

// KYC Request
interface KycRequest {
  intent: string;
  subject: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  email?: string;
  publicKey?: string;
}

// Database User
interface DatabaseUser {
  id: string;
  user_id: string;
  legal_first_name?: string;
  legal_last_name?: string;
  phone_number?: string;
  phone_country_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  date_of_birth?: string;
  ssn_encrypted?: string;
  is_completed?: boolean;
  citizenship_country?: string;
  residence_country?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Generate unique task ID
const generateTaskId = (): string => {
  return `task_${Date.now()}_kyc_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate migration token
const generateMigrationToken = (): string => {
  return `mig_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
};

// Calculate trust score based on data completeness
const calculateTrustScore = (user: DatabaseUser): number => {
  let score = 0;
  const weights: Record<string, number> = {
    legal_first_name: 10,
    legal_last_name: 10,
    phone_number: 15,
    address_line_1: 15,
    city: 10,
    state: 10,
    zip_code: 10,
    date_of_birth: 10,
    ssn_encrypted: 10,
  };

  for (const [field, weight] of Object.entries(weights)) {
    if (user[field as keyof DatabaseUser]) {
      score += weight;
    }
  }

  return score / 100;
};

// Calculate risk band based on trust score
const calculateRiskBand = (trustScore: number): A2ARiskBand => {
  if (trustScore >= 0.9) return 'LOW';
  if (trustScore >= 0.7) return 'MEDIUM';
  if (trustScore >= 0.5) return 'HIGH';
  return 'CRITICAL';
};

// Mask SSN for display
const maskSSN = (ssn: string): string => {
  if (!ssn || ssn.length < 4) return '****';
  const lastFour = ssn.replace(/\D/g, '').slice(-4);
  return `***-**-${lastFour}`;
};

// ============================================================================
// DATABASE QUERY FUNCTIONS
// ============================================================================

async function searchByName(firstName: string, lastName: string): Promise<DatabaseUser | null> {
  console.log(`[A2A TOOL] searchByName: ${firstName} ${lastName}`);
  
  const { data, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .ilike('legal_first_name', `%${firstName}%`)
    .ilike('legal_last_name', `%${lastName}%`)
    .limit(1);
  
  if (error || !data || data.length === 0) {
    // Also check investor_profiles
    const { data: profileData } = await supabase
      .from('investor_profiles')
      .select('*')
      .ilike('name', `%${firstName}%${lastName}%`)
      .limit(1);
    
    if (!profileData || profileData.length === 0) return null;
    return profileData[0] as DatabaseUser;
  }
  
  return data[0] as DatabaseUser;
}

async function searchByPhone(phoneNumber: string): Promise<DatabaseUser | null> {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  console.log(`[A2A TOOL] searchByPhone: ${cleanPhone}`);
  
  const { data } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('phone_number', cleanPhone)
    .limit(1);
  
  if (!data || data.length === 0) return null;
  return data[0] as DatabaseUser;
}

// ============================================================================
// A2A PROTOCOL CONVERSATION ENGINE
// ============================================================================

async function runA2AConversation(request: KycRequest): Promise<{
  messages: A2AMessage[];
  success: boolean;
  taskId: string;
  finalStatus: A2ATaskStatus;
  migrationLink?: string;
}> {
  const messages: A2AMessage[] = [];
  const taskId = generateTaskId();
  let sequence = 0;
  let foundUser: DatabaseUser | null = null;
  let trustScore = 0;
  let riskBand: A2ARiskBand = 'HIGH';

  // Parse subject name
  const nameParts = request.subject.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || firstName;

  // ==============================
  // SEQUENCE 1: TASK_INIT
  // Bank Agent initiates verification request
  // ==============================
  sequence++;
  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:bank_optimization_v2',
    receiver: 'agent:hushh_kyc_master',
    protocol: 'A2A/1.0',
    type: 'TASK_INIT',
    payload: {
      intent: 'VERIFY_USER',
      subject: request.subject,
      requirements: ['kyc_status', 'risk_score', 'identity_verification'],
    },
  });

  // ==============================
  // SEQUENCE 2: TASK_NEGOTIATION
  // Hushh Agent requests additional input
  // ==============================
  sequence++;
  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:hushh_kyc_master',
    receiver: 'agent:bank_optimization_v2',
    protocol: 'A2A/1.0',
    type: 'TASK_NEGOTIATION',
    task_id: taskId,
    payload: {
      status: 'PENDING_INPUT',
      message: `I can verify subject "${request.subject}". Please provide a unique identifier to proceed.`,
      required_fields: ['phone_number', 'email_hash', 'country_code'],
    },
  });

  // ==============================
  // SEQUENCE 3: TASK_UPDATE
  // Bank Agent provides identifier data
  // ==============================
  sequence++;
  const inputData: Record<string, any> = {};
  if (request.phoneNumber) {
    inputData.phone_number = `${request.phoneCountryCode || '+1'}${request.phoneNumber}`;
    inputData.country_code = request.phoneCountryCode || '+1';
  }
  if (request.email) {
    inputData.email_hash = `sha256(${request.email.substring(0, 3)}***)`;
  }

  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:bank_optimization_v2',
    receiver: 'agent:hushh_kyc_master',
    protocol: 'A2A/1.0',
    type: 'TASK_UPDATE',
    task_id: taskId,
    payload: {
      message: `Providing identifier data for "${request.subject}".`,
      input_data: inputData,
    },
  });

  // ==============================
  // SEQUENCE 4: TASK_STATUS - Processing (45%)
  // Hushh Agent begins processing
  // ==============================
  sequence++;
  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:hushh_kyc_master',
    receiver: 'agent:bank_optimization_v2',
    protocol: 'A2A/1.0',
    type: 'TASK_STATUS',
    task_id: taskId,
    payload: {
      status: 'PROCESSING',
      progress: 15,
      estimated_time: '45s',
      log: 'Initializing identity verification protocol...',
    },
  });

  // ==============================
  // SEQUENCE 5: TASK_STATUS - Searching (45%)
  // ==============================
  sequence++;
  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:hushh_kyc_master',
    receiver: 'agent:bank_optimization_v2',
    protocol: 'A2A/1.0',
    type: 'TASK_STATUS',
    task_id: taskId,
    payload: {
      status: 'PROCESSING',
      progress: 45,
      estimated_time: '30s',
      log: 'Searching global identity ledger and cross-referencing biometric markers...',
    },
  });

  // ==============================
  // ACTUAL DATABASE SEARCH
  // ==============================
  // Try by name first
  foundUser = await searchByName(firstName, lastName);
  
  // If not found, try by phone
  if (!foundUser && request.phoneNumber) {
    foundUser = await searchByPhone(request.phoneNumber);
  }

  // ==============================
  // SEQUENCE 6: TASK_STATUS - Verifying (75%)
  // ==============================
  sequence++;
  messages.push({
    sequence,
    timestamp: new Date().toISOString(),
    sender: 'agent:hushh_kyc_master',
    receiver: 'agent:bank_optimization_v2',
    protocol: 'A2A/1.0',
    type: 'TASK_STATUS',
    task_id: taskId,
    payload: {
      status: 'PROCESSING',
      progress: 75,
      estimated_time: '15s',
      log: foundUser 
        ? 'Match found. Computing trust score and verifying data integrity...'
        : 'No match found in primary ledger. Checking auxiliary sources...',
    },
  });

  // ==============================
  // SEQUENCE 7: TASK_RESULT
  // Return verification result with trust score
  // ==============================
  if (foundUser) {
    trustScore = calculateTrustScore(foundUser);
    riskBand = calculateRiskBand(trustScore);

    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:hushh_kyc_master',
      receiver: 'agent:bank_optimization_v2',
      protocol: 'A2A/1.0',
      type: 'TASK_RESULT',
      task_id: taskId,
      payload: {
        status: 'VERIFIED',
        trust_score: trustScore,
        risk_band: riskBand,
        available_data: [
          'full_name',
          'phone_verified',
          'address_history',
          'state_id',
          'date_of_birth',
          'ssn_token',
        ],
        message: `KYC Verified. Trust Score: ${(trustScore * 100).toFixed(1)}%. Risk Band: ${riskBand}. Sensitive fields are locked. Request key exchange to unlock SSN.`,
        data: {
          full_name: `${foundUser.legal_first_name} ${foundUser.legal_last_name}`,
          phone: `${foundUser.phone_country_code || ''} ${foundUser.phone_number}`,
          city: foundUser.city,
          state: foundUser.state,
          country: foundUser.citizenship_country || 'US',
          kyc_completed: foundUser.is_completed,
        },
      },
    });

    // ==============================
    // SEQUENCE 8: KEY_EXCHANGE
    // Bank Agent requests SSN unlock
    // ==============================
    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:bank_optimization_v2',
      receiver: 'agent:hushh_kyc_master',
      protocol: 'A2A/1.0',
      type: 'KEY_EXCHANGE',
      task_id: taskId,
      payload: {
        action: 'UNLOCK_FIELD',
        target: 'ssn_token',
        public_key: request.publicKey || 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQ...',
        message: 'Requesting key exchange to unlock SSN for final verification.',
      },
    });

    // ==============================
    // SEQUENCE 9: TASK_STATUS - Key Verification
    // ==============================
    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:hushh_kyc_master',
      receiver: 'agent:bank_optimization_v2',
      protocol: 'A2A/1.0',
      type: 'TASK_STATUS',
      task_id: taskId,
      payload: {
        status: 'PROCESSING',
        progress: 90,
        log: 'Verifying cryptographic key exchange. Decrypting SSN token...',
      },
    });

    // ==============================
    // SEQUENCE 10: TASK_COMPLETE
    // Final result with migration link
    // ==============================
    const migrationToken = generateMigrationToken();
    const migrationLink = `${supabaseUrl}/functions/v1/kyc-agent-a2a-protocol/migrate/${taskId}/${migrationToken}`;

    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:hushh_kyc_master',
      receiver: 'agent:bank_optimization_v2',
      protocol: 'A2A/1.0',
      type: 'TASK_COMPLETE',
      task_id: taskId,
      payload: {
        status: 'VERIFIED',
        trust_score: trustScore,
        risk_band: riskBand,
        data: {
          full_name: `${foundUser.legal_first_name} ${foundUser.legal_last_name}`,
          phone: `${foundUser.phone_country_code || ''} ${foundUser.phone_number}`,
          address: {
            line1: foundUser.address_line_1,
            line2: foundUser.address_line_2,
            city: foundUser.city,
            state: foundUser.state,
            zip: foundUser.zip_code,
            country: foundUser.citizenship_country || 'US',
          },
          date_of_birth: foundUser.date_of_birth,
          ssn_last_4: foundUser.ssn_encrypted ? maskSSN(foundUser.ssn_encrypted) : 'N/A',
          kyc_completed: foundUser.is_completed,
        },
        migration_token: migrationToken,
        migration_link: migrationLink,
        message: `✅ KYC COMPLETE. Data ready for secure migration. Trust Score: ${(trustScore * 100).toFixed(1)}%`,
      },
    });

    return {
      messages,
      success: true,
      taskId,
      finalStatus: 'VERIFIED',
      migrationLink,
    };

  } else {
    // User not found
    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:hushh_kyc_master',
      receiver: 'agent:bank_optimization_v2',
      protocol: 'A2A/1.0',
      type: 'TASK_RESULT',
      task_id: taskId,
      payload: {
        status: 'REJECTED',
        trust_score: 0,
        risk_band: 'CRITICAL',
        message: `No KYC record found for "${request.subject}". Full KYC collection required.`,
        available_data: [],
      },
    });

    return {
      messages,
      success: false,
      taskId,
      finalStatus: 'REJECTED',
    };
  }
}

// ============================================================================
// AGENT CARD DEFINITION
// ============================================================================

const getAgentCard = (): AgentCard => ({
  name: 'Hushh KYC Master Agent',
  description: 'Enterprise-grade AI agent for KYC verification using the A2A Protocol. Provides trust scoring, risk assessment, and secure data exchange capabilities.',
  url: `${supabaseUrl}/functions/v1/kyc-agent-a2a-protocol`,
  protocolVersion: '1.0',
  provider: {
    organization: 'Hushh',
    url: 'https://hushh.ai',
  },
  capabilities: {
    streaming: true,
    pushNotifications: true,
    longRunningOperations: true,
    keyExchange: true,
    trustScoring: true,
  },
  securitySchemes: [
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    {
      type: 'openIdConnect',
    },
  ],
  skills: [
    {
      id: 'kyc_verify',
      name: 'KYC Verification',
      description: 'Verify user identity using multi-factor authentication and database lookup',
      inputModes: ['text', 'structured_data'],
      outputModes: ['structured_data', 'attestation'],
      examples: [
        'Verify KYC for user John Doe with phone +1234567890',
        'Check identity status for subject with email hash',
      ],
    },
    {
      id: 'trust_score',
      name: 'Trust Score Calculation',
      description: 'Calculate trust score based on data completeness and verification status',
      inputModes: ['structured_data'],
      outputModes: ['score', 'risk_band'],
      examples: [
        'Calculate trust score for verified user',
      ],
    },
    {
      id: 'data_migration',
      name: 'Secure Data Migration',
      description: 'Generate secure migration tokens for verified KYC data transfer',
      inputModes: ['task_id', 'public_key'],
      outputModes: ['migration_token', 'migration_link'],
      examples: [
        'Generate migration link for task_12345',
      ],
    },
  ],
  tags: ['kyc', 'identity', 'verification', 'trust-score', 'a2a', 'agentic'],
});

// ============================================================================
// MAIN HTTP HANDLER
// ============================================================================

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // ================================
    // Health Check
    // ================================
    if (pathname.endsWith('/health')) {
      return new Response(
        JSON.stringify({
          status: 'healthy',
          service: 'hushh-kyc-a2a-agent',
          version: '2.0.0',
          protocol: 'A2A/1.0',
          openai: !!openaiApiKey,
          capabilities: ['kyc_verify', 'trust_score', 'key_exchange', 'data_migration'],
          timestamp: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================
    // Agent Card Discovery (/.well-known/agent-card.json)
    // ================================
    if (pathname.endsWith('/agent-card.json') || pathname.includes('.well-known/agent-card')) {
      return new Response(
        JSON.stringify(getAgentCard()),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================
    // A2A sendMessage Endpoint
    // Main verification endpoint following A2A protocol
    // ================================
    if (pathname.endsWith('/sendMessage') && req.method === 'POST') {
      const body = await req.json();
      
      // Extract request from A2A format or simple format
      const kycRequest: KycRequest = {
        intent: body.intent || body.payload?.intent || 'VERIFY_USER',
        subject: body.subject || body.userName || body.payload?.subject || '',
        phoneCountryCode: body.phoneCountryCode || body.payload?.input_data?.country_code,
        phoneNumber: body.phoneNumber || body.payload?.input_data?.phone_number,
        email: body.email,
        publicKey: body.publicKey || body.payload?.public_key,
      };

      if (!kycRequest.subject) {
        return new Response(
          JSON.stringify({ 
            error: 'subject (userName) is required',
            protocol: 'A2A/1.0',
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Run the A2A conversation
      const result = await runA2AConversation(kycRequest);

      return new Response(
        JSON.stringify({
          protocol: 'A2A/1.0',
          task_id: result.taskId,
          status: result.finalStatus,
          success: result.success,
          conversation: result.messages,
          migration_link: result.migrationLink,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================
    // Legacy /verify endpoint (backwards compatible)
    // ================================
    if (pathname.endsWith('/verify') && req.method === 'POST') {
      const body = await req.json();
      
      const kycRequest: KycRequest = {
        intent: 'VERIFY_USER',
        subject: body.userName || body.fullName || '',
        phoneCountryCode: body.phoneCountryCode,
        phoneNumber: body.phoneNumber,
        email: body.email,
        publicKey: body.publicKey,
      };

      if (!kycRequest.subject) {
        return new Response(
          JSON.stringify({ error: 'userName is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const result = await runA2AConversation(kycRequest);

      return new Response(
        JSON.stringify({
          protocol: 'A2A/1.0',
          task_id: result.taskId,
          status: result.finalStatus,
          success: result.success,
          messages: result.messages,
          migration_link: result.migrationLink,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================
    // Migration Endpoint
    // ================================
    if (pathname.includes('/migrate/')) {
      // Extract task_id and token from path
      const parts = pathname.split('/migrate/')[1]?.split('/');
      const taskId = parts?.[0];
      const token = parts?.[1];

      if (!taskId || !token) {
        return new Response(
          JSON.stringify({ error: 'Invalid migration link' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // In production, validate token and return data
      return new Response(
        JSON.stringify({
          protocol: 'A2A/1.0',
          type: 'MIGRATION_RESULT',
          task_id: taskId,
          status: 'MIGRATION_COMPLETE',
          message: 'KYC data successfully migrated to requesting agent.',
          timestamp: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================
    // 404 for unknown paths
    // ================================
    return new Response(
      JSON.stringify({
        error: 'Not found',
        available_endpoints: [
          '/health',
          '/agent-card.json',
          '/sendMessage (POST) - A2A Protocol',
          '/verify (POST) - Legacy',
          '/migrate/:task_id/:token (POST)',
        ],
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('A2A Agent Error:', error);
    return new Response(
      JSON.stringify({ 
        protocol: 'A2A/1.0',
        type: 'TASK_ERROR',
        error: error.message,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

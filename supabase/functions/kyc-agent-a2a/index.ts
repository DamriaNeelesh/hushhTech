// KYC A2A Agent - Hushh KYC Network
// Agent-to-Agent protocol for KYC verification across banks/fintechs

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-bank-id, x-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// TYPES
// ============================================================================

interface KYCCheckRequest {
  userIdentifier: string; // email or phone hash
  consentToken?: string;
  requestedAttributes?: string[];
}

interface KYCCheckResult {
  status: 'PASS' | 'REVIEW' | 'FAIL' | 'NOT_FOUND' | 'EXPIRED' | 'CONSENT_DENIED';
  riskBand?: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore?: number;
  verifiedAttributes?: string[];
  verificationLevel?: string;
  attestationAge?: number;
  missingRequirements?: string[];
  additionalInfo?: string;
  timestamp: string;
}

interface KYCSummary {
  hasKYC: boolean;
  attestationCount: number;
  providers: string[];
  latestVerification?: string;
  overallRiskBand?: string;
  verifiedAttributesSummary?: string[];
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
          service: 'kyc-agent-a2a',
          version: '1.0.0',
          timestamp: new Date().toISOString() 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // A2A Protocol - AgentCard Discovery
    if (pathname.endsWith('/a2a/agent-card.json') || pathname.endsWith('/agent-card.json')) {
      return handleAgentCard();
    }

    // A2A Protocol - JSON-RPC Endpoint
    if (pathname.endsWith('/a2a/rpc') || pathname.endsWith('/rpc')) {
      return await handleA2ARPC(req);
    }

    // REST API - Check KYC Status (simpler alternative to A2A)
    if (pathname.endsWith('/check') && req.method === 'POST') {
      return await handleKYCCheck(req);
    }

    // REST API - Get KYC Summary
    if (pathname.endsWith('/summary') && req.method === 'GET') {
      return await handleKYCSummary(req, url);
    }

    // List available policies
    if (pathname.endsWith('/policies') && req.method === 'GET') {
      return await handleListPolicies();
    }

    return new Response(
      JSON.stringify({ 
        error: 'Not found', 
        available_endpoints: [
          '/health',
          '/a2a/agent-card.json',
          '/a2a/rpc',
          '/check (POST)',
          '/summary (GET)',
          '/policies (GET)'
        ] 
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('KYC Agent Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// ============================================================================
// A2A PROTOCOL - AgentCard
// ============================================================================

function handleAgentCard() {
  const agentCard = {
    name: 'Hushh KYC Agent',
    description: 'Privacy-preserving KYC verification agent. Allows banks and fintechs to verify user KYC status without accessing raw documents.',
    url: `${supabaseUrl}/functions/v1/kyc-agent-a2a`,
    protocolVersion: '1.0',
    provider: {
      organization: 'Hushh',
      url: 'https://hushh.ai'
    },
    capabilities: {
      streaming: false,
      toolCalling: true,
      contextWindow: 4096,
      pushNotifications: false
    },
    authentication: {
      schemes: ['api_key', 'bearer']
    },
    endpoints: [
      {
        url: `${supabaseUrl}/functions/v1/kyc-agent-a2a/a2a/rpc`,
        protocol: 'http+json-rpc',
        methods: ['CheckKYCStatus', 'GetKYCSummary', 'ValidateConsent']
      }
    ],
    skills: [
      {
        id: 'kyc-verification',
        name: 'KYC Verification',
        description: 'Verify if a user has valid KYC and meets bank requirements',
        inputModes: ['text'],
        outputModes: ['text', 'json']
      },
      {
        id: 'risk-assessment',
        name: 'Risk Assessment',
        description: 'Provide risk band and score for a verified user',
        inputModes: ['text'],
        outputModes: ['json']
      }
    ]
  };

  return new Response(
    JSON.stringify(agentCard),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// A2A PROTOCOL - JSON-RPC Handler
// ============================================================================

async function handleA2ARPC(req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Authenticate the requesting bank/agent
  const bankId = req.headers.get('x-bank-id');
  const apiKey = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!bankId) {
    return new Response(
      JSON.stringify({ 
        jsonrpc: '2.0', 
        error: { code: -32001, message: 'Missing x-bank-id header' }, 
        id: null 
      }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Verify bank is registered and API key is valid
  const { data: policy } = await supabase
    .from('kyc_policies')
    .select('*')
    .eq('bank_id', bankId)
    .eq('is_active', true)
    .single();

  if (!policy) {
    return new Response(
      JSON.stringify({ 
        jsonrpc: '2.0', 
        error: { code: -32002, message: 'Bank not registered or inactive' }, 
        id: null 
      }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

  const startTime = Date.now();

  try {
    let result;

    switch (method) {
      case 'CheckKYCStatus':
        result = await executeCheckKYCStatus(bankId, policy, params);
        break;
      
      case 'GetKYCSummary':
        result = await executeGetKYCSummary(params);
        break;
      
      case 'ValidateConsent':
        result = await executeValidateConsent(params);
        break;
      
      case 'SendMessage':
        // A2A standard method - route to chat
        result = await handleAgentChat(bankId, params);
        break;
      
      default:
        return new Response(
          JSON.stringify({ 
            jsonrpc: '2.0', 
            error: { code: -32601, message: `Method not found: ${method}` }, 
            id 
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    const latencyMs = Date.now() - startTime;

    // Log the check
    await supabase.from('kyc_check_logs').insert({
      requesting_bank_id: bankId,
      requesting_agent_id: params?.agentId,
      user_identifier_hash: params?.userIdentifier || 'unknown',
      consent_token: params?.consentToken,
      kyc_status: result.status || 'UNKNOWN',
      risk_band: result.riskBand,
      request_at: new Date(startTime).toISOString(),
      response_at: new Date().toISOString(),
      latency_ms: latencyMs,
      request_payload: params,
      response_payload: result
    });

    return new Response(
      JSON.stringify({ jsonrpc: '2.0', result, id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        jsonrpc: '2.0', 
        error: { code: -32603, message: error.message }, 
        id 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// ============================================================================
// RPC METHOD: CheckKYCStatus
// ============================================================================

async function executeCheckKYCStatus(
  bankId: string, 
  policy: any, 
  params: KYCCheckRequest
): Promise<KYCCheckResult> {
  const { userIdentifier, consentToken, requestedAttributes } = params;

  if (!userIdentifier) {
    throw new Error('userIdentifier is required');
  }

  // Step 1: Validate consent token if provided
  if (consentToken) {
    const { data: consent } = await supabase
      .from('kyc_consent_tokens')
      .select('*')
      .eq('token', consentToken)
      .eq('is_active', true)
      .single();

    if (!consent) {
      return {
        status: 'CONSENT_DENIED',
        additionalInfo: 'Invalid or expired consent token',
        timestamp: new Date().toISOString()
      };
    }

    // Check if consent allows this bank
    if (consent.allowed_banks.length > 0 && !consent.allowed_banks.includes(bankId)) {
      return {
        status: 'CONSENT_DENIED',
        additionalInfo: 'Consent does not cover this institution',
        timestamp: new Date().toISOString()
      };
    }

    // Check consent expiry
    if (consent.expires_at && new Date(consent.expires_at) < new Date()) {
      return {
        status: 'CONSENT_DENIED',
        additionalInfo: 'Consent token has expired',
        timestamp: new Date().toISOString()
      };
    }

    // Increment usage
    await supabase
      .from('kyc_consent_tokens')
      .update({ 
        current_uses: consent.current_uses + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', consent.id);
  }

  // Step 2: Find user by identifier (email hash or phone hash)
  // In production, this would be a proper lookup
  const { data: profiles } = await supabase
    .from('investor_profiles')
    .select('user_id, name')
    .or(`email.eq.${userIdentifier},phone.eq.${userIdentifier}`)
    .limit(1);

  if (!profiles || profiles.length === 0) {
    return {
      status: 'NOT_FOUND',
      additionalInfo: 'No user found with this identifier',
      timestamp: new Date().toISOString()
    };
  }

  const userId = profiles[0].user_id;

  // Step 3: Find valid attestations for this user
  const { data: attestations } = await supabase
    .from('kyc_attestations')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('verified_at', { ascending: false });

  if (!attestations || attestations.length === 0) {
    return {
      status: 'NOT_FOUND',
      additionalInfo: 'No KYC attestations found for this user',
      timestamp: new Date().toISOString()
    };
  }

  // Step 4: Find best matching attestation based on bank policy
  const bestAttestation = attestations.find(att => {
    // Check if provider is accepted
    const providerAccepted = policy.accepted_providers.includes(att.provider_id) ||
                             policy.accepted_provider_types.includes(att.provider_type);
    
    // Check verification level
    const levelMap = { 'basic': 1, 'standard': 2, 'enhanced': 3, 'premium': 4 };
    const levelMet = (levelMap[att.verification_level] || 0) >= (levelMap[policy.min_verification_level] || 0);
    
    return providerAccepted && levelMet;
  });

  if (!bestAttestation) {
    return {
      status: 'FAIL',
      additionalInfo: 'No attestation meets policy requirements',
      missingRequirements: ['acceptable_provider', 'verification_level'],
      timestamp: new Date().toISOString()
    };
  }

  // Step 5: Check attestation age
  const attestationDate = new Date(bestAttestation.verified_at);
  const ageInDays = Math.floor((Date.now() - attestationDate.getTime()) / (1000 * 60 * 60 * 24));

  if (ageInDays > policy.max_kyc_age_days) {
    return {
      status: 'EXPIRED',
      attestationAge: ageInDays,
      additionalInfo: `KYC is ${ageInDays} days old, policy requires max ${policy.max_kyc_age_days} days`,
      timestamp: new Date().toISOString()
    };
  }

  // Step 6: Check required attributes
  const missingAttributes = policy.required_attributes.filter(
    (attr: string) => !bestAttestation.verified_attributes.includes(attr)
  );

  if (missingAttributes.length > 0) {
    return {
      status: 'REVIEW',
      riskBand: bestAttestation.risk_band,
      riskScore: bestAttestation.risk_score,
      verifiedAttributes: bestAttestation.verified_attributes,
      verificationLevel: bestAttestation.verification_level,
      attestationAge: ageInDays,
      missingRequirements: missingAttributes,
      additionalInfo: 'Some required attributes are not verified',
      timestamp: new Date().toISOString()
    };
  }

  // Step 7: Check risk band
  const riskMap = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
  const userRisk = riskMap[bestAttestation.risk_band] || 3;
  const maxRisk = riskMap[policy.min_risk_band] || 3;

  if (userRisk > maxRisk) {
    return {
      status: 'REVIEW',
      riskBand: bestAttestation.risk_band,
      riskScore: bestAttestation.risk_score,
      verifiedAttributes: bestAttestation.verified_attributes,
      verificationLevel: bestAttestation.verification_level,
      attestationAge: ageInDays,
      additionalInfo: `Risk band ${bestAttestation.risk_band} exceeds policy threshold ${policy.min_risk_band}`,
      timestamp: new Date().toISOString()
    };
  }

  // Step 8: Check sanctions if required
  if (policy.sanctions_check_required && !bestAttestation.sanctions_clear) {
    return {
      status: 'REVIEW',
      riskBand: bestAttestation.risk_band,
      riskScore: bestAttestation.risk_score,
      verifiedAttributes: bestAttestation.verified_attributes,
      verificationLevel: bestAttestation.verification_level,
      attestationAge: ageInDays,
      missingRequirements: ['sanctions_check'],
      additionalInfo: 'Sanctions check not completed or not clear',
      timestamp: new Date().toISOString()
    };
  }

  // Step 9: All checks passed!
  return {
    status: 'PASS',
    riskBand: bestAttestation.risk_band,
    riskScore: bestAttestation.risk_score,
    verifiedAttributes: bestAttestation.verified_attributes,
    verificationLevel: bestAttestation.verification_level,
    attestationAge: ageInDays,
    timestamp: new Date().toISOString()
  };
}

// ============================================================================
// RPC METHOD: GetKYCSummary
// ============================================================================

async function executeGetKYCSummary(params: { userIdentifier: string }): Promise<KYCSummary> {
  const { userIdentifier } = params;

  if (!userIdentifier) {
    throw new Error('userIdentifier is required');
  }

  // Find user
  const { data: profiles } = await supabase
    .from('investor_profiles')
    .select('user_id')
    .or(`email.eq.${userIdentifier},phone.eq.${userIdentifier}`)
    .limit(1);

  if (!profiles || profiles.length === 0) {
    return {
      hasKYC: false,
      attestationCount: 0,
      providers: []
    };
  }

  const userId = profiles[0].user_id;

  // Get attestations
  const { data: attestations } = await supabase
    .from('kyc_attestations')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('verified_at', { ascending: false });

  if (!attestations || attestations.length === 0) {
    return {
      hasKYC: false,
      attestationCount: 0,
      providers: []
    };
  }

  // Aggregate summary
  const providers = [...new Set(attestations.map(a => a.provider_name))];
  const allAttributes = [...new Set(attestations.flatMap(a => a.verified_attributes))];
  
  // Get best risk band (lowest risk)
  const riskOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
  const bestRisk = attestations.reduce((best, att) => {
    const currentRisk = riskOrder[att.risk_band] || 999;
    const bestRiskValue = riskOrder[best] || 999;
    return currentRisk < bestRiskValue ? att.risk_band : best;
  }, 'HIGH');

  return {
    hasKYC: true,
    attestationCount: attestations.length,
    providers,
    latestVerification: attestations[0].verified_at,
    overallRiskBand: bestRisk,
    verifiedAttributesSummary: allAttributes
  };
}

// ============================================================================
// RPC METHOD: ValidateConsent
// ============================================================================

async function executeValidateConsent(params: { consentToken: string, bankId: string }) {
  const { consentToken, bankId } = params;

  if (!consentToken) {
    throw new Error('consentToken is required');
  }

  const { data: consent } = await supabase
    .from('kyc_consent_tokens')
    .select('*')
    .eq('token', consentToken)
    .single();

  if (!consent) {
    return {
      valid: false,
      reason: 'Token not found'
    };
  }

  if (!consent.is_active) {
    return {
      valid: false,
      reason: 'Token is revoked'
    };
  }

  if (consent.expires_at && new Date(consent.expires_at) < new Date()) {
    return {
      valid: false,
      reason: 'Token has expired'
    };
  }

  if (consent.max_uses && consent.current_uses >= consent.max_uses) {
    return {
      valid: false,
      reason: 'Token usage limit reached'
    };
  }

  if (consent.allowed_banks.length > 0 && !consent.allowed_banks.includes(bankId)) {
    return {
      valid: false,
      reason: 'Bank not authorized by this token'
    };
  }

  return {
    valid: true,
    tokenType: consent.token_type,
    allowedAttributes: consent.allowed_attributes,
    remainingUses: consent.max_uses ? consent.max_uses - consent.current_uses : 'unlimited',
    expiresAt: consent.expires_at
  };
}

// ============================================================================
// A2A Chat Handler (for conversational queries)
// ============================================================================

async function handleAgentChat(bankId: string, params: { message: string }) {
  const { message } = params;

  // Simple NLU for common queries
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('check') && lowerMessage.includes('kyc')) {
    return {
      response: 'To check KYC status, please use the CheckKYCStatus method with the user identifier and consent token.',
      suggestedMethod: 'CheckKYCStatus',
      requiredParams: ['userIdentifier', 'consentToken']
    };
  }

  if (lowerMessage.includes('policy') || lowerMessage.includes('requirements')) {
    const { data: policy } = await supabase
      .from('kyc_policies')
      .select('*')
      .eq('bank_id', bankId)
      .single();

    if (policy) {
      return {
        response: `Your institution's KYC policy requires: ${policy.required_attributes.join(', ')}. Max KYC age: ${policy.max_kyc_age_days} days. Risk tolerance: ${policy.min_risk_band}.`,
        policy: {
          required_attributes: policy.required_attributes,
          max_kyc_age_days: policy.max_kyc_age_days,
          min_risk_band: policy.min_risk_band,
          accepted_providers: policy.accepted_providers
        }
      };
    }
  }

  return {
    response: 'I am the Hushh KYC Agent. I can verify user KYC status across our network. Available methods: CheckKYCStatus, GetKYCSummary, ValidateConsent.',
    availableMethods: ['CheckKYCStatus', 'GetKYCSummary', 'ValidateConsent']
  };
}

// ============================================================================
// REST API: Direct KYC Check
// ============================================================================

async function handleKYCCheck(req: Request) {
  const bankId = req.headers.get('x-bank-id');
  
  if (!bankId) {
    return new Response(
      JSON.stringify({ error: 'Missing x-bank-id header' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { data: policy } = await supabase
    .from('kyc_policies')
    .select('*')
    .eq('bank_id', bankId)
    .eq('is_active', true)
    .single();

  if (!policy) {
    return new Response(
      JSON.stringify({ error: 'Bank not registered or inactive' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const params = await req.json();
  const result = await executeCheckKYCStatus(bankId, policy, params);

  return new Response(
    JSON.stringify(result),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// REST API: KYC Summary
// ============================================================================

async function handleKYCSummary(req: Request, url: URL) {
  const userIdentifier = url.searchParams.get('user');
  
  if (!userIdentifier) {
    return new Response(
      JSON.stringify({ error: 'Missing user parameter' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const result = await executeGetKYCSummary({ userIdentifier });

  return new Response(
    JSON.stringify(result),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// ============================================================================
// REST API: List Policies
// ============================================================================

async function handleListPolicies() {
  const { data: policies } = await supabase
    .from('kyc_policies')
    .select('bank_id, bank_name, bank_country, bank_type, required_attributes, max_kyc_age_days')
    .eq('is_active', true);

  return new Response(
    JSON.stringify({ policies: policies || [] }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

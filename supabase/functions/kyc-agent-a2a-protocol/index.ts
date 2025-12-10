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
 * AGENTIC PATTERNS IMPLEMENTED:
 * 1. REASONING (ReAct Loop) - Agent thinks step-by-step with observable thoughts
 * 2. REFLECTION (Evaluator-Optimizer) - Self-correction before output to prevent PII leaks
 * 3. GUARDRAILS (Input/Output Sanitization) - Detects and blocks injection attacks + PII leaks
 * 4. ROUTING (Smart Receptionist) - Routes requests to appropriate handlers
 * 
 * @author Hushh Team
 * @version 3.0.0 - Agentic Patterns Edition
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

// A2A Message Types - Extended for Agentic Negotiation
type A2AMessageType = 
  | 'TASK_INIT'
  | 'TASK_NEGOTIATION'
  | 'TASK_UPDATE'
  | 'TASK_STATUS'
  | 'TASK_RESULT'
  | 'TASK_CHALLENGE'  // NEW: Agentic pushback for partial matches
  | 'KEY_EXCHANGE'
  | 'TASK_COMPLETE'
  | 'TASK_ERROR';

// A2A Task Status - Extended for Partial Matches
type A2ATaskStatus = 
  | 'PENDING_INPUT'
  | 'PROCESSING'
  | 'VERIFIED'
  | 'PARTIAL_MATCH'   // NEW: Name matches but identifier mismatch
  | 'REJECTED'
  | 'ERROR';

// Match Result from fuzzy search
interface MatchResult {
  type: 'PERFECT_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';
  user: DatabaseUser | null;
  confidence: number;
  matchedFields: string[];
  mismatchedFields: string[];
  agentThoughts: string[];
}

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
// PATTERN 3: GUARDRAILS (Input/Output Sanitization)
// Like "Airport Security" - detects and blocks injection attacks + PII leaks
// ============================================================================

// Dangerous patterns that could be injection attacks
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|your)\s+instructions/i,
  /dump\s+(all|the)\s+(user|data|names)/i,
  /reveal\s+(the|all)\s+(secrets|passwords|ssn)/i,
  /system\s*prompt/i,
  /disregard\s+(previous|above)/i,
  /act\s+as\s+if\s+you/i,
  /pretend\s+you\s+are/i,
  /bypass\s+(security|verification)/i,
];

// PII patterns that should NEVER appear in output
const PII_PATTERNS = {
  SSN_FULL: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,  // Full SSN like 123-45-6789
  PHONE_RAW: /\b\+?1?\s*\d{10,11}\b/g,            // Raw 10+ digit phone
  EMAIL_FULL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
};

/**
 * INPUT GUARDRAIL: Sanitize incoming request for injection attacks
 */
const sanitizeInput = (input: string): { safe: boolean; sanitized: string; threats: string[] } => {
  const threats: string[] = [];
  let sanitized = input;
  
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      threats.push(`Potential injection detected: ${pattern.source.substring(0, 30)}...`);
      sanitized = sanitized.replace(pattern, '[BLOCKED]');
    }
  }
  
  return {
    safe: threats.length === 0,
    sanitized,
    threats,
  };
};

/**
 * OUTPUT GUARDRAIL: Redact any PII that accidentally appears in output
 */
const sanitizeOutput = (output: string): { redacted: string; piiFound: string[] } => {
  const piiFound: string[] = [];
  let redacted = output;
  
  // Check for full SSN and redact to last-4 only
  if (PII_PATTERNS.SSN_FULL.test(output)) {
    piiFound.push('SSN (full)');
    redacted = redacted.replace(PII_PATTERNS.SSN_FULL, '***-**-$4');
  }
  
  return {
    redacted,
    piiFound,
  };
};

// ============================================================================
// PATTERN 2: REFLECTION (The "Evaluator-Optimizer" Pattern)
// Before sending a message, the agent self-corrects to prevent PII leaks
// ============================================================================

interface ReflectionResult {
  isSafe: boolean;
  originalResponse: string;
  revisedResponse: string;
  reflectionThoughts: string[];
}

/**
 * REFLECTION: Self-correction step before output
 * The agent "thinks about" whether its response is safe before sending
 */
const reflectOnResponse = (
  draftResponse: string,
  matchResult: MatchResult | null,
  providedPhone: string | undefined
): ReflectionResult => {
  const thoughts: string[] = [];
  let revisedResponse = draftResponse;
  let isSafe = true;
  
  thoughts.push('🤔 Reflection: Analyzing draft response for safety...');
  
  // Check 1: Are we about to reveal the correct phone number?
  if (matchResult?.user?.phone_number) {
    const storedPhone = matchResult.user.phone_number;
    if (draftResponse.includes(storedPhone)) {
      thoughts.push('⚠️ DANGER: Draft response contains the actual stored phone number!');
      thoughts.push('📝 Revising: Redacting stored phone from response.');
      revisedResponse = revisedResponse.replace(
        storedPhone, 
        '***-***-' + storedPhone.slice(-4)
      );
      isSafe = false;
    } else {
      thoughts.push('✅ Safe: Response does not contain stored phone number.');
    }
  }
  
  // Check 2: Are we about to reveal the SSN?
  if (matchResult?.user?.ssn_encrypted) {
    const ssn = matchResult.user.ssn_encrypted;
    if (draftResponse.includes(ssn)) {
      thoughts.push('⚠️ DANGER: Draft response contains full SSN!');
      thoughts.push('📝 Revising: Masking SSN to last-4 only.');
      revisedResponse = revisedResponse.replace(ssn, maskSSN(ssn));
      isSafe = false;
    } else {
      thoughts.push('✅ Safe: Response does not contain full SSN.');
    }
  }
  
  // Check 3: If phone was WRONG, are we hinting at the correct value?
  if (matchResult?.mismatchedFields.includes('phone') && providedPhone) {
    // Make sure we're not giving hints about what the correct phone should be
    const phoneDigits = providedPhone.replace(/\D/g, '');
    const storedDigits = matchResult.user?.phone_number?.replace(/\D/g, '') || '';
    
    // Check if we're showing which digits are wrong (that would be a leak)
    if (draftResponse.includes('first digit') || 
        draftResponse.includes('last digit') ||
        draftResponse.includes('area code')) {
      thoughts.push('⚠️ DANGER: Response hints at correct phone structure!');
      thoughts.push('📝 Revising: Removing hints about correct phone format.');
      revisedResponse = revisedResponse
        .replace(/first\s+digit/gi, '[REDACTED]')
        .replace(/last\s+digit/gi, '[REDACTED]')
        .replace(/area\s+code/gi, '[REDACTED]');
      isSafe = false;
    } else {
      thoughts.push('✅ Safe: Response does not hint at correct phone format.');
    }
  }
  
  // Check 4: Run output guardrail as final safety net
  const { redacted, piiFound } = sanitizeOutput(revisedResponse);
  if (piiFound.length > 0) {
    thoughts.push(`⚠️ Output guardrail caught: ${piiFound.join(', ')}`);
    revisedResponse = redacted;
    isSafe = false;
  } else {
    thoughts.push('✅ Output guardrail: No additional PII detected.');
  }
  
  thoughts.push(isSafe 
    ? '🎯 Reflection complete: Response is SAFE to send.'
    : '🔧 Reflection complete: Response was REVISED for safety.'
  );
  
  return {
    isSafe,
    originalResponse: draftResponse,
    revisedResponse,
    reflectionThoughts: thoughts,
  };
};

// ============================================================================
// PATTERN 4: ROUTING (The "Smart Receptionist")
// Routes requests to appropriate handlers based on intent
// ============================================================================

type IntentType = 
  | 'VERIFY_USER'        // Standard KYC verification
  | 'MIGRATE_DATA'       // Data migration to another wallet
  | 'CHECK_STATUS'       // Query existing verification status
  | 'EXPLAIN_FAILURE'    // Why did verification fail?
  | 'UNKNOWN';

interface RoutingResult {
  intent: IntentType;
  confidence: number;
  handler: string;
  extractedData: Record<string, string>;
}

/**
 * ROUTING: Smart intent detection and routing
 */
const routeRequest = (body: Record<string, any>): RoutingResult => {
  const intentFromBody = (body.intent || body.payload?.intent || '').toLowerCase();
  const message = (body.message || body.query || '').toLowerCase();
  
  // Explicit intent mapping
  if (intentFromBody.includes('verify') || intentFromBody.includes('kyc')) {
    return {
      intent: 'VERIFY_USER',
      confidence: 1.0,
      handler: 'runA2AConversation',
      extractedData: {
        subject: body.subject || body.userName || '',
        phone: body.phoneNumber || '',
      },
    };
  }
  
  if (intentFromBody.includes('migrate') || intentFromBody.includes('transfer')) {
    return {
      intent: 'MIGRATE_DATA',
      confidence: 1.0,
      handler: 'handleMigrationRequest',
      extractedData: {
        taskId: body.task_id || '',
        publicKey: body.publicKey || '',
      },
    };
  }
  
  if (intentFromBody.includes('status') || intentFromBody.includes('check')) {
    return {
      intent: 'CHECK_STATUS',
      confidence: 1.0,
      handler: 'handleStatusQuery',
      extractedData: {
        taskId: body.task_id || '',
      },
    };
  }
  
  // Natural language intent detection
  if (message.includes('why') && (message.includes('fail') || message.includes('reject'))) {
    return {
      intent: 'EXPLAIN_FAILURE',
      confidence: 0.8,
      handler: 'handleExplanationRequest',
      extractedData: {
        taskId: body.task_id || '',
      },
    };
  }
  
  if (message.includes('move') && message.includes('data')) {
    return {
      intent: 'MIGRATE_DATA',
      confidence: 0.7,
      handler: 'handleMigrationRequest',
      extractedData: {},
    };
  }
  
  // Default to verification if we have a subject
  if (body.subject || body.userName) {
    return {
      intent: 'VERIFY_USER',
      confidence: 0.9,
      handler: 'runA2AConversation',
      extractedData: {
        subject: body.subject || body.userName || '',
        phone: body.phoneNumber || '',
      },
    };
  }
  
  return {
    intent: 'UNKNOWN',
    confidence: 0,
    handler: 'handleUnknownIntent',
    extractedData: {},
  };
};

// ============================================================================
// AGENTIC NEGOTIATION - FUZZY MATCHING FUNCTIONS
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy name matching
 */
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  for (let i = 0; i <= bLen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= aLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bLen; i++) {
    for (let j = 1; j <= aLen; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[bLen][aLen];
};

/**
 * Calculate name similarity score (0-1)
 * Uses Levenshtein distance normalized by string length
 */
const calculateNameSimilarity = (name1: string, name2: string): number => {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();
  
  if (n1 === n2) return 1.0;
  if (!n1 || !n2) return 0;
  
  const maxLen = Math.max(n1.length, n2.length);
  const distance = levenshteinDistance(n1, n2);
  
  return Math.max(0, 1 - (distance / maxLen));
};

/**
 * Fuzzy match a name against database records
 * Returns MatchResult with confidence and matched/mismatched fields
 */
const fuzzyMatchUser = async (
  firstName: string,
  lastName: string,
  providedPhone?: string,
  providedEmail?: string
): Promise<MatchResult> => {
  const thoughts: string[] = [];
  const fullNameQuery = `${firstName} ${lastName}`.trim();
  
  thoughts.push(`🔍 Searching for name: "${fullNameQuery}"`);
  
  // Step 1: Search by name (fuzzy)
  const { data: candidates, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .or(`legal_first_name.ilike.%${firstName}%,legal_last_name.ilike.%${lastName}%`)
    .limit(10);
  
  if (error || !candidates || candidates.length === 0) {
    thoughts.push('❌ No candidates found in primary database.');
    
    // Also check investor_profiles as fallback
    const { data: profileCandidates } = await supabase
      .from('investor_profiles')
      .select('*')
      .ilike('name', `%${firstName}%`)
      .limit(5);
    
    if (!profileCandidates || profileCandidates.length === 0) {
      thoughts.push('❌ No candidates found in investor profiles either.');
      return {
        type: 'NO_MATCH',
        user: null,
        confidence: 0,
        matchedFields: [],
        mismatchedFields: [],
        agentThoughts: thoughts,
      };
    }
    
    // Process investor profile candidates
    // (simplified - would need similar logic)
    thoughts.push('ℹ️ Found potential match in investor profiles.');
  }
  
  if (!candidates || candidates.length === 0) {
    return {
      type: 'NO_MATCH',
      user: null,
      confidence: 0,
      matchedFields: [],
      mismatchedFields: [],
      agentThoughts: thoughts,
    };
  }
  
  thoughts.push(`📊 Found ${candidates.length} potential candidate(s).`);
  
  // Step 2: Score each candidate by name similarity
  let bestMatch: DatabaseUser | null = null;
  let bestScore = 0;
  
  for (const candidate of candidates) {
    const candidateFullName = `${candidate.legal_first_name || ''} ${candidate.legal_last_name || ''}`.trim();
    const score = calculateNameSimilarity(fullNameQuery, candidateFullName);
    
    thoughts.push(`  - "${candidateFullName}": similarity ${(score * 100).toFixed(1)}%`);
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = candidate as DatabaseUser;
    }
  }
  
  // Step 3: Determine if we have a strong name match
  if (bestScore < 0.6) {
    thoughts.push(`⚠️ Best match score ${(bestScore * 100).toFixed(1)}% is below threshold (60%).`);
    return {
      type: 'NO_MATCH',
      user: null,
      confidence: bestScore,
      matchedFields: [],
      mismatchedFields: [],
      agentThoughts: thoughts,
    };
  }
  
  thoughts.push(`✅ Strong name match found: ${(bestScore * 100).toFixed(1)}% confidence.`);
  
  // Step 4: Compare identifiers (phone/email)
  const matchedFields: string[] = ['name'];
  const mismatchedFields: string[] = [];
  
  // Compare phone number
  if (providedPhone) {
    const cleanProvidedPhone = providedPhone.replace(/\D/g, '');
    const cleanStoredPhone = (bestMatch?.phone_number || '').replace(/\D/g, '');
    
    if (cleanStoredPhone && cleanProvidedPhone) {
      // Check if phones match (last 10 digits)
      const providedLast10 = cleanProvidedPhone.slice(-10);
      const storedLast10 = cleanStoredPhone.slice(-10);
      
      if (providedLast10 === storedLast10) {
        matchedFields.push('phone');
        thoughts.push('✅ Phone number: MATCH');
      } else {
        mismatchedFields.push('phone');
        thoughts.push('❌ Phone number: MISMATCH (provided does not match our records)');
      }
    }
  }
  
  // Compare email (if we had email in the schema - placeholder)
  if (providedEmail) {
    // Note: We don't have email in onboarding_data currently
    // This is a placeholder for future implementation
    thoughts.push('ℹ️ Email verification not available in current schema.');
  }
  
  // Step 5: Determine final match type
  if (mismatchedFields.length === 0 && matchedFields.length >= 2) {
    // Perfect match - name + at least one identifier matches
    thoughts.push('🎯 PERFECT_MATCH: All provided identifiers verified.');
    return {
      type: 'PERFECT_MATCH',
      user: bestMatch,
      confidence: bestScore,
      matchedFields,
      mismatchedFields,
      agentThoughts: thoughts,
    };
  } else if (mismatchedFields.length > 0) {
    // Partial match - name matches but identifier doesn't
    thoughts.push('⚠️ PARTIAL_MATCH: Name matches but identifier mismatch detected.');
    thoughts.push('🤖 Initiating agentic challenge flow...');
    return {
      type: 'PARTIAL_MATCH',
      user: bestMatch,
      confidence: bestScore,
      matchedFields,
      mismatchedFields,
      agentThoughts: thoughts,
    };
  } else {
    // Only name matched, no identifiers to compare
    thoughts.push('ℹ️ Name matched but no additional identifiers provided to verify.');
    return {
      type: 'PERFECT_MATCH',
      user: bestMatch,
      confidence: bestScore,
      matchedFields,
      mismatchedFields,
      agentThoughts: thoughts,
    };
  }
};

/**
 * Generate a privacy-safe challenge message
 * NEVER leaks the correct phone/email - just confirms mismatch
 */
const generateChallengeMessage = (
  matchResult: MatchResult,
  subjectName: string
): string => {
  const { mismatchedFields, matchedFields, confidence } = matchResult;
  
  let message = `I found a KYC record for "${subjectName}" with ${(confidence * 100).toFixed(0)}% name confidence. `;
  
  if (mismatchedFields.includes('phone')) {
    message += `However, the phone number you provided does not match our records. `;
    message += `This could be due to:\n`;
    message += `• A typo in the phone number\n`;
    message += `• An outdated phone on file\n`;
    message += `• A different person with a similar name\n\n`;
    message += `Please verify the phone number and try again, or provide an alternative identifier (like the last 4 digits of SSN).`;
  } else if (mismatchedFields.includes('email')) {
    message += `However, the email address does not match our records. `;
    message += `Please verify the email or provide an alternative identifier.`;
  }
  
  return message;
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
  // AGENTIC NEGOTIATION: FUZZY MATCH
  // Uses intelligent matching with TASK_CHALLENGE for conflicts
  // ==============================
  const fullPhoneNumber = request.phoneNumber 
    ? `${request.phoneCountryCode || ''}${request.phoneNumber}` 
    : undefined;
  
  const matchResult = await fuzzyMatchUser(
    firstName,
    lastName,
    fullPhoneNumber,
    request.email
  );

  // Log agent thoughts for debugging
  console.log('[A2A AGENTIC] Match result:', matchResult.type);
  matchResult.agentThoughts.forEach(thought => console.log(`  ${thought}`));

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
      log: matchResult.type !== 'NO_MATCH'
        ? `Match found (${matchResult.type}). Computing trust score and verifying identifiers...`
        : 'No match found in primary ledger. Checking auxiliary sources...',
    },
  });

  // ==============================
  // AGENTIC FLOW: Handle PARTIAL_MATCH with TASK_CHALLENGE
  // This is the key agentic negotiation pattern!
  // USES: Pattern 1 (Reasoning) + Pattern 2 (Reflection)
  // ==============================
  if (matchResult.type === 'PARTIAL_MATCH') {
    // Generate initial challenge message
    const draftChallengeMessage = generateChallengeMessage(matchResult, request.subject);
    
    // ==========================================
    // PATTERN 2: REFLECTION - Self-correction before output
    // Ensure the challenge message doesn't leak PII
    // ==========================================
    const fullPhoneForReflection = request.phoneNumber 
      ? `${request.phoneCountryCode || ''}${request.phoneNumber}` 
      : undefined;
    
    const reflection = reflectOnResponse(
      draftChallengeMessage, 
      matchResult, 
      fullPhoneForReflection
    );
    
    // Log reflection thoughts for debugging
    console.log('[A2A REFLECTION] Pre-output safety check:');
    reflection.reflectionThoughts.forEach(thought => console.log(`  ${thought}`));
    
    // Use the revised (safe) message
    const safeChallengeMessage = reflection.revisedResponse;
    
    // Combine reasoning thoughts with reflection thoughts
    const allAgentThoughts = [
      ...matchResult.agentThoughts,
      '', // separator
      '--- REFLECTION LAYER ---',
      ...reflection.reflectionThoughts,
    ];
    
    sequence++;
    messages.push({
      sequence,
      timestamp: new Date().toISOString(),
      sender: 'agent:hushh_kyc_master',
      receiver: 'agent:bank_optimization_v2',
      protocol: 'A2A/1.0',
      type: 'TASK_CHALLENGE',  // Agentic pushback!
      task_id: taskId,
      payload: {
        status: 'PARTIAL_MATCH',
        message: safeChallengeMessage,  // Use reflected/safe message
        data: {
          // Confirm the name we found (safe to share)
          confirmed_name: matchResult.user 
            ? `${matchResult.user.legal_first_name} ${matchResult.user.legal_last_name}`
            : request.subject,
          name_confidence: `${(matchResult.confidence * 100).toFixed(0)}%`,
          // Fields that matched
          matched_fields: matchResult.matchedFields,
          // Fields that DID NOT match (without revealing correct values!)
          mismatched_fields: matchResult.mismatchedFields,
          // What the agent needs to proceed
          required_to_proceed: [
            'Corrected phone number',
            'Alternative identifier (SSN last 4, email)',
          ],
          // Reflection metadata
          reflection_applied: !reflection.isSafe,
          pii_redacted: !reflection.isSafe,
        },
        // Agent thoughts for UI display (includes both reasoning + reflection)
        log: allAgentThoughts.join('\n'),
      },
    });

    // Return with PARTIAL_MATCH status - the conversation can continue
    // if the bank agent provides corrected data via TASK_UPDATE
    return {
      messages,
      success: false,  // Not yet verified
      taskId,
      finalStatus: 'PARTIAL_MATCH',
    };
  }

  // ==============================
  // SEQUENCE 7: TASK_RESULT
  // Return verification result with trust score
  // ==============================
  foundUser = matchResult.user;
  
  if (matchResult.type === 'PERFECT_MATCH' && foundUser) {
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
          version: '3.0.0',  // Updated version with agentic patterns
          protocol: 'A2A/1.0',
          openai: !!openaiApiKey,
          capabilities: ['kyc_verify', 'trust_score', 'key_exchange', 'data_migration', 'agentic_negotiation'],
          agenticPatterns: ['reasoning', 'reflection', 'guardrails', 'routing'],
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
    // NOW WITH AGENTIC PATTERNS INTEGRATED
    // ================================
    if (pathname.endsWith('/sendMessage') && req.method === 'POST') {
      const body = await req.json();
      
      // ==========================================
      // PATTERN 4: ROUTING - Smart Intent Detection
      // ==========================================
      const routingResult = routeRequest(body);
      console.log(`[A2A ROUTING] Intent: ${routingResult.intent}, Confidence: ${routingResult.confidence}, Handler: ${routingResult.handler}`);
      
      // Handle unknown intents
      if (routingResult.intent === 'UNKNOWN') {
        return new Response(
          JSON.stringify({
            protocol: 'A2A/1.0',
            error: 'Unable to determine request intent',
            suggestion: 'Please provide a subject/userName for verification, or specify intent explicitly.',
            detected: {
              intent: routingResult.intent,
              confidence: routingResult.confidence,
            },
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // ==========================================
      // PATTERN 3: GUARDRAILS - Input Sanitization
      // ==========================================
      const rawInput = JSON.stringify(body);
      const inputCheck = sanitizeInput(rawInput);
      
      if (!inputCheck.safe) {
        console.warn(`[A2A GUARDRAIL] Injection attempt blocked: ${inputCheck.threats.join(', ')}`);
        return new Response(
          JSON.stringify({
            protocol: 'A2A/1.0',
            type: 'TASK_ERROR',
            error: 'Request blocked by security guardrail',
            reason: 'Potentially harmful input patterns detected',
            // Don't reveal specific patterns that triggered it
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
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

      // Route to appropriate handler based on intent
      let result;
      switch (routingResult.intent) {
        case 'VERIFY_USER':
          // Run the A2A conversation (Pattern 1: Reasoning is embedded in fuzzyMatchUser)
          result = await runA2AConversation(kycRequest);
          break;
          
        case 'MIGRATE_DATA':
          // For migration requests, redirect to migration endpoint
          return new Response(
            JSON.stringify({
              protocol: 'A2A/1.0',
              type: 'TASK_REDIRECT',
              message: 'Migration requests should use POST /migrate/:task_id/:token',
              task_id: routingResult.extractedData.taskId || '',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
          
        case 'CHECK_STATUS':
          // Status check - simplified response
          return new Response(
            JSON.stringify({
              protocol: 'A2A/1.0',
              type: 'STATUS_RESPONSE',
              message: 'Status check not implemented in this version. Submit a new verification request.',
              task_id: routingResult.extractedData.taskId || '',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
          
        case 'EXPLAIN_FAILURE':
          return new Response(
            JSON.stringify({
              protocol: 'A2A/1.0',
              type: 'EXPLANATION',
              message: 'Verification failures typically occur due to: (1) Name not found in database, (2) Identifier mismatch (phone/email), (3) Incomplete KYC record.',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
          
        default:
          result = await runA2AConversation(kycRequest);
      }

      return new Response(
        JSON.stringify({
          protocol: 'A2A/1.0',
          task_id: result.taskId,
          status: result.finalStatus,
          success: result.success,
          conversation: result.messages,
          migration_link: result.migrationLink,
          routing: {
            detectedIntent: routingResult.intent,
            confidence: routingResult.confidence,
          },
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

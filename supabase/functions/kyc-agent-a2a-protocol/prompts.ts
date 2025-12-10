// supabase/functions/kyc-agent-a2a-protocol/prompts.ts
// Production-ready System Prompt for the Hushh KYC Agent
// Implements "Solid Agentic Negotiation" pattern for intelligent conflict resolution

export const HUSHH_KYC_AGENT_SYSTEM_PROMPT = `
You are the **Hushh KYC Agent** — a compliance-grade, intelligent KYC verification agent.

Your mandate:
- Negotiate purpose and scope with the Verifier Agent
- Run a multi-step KYC pipeline
- Compute a trust score and risk band
- Apply strict data minimization and consent rules
- Return a safe KYC summary and optional migration payload

You participate in an A2A (Agent-to-Agent) protocol. The core A2A pair is:
- **VerifierAgent** (external requesting agent)
- **HushhKycAgent** (you - the identity verification agent)

On each turn you will receive:
1) An inbound A2A message from the VerifierAgent
2) Server-provided context (requester metadata, user record, consent policy, verification flags)
3) The current conversation/task state

You must produce **exactly one** outbound A2A message as strict JSON (no markdown, no extra text).

-------------------------
6-PHASE STATE MACHINE
-------------------------
You operate through these phases in order:

PHASE 0 - HANDSHAKE:
- Validate verifier identity and trust level
- Confirm purpose (kyc_verification or kyc_plus_migration)
- Agree on scope and allowed fields
- Status: "INIT" → "HANDSHAKE"

PHASE 1 - SUBJECT IDENTIFICATION:
- Look up user by provided identifiers (phone, email, name)
- If multiple candidates, request additional identifiers
- If unique match found, proceed
- Status: "HANDSHAKE" → "SUBJECT_IDENTIFICATION"

PHASE 2 - KYC CHECKS PIPELINE:
Run these checks in order:
a) Identity Consistency Check - name ↔ phone ↔ email ↔ address
b) Sanctions & PEP Check - verify no hits in sanctions lists
c) Document/ID Check - verify government ID if available
d) Behavioral Risk Check - fraud flags, chargeback history
e) Data Recency Check - penalize stale KYC (>2 years old)
- Status: "SUBJECT_IDENTIFICATION" → "RUNNING_CHECKS"

PHASE 3 - TRUST SCORE CALCULATION:
Apply deterministic scoring formula (see TRUST SCORE section)
- Status: "RUNNING_CHECKS" → "READY_TO_DECIDE"

PHASE 4 - DATA RELEASE:
- Apply data minimization rules
- Only share allowed fields per consent + policy
- Block sensitive fields (full SSN, raw documents)
- Status: "READY_TO_DECIDE" → "DONE" (or "READY_TO_MIGRATE")

PHASE 5 - DATA MIGRATION (Optional):
- Only if purpose = "kyc_plus_migration"
- Only if trust_score >= 70
- Prepare migration payload with schema mapping
- Status: "READY_TO_MIGRATE" → "DONE"

ERROR/BLOCKED:
- If critical issues: sanctions hit, consent denied, etc.
- Status: "BLOCKED" or "ERROR"

-------------------------
CORE PRINCIPLES (NON-NEGOTIABLE)
-------------------------
1) DATA MINIMIZATION:
   - Share the least amount of data needed to satisfy the requester's intent
   - Prefer derived proofs (e.g., "over-18 proof") or masked variants (e.g., SSN last4)

2) CONSENT & POLICY FIRST:
   - If consent is missing/invalid: do NOT share data
   - Only share fields explicitly allowed by policy for the requester + purpose + jurisdiction

3) NO FABRICATION:
   - Never invent user data. Only use values present in the provided context
   - If a field is missing, say it is missing and offer alternatives

4) SENSITIVE DATA SAFETY:
   - Never output full SSN, full document numbers, private keys, or raw secrets
   - For SSN: only output masked forms (***-**-6789) or last4

5) UI-SAFE THOUGHTS:
   - Your ui_thought must NOT include raw PII
   - Keep thoughts brief and human-readable

-------------------------
DETERMINISTIC TRUST SCORE FORMULA
-------------------------
Compute trust_score (0-100) as:

score = 0
+ 30 * identity_match_factor
+ 25 * sanctions_factor
+ 15 * document_factor
+ 15 * recency_factor
+ 15 * behavior_factor

Where:
- identity_match_factor:
  - 1.0 = strong match on phone + email + name
  - 0.7 = phone + partial name match
  - 0.4 = single weak identifier only

- sanctions_factor:
  - 1.0 = no sanctions/PEP hits
  - 0.0 = any confirmed hit → auto CRITICAL + BLOCKED

- document_factor:
  - 1.0 = verified government ID with high confidence
  - 0.5 = partial document verification
  - 0.0 = no document checks available

- recency_factor:
  - 1.0 = KYC < 1 year old
  - 0.7 = 1-3 years old
  - 0.3 = older than 3 years

- behavior_factor:
  - 1.0 = no fraud/chargeback history
  - 0.5 = minor issues
  - 0.0 = confirmed fraud → negative penalty

Risk bands (from score):
- 80-100 → LOW (green)
- 60-79 → MEDIUM (yellow)
- 40-59 → HIGH (orange)
- 0-39 → CRITICAL (red)

Always produce 3-5 "reasons" explaining the score.

-------------------------
OUTPUT FORMAT (STRICT JSON ONLY)
-------------------------
Return JSON with this exact structure:

{
  "ui_thought": string,              // Short, human-readable, for AgentThoughtLog (no PII!)
  "action": "REQUEST_MORE_DATA" | "RUN_PIPELINE_STEP" | "RETURN_RESULT" | "RETURN_ERROR",
  "next_status": "INIT" | "HANDSHAKE" | "SUBJECT_IDENTIFICATION" | "RUNNING_CHECKS" | "READY_TO_DECIDE" | "READY_TO_MIGRATE" | "DONE" | "BLOCKED" | "ERROR",
  "updated_state": {
    "progress_pct": number,          // 0-100
    "trust_score": number,           // 0-100
    "risk_band": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "reasons": string[],             // 3-5 bullet points
    "unlocked_fields": string[],     // fields now available
    "verified_fields": string[],     // fields verified
    "protected_fields": string[]     // fields blocked
  },
  "a2a_message": {
    "id": string,
    "task_id": string,
    "timestamp": string,             // ISO-8601
    "sender": "HushhKycAgent",
    "receiver": string,              // VerifierAgent name
    "type": "HANDSHAKE" | "KYC_REQUEST" | "KYC_PROGRESS" | "KYC_RESULT" | "MIGRATION_REQUEST" | "MIGRATION_RESULT" | "CHALLENGE" | "ERROR",
    "payload": {
      "status": string,
      "kyc_status": "VERIFIED" | "PARTIAL_MATCH" | "FAILED" | "REVIEW_REQUIRED" | null,
      "trust_score": number | null,
      "risk_band": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | null,
      "allowed_fields_returned": string[],
      "data": object,                // Only safe, allowed fields
      "explanation": string[],       // Human-readable reasons
      "challenge_request": {
        "required_identifiers": string[],
        "reason": string
      } | null,
      "migration_payload": {
        "target_schema": object,
        "data": object,
        "checksum": string
      } | null
    }
  }
}

Rules:
- Output must be valid JSON only
- No markdown, no extra text
- Never include full SSN or sensitive data in any field
- ui_thought must not contain PII

-------------------------
HUMAN-LIKE CONVERSATION STYLE
-------------------------
Make your messages feel like a helpful KYC officer:

Phase 0 (Handshake):
"I can perform KYC verification for this subject. I'll only return [fields] as per our data sharing agreement."

Phase 1 (Identification):
"I found a potential match in our system. Let me run verification checks."
OR "I found 2 possible matches. Do you have a secondary identifier like email or date of birth?"

Phase 2 (Checks):
"Running identity consistency checks... All clear."
"Checking sanctions and PEP lists... No hits found."
"Verifying document records... Government ID confirmed."

Phase 3 (Result):
"KYC verified with LOW risk. Trust score: 87%. Ready to share the summary."

Phase 5 (Migration):
"I've prepared a migration payload with 12 fields, excluding raw SSN and documents."

-------------------------
CONTEXT YOU MAY RECEIVE
-------------------------
context.task: { task_id, purpose, requested_fields }
context.requester: { id, name, trust_score, public_key?, jurisdiction }
context.user: { found, consent, data, verification }
context.state: { status, progress_pct, last_action }

Now produce the next outbound message for the current turn.
`;

// Keep old name as alias for backward compatibility
export const HUSHH_IDENTITY_ORACLE_SYSTEM_PROMPT = HUSHH_KYC_AGENT_SYSTEM_PROMPT;

// ============================================================================
// TYPES
// ============================================================================

// A2A Message Types
export type A2AMessageType = 
  | 'HANDSHAKE' 
  | 'KYC_REQUEST' 
  | 'KYC_PROGRESS' 
  | 'KYC_RESULT' 
  | 'MIGRATION_REQUEST' 
  | 'MIGRATION_RESULT' 
  | 'CHALLENGE' 
  | 'ERROR';

// Conversation Status
export type KycStatus = 
  | 'INIT' 
  | 'HANDSHAKE' 
  | 'SUBJECT_IDENTIFICATION' 
  | 'RUNNING_CHECKS' 
  | 'READY_TO_DECIDE' 
  | 'READY_TO_MIGRATE' 
  | 'DONE' 
  | 'BLOCKED' 
  | 'ERROR';

// Risk Bands
export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// KYC Decision Status
export type KycDecisionStatus = 'VERIFIED' | 'PARTIAL_MATCH' | 'FAILED' | 'REVIEW_REQUIRED';

// Agent Actions
export type AgentAction = 'REQUEST_MORE_DATA' | 'RUN_PIPELINE_STEP' | 'RETURN_RESULT' | 'RETURN_ERROR';

// ============================================================================
// KYC CONVERSATION STATE (The "Brain")
// ============================================================================

export interface KycSubject {
  external_reference_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  phone_country_code?: string;
  country?: string;
  ssn_last4?: string;
  dob?: string;
}

export interface KycRequest {
  purpose: 'kyc_verification' | 'kyc_plus_migration';
  requested_fields: string[];
  verifier_agent_id: string;
  jurisdiction: string;
}

export interface KycPolicy {
  consent_scopes: string[];
  allowed_fields: string[];
  migration_allowed: boolean;
}

export interface EvidenceItem {
  source: string;
  type: 'identity' | 'sanctions' | 'document' | 'behavior' | 'recency';
  confidence: number;
  value: string;
  timestamp: string;
}

export interface TrustInfo {
  score: number;
  band: RiskBand;
  reasons: string[];
}

export interface KycConversationState {
  // Who is being verified
  subject: KycSubject;

  // What the external agent wants
  request: KycRequest;

  // Policy & consent boundaries
  policy: KycPolicy;

  // Evidence gathered during KYC
  evidence: EvidenceItem[];

  // Trust & risk
  trust: TrustInfo;

  // Current progress
  status: KycStatus;
  progress_pct: number;

  // Fields tracking
  unlocked_fields: string[];
  verified_fields: string[];
  protected_fields: string[];

  // Messages
  messages: A2AMessage[];
}

// ============================================================================
// A2A MESSAGE SCHEMA
// ============================================================================

export interface A2AMessagePayload {
  status?: string;
  kyc_status?: KycDecisionStatus | null;
  trust_score?: number | null;
  risk_band?: RiskBand | null;
  allowed_fields_returned?: string[];
  data?: Record<string, unknown>;
  explanation?: string[];
  challenge_request?: {
    required_identifiers: string[];
    reason: string;
  } | null;
  migration_payload?: {
    target_schema: Record<string, unknown>;
    data: Record<string, unknown>;
    checksum: string;
  } | null;
}

export interface A2AMessage {
  id: string;
  task_id: string;
  timestamp: string;
  sender: 'VerifierAgent' | 'HushhKycAgent';
  receiver: string;
  type: A2AMessageType;
  payload: A2AMessagePayload;
}

// ============================================================================
// KYC AGENT RESPONSE (From LLM)
// ============================================================================

export interface KycAgentUpdatedState {
  progress_pct: number;
  trust_score: number;
  risk_band: RiskBand;
  reasons: string[];
  unlocked_fields: string[];
  verified_fields: string[];
  protected_fields: string[];
}

export interface KycAgentResponse {
  ui_thought: string;
  action: AgentAction;
  next_status: KycStatus;
  updated_state: KycAgentUpdatedState;
  a2a_message: A2AMessage;
}

// ============================================================================
// LEGACY TYPES (For backward compatibility)
// ============================================================================

export interface OracleThoughtLog {
  thought_log: string[];
  decision_summary: string;
  redactions?: {
    withheld_fields: string[];
    reason: string;
  };
}

export interface OracleProtocolMessage {
  id: string;
  task_id: string;
  timestamp: string;
  from_agent: 'HUSHH_KYC_AGENT';
  to_agent: string;
  type: A2AMessageType;
  progress?: number;
  summary: string;
  payload: A2AMessagePayload;
}

export interface OracleNextAction {
  expect: 'NONE' | 'REQUESTER_PUBLIC_KEY' | 'REQUESTER_ACCEPT_SUBSTITUTE' | 'ADDITIONAL_USER_DATA' | 'SERVER_ENCRYPT_AND_ATTACH';
  reason: string;
}

export interface OracleResponse {
  internal: OracleThoughtLog;
  protocol_message: OracleProtocolMessage;
  next: OracleNextAction;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Build context for the LLM from conversation state
 */
export function buildKycAgentContext(params: {
  taskId: string;
  state: KycConversationState;
  inboundMessage?: A2AMessage;
}) {
  return {
    task: {
      task_id: params.taskId,
      purpose: params.state.request.purpose,
      requested_fields: params.state.request.requested_fields,
    },
    requester: {
      id: params.state.request.verifier_agent_id,
      jurisdiction: params.state.request.jurisdiction,
    },
    user: {
      found: Object.keys(params.state.subject).length > 0,
      consent: {
        allowed_fields: params.state.policy.allowed_fields,
        scopes: params.state.policy.consent_scopes,
      },
      data: params.state.subject,
    },
    state: {
      status: params.state.status,
      progress_pct: params.state.progress_pct,
      trust: params.state.trust,
      evidence_count: params.state.evidence.length,
    },
    inbound_message: params.inboundMessage,
  };
}

// Legacy alias
export function buildOracleContext(params: {
  taskId: string;
  purpose: string;
  requestedFields: string[];
  requester: {
    id: string;
    name: string;
    trustScore: number;
    publicKey?: string;
  };
  user: {
    found: boolean;
    consent: {
      allowed_fields: string[];
      tier: 'basic' | 'full' | 'enterprise';
    };
    data: Record<string, unknown>;
    verification: Record<string, boolean>;
  };
  state: {
    phase: 'INIT' | 'NEGOTIATING' | 'PROVING' | 'FINALIZING';
    lastProgress: number;
  };
}) {
  return {
    task: {
      task_id: params.taskId,
      purpose: params.purpose,
      requested_fields: params.requestedFields,
    },
    requester: {
      id: params.requester.id,
      name: params.requester.name,
      trust_score: params.requester.trustScore,
      public_key: params.requester.publicKey,
      signature_valid: true,
    },
    user: {
      found: params.user.found,
      consent: params.user.consent,
      data: params.user.data,
      verification: params.user.verification,
    },
    state: {
      phase: params.state.phase,
      last_progress: params.state.lastProgress,
    },
  };
}

/**
 * Parse and validate KYC Agent response from LLM
 */
export function parseKycAgentResponse(rawResponse: string): KycAgentResponse | null {
  try {
    let jsonStr = rawResponse.trim();
    
    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }
    
    const parsed = JSON.parse(jsonStr.trim());
    
    // Validate required fields
    if (!parsed.ui_thought || !parsed.action || !parsed.next_status || !parsed.updated_state || !parsed.a2a_message) {
      console.error('Missing required fields in KYC Agent response');
      return null;
    }
    
    return parsed as KycAgentResponse;
  } catch (error) {
    console.error('Failed to parse KYC Agent response:', error);
    return null;
  }
}

// Legacy alias
export function parseOracleResponse(rawResponse: string): OracleResponse | null {
  try {
    let jsonStr = rawResponse.trim();
    
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }
    
    const parsed = JSON.parse(jsonStr.trim());
    
    if (!parsed.internal || !parsed.protocol_message || !parsed.next) {
      console.error('Missing required top-level fields in Oracle response');
      return null;
    }
    
    return parsed as OracleResponse;
  } catch (error) {
    console.error('Failed to parse Oracle response:', error);
    return null;
  }
}

/**
 * Calculate trust score using deterministic formula
 */
export function calculateTrustScore(evidence: EvidenceItem[]): TrustInfo {
  let identityScore = 0;
  let sanctionsScore = 1.0; // Default to clear
  let documentScore = 0;
  let recencyScore = 0.7; // Default to medium recency
  let behaviorScore = 1.0; // Default to clean
  
  const reasons: string[] = [];
  
  // Calculate identity match factor
  const identityEvidence = evidence.filter(e => e.type === 'identity');
  if (identityEvidence.length >= 3) {
    identityScore = 1.0;
    reasons.push('Identity matched on multiple independent sources.');
  } else if (identityEvidence.length >= 2) {
    identityScore = 0.7;
    reasons.push('Identity partially matched on available identifiers.');
  } else if (identityEvidence.length >= 1) {
    identityScore = 0.4;
    reasons.push('Limited identity verification available.');
  } else {
    reasons.push('No identity verification performed.');
  }
  
  // Check sanctions
  const sanctionsEvidence = evidence.filter(e => e.type === 'sanctions');
  if (sanctionsEvidence.some(e => e.confidence < 0.5)) {
    sanctionsScore = 0;
    reasons.push('⚠️ Potential sanctions/PEP match detected.');
  } else if (sanctionsEvidence.length > 0) {
    reasons.push('No sanctions/PEP hits in major watchlists.');
  }
  
  // Check documents
  const documentEvidence = evidence.filter(e => e.type === 'document');
  if (documentEvidence.some(e => e.confidence >= 0.9)) {
    documentScore = 1.0;
    reasons.push('Government ID verified with high confidence.');
  } else if (documentEvidence.length > 0) {
    documentScore = 0.5;
    reasons.push('Partial document verification available.');
  }
  
  // Check recency
  const recencyEvidence = evidence.filter(e => e.type === 'recency');
  if (recencyEvidence.some(e => e.confidence >= 0.9)) {
    recencyScore = 1.0;
    reasons.push('KYC data refreshed within last 12 months.');
  } else if (recencyEvidence.some(e => e.confidence >= 0.5)) {
    recencyScore = 0.7;
    reasons.push('KYC data is 1-3 years old.');
  } else {
    recencyScore = 0.3;
    reasons.push('KYC data may be outdated.');
  }
  
  // Check behavior
  const behaviorEvidence = evidence.filter(e => e.type === 'behavior');
  if (behaviorEvidence.some(e => e.confidence < 0.3)) {
    behaviorScore = 0;
    reasons.push('⚠️ Fraud flags detected in history.');
  } else if (behaviorEvidence.length > 0) {
    reasons.push('No historical fraud or chargeback issues.');
  }
  
  // Apply formula
  const score = Math.round(
    30 * identityScore +
    25 * sanctionsScore +
    15 * documentScore +
    15 * recencyScore +
    15 * behaviorScore
  );
  
  // Determine risk band
  let band: RiskBand;
  if (score >= 80) {
    band = 'LOW';
  } else if (score >= 60) {
    band = 'MEDIUM';
  } else if (score >= 40) {
    band = 'HIGH';
  } else {
    band = 'CRITICAL';
  }
  
  return {
    score: Math.min(100, Math.max(0, score)),
    band,
    reasons: reasons.slice(0, 5),
  };
}

/**
 * Create initial KYC conversation state
 */
export function createInitialKycState(params: {
  verifierAgentId: string;
  jurisdiction: string;
  purpose: 'kyc_verification' | 'kyc_plus_migration';
  requestedFields: string[];
  subject: KycSubject;
}): KycConversationState {
  return {
    subject: params.subject,
    request: {
      purpose: params.purpose,
      requested_fields: params.requestedFields,
      verifier_agent_id: params.verifierAgentId,
      jurisdiction: params.jurisdiction,
    },
    policy: {
      consent_scopes: ['kyc'],
      allowed_fields: ['name', 'phone', 'email', 'address_city', 'kyc_status', 'risk_band'],
      migration_allowed: params.purpose === 'kyc_plus_migration',
    },
    evidence: [],
    trust: {
      score: 0,
      band: 'CRITICAL',
      reasons: [],
    },
    status: 'INIT',
    progress_pct: 0,
    unlocked_fields: [],
    verified_fields: [],
    protected_fields: ['ssn', 'ssn_full', 'document_number', 'biometric'],
    messages: [],
  };
}

/**
 * A2A Playground Types
 * 
 * Types for the Agent-to-Agent KYC Playground demo.
 * Shows two AI agents (Bank KYC Copilot + Hushh KYC Agent) collaborating.
 */

// =====================================================
// Scenario Configuration
// =====================================================

/**
 * Relying party (bank) options for demo
 */
export interface RelyingParty {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

/**
 * User identifiers to verify
 */
export interface DemoUserIdentifiers {
  fullName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  country: string;
  email?: string;
  ssnLast4?: string;  // For VerifyFieldMatch demo
}

/**
 * Scenario operation toggles
 */
export interface ScenarioOperations {
  verifyKycStatus: boolean;    // CheckKYCStatus
  confirmKeyMatch: boolean;     // VerifyFieldMatch
  exportKycProfile: boolean;    // ExportKYCProfile
}

/**
 * Complete scenario configuration
 */
export interface A2AScenarioConfig {
  relyingParty: RelyingParty;
  user: DemoUserIdentifiers;
  operations: ScenarioOperations;
}

// =====================================================
// Conversation Types
// =====================================================

/**
 * Which agent is speaking
 */
export type AgentActor = 'BANK_AGENT' | 'HUSHH_AGENT';

/**
 * Stage of the A2A conversation
 */
export type ConversationStage = 
  | 'INITIATE'           // Bank asks Hushh to verify
  | 'CHECKING'           // Hushh checking attestations
  | 'ATTESTATION_FOUND'  // Hushh found attestation
  | 'KEY_VERIFY_REQUEST' // Bank asks to verify key
  | 'KEY_VERIFY_RESULT'  // Hushh confirms key match
  | 'EXPORT_REQUEST'     // Bank requests profile export
  | 'EXPORT_PROGRESS'    // Hushh processing export
  | 'EXPORT_COMPLETE'    // Export delivered
  | 'BANK_CONFIRM'       // Bank confirms ingestion
  | 'ERROR';

/**
 * A single conversation message
 */
export interface ConversationMessage {
  id: string;
  actor: AgentActor;
  stage: ConversationStage;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  isProgress?: boolean;
  progressPercent?: number;
}

// =====================================================
// Result Types
// =====================================================

/**
 * A2A Risk Band (including CRITICAL for rejected users)
 */
export type A2ARiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * KYC decision from the A2A flow
 */
export interface A2AKycDecision {
  status: 'PASS' | 'REVIEW' | 'NOT_FOUND' | 'FAIL';
  verifiedVia: {
    providerName: string;
    providerType: 'INTERNAL' | 'BANK' | 'KYC_VENDOR';
    lastVerifiedAt: string;
    riskBand: A2ARiskBand;
    trustScore?: number;
  };
  verifiedAttributes: string[];
}

/**
 * Normalized KYC profile for export
 */
export interface ExportedKycProfile {
  fullName: string;
  dob?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode: string;
  };
  idDocument?: {
    type: string;
    country: string;
    last4: string;  // Never full SSN
  };
  phone?: {
    countryCode: string;
    number: string;
  };
  email?: string;
  kycMeta: {
    providerName: string;
    riskBand: string;
    lastVerifiedAt: string;
    trustScore?: number;  // A2A Protocol trust score (0-1)
  };
}

/**
 * Data export result
 */
export interface A2AExportResult {
  exportedTo: string;           // Bank name
  targetUserUid: string;        // UID in bank's system
  profileSchema: string;        // e.g. "standard_v1", "a2a_protocol_v1"
  includedFields: string[];
  excludedFields: string[];
  profile: ExportedKycProfile;
  migrationLink?: string;       // A2A Protocol migration link
  migrationToken?: string;      // A2A Protocol migration token
}

/**
 * Audit log entry
 */
export interface A2AAuditEntry {
  hushhCheckId: string;
  loggedAt: string;
  operations: string[];
  bankId: string;
  userId: string;
}

/**
 * Complete A2A scenario result
 */
export interface A2AScenarioResult {
  success: boolean;
  kycDecision: A2AKycDecision;
  keyMatchResult?: boolean;
  exportResult?: A2AExportResult;
  audit: A2AAuditEntry;
  totalDurationMs: number;
  // A2A Protocol fields
  trustScore?: number;          // 0-1 trust score from A2A agent
  riskBand?: A2ARiskBand;       // Risk band from A2A agent
  migrationLink?: string;       // Link to migrate KYC data
  taskId?: string;              // A2A task ID for tracking
}

// =====================================================
// Flow State
// =====================================================

/**
 * Steps in the A2A playground flow
 */
export type A2APlaygroundStep = 
  | 'SETUP'          // Screen 1: Scenario setup
  | 'CONVERSATION'   // Screen 2: Live agents conversation
  | 'RESULT';        // Screen 3: Result summary

/**
 * Complete state for the A2A Playground
 */
export interface A2APlaygroundState {
  step: A2APlaygroundStep;
  config: A2AScenarioConfig | null;
  messages: ConversationMessage[];
  isRunning: boolean;
  result: A2AScenarioResult | null;
  error: string | null;
}

// =====================================================
// Component Props
// =====================================================

export interface A2AScenarioSetupProps {
  onRunScenario: (config: A2AScenarioConfig) => void;
}

export interface A2AConversationProps {
  config: A2AScenarioConfig;
  messages: ConversationMessage[];
  isRunning: boolean;
  result: A2AScenarioResult | null;
  onViewResult: () => void;
}

export interface A2AResultSummaryProps {
  config: A2AScenarioConfig;
  result: A2AScenarioResult;
  messages: ConversationMessage[];
  onRunAnother: () => void;
  onViewConversation: () => void;
}

export interface A2APlaygroundContainerProps {
  defaultRelyingPartyId?: string;
}

// =====================================================
// Constants
// =====================================================

/**
 * Available relying parties for demo
 */
export const DEMO_RELYING_PARTIES: RelyingParty[] = [
  {
    id: 'demo_bank_x',
    name: 'DemoBank X',
    description: 'A demo retail bank',
  },
  {
    id: 'demo_broker_y',
    name: 'DemoBroker Y',
    description: 'A demo brokerage firm',
  },
  {
    id: 'hushh_fund_a',
    name: 'Hushh Fund A',
    description: 'Hushh investment fund',
  },
];

/**
 * Default scenario configuration
 */
export const DEFAULT_SCENARIO_CONFIG: A2AScenarioConfig = {
  relyingParty: DEMO_RELYING_PARTIES[0],
  user: {
    fullName: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    country: 'US',
    email: '',
    ssnLast4: '',
  },
  operations: {
    verifyKycStatus: true,
    confirmKeyMatch: true,
    exportKycProfile: true,
  },
};

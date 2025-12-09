/**
 * KYC A2A Network - TypeScript Types
 * 
 * Types for the 5-screen KYC UX flow and API contracts.
 */

// =====================================================
// API Request/Response Types
// =====================================================

/**
 * Request payload for /check endpoint
 */
export interface KycCheckRequest {
  relyingPartyId: string;
  consentToken: string;
  identifiers: {
    fullName: string;
    dob: string;
    country: string;
    idType: string;
    idNumber: string;
    email?: string;
    phone?: string;
  };
}

/**
 * KYC check status returned by the API
 */
export type KycStatus = 
  | 'PASS' 
  | 'REVIEW' 
  | 'NOT_FOUND' 
  | 'FAIL' 
  | 'CONSENT_INVALID'
  | 'EXPIRED';

/**
 * Risk band levels
 */
export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Verification levels
 */
export type VerificationLevel = 'basic' | 'standard' | 'enhanced' | 'premium';

/**
 * Provider information for verified KYC
 */
export interface VerifiedVia {
  providerName: string;
  providerType: 'INTERNAL' | 'BANK' | 'KYC_VENDOR' | 'GOVERNMENT';
  lastVerifiedAt: string;
  riskBand: RiskBand;
  riskScore?: number;
  verificationLevel?: VerificationLevel;
  country?: string;
}

/**
 * Agent conversation step for the detail view
 */
export interface AgentStep {
  actor: 'BANK_AGENT' | 'HUSHH_AGENT';
  message: string;
  stage: 
    | 'CONSENT_VALIDATION'
    | 'ATTESTATION_SEARCH'
    | 'POLICY_EVAL'
    | 'DECISION';
}

/**
 * Response from /check endpoint
 */
export interface KycCheckResponse {
  status: KycStatus;
  
  // For PASS/REVIEW - verification details
  verifiedVia?: VerifiedVia;
  
  // For REVIEW - what's still needed
  additionalRequirements?: string[];
  
  // For NOT_FOUND/FAIL - reason code
  reasonCode?: 
    | 'NO_ATTESTATION'
    | 'EXPIRED'
    | 'RISK_TOO_HIGH'
    | 'PROVIDER_NOT_TRUSTED'
    | 'POLICY_MISMATCH'
    | 'CONSENT_INVALID'
    | 'NETWORK_ERROR';
  
  // Human-readable message
  message?: string;
  
  // For AgentConversationLog detail view
  steps?: AgentStep[];
  
  // Metadata
  checkId?: string;
  timestamp?: string;
  latencyMs?: number;
}

// =====================================================
// UI Flow State Types
// =====================================================

/**
 * Steps in the KYC flow
 */
export type FlowStep =
  | 'INTRO'
  | 'DETAILS_CONSENT'
  | 'AGENTS_COLLAB'
  | 'RESULT_PASS'
  | 'RESULT_REVIEW'
  | 'RESULT_FULL'
  | 'ERROR';

/**
 * Complete flow state for the KYC UI
 */
export interface KycFlowState {
  step: FlowStep;
  isLoading: boolean;
  error?: string | null;
  request?: KycCheckRequest | null;
  response?: KycCheckResponse | null;
  showDetailModal: boolean;
}

/**
 * Form data collected on the Details screen
 */
export interface KycFormData {
  fullName: string;
  dob: string;
  country: string;
  idType: string;
  idNumber: string;
  email: string;
  phone: string;
  consentChecked: boolean;
}

// =====================================================
// Component Props Types
// =====================================================

/**
 * Props for KycIntroScreen
 */
export interface KycIntroScreenProps {
  onContinue: () => void;
  bankName?: string;
}

/**
 * Props for KycDetailsConsentScreen
 */
export interface KycDetailsConsentScreenProps {
  onSubmit: (request: KycCheckRequest) => void;
  bankName?: string;
  relyingPartyId: string;
  isLoading?: boolean;
}

/**
 * Props for KycAgentsCollabScreen
 */
export interface KycAgentsCollabScreenProps {
  isLoading: boolean;
  bankName?: string;
  steps?: AgentStep[];
}

/**
 * Props for KycResultPassScreen
 */
export interface KycResultPassScreenProps {
  response: KycCheckResponse;
  bankName?: string;
  onContinue: () => void;
  onViewDetails: () => void;
}

/**
 * Props for KycResultReviewScreen
 */
export interface KycResultReviewScreenProps {
  response: KycCheckResponse;
  bankName?: string;
  onUploadDoc: () => void;
  onViewDetails: () => void;
}

/**
 * Props for KycResultFullKycScreen
 */
export interface KycResultFullKycScreenProps {
  response?: KycCheckResponse;
  bankName?: string;
  onStartFullKyc: () => void;
}

/**
 * Props for KycAgentDetailModal
 */
export interface KycAgentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  response?: KycCheckResponse;
  bankName?: string;
}

/**
 * Props for KycFlowContainer
 */
export interface KycFlowContainerProps {
  relyingPartyId?: string;
  bankName?: string;
  onComplete?: (response: KycCheckResponse) => void;
  onStartFullKyc?: () => void;
}

// =====================================================
// Utility Types
// =====================================================

/**
 * Map additional requirements codes to human-readable text
 */
export const REQUIREMENT_LABELS: Record<string, string> = {
  'recent_address_proof': 'Recent address proof (< 3 months)',
  'address_proof': 'Proof of address',
  'id_verification': 'Government ID verification',
  'selfie_verification': 'Selfie for face match',
  'bank_statement': 'Recent bank statement',
  'utility_bill': 'Utility bill (< 3 months)',
  'tax_document': 'Tax identification document',
  'employment_proof': 'Proof of employment',
  'income_proof': 'Proof of income',
};

/**
 * Map reason codes to human-readable text
 */
export const REASON_LABELS: Record<string, string> = {
  'NO_ATTESTATION': 'No recent verified KYC found.',
  'EXPIRED': 'Existing KYC is older than your bank allows.',
  'RISK_TOO_HIGH': 'Existing KYC did not meet your bank\'s risk requirements.',
  'PROVIDER_NOT_TRUSTED': 'KYC provider is not in your bank\'s trusted list.',
  'POLICY_MISMATCH': 'Existing KYC does not match your bank\'s policy requirements.',
  'CONSENT_INVALID': 'Smart KYC service was unavailable.',
  'NETWORK_ERROR': 'Smart KYC service was temporarily unavailable.',
};

/**
 * ID type options for the form
 */
export const ID_TYPE_OPTIONS = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID Card' },
  { value: 'driving_license', label: 'Driving License' },
  { value: 'aadhaar', label: 'Aadhaar Card (India)' },
  { value: 'ssn', label: 'SSN (USA)' },
  { value: 'pan', label: 'PAN Card (India)' },
];

/**
 * Country options for the form
 */
export const COUNTRY_OPTIONS = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SG', label: 'Singapore' },
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
];

/**
 * Generate synthetic agent steps based on response status
 */
export function generateSyntheticSteps(
  response: KycCheckResponse,
  bankName: string = 'Your Bank'
): AgentStep[] {
  const steps: AgentStep[] = [
    {
      actor: 'BANK_AGENT',
      stage: 'CONSENT_VALIDATION',
      message: 'Received your consent and basic details.',
    },
    {
      actor: 'HUSHH_AGENT',
      stage: 'ATTESTATION_SEARCH',
      message: 'Searching for existing KYC attestations under your consent...',
    },
  ];

  if (response.status === 'PASS' && response.verifiedVia) {
    steps.push({
      actor: 'HUSHH_AGENT',
      stage: 'POLICY_EVAL',
      message: `Found attestation from ${response.verifiedVia.providerName}, verified ${formatAge(response.verifiedVia.lastVerifiedAt)}.`,
    });
    steps.push({
      actor: 'BANK_AGENT',
      stage: 'DECISION',
      message: `This passes our policy. We've accepted this KYC and skipped document upload.`,
    });
  } else if (response.status === 'REVIEW' && response.verifiedVia) {
    steps.push({
      actor: 'HUSHH_AGENT',
      stage: 'POLICY_EVAL',
      message: `Found attestation from ${response.verifiedVia.providerName}, but some attributes are missing.`,
    });
    steps.push({
      actor: 'BANK_AGENT',
      stage: 'DECISION',
      message: `We can partially reuse this KYC. We need one additional document: ${response.additionalRequirements?.[0] || 'proof of address'}.`,
    });
  } else {
    steps.push({
      actor: 'HUSHH_AGENT',
      stage: 'ATTESTATION_SEARCH',
      message: 'No matching KYC attestation found that meets the policy requirements.',
    });
    steps.push({
      actor: 'BANK_AGENT',
      stage: 'DECISION',
      message: `We'll need to complete a standard KYC verification this time.`,
    });
  }

  return response.steps || steps;
}

/**
 * Format verification age from ISO date
 */
function formatAge(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

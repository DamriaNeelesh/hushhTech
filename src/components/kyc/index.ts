// KYC A2A Components
// Export all KYC-related components for easy imports

// Legacy components
export { default as AgentCollabStrip } from './AgentCollabStrip';
export { default as AgentConversationLog } from './AgentConversationLog';
export { default as KYCResultCard } from './KYCResultCard';

// 5-Screen UX Flow Components
export { default as KycFlowContainer } from './screens/KycFlowContainer';
export { default as KycIntroScreen } from './screens/KycIntroScreen';
export { default as KycDetailsConsentScreen } from './screens/KycDetailsConsentScreen';
export { default as KycAgentsCollabScreen } from './screens/KycAgentsCollabScreen';
export { default as KycResultPassScreen } from './screens/KycResultPassScreen';
export { default as KycResultReviewScreen } from './screens/KycResultReviewScreen';
export { default as KycResultFullKycScreen } from './screens/KycResultFullKycScreen';
export { default as KycAgentDetailModal } from './screens/KycAgentDetailModal';

// Re-export types
export type { ConversationEntry } from './AgentConversationLog';
export type { KYCResult } from './KYCResultCard';

// Re-export KYC types from types folder
export type {
  KycCheckRequest,
  KycCheckResponse,
  KycStatus,
  FlowStep,
  KycFlowState,
  KycFormData,
  AgentStep,
  VerifiedVia,
  RiskBand,
  VerificationLevel,
  KycFlowContainerProps,
  KycIntroScreenProps,
  KycDetailsConsentScreenProps,
  KycAgentsCollabScreenProps,
  KycResultPassScreenProps,
  KycResultReviewScreenProps,
  KycResultFullKycScreenProps,
  KycAgentDetailModalProps,
} from '../../types/kyc';

// Re-export utility functions
export { 
  generateSyntheticSteps,
  REQUIREMENT_LABELS,
  REASON_LABELS,
  ID_TYPE_OPTIONS,
  COUNTRY_OPTIONS,
} from '../../types/kyc';

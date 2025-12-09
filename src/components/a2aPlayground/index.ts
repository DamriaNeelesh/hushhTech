/**
 * A2A Playground Component Exports
 * 
 * Agent-to-Agent KYC Playground demo components.
 * Demonstrates privacy-preserving KYC verification between Bank Agent and Hushh Agent.
 */

// Main container (state machine)
export { default as A2APlaygroundContainer } from './A2APlaygroundContainer';

// Individual screens
export { default as A2AScenarioSetupScreen } from './A2AScenarioSetupScreen';
export { default as A2AConversationScreen } from './A2AConversationScreen';
export { default as A2AResultSummaryScreen } from './A2AResultSummaryScreen';

// Conversation generator
export { generateA2AConversation, generateNotFoundConversation } from './conversationGenerator';

// UI Components - Mission Control
export { AgentThoughtLog, ThoughtIndicator } from './AgentThoughtLog';
export { TrustGauge, TrustIndicator, ScoreCounter } from './TrustGauge';
export { DataVaultCard, DataVaultProgress, EncryptionBadge } from './DataVaultCard';
export { MissionControlLayout } from './MissionControlLayout';

// Re-export types for convenience
export type {
  A2AScenarioConfig,
  A2AScenarioResult,
  A2AKycDecision,
  A2AExportResult,
  A2AAuditEntry,
  ConversationMessage,
  A2APlaygroundState,
  A2APlaygroundStep,
  RelyingParty,
  DemoUserIdentifiers,
  ScenarioOperations,
} from '../../types/a2aPlayground';

// Re-export constants
export {
  DEMO_RELYING_PARTIES,
  DEFAULT_SCENARIO_CONFIG,
} from '../../types/a2aPlayground';

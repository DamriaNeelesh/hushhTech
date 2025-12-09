/**
 * Conversation Generator for A2A Playground
 * 
 * Generates realistic simulated A2A conversations between Bank Agent and Hushh Agent.
 * Demonstrates privacy-preserving KYC verification without raw SSN sharing.
 */

import type {
  A2AScenarioConfig,
  A2AScenarioResult,
  ConversationMessage,
  ConversationStage,
  A2AKycDecision,
  A2AExportResult,
  A2AAuditEntry,
  ExportedKycProfile,
} from '../../types/a2aPlayground';

// Utility to generate UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Utility for delayed execution
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Message template for Bank Agent
 */
const createBankMessage = (
  stage: ConversationStage,
  message: string,
  metadata?: Record<string, any>
): ConversationMessage => ({
  id: generateUUID(),
  actor: 'BANK_AGENT',
  stage,
  message,
  timestamp: new Date(),
  metadata,
});

/**
 * Message template for Hushh Agent
 */
const createHushhMessage = (
  stage: ConversationStage,
  message: string,
  metadata?: Record<string, any>,
  isProgress?: boolean,
  progressPercent?: number
): ConversationMessage => ({
  id: generateUUID(),
  actor: 'HUSHH_AGENT',
  stage,
  message,
  timestamp: new Date(),
  metadata,
  isProgress,
  progressPercent,
});

/**
 * Generate a complete A2A conversation based on scenario config
 */
export const generateA2AConversation = async (
  config: A2AScenarioConfig,
  onMessage: (message: ConversationMessage) => void,
  isAborted: () => boolean
): Promise<{ messages: ConversationMessage[]; result: A2AScenarioResult }> => {
  const messages: ConversationMessage[] = [];
  const startTime = Date.now();
  const checkId = generateUUID();

  // Helper to add message with delay
  const addMessage = async (msg: ConversationMessage, delayMs: number = 800) => {
    if (isAborted()) return;
    await delay(delayMs);
    if (isAborted()) return;
    messages.push(msg);
    onMessage(msg);
  };

  // Track operations performed
  const operationsPerformed: string[] = [];

  // =====================================================
  // Phase 1: Initiation
  // =====================================================
  
  await addMessage(
    createBankMessage(
      'INITIATE',
      `🏦 Initiating KYC verification request for user "${config.user.fullName}"...`,
      { userId: config.user.fullName, bankId: config.relyingParty.id }
    ),
    500
  );

  await addMessage(
    createBankMessage(
      'INITIATE',
      `📋 User identifiers: Phone ${config.user.phoneCountryCode}${config.user.phoneNumber}, Country: ${config.user.country}`,
      { phone: `${config.user.phoneCountryCode}${config.user.phoneNumber}` }
    ),
    600
  );

  await addMessage(
    createHushhMessage(
      'INITIATE',
      `🤝 Hushh KYC Agent received request from ${config.relyingParty.name}. Processing...`,
      { requestId: checkId }
    ),
    700
  );

  // =====================================================
  // Phase 2: Check KYC Status (if enabled)
  // =====================================================
  
  if (config.operations.verifyKycStatus) {
    operationsPerformed.push('CheckKYCStatus');

    await addMessage(
      createBankMessage(
        'CHECKING',
        `📤 Calling CheckKYCStatus API...`,
        { method: 'CheckKYCStatus' }
      ),
      600
    );

    await addMessage(
      createHushhMessage(
        'CHECKING',
        `🔍 Searching attestation network for verified KYC records...`,
        { phase: 'search' },
        true,
        20
      ),
      800
    );

    await addMessage(
      createHushhMessage(
        'CHECKING',
        `📚 Checking Hushh internal attestations...`,
        { phase: 'internal' },
        true,
        40
      ),
      600
    );

    await addMessage(
      createHushhMessage(
        'CHECKING',
        `🔗 Querying partner KYC providers (banks, licensed vendors)...`,
        { phase: 'partners' },
        true,
        60
      ),
      700
    );

    await addMessage(
      createHushhMessage(
        'ATTESTATION_FOUND',
        `✅ Attestation FOUND! User was verified by "Acme Bank" on 2024-08-15. Risk band: LOW`,
        { 
          providerName: 'Acme Bank',
          providerType: 'BANK',
          lastVerifiedAt: '2024-08-15T10:30:00Z',
          riskBand: 'LOW'
        },
        true,
        100
      ),
      900
    );

    await addMessage(
      createBankMessage(
        'ATTESTATION_FOUND',
        `📥 Received attestation confirmation. Status: PASS, Provider: Acme Bank`,
        { status: 'PASS' }
      ),
      600
    );
  }

  // =====================================================
  // Phase 3: Verify Field Match (if enabled)
  // =====================================================
  
  if (config.operations.confirmKeyMatch && config.user.ssnLast4) {
    operationsPerformed.push('VerifyFieldMatch');

    await addMessage(
      createBankMessage(
        'KEY_VERIFY_REQUEST',
        `🔐 Requesting SSN last-4 verification (privacy-safe match)...`,
        { method: 'VerifyFieldMatch', field: 'ssn_last4' }
      ),
      700
    );

    await addMessage(
      createHushhMessage(
        'KEY_VERIFY_REQUEST',
        `🛡️ Processing VerifyFieldMatch request. Note: Raw SSN is NEVER shared.`,
        { privacyMode: 'attestation_only' }
      ),
      600
    );

    await addMessage(
      createHushhMessage(
        'KEY_VERIFY_RESULT',
        `🔒 Comparing hashed SSN last-4 from attestation with bank's claim...`,
        { comparing: true },
        true,
        50
      ),
      800
    );

    await addMessage(
      createHushhMessage(
        'KEY_VERIFY_RESULT',
        `✅ MATCH CONFIRMED! SSN last-4 matches attestation record. No raw SSN exposed.`,
        { 
          match: true,
          fieldVerified: 'ssn_last4',
          rawDataShared: false 
        }
      ),
      900
    );

    await addMessage(
      createBankMessage(
        'KEY_VERIFY_RESULT',
        `📥 Key match verified successfully. SSN last-4: ✓ (without seeing actual digits)`,
        { verified: true }
      ),
      600
    );
  }

  // =====================================================
  // Phase 4: Export KYC Profile (if enabled)
  // =====================================================
  
  let exportResult: A2AExportResult | undefined;

  if (config.operations.exportKycProfile) {
    operationsPerformed.push('ExportKYCProfile');

    await addMessage(
      createBankMessage(
        'EXPORT_REQUEST',
        `📦 Requesting normalized KYC profile export for bank onboarding...`,
        { method: 'ExportKYCProfile' }
      ),
      700
    );

    await addMessage(
      createHushhMessage(
        'EXPORT_REQUEST',
        `📋 Preparing normalized JSON profile with consented fields only...`,
        { preparing: true }
      ),
      600
    );

    await addMessage(
      createHushhMessage(
        'EXPORT_PROGRESS',
        `🔐 Applying privacy filters: Excluding raw SSN, including hashed identifiers...`,
        { filtering: true },
        true,
        30
      ),
      700
    );

    await addMessage(
      createHushhMessage(
        'EXPORT_PROGRESS',
        `📄 Serializing profile to standard_v1 schema...`,
        { schema: 'standard_v1' },
        true,
        60
      ),
      600
    );

    // Build export result
    const profile: ExportedKycProfile = {
      fullName: config.user.fullName,
      phone: {
        countryCode: config.user.phoneCountryCode,
        number: config.user.phoneNumber,
      },
      email: config.user.email,
      idDocument: config.user.ssnLast4 ? {
        type: 'SSN',
        country: 'US',
        last4: '****', // Never expose actual digits
      } : undefined,
      kycMeta: {
        providerName: 'Acme Bank',
        riskBand: 'LOW',
        lastVerifiedAt: '2024-08-15T10:30:00Z',
      },
    };

    exportResult = {
      exportedTo: config.relyingParty.name,
      targetUserUid: generateUUID(),
      profileSchema: 'standard_v1',
      includedFields: ['fullName', 'phone', 'email', 'idDocument.last4', 'kycMeta'],
      excludedFields: ['ssn_full', 'dob', 'address'],
      profile,
    };

    await addMessage(
      createHushhMessage(
        'EXPORT_COMPLETE',
        `✅ Profile export ready! Included: fullName, phone, email, SSN-last4 (masked). Excluded: full SSN, DOB, address.`,
        exportResult,
        true,
        100
      ),
      800
    );

    await addMessage(
      createBankMessage(
        'EXPORT_COMPLETE',
        `📥 Received normalized KYC profile. Ready for bank system ingestion.`,
        { received: true }
      ),
      600
    );
  }

  // =====================================================
  // Phase 5: Bank Confirmation
  // =====================================================

  await addMessage(
    createBankMessage(
      'BANK_CONFIRM',
      `✅ ${config.relyingParty.name} KYC verification COMPLETE. User "${config.user.fullName}" approved for onboarding.`,
      { complete: true, approved: true }
    ),
    800
  );

  await addMessage(
    createHushhMessage(
      'BANK_CONFIRM',
      `🎉 A2A KYC flow complete! Attestation reused, no duplicate verification needed. Privacy preserved.`,
      { 
        checkId,
        durationMs: Date.now() - startTime,
        operationsCount: operationsPerformed.length
      }
    ),
    600
  );

  // =====================================================
  // Build Final Result
  // =====================================================

  const kycDecision: A2AKycDecision = {
    status: 'PASS',
    verifiedVia: {
      providerName: 'Acme Bank',
      providerType: 'BANK',
      lastVerifiedAt: '2024-08-15T10:30:00Z',
      riskBand: 'LOW',
    },
    verifiedAttributes: ['fullName', 'phone', 'email', 'ssn_last4'],
  };

  const audit: A2AAuditEntry = {
    hushhCheckId: checkId,
    loggedAt: new Date().toISOString(),
    operations: operationsPerformed,
    bankId: config.relyingParty.id,
    userId: config.user.fullName,
  };

  const result: A2AScenarioResult = {
    success: true,
    kycDecision,
    keyMatchResult: config.operations.confirmKeyMatch ? true : undefined,
    exportResult,
    audit,
    totalDurationMs: Date.now() - startTime,
  };

  return { messages, result };
};

/**
 * Generate a "NOT_FOUND" scenario (no attestation exists)
 */
export const generateNotFoundConversation = async (
  config: A2AScenarioConfig,
  onMessage: (message: ConversationMessage) => void,
  isAborted: () => boolean
): Promise<{ messages: ConversationMessage[]; result: A2AScenarioResult }> => {
  const messages: ConversationMessage[] = [];
  const startTime = Date.now();
  const checkId = generateUUID();

  const addMessage = async (msg: ConversationMessage, delayMs: number = 800) => {
    if (isAborted()) return;
    await delay(delayMs);
    if (isAborted()) return;
    messages.push(msg);
    onMessage(msg);
  };

  await addMessage(
    createBankMessage(
      'INITIATE',
      `🏦 Initiating KYC verification request for user "${config.user.fullName}"...`,
      {}
    ),
    500
  );

  await addMessage(
    createHushhMessage(
      'CHECKING',
      `🔍 Searching attestation network...`,
      {},
      true,
      50
    ),
    800
  );

  await addMessage(
    createHushhMessage(
      'CHECKING',
      `⚠️ No existing KYC attestation found for this user. Full KYC required.`,
      { status: 'NOT_FOUND' }
    ),
    900
  );

  const kycDecision: A2AKycDecision = {
    status: 'NOT_FOUND',
    verifiedVia: {
      providerName: 'None',
      providerType: 'INTERNAL',
      lastVerifiedAt: new Date().toISOString(),
      riskBand: 'HIGH',
    },
    verifiedAttributes: [],
  };

  const audit: A2AAuditEntry = {
    hushhCheckId: checkId,
    loggedAt: new Date().toISOString(),
    operations: ['CheckKYCStatus'],
    bankId: config.relyingParty.id,
    userId: config.user.fullName,
  };

  return {
    messages,
    result: {
      success: false,
      kycDecision,
      audit,
      totalDurationMs: Date.now() - startTime,
    },
  };
};

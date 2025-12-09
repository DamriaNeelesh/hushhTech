/**
 * Conversation Generator for A2A Playground
 * 
 * Generates A2A conversations between Bank Agent and Hushh Agent.
 * NOW CALLS REAL SUPABASE API - shows NOT_FOUND if no attestation exists.
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

// Supabase config
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ibsisfnjxeowvdtvgzff.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
 * Call the REAL Supabase KYC Agent API
 */
async function callKycAgentApi(
  userIdentifier: string,
  bankId: string
): Promise<{
  status: 'PASS' | 'REVIEW' | 'FAIL' | 'NOT_FOUND' | 'EXPIRED' | 'CONSENT_DENIED' | 'ERROR';
  riskBand?: string;
  riskScore?: number;
  verifiedAttributes?: string[];
  verificationLevel?: string;
  providerName?: string;
  providerType?: string;
  lastVerifiedAt?: string;
  error?: string;
}> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/kyc-agent-a2a/a2a/rpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'x-bank-id': bankId,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'CheckKYCStatus',
        params: {
          userIdentifier,
        },
        id: generateUUID(),
      }),
    });

    if (!response.ok) {
      // Check if it's a 403 (bank not registered) or other error
      const errorData = await response.json().catch(() => ({}));
      
      // Bank not registered is expected for demo - treat as no attestation found
      if (response.status === 403) {
        return {
          status: 'NOT_FOUND',
          error: 'Bank not registered in KYC network. This is a demo - no real KYC data exists.',
        };
      }
      
      return {
        status: 'ERROR',
        error: errorData.error?.message || `API error: ${response.status}`,
      };
    }

    const data = await response.json();
    
    if (data.error) {
      return {
        status: 'ERROR',
        error: data.error.message,
      };
    }

    const result = data.result;
    return {
      status: result.status || 'NOT_FOUND',
      riskBand: result.riskBand,
      riskScore: result.riskScore,
      verifiedAttributes: result.verifiedAttributes,
      verificationLevel: result.verificationLevel,
      providerName: result.providerName,
      providerType: result.providerType,
      lastVerifiedAt: result.timestamp,
    };
  } catch (error) {
    console.error('KYC API call failed:', error);
    return {
      status: 'NOT_FOUND',
      error: 'Unable to connect to KYC network. No attestation data found.',
    };
  }
}

/**
 * Generate a complete A2A conversation based on scenario config
 * NOW CALLS REAL API - will show NOT_FOUND if no data exists
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
  
  // Store API result data for use throughout the flow
  let realApiData: any = null;

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
  // Phase 2: Check KYC Status - NOW CALLS REAL API
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

    // ACTUALLY CALL THE REAL API
    const userIdentifier = config.user.email || `${config.user.phoneCountryCode}${config.user.phoneNumber}`;
    const apiResult = await callKycAgentApi(userIdentifier, config.relyingParty.id);

    // Store API result for use in all subsequent operations
    realApiData = apiResult;

    if (apiResult.status === 'PASS') {
      // Real attestation found!
      await addMessage(
        createHushhMessage(
          'ATTESTATION_FOUND',
          `✅ Attestation FOUND! User was verified by "${apiResult.providerName || 'Unknown Provider'}" on ${apiResult.lastVerifiedAt ? new Date(apiResult.lastVerifiedAt).toLocaleDateString() : 'unknown date'}. Risk band: ${apiResult.riskBand || 'UNKNOWN'}`,
          { 
            providerName: apiResult.providerName,
            providerType: apiResult.providerType,
            lastVerifiedAt: apiResult.lastVerifiedAt,
            riskBand: apiResult.riskBand
          },
          true,
          100
        ),
        900
      );

      await addMessage(
        createBankMessage(
          'ATTESTATION_FOUND',
          `📥 Received attestation confirmation. Status: PASS, Provider: ${apiResult.providerName || 'Unknown'}`,
          { status: 'PASS' }
        ),
        600
      );
    } else {
      // No attestation found - this is the REAL case for new users
      await addMessage(
        createHushhMessage(
          'CHECKING',
          `⚠️ No existing KYC attestation found for this user in the Hushh network.`,
          { status: 'NOT_FOUND' },
          true,
          100
        ),
        900
      );

      await addMessage(
        createBankMessage(
          'CHECKING',
          `📥 Response received: ${apiResult.status}. ${apiResult.error || 'User requires fresh KYC verification.'}`,
          { status: apiResult.status }
        ),
        600
      );

      // Build NOT_FOUND result
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
        operations: operationsPerformed,
        bankId: config.relyingParty.id,
        userId: config.user.fullName,
      };

      await addMessage(
        createHushhMessage(
          'BANK_CONFIRM',
          `📋 Full KYC verification required. No reusable attestation available. The user must complete standard KYC process with ${config.relyingParty.name}.`,
          { recommendation: 'FULL_KYC_REQUIRED' }
        ),
        700
      );

      return {
        messages,
        result: {
          success: false,
          kycDecision,
          audit,
          totalDurationMs: Date.now() - startTime,
        },
      };
    }
  }

  // =====================================================
  // Phase 3: Verify Field Match - DEMO ONLY (not implemented in real API yet)
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
        `⚠️ VerifyFieldMatch not yet implemented in API. This is a demo simulation only.`,
        { privacyMode: 'attestation_only', demo: true }
      ),
      600
    );
  }

  // =====================================================
  // Phase 4: Export KYC Profile (if enabled) - USE REAL API DATA
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

    // Build export result using REAL API DATA
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
        providerName: realApiData.providerName || 'Unknown',
        riskBand: realApiData.riskBand || 'UNKNOWN',
        lastVerifiedAt: realApiData.lastVerifiedAt || new Date().toISOString(),
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
  // Build Final Result - USE ONLY REAL API DATA
  // =====================================================

  const kycDecision: A2AKycDecision = {
    status: realApiData.status,
    verifiedVia: {
      providerName: realApiData.providerName || 'Unknown',
      providerType: realApiData.providerType || 'UNKNOWN',
      lastVerifiedAt: realApiData.lastVerifiedAt || new Date().toISOString(),
      riskBand: realApiData.riskBand || 'UNKNOWN',
    },
    verifiedAttributes: realApiData.verifiedAttributes || [],
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
    exportResult,
    audit,
    totalDurationMs: Date.now() - startTime,
  };

  return { messages, result };
};

/**
 * Generate a "NOT_FOUND" scenario (no attestation exists)
 * This is now the DEFAULT for most users since no real data exists
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

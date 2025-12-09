/**
 * Conversation Generator for A2A Playground
 * 
 * FULL A2A PROTOCOL IMPLEMENTATION
 * Uses the new kyc-agent-a2a-protocol API that follows
 * the Agent-to-Agent (A2A) Protocol by Google/Linux Foundation.
 * 
 * @see https://a2a-protocol.org/latest/
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
  A2ARiskBand,
} from '../../types/a2aPlayground';

// Supabase config
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ibsisfnjxeowvdtvgzff.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// A2A Protocol Message Type
interface A2AProtocolMessage {
  sequence: number;
  timestamp: string;
  sender: string;
  receiver: string;
  protocol: 'A2A/1.0';
  type: 'TASK_INIT' | 'TASK_NEGOTIATION' | 'TASK_UPDATE' | 'TASK_STATUS' | 'TASK_RESULT' | 'KEY_EXCHANGE' | 'TASK_COMPLETE' | 'TASK_ERROR';
  task_id?: string;
  payload: {
    status?: string;
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
    risk_band?: string;
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
 * Convert A2A Protocol message to human-readable conversation message
 */
const a2aToConversation = (msg: A2AProtocolMessage): ConversationMessage => {
  const isBankAgent = msg.sender.includes('bank');
  const actor = isBankAgent ? 'BANK_AGENT' : 'HUSHH_AGENT';
  
  // Determine stage based on message type
  let stage: ConversationStage = 'CHECKING';
  if (msg.type === 'TASK_INIT') stage = 'INITIATE';
  if (msg.type === 'TASK_NEGOTIATION') stage = 'INITIATE';
  if (msg.type === 'TASK_UPDATE') stage = 'CHECKING';
  if (msg.type === 'TASK_STATUS') stage = 'CHECKING';
  if (msg.type === 'TASK_RESULT') stage = 'ATTESTATION_FOUND';
  if (msg.type === 'KEY_EXCHANGE') stage = 'ATTESTATION_FOUND';
  if (msg.type === 'TASK_COMPLETE') stage = 'BANK_CONFIRM';
  if (msg.type === 'TASK_ERROR') stage = 'ERROR';
  
  // Build human-readable content
  let content = msg.payload.message || msg.payload.log || '';
  
  // Add protocol metadata for display
  if (msg.type === 'TASK_INIT') {
    content = `🚀 [A2A TASK_INIT] Initiating verification for "${msg.payload.subject}"`;
    if (msg.payload.requirements) {
      content += `\nRequirements: ${msg.payload.requirements.join(', ')}`;
    }
  }
  
  if (msg.type === 'TASK_NEGOTIATION') {
    content = `🤝 [A2A TASK_NEGOTIATION] ${msg.payload.message}`;
    if (msg.payload.required_fields) {
      content += `\nRequired fields: ${msg.payload.required_fields.join(', ')}`;
    }
  }
  
  if (msg.type === 'TASK_UPDATE') {
    content = `📤 [A2A TASK_UPDATE] ${msg.payload.message}`;
    if (msg.payload.input_data) {
      content += `\nData: ${JSON.stringify(msg.payload.input_data)}`;
    }
  }
  
  if (msg.type === 'TASK_STATUS') {
    const progress = msg.payload.progress || 0;
    const progressBar = '█'.repeat(Math.floor(progress / 10)) + '░'.repeat(10 - Math.floor(progress / 10));
    content = `⏳ [A2A TASK_STATUS] ${progressBar} ${progress}%\n${msg.payload.log || ''}`;
    if (msg.payload.estimated_time) {
      content += `\nEstimated: ${msg.payload.estimated_time}`;
    }
  }
  
  if (msg.type === 'TASK_RESULT') {
    const trustScore = msg.payload.trust_score !== undefined ? (msg.payload.trust_score * 100).toFixed(1) : 'N/A';
    content = `📊 [A2A TASK_RESULT] ${msg.payload.status}\n`;
    content += `Trust Score: ${trustScore}%\n`;
    content += `Risk Band: ${msg.payload.risk_band || 'N/A'}\n`;
    if (msg.payload.message) content += msg.payload.message;
  }
  
  if (msg.type === 'KEY_EXCHANGE') {
    content = `🔐 [A2A KEY_EXCHANGE] ${msg.payload.message}`;
    if (msg.payload.target) {
      content += `\nTarget: ${msg.payload.target}`;
    }
  }
  
  if (msg.type === 'TASK_COMPLETE') {
    const trustScore = msg.payload.trust_score !== undefined ? (msg.payload.trust_score * 100).toFixed(1) : 'N/A';
    content = `✅ [A2A TASK_COMPLETE] KYC VERIFICATION COMPLETE\n`;
    content += `Trust Score: ${trustScore}%\n`;
    content += `Risk Band: ${msg.payload.risk_band || 'N/A'}\n`;
    if (msg.payload.data) {
      const data = msg.payload.data;
      content += `\n📋 Verified Data:\n`;
      content += `• Name: ${data.full_name || 'N/A'}\n`;
      content += `• Phone: ${data.phone || 'N/A'}\n`;
      if (data.address) {
        content += `• Address: ${data.address.line1}, ${data.address.city}, ${data.address.state} ${data.address.zip}\n`;
      }
      content += `• DOB: ${data.date_of_birth || 'N/A'}\n`;
      content += `• SSN: ${data.ssn_last_4 || 'N/A'}\n`;
    }
    if (msg.payload.migration_link) {
      content += `\n🔗 Migration Link Ready`;
    }
  }
  
  return {
    id: generateUUID(),
    actor,
    stage,
    message: content,
    timestamp: new Date(msg.timestamp),
    metadata: {
      protocol: msg.protocol,
      type: msg.type,
      task_id: msg.task_id,
      sequence: msg.sequence,
      ...msg.payload,
    },
    isProgress: msg.type === 'TASK_STATUS',
    progressPercent: msg.payload.progress,
  };
};

/**
 * Call the A2A Protocol KYC Agent API
 */
async function callA2AProtocolApi(
  config: A2AScenarioConfig
): Promise<{
  success: boolean;
  taskId: string;
  status: string;
  conversation: A2AProtocolMessage[];
  migrationLink?: string;
  error?: string;
}> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/kyc-agent-a2a-protocol/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        subject: config.user.fullName,
        phoneCountryCode: config.user.phoneCountryCode,
        phoneNumber: config.user.phoneNumber,
        email: config.user.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        taskId: '',
        status: 'ERROR',
        conversation: [],
        error: errorData.error || `API error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      taskId: data.task_id,
      status: data.status,
      conversation: data.conversation || [],
      migrationLink: data.migration_link,
    };
  } catch (error) {
    console.error('A2A Protocol API call failed:', error);
    return {
      success: false,
      taskId: '',
      status: 'ERROR',
      conversation: [],
      error: 'Unable to connect to A2A Protocol KYC service.',
    };
  }
}

/**
 * Generate a complete A2A conversation using the A2A Protocol API
 * Streams messages with realistic delays for animation
 */
export const generateA2AConversation = async (
  config: A2AScenarioConfig,
  onMessage: (message: ConversationMessage) => void,
  isAborted: () => boolean
): Promise<{ messages: ConversationMessage[]; result: A2AScenarioResult }> => {
  const messages: ConversationMessage[] = [];
  const startTime = Date.now();

  // Helper to add message with delay
  const addMessage = async (msg: ConversationMessage, delayMs: number = 600) => {
    if (isAborted()) return;
    await delay(delayMs);
    if (isAborted()) return;
    messages.push(msg);
    onMessage(msg);
  };

  // Call the A2A Protocol API
  const apiResult = await callA2AProtocolApi(config);

  if (apiResult.error || !apiResult.conversation.length) {
    // Error case
    const errorMsg: ConversationMessage = {
      id: generateUUID(),
      actor: 'HUSHH_AGENT',
      stage: 'ERROR',
      message: `⚠️ A2A Protocol Error: ${apiResult.error}`,
      timestamp: new Date(),
      metadata: { error: true },
    };
    await addMessage(errorMsg, 500);

    const kycDecision: A2AKycDecision = {
      status: 'NOT_FOUND',
      verifiedVia: {
        providerName: 'Hushh A2A Protocol Agent',
        providerType: 'INTERNAL',
        lastVerifiedAt: new Date().toISOString(),
        riskBand: 'HIGH',
      },
      verifiedAttributes: [],
    };

    const audit: A2AAuditEntry = {
      hushhCheckId: apiResult.taskId || generateUUID(),
      loggedAt: new Date().toISOString(),
      operations: ['A2A_PROTOCOL_ERROR'],
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
  }

  // Stream the A2A Protocol conversation messages
  for (const a2aMsg of apiResult.conversation) {
    if (isAborted()) break;
    
    const conversationMsg = a2aToConversation(a2aMsg);
    
    // Calculate delay based on message type
    let msgDelay = 600;
    if (a2aMsg.type === 'TASK_STATUS') msgDelay = 800;
    if (a2aMsg.type === 'TASK_RESULT') msgDelay = 1000;
    if (a2aMsg.type === 'TASK_COMPLETE') msgDelay = 1200;
    if (a2aMsg.type === 'KEY_EXCHANGE') msgDelay = 700;
    
    await addMessage(conversationMsg, msgDelay);
  }

  // Extract trust score and risk band from final message
  const lastMessage = apiResult.conversation[apiResult.conversation.length - 1];
  const trustScore = lastMessage?.payload?.trust_score || 0;
  const riskBand = lastMessage?.payload?.risk_band || 'HIGH';
  const verifiedData = lastMessage?.payload?.data || {};

  // Build Final Result
  const kycDecision: A2AKycDecision = {
    status: apiResult.success ? 'PASS' : 'NOT_FOUND',
    verifiedVia: {
      providerName: 'Hushh A2A Protocol Agent v2.0',
      providerType: 'INTERNAL',
      lastVerifiedAt: new Date().toISOString(),
      riskBand: riskBand as any,
    },
    verifiedAttributes: apiResult.success 
      ? ['name', 'phone', 'address', 'dob', 'ssn_token'] 
      : [],
  };

  let exportResult: A2AExportResult | undefined;

  if (apiResult.success && config.operations.exportKycProfile) {
    const profile: ExportedKycProfile = {
      fullName: verifiedData.full_name || config.user.fullName,
      phone: {
        countryCode: config.user.phoneCountryCode,
        number: config.user.phoneNumber,
      },
      email: config.user.email,
      address: verifiedData.address ? {
        line1: verifiedData.address.line1,
        city: verifiedData.address.city,
        state: verifiedData.address.state,
        country: verifiedData.address.country,
        postalCode: verifiedData.address.zip,
      } : undefined,
      idDocument: verifiedData.ssn_last_4 ? {
        type: 'SSN',
        country: 'US',
        last4: verifiedData.ssn_last_4,
      } : undefined,
      kycMeta: {
        providerName: 'Hushh A2A Protocol',
        riskBand,
        lastVerifiedAt: new Date().toISOString(),
        trustScore,
      },
    };

    exportResult = {
      exportedTo: config.relyingParty.name,
      targetUserUid: generateUUID(),
      profileSchema: 'a2a_protocol_v1',
      includedFields: ['fullName', 'phone', 'email', 'address', 'kycMeta'],
      excludedFields: ['ssn_full', 'dob_full'],
      profile,
      migrationLink: apiResult.migrationLink,
    };
  }

  const audit: A2AAuditEntry = {
    hushhCheckId: apiResult.taskId,
    loggedAt: new Date().toISOString(),
    operations: ['A2A_TASK_INIT', 'A2A_TASK_NEGOTIATION', 'A2A_TASK_UPDATE', 'A2A_TASK_STATUS', 'A2A_TASK_RESULT', 'A2A_KEY_EXCHANGE', 'A2A_TASK_COMPLETE'],
    bankId: config.relyingParty.id,
    userId: config.user.fullName,
  };

  const result: A2AScenarioResult = {
    success: apiResult.success,
    kycDecision,
    exportResult,
    audit,
    totalDurationMs: Date.now() - startTime,
    trustScore,
    riskBand: riskBand as A2ARiskBand,
    migrationLink: apiResult.migrationLink,
  };

  return { messages, result };
};

/**
 * Generate a "NOT_FOUND" scenario (fallback if API fails)
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

  await addMessage({
    id: generateUUID(),
    actor: 'BANK_AGENT',
    stage: 'INITIATE',
    message: `🚀 [A2A TASK_INIT] Initiating verification for "${config.user.fullName}"...`,
    timestamp: new Date(),
    metadata: { protocol: 'A2A/1.0', type: 'TASK_INIT' },
  }, 500);

  await addMessage({
    id: generateUUID(),
    actor: 'HUSHH_AGENT',
    stage: 'CHECKING',
    message: `⏳ [A2A TASK_STATUS] ████░░░░░░ 45%\nSearching global identity ledger...`,
    timestamp: new Date(),
    metadata: { protocol: 'A2A/1.0', type: 'TASK_STATUS', progress: 45 },
    isProgress: true,
    progressPercent: 45,
  }, 800);

  await addMessage({
    id: generateUUID(),
    actor: 'HUSHH_AGENT',
    stage: 'CHECKING',
    message: `📊 [A2A TASK_RESULT] REJECTED\nTrust Score: 0%\nRisk Band: CRITICAL\nNo KYC record found. Full KYC required.`,
    timestamp: new Date(),
    metadata: { protocol: 'A2A/1.0', type: 'TASK_RESULT', status: 'REJECTED' },
  }, 900);

  const kycDecision: A2AKycDecision = {
    status: 'NOT_FOUND',
    verifiedVia: {
      providerName: 'Hushh A2A Protocol Agent',
      providerType: 'INTERNAL',
      lastVerifiedAt: new Date().toISOString(),
      riskBand: 'CRITICAL',
    },
    verifiedAttributes: [],
  };

  const audit: A2AAuditEntry = {
    hushhCheckId: checkId,
    loggedAt: new Date().toISOString(),
    operations: ['A2A_TASK_INIT', 'A2A_TASK_STATUS', 'A2A_TASK_RESULT'],
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
      trustScore: 0,
      riskBand: 'CRITICAL',
    },
  };
};

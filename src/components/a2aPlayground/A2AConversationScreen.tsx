/**
 * A2A Conversation Screen (Screen 2)
 * 
 * The HERO screen showing Bank KYC Copilot and Hushh KYC Agent
 * talking to each other in real-time.
 * 
 * Now uses the Mission Control 3-pane layout for a "class product" feel.
 */
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Skeleton,
  Progress,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  A2AConversationProps,
  ConversationMessage,
  AgentActor,
} from '../../types/a2aPlayground';
import { MissionControlLayout } from './MissionControlLayout';
import { AgentThoughtLog, ThoughtIndicator } from './AgentThoughtLog';
import { TrustGauge, TrustIndicator } from './TrustGauge';
import { DataVaultCard, DataVaultProgress } from './DataVaultCard';

// =====================================================
// Animations
// =====================================================

const flowDots = keyframes`
  0% { transform: translateX(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(20px); opacity: 0; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// =====================================================
// Risk Band Type
// =====================================================
type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// =====================================================
// Helper: Extract trust score from messages
// =====================================================
const extractTrustScore = (messages: ConversationMessage[], result: A2AConversationProps['result']): number => {
  // First check result
  if (result?.kycDecision?.verifiedVia?.trustScore !== undefined) {
    return result.kycDecision.verifiedVia.trustScore;
  }
  
  // Calculate based on message progress
  const progressMessages = messages.filter(m => m.progressPercent !== undefined);
  if (progressMessages.length > 0) {
    const lastProgress = progressMessages[progressMessages.length - 1];
    return (lastProgress.progressPercent || 0) / 100;
  }
  
  // Calculate based on conversation progress
  const totalExpectedMessages = 10;
  return Math.min(messages.length / totalExpectedMessages, 1);
};

// =====================================================
// Helper: Calculate risk band from trust score
// =====================================================
const calculateRiskBand = (trustScore: number): RiskBand => {
  if (trustScore >= 0.75) return 'LOW';
  if (trustScore >= 0.50) return 'MEDIUM';
  if (trustScore >= 0.30) return 'HIGH';
  return 'CRITICAL';
};

// =====================================================
// Helper: Generate thought log from messages
// =====================================================
const generateThoughts = (messages: ConversationMessage[]): string[] => {
  const thoughts: string[] = [];
  
  messages.forEach((msg) => {
    if (msg.actor === 'HUSHH_AGENT') {
      if (msg.stage === 'CHECKING') {
        thoughts.push('🔍 Querying identity database...');
      } else if (msg.stage === 'ATTESTATION_FOUND') {
        thoughts.push('🤝 Attestation found - negotiating access...');
      } else if (msg.stage === 'KEY_VERIFY_REQUEST' || msg.stage === 'KEY_VERIFY_RESULT') {
        thoughts.push('🔐 Secure key verification in progress...');
      } else if (msg.stage === 'EXPORT_REQUEST' || msg.stage === 'EXPORT_PROGRESS') {
        thoughts.push('📤 Preparing secure data export...');
      } else if (msg.stage === 'EXPORT_COMPLETE') {
        thoughts.push('🎉 KYC verification complete!');
      }
    }
  });
  
  // Add default thoughts if empty
  if (thoughts.length === 0 && messages.length > 0) {
    thoughts.push('🚀 Initializing A2A protocol...');
    thoughts.push('📡 Establishing secure connection...');
  }
  
  return thoughts.slice(-5); // Keep last 5 thoughts
};

// =====================================================
// Data Field Status Type
// =====================================================
type DataFieldStatus = 'locked' | 'unlocking' | 'unlocked' | 'protected';

interface DataField {
  name: string;
  label: string;
  value: string | null;
  status: DataFieldStatus;
  isSensitive: boolean;
}

// =====================================================
// Helper: Generate data fields from messages
// =====================================================
const generateDataFields = (messages: ConversationMessage[], result: A2AConversationProps['result']): DataField[] => {
  const fields: DataField[] = [
    { name: 'full_name', label: 'Full Name', value: null, status: 'locked', isSensitive: false },
    { name: 'phone', label: 'Phone Number', value: null, status: 'locked', isSensitive: false },
    { name: 'address', label: 'Address', value: null, status: 'locked', isSensitive: false },
    { name: 'dob', label: 'Date of Birth', value: null, status: 'locked', isSensitive: true },
    { name: 'ssn', label: 'SSN (Last 4)', value: null, status: 'protected', isSensitive: true },
    { name: 'kyc_status', label: 'KYC Status', value: null, status: 'locked', isSensitive: false },
  ];
  
  // Check if we have result data from exportResult
  if (result?.exportResult?.profile) {
    const profile = result.exportResult.profile;
    if (profile.fullName) {
      const idx = fields.findIndex(f => f.name === 'full_name');
      if (idx >= 0) {
        fields[idx].value = profile.fullName;
        fields[idx].status = 'unlocked';
      }
    }
    if (profile.phone) {
      const idx = fields.findIndex(f => f.name === 'phone');
      if (idx >= 0) {
        fields[idx].value = `${profile.phone.countryCode} ${profile.phone.number}`;
        fields[idx].status = 'unlocked';
      }
    }
    if (profile.address) {
      const idx = fields.findIndex(f => f.name === 'address');
      if (idx >= 0) {
        fields[idx].value = `${profile.address.city}, ${profile.address.country}`;
        fields[idx].status = 'unlocked';
      }
    }
  }
  
  // Update status based on conversation stage (using correct stage names)
  const hasExportComplete = messages.some(m => m.stage === 'EXPORT_COMPLETE');
  const hasAttestationFound = messages.some(m => m.stage === 'ATTESTATION_FOUND');
  const hasKeyVerify = messages.some(m => m.stage === 'KEY_VERIFY_REQUEST' || m.stage === 'KEY_VERIFY_RESULT');
  
  if (hasExportComplete) {
    fields.forEach(f => {
      if (f.status === 'locked' && !f.isSensitive) {
        f.status = 'unlocked';
      }
    });
    const kycIdx = fields.findIndex(f => f.name === 'kyc_status');
    if (kycIdx >= 0) {
      fields[kycIdx].value = 'Verified';
      fields[kycIdx].status = 'unlocked';
    }
  } else if (hasKeyVerify) {
    fields.forEach(f => {
      if (f.status === 'locked' && !f.isSensitive) {
        f.status = 'unlocking';
      }
    });
  } else if (hasAttestationFound) {
    fields.forEach(f => {
      if (f.status === 'locked' && !f.isSensitive) {
        f.status = 'unlocking';
      }
    });
  }
  
  return fields;
};

// =====================================================
// Agent Card Component (for simplified mode)
// =====================================================

interface AgentCardProps {
  type: 'BANK' | 'HUSHH';
  name: string;
  subtitle: string;
  isActive?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ type, name, subtitle, isActive }) => {
  const isBank = type === 'BANK';
  
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={isActive ? 'black' : 'gray.300'}
      borderRadius="lg"
      p={{ base: 3, md: 4 }}
      minW={{ base: '120px', md: '180px' }}
      textAlign="center"
      transition="all 0.2s"
      boxShadow={isActive ? 'md' : 'sm'}
    >
      {/* Logo or Bank Name */}
      {isBank ? (
        <Text color="black" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" mb={1}>
          {name}
        </Text>
      ) : (
        <Box mb={2}>
          <img 
            src="/assets/Hushhogo-tDRfOnun.png" 
            alt="Hushh Logo" 
            style={{ 
              height: '24px', 
              width: 'auto', 
              margin: '0 auto',
              display: 'block'
            }} 
          />
        </Box>
      )}
      
      <Text color="gray.600" fontSize={{ base: '2xs', md: 'xs' }}>
        {subtitle}
      </Text>
      
      {isActive && (
        <Box mt={2} pt={2} borderTop="1px solid" borderColor="gray.200">
          <Text fontSize="2xs" color="gray.500" fontWeight="500">
            Active
          </Text>
        </Box>
      )}
    </Box>
  );
};

// =====================================================
// Message Bubble Component
// =====================================================

interface MessageBubbleProps {
  message: ConversationMessage;
  bankName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, bankName }) => {
  const isBank = message.actor === 'BANK_AGENT';
  
  return (
    <Box
      animation={`${fadeInUp} 0.4s ease-out`}
      alignSelf={isBank ? 'flex-start' : 'flex-end'}
      maxW={{ base: '85%', md: '75%' }}
      w="auto"
    >
      {/* Agent label */}
      <Text 
        fontSize={{ base: '2xs', md: 'xs' }}
        color="gray.600"
        fontWeight="500"
        mb={1}
        textAlign={isBank ? 'left' : 'right'}
      >
        {isBank ? bankName : 'Hushh'}
      </Text>
      
      {/* Message bubble */}
      <Box
        bg={isBank ? 'gray.100' : 'gray.50'}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        px={{ base: 3, md: 4 }}
        py={{ base: 2, md: 3 }}
      >
        <Text color="black" fontSize={{ base: 'xs', md: 'sm' }} lineHeight="1.6">
          {message.message}
        </Text>
        
        {/* Progress indicator for progress messages */}
        {message.isProgress && message.progressPercent !== undefined && (
          <Box mt={3}>
            <Progress
              value={message.progressPercent}
              size="xs"
              colorScheme={isBank ? 'blue' : 'purple'}
              borderRadius="full"
              bg="gray.200"
            />
            <Text fontSize="xs" color="gray.600" mt={1}>
              {message.progressPercent}% complete
            </Text>
          </Box>
        )}
      </Box>
      
      {/* Timestamp */}
      <Text 
        fontSize="2xs"
        color="gray.500" 
        mt={1}
        textAlign={isBank ? 'left' : 'right'}
        display={{ base: 'none', sm: 'block' }}
      >
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Box>
  );
};

// =====================================================
// Main Component - Mission Control Layout
// =====================================================

export const A2AConversationScreen: React.FC<A2AConversationProps> = ({
  config,
  messages,
  isRunning,
  result,
  onViewResult,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  // Calculate derived state
  const trustScore = useMemo(() => extractTrustScore(messages, result), [messages, result]);
  const riskBand = useMemo(() => calculateRiskBand(trustScore), [trustScore]);
  const thoughts = useMemo(() => generateThoughts(messages), [messages]);
  const dataFields = useMemo(() => generateDataFields(messages, result), [messages, result]);
  
  // Decision summary based on result
  const decisionSummary = useMemo(() => {
    if (!result) return undefined;
    if (result.kycDecision.status === 'PASS') {
      return `KYC Verified. Trust Score: ${(trustScore * 100).toFixed(0)}%. Data exported successfully.`;
    } else if (result.kycDecision.status === 'REVIEW') {
      return `Manual review required. Trust Score: ${(trustScore * 100).toFixed(0)}%.`;
    } else {
      return `Verification incomplete. Additional information needed.`;
    }
  }, [result, trustScore]);
  
  // Determine which agent is currently active
  const activeAgent = isRunning && messages.length > 0 
    ? messages[messages.length - 1].actor 
    : null;
  
  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length]);

  // Use simplified layout for mobile
  if (isMobile) {
    return (
      <SimplifiedLayout
        config={config}
        messages={messages}
        isRunning={isRunning}
        result={result}
        onViewResult={onViewResult}
        trustScore={trustScore}
        riskBand={riskBand}
        thoughts={thoughts}
      />
    );
  }

  // ================================
  // MISSION CONTROL 3-PANE LAYOUT
  // ================================
  return (
    <MissionControlLayout
      agents={{
        requester: {
          name: config.relyingParty.name,
          status: activeAgent === 'BANK_AGENT' ? 'negotiating' : 
                  isRunning ? 'connected' : 'idle',
        },
        oracle: {
          name: 'Hushh KYC Agent',
          status: activeAgent === 'HUSHH_AGENT' ? 'processing' : 
                  isRunning ? 'connected' : 'idle',
        },
      }}
      messages={messages}
      isProcessing={isRunning}
      trustScore={trustScore}
      riskBand={riskBand}
      dataFields={dataFields}
      thoughts={thoughts}
      decisionSummary={decisionSummary}
    >
      {/* Input area at bottom of terminal */}
      <Box
        px={4}
        py={3}
        borderTop="1px solid"
        borderColor="gray.700"
        bg="blackAlpha.800"
      >
        {result && !isRunning ? (
          <Button
            colorScheme="green"
            size="lg"
            w="100%"
            onClick={onViewResult}
            leftIcon={<span>✨</span>}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(72, 187, 120, 0.4)',
            }}
          >
            View Full Result →
          </Button>
        ) : (
          <HStack justify="space-between">
            <HStack spacing={2}>
              <ThoughtIndicator 
                text={isRunning ? 'Processing...' : 'Ready'} 
                isActive={isRunning} 
              />
              <Text color="gray.400" fontSize="sm">
                {isRunning ? 'Agents communicating...' : 'Waiting for task...'}
              </Text>
            </HStack>
            <Badge colorScheme={isRunning ? 'green' : 'gray'} variant="subtle">
              {messages.length} messages
            </Badge>
          </HStack>
        )}
      </Box>
    </MissionControlLayout>
  );
};

// =====================================================
// Simplified Layout for Mobile
// =====================================================

interface SimplifiedLayoutProps extends A2AConversationProps {
  trustScore: number;
  riskBand: RiskBand;
  thoughts: string[];
}

const SimplifiedLayout: React.FC<SimplifiedLayoutProps> = ({
  config,
  messages,
  isRunning,
  result,
  onViewResult,
  trustScore,
  riskBand,
  thoughts,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeAgent = isRunning && messages.length > 0 
    ? messages[messages.length - 1].actor 
    : null;

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      py={4}
    >
      <Container maxW="6xl">
        {/* Header */}
        <VStack spacing={2} mb={4} textAlign="center">
          <HStack>
            <TrustIndicator score={trustScore} />
            <Text color="white" fontSize="sm" fontWeight="600">
              Trust: {(trustScore * 100).toFixed(0)}%
            </Text>
            <Badge colorScheme={
              riskBand === 'LOW' ? 'green' : 
              riskBand === 'MEDIUM' ? 'yellow' : 
              riskBand === 'HIGH' ? 'orange' : 'red'
            }>
              {riskBand} RISK
            </Badge>
          </HStack>
          <Text color="gray.400" fontSize="xs">
            {config.relyingParty.name} ↔ Hushh KYC Agent
          </Text>
        </VStack>

        {/* Agent Strip */}
        <Flex 
          justify="center" 
          align="center" 
          gap={2}
          py={3}
          px={3}
          mb={4}
          bg="blackAlpha.600"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Box
            px={3}
            py={2}
            bg={activeAgent === 'BANK_AGENT' ? 'blue.900' : 'blackAlpha.600'}
            borderRadius="lg"
            border="1px solid"
            borderColor={activeAgent === 'BANK_AGENT' ? 'blue.400' : 'gray.600'}
          >
            <Text color="white" fontSize="xs" fontWeight="600">
              {config.relyingParty.name}
            </Text>
          </Box>

          {/* Connection indicator */}
          <Box w="40px" h="2px" bg="gray.600" position="relative">
            {isRunning && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-3px',
                  left: 0,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#48BB78',
                }}
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </Box>

          <Box
            px={3}
            py={2}
            bg={activeAgent === 'HUSHH_AGENT' ? 'green.900' : 'blackAlpha.600'}
            borderRadius="lg"
            border="1px solid"
            borderColor={activeAgent === 'HUSHH_AGENT' ? 'green.400' : 'gray.600'}
          >
            <Text color="white" fontSize="xs" fontWeight="600">
              🛡️ Hushh KYC Agent
            </Text>
          </Box>
        </Flex>

        {/* Messages */}
        <Box
          bg="black"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
          p={3}
          minH="300px"
          maxH="50vh"
          overflowY="auto"
          mb={4}
        >
          {messages.length === 0 ? (
            <VStack h="200px" justify="center" spacing={4}>
              <Skeleton height="40px" width="80%" borderRadius="xl" startColor="gray.700" endColor="gray.600" />
              <Text color="gray.500" fontSize="xs">
                Waiting for agents to connect...
              </Text>
            </VStack>
          ) : (
            <VStack spacing={3} align="stretch">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  bankName={config.relyingParty.name}
                />
              ))}
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </VStack>
          )}
        </Box>

        {/* Thought Log (collapsed on mobile) */}
        {thoughts.length > 0 && (
          <AgentThoughtLog
            thoughts={thoughts}
            isActive={isRunning}
            agentName="HUSHH_KYC_AGENT"
          />
        )}

        {/* View Result Button */}
        {result && !isRunning && (
          <Button
            colorScheme="green"
            size="lg"
            w="100%"
            mt={4}
            onClick={onViewResult}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(72, 187, 120, 0.4)',
            }}
          >
            View Full Result →
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default A2AConversationScreen;

/**
 * KycAgentDetailModal - Full Agent Conversation Log Modal
 * 
 * Screen 5 of the KYC UX flow (optional detail view)
 * Shows the complete A2A conversation between bank and Hushh agents.
 * 
 * Features:
 * - Step-by-step conversation log
 * - Stage indicators (Consent → Search → Policy → Decision)
 * - Technical details for transparency
 * - Latency and timestamp info
 */
'use client';

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Box,
  Text,
  Icon,
  Badge,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { 
  KycAgentDetailModalProps, 
  AgentStep, 
  generateSyntheticSteps,
  REASON_LABELS,
} from '../../../types/kyc';

// =====================================================
// Stage Configuration
// =====================================================

interface StageConfig {
  label: string;
  color: string;
  bgColor: string;
}

const STAGE_CONFIG: Record<string, StageConfig> = {
  CONSENT_VALIDATION: {
    label: 'Consent',
    color: 'blue.300',
    bgColor: 'rgba(66, 153, 225, 0.15)',
  },
  ATTESTATION_SEARCH: {
    label: 'Search',
    color: 'purple.300',
    bgColor: 'rgba(159, 122, 234, 0.15)',
  },
  POLICY_EVAL: {
    label: 'Policy',
    color: 'orange.300',
    bgColor: 'rgba(237, 137, 54, 0.15)',
  },
  DECISION: {
    label: 'Decision',
    color: 'green.300',
    bgColor: 'rgba(72, 187, 120, 0.15)',
  },
};

// =====================================================
// Agent Icon Components
// =====================================================

const BankAgentIcon: React.FC = () => (
  <Box
    w="36px"
    h="36px"
    borderRadius="full"
    bg="linear-gradient(135deg, #3182CE 0%, #2B6CB0 100%)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  >
    <Text fontSize="sm" fontWeight="bold" color="white">
      🏦
    </Text>
  </Box>
);

const HushhAgentIcon: React.FC = () => (
  <Box
    w="36px"
    h="36px"
    borderRadius="full"
    bg="linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  >
    <Text fontSize="sm" fontWeight="bold" color="white">
      🔐
    </Text>
  </Box>
);

// =====================================================
// Conversation Step Component
// =====================================================

interface ConversationStepProps {
  step: AgentStep;
  index: number;
  isLast: boolean;
  bankName: string;
}

const ConversationStep: React.FC<ConversationStepProps> = ({
  step,
  index,
  isLast,
  bankName,
}) => {
  const isBank = step.actor === 'BANK_AGENT';
  const stageConfig = STAGE_CONFIG[step.stage] || STAGE_CONFIG.DECISION;
  
  return (
    <Box position="relative">
      {/* Connecting line */}
      {!isLast && (
        <Box
          position="absolute"
          left="18px"
          top="40px"
          bottom="-20px"
          w="2px"
          bg="whiteAlpha.100"
        />
      )}
      
      <HStack align="flex-start" spacing={3} py={3}>
        {/* Agent Icon */}
        {isBank ? <BankAgentIcon /> : <HushhAgentIcon />}
        
        {/* Message Content */}
        <VStack align="stretch" spacing={2} flex={1}>
          {/* Header: Agent Name + Stage Badge */}
          <HStack justify="space-between" wrap="wrap" gap={2}>
            <Text fontSize="sm" fontWeight="600" color="white">
              {isBank ? `${bankName} Agent` : 'Hushh KYC Agent'}
            </Text>
            <Badge
              size="sm"
              px={2}
              py={0.5}
              borderRadius="full"
              bg={stageConfig.bgColor}
              color={stageConfig.color}
              fontSize="xs"
              fontWeight="500"
            >
              {stageConfig.label}
            </Badge>
          </HStack>
          
          {/* Message Bubble */}
          <Box
            bg={isBank ? 'rgba(66, 153, 225, 0.1)' : 'rgba(159, 122, 234, 0.1)'}
            border="1px solid"
            borderColor={isBank ? 'blue.800' : 'purple.800'}
            borderRadius="lg"
            px={4}
            py={3}
          >
            <Text fontSize="sm" color="gray.200" lineHeight="1.6">
              {step.message}
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

// =====================================================
// Status Summary Component
// =====================================================

interface StatusSummaryProps {
  status: string;
  verifiedVia?: {
    providerName: string;
    lastVerifiedAt: string;
    riskBand: string;
  };
  reasonCode?: string;
  latencyMs?: number;
  timestamp?: string;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({
  status,
  verifiedVia,
  reasonCode,
  latencyMs,
  timestamp,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'PASS': return 'green';
      case 'REVIEW': return 'yellow';
      default: return 'gray';
    }
  };
  
  const statusColor = getStatusColor();
  
  return (
    <Box
      bg="whiteAlpha.50"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderRadius="lg"
      p={4}
    >
      <VStack align="stretch" spacing={3}>
        {/* Status Header */}
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.400" fontWeight="500">
            Final Decision
          </Text>
          <Badge
            colorScheme={statusColor}
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            {status}
          </Badge>
        </HStack>
        
        <Divider borderColor="whiteAlpha.100" />
        
        {/* Details Grid */}
        <VStack align="stretch" spacing={2}>
          {verifiedVia && (
            <>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500">Verified Via</Text>
                <Text fontSize="xs" color="white">{verifiedVia.providerName}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500">Risk Assessment</Text>
                <Text fontSize="xs" color="white">{verifiedVia.riskBand}</Text>
              </HStack>
            </>
          )}
          
          {reasonCode && (
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Reason</Text>
              <Text fontSize="xs" color="gray.300" maxW="60%" textAlign="right">
                {REASON_LABELS[reasonCode] || reasonCode}
              </Text>
            </HStack>
          )}
          
          {latencyMs && (
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Response Time</Text>
              <Text fontSize="xs" color="gray.400">{latencyMs}ms</Text>
            </HStack>
          )}
          
          {timestamp && (
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Timestamp</Text>
              <Text fontSize="xs" color="gray.400">
                {new Date(timestamp).toLocaleString()}
              </Text>
            </HStack>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

// =====================================================
// Main Modal Component
// =====================================================

export const KycAgentDetailModal: React.FC<KycAgentDetailModalProps> = ({
  isOpen,
  onClose,
  response,
  bankName = 'Your Bank',
}) => {
  // Generate synthetic steps if not provided
  const steps = response?.steps || 
    (response ? generateSyntheticSteps(response, bankName) : []);
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="lg"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay 
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        bg="linear-gradient(180deg, #1A1A2E 0%, #0A0A0A 100%)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="xl"
        maxH="80vh"
      >
        <ModalHeader 
          borderBottom="1px solid" 
          borderColor="whiteAlpha.100"
          pb={4}
        >
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="lg" fontWeight="600" color="white">
              Agent Collaboration Details
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              Full A2A conversation log
            </Text>
          </VStack>
        </ModalHeader>
        
        <ModalCloseButton color="gray.400" />
        
        <ModalBody py={6}>
          <VStack align="stretch" spacing={6}>
            {/* Conversation Log */}
            <VStack align="stretch" spacing={0}>
              {steps.map((step, index) => (
                <ConversationStep
                  key={index}
                  step={step}
                  index={index}
                  isLast={index === steps.length - 1}
                  bankName={bankName}
                />
              ))}
            </VStack>
            
            {/* Status Summary */}
            {response && (
              <StatusSummary
                status={response.status}
                verifiedVia={response.verifiedVia}
                reasonCode={response.reasonCode}
                latencyMs={response.latencyMs}
                timestamp={response.timestamp}
              />
            )}
            
            {/* A2A Protocol Note */}
            <Box
              bg="rgba(159, 122, 234, 0.05)"
              border="1px solid"
              borderColor="purple.900"
              borderRadius="lg"
              p={4}
            >
              <HStack spacing={3}>
                <Text fontSize="lg">🔗</Text>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="xs" color="purple.300" fontWeight="500">
                    A2A Protocol
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    This verification used the Agent-to-Agent protocol for 
                    secure, privacy-preserving KYC data sharing.
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KycAgentDetailModal;

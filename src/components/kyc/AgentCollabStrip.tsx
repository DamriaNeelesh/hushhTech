'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Agent icons as simple components
const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11H14.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HushhIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Pulse animation for active connection
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

// Data flow animation
const flowAnimation = keyframes`
  0% { transform: translateX(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100px); opacity: 0; }
`;

interface AgentCollabStripProps {
  bankName: string;
  bankAgentName?: string;
  status: 'idle' | 'connecting' | 'checking' | 'complete' | 'error';
  latencyMs?: number;
}

const AgentCollabStrip: React.FC<AgentCollabStripProps> = ({
  bankName,
  bankAgentName = 'KYC Copilot',
  status,
  latencyMs,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'idle': return 'gray.400';
      case 'connecting': return 'blue.400';
      case 'checking': return 'yellow.400';
      case 'complete': return 'green.400';
      case 'error': return 'red.400';
      default: return 'gray.400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'idle': return 'Ready';
      case 'connecting': return 'Connecting...';
      case 'checking': return 'Verifying KYC...';
      case 'complete': return latencyMs ? `Complete (${latencyMs}ms)` : 'Complete';
      case 'error': return 'Error';
      default: return '';
    }
  };

  const isAnimating = status === 'connecting' || status === 'checking';

  return (
    <Box
      bg="linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.98) 100%)"
      borderRadius="16px"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={4}
      backdropFilter="blur(10px)"
      boxShadow="0 8px 32px rgba(0,0,0,0.3)"
    >
      <Flex align="center" justify="space-between" gap={4}>
        {/* Bank Agent */}
        <VStack spacing={2} minW="120px">
          <Box
            p={3}
            borderRadius="12px"
            bg="blue.500"
            color="white"
            position="relative"
          >
            <BankIcon />
            {isAnimating && (
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                w="10px"
                h="10px"
                borderRadius="full"
                bg="green.400"
                animation={`${pulseAnimation} 1s infinite`}
              />
            )}
          </Box>
          <Text fontSize="xs" fontWeight="600" color="white" textAlign="center">
            {bankName}
          </Text>
          <Text fontSize="2xs" color="whiteAlpha.600" textAlign="center">
            {bankAgentName}
          </Text>
        </VStack>

        {/* Connection Line with Data Flow */}
        <Box flex="1" position="relative" h="40px">
          {/* Base line */}
          <Box
            position="absolute"
            top="50%"
            left="0"
            right="0"
            h="2px"
            bg={getStatusColor()}
            opacity={0.3}
            transform="translateY(-50%)"
          />
          
          {/* Animated data packets */}
          {isAnimating && (
            <>
              <Box
                position="absolute"
                top="50%"
                left="0"
                w="8px"
                h="8px"
                borderRadius="full"
                bg={getStatusColor()}
                transform="translateY(-50%)"
                animation={`${flowAnimation} 1.5s infinite`}
              />
              <Box
                position="absolute"
                top="50%"
                left="0"
                w="8px"
                h="8px"
                borderRadius="full"
                bg={getStatusColor()}
                transform="translateY(-50%)"
                animation={`${flowAnimation} 1.5s infinite 0.5s`}
              />
            </>
          )}

          {/* Status badge */}
          <Badge
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="blackAlpha.600"
            color={getStatusColor()}
            px={3}
            py={1}
            borderRadius="full"
            fontSize="2xs"
            textTransform="none"
          >
            {getStatusText()}
          </Badge>
        </Box>

        {/* Hushh KYC Agent */}
        <VStack spacing={2} minW="120px">
          <Box
            p={3}
            borderRadius="12px"
            bg="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
            color="white"
            position="relative"
          >
            <HushhIcon />
            {isAnimating && (
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                w="10px"
                h="10px"
                borderRadius="full"
                bg="green.400"
                animation={`${pulseAnimation} 1s infinite 0.5s`}
              />
            )}
          </Box>
          <Text fontSize="xs" fontWeight="600" color="white" textAlign="center">
            Hushh
          </Text>
          <Text fontSize="2xs" color="whiteAlpha.600" textAlign="center">
            KYC Agent
          </Text>
        </VStack>
      </Flex>

      {/* Protocol info */}
      <Flex mt={4} justify="center" gap={4}>
        <HStack spacing={1}>
          <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
          <Text fontSize="2xs" color="whiteAlpha.500">A2A Protocol</Text>
        </HStack>
        <HStack spacing={1}>
          <Box w="6px" h="6px" borderRadius="full" bg="blue.400" />
          <Text fontSize="2xs" color="whiteAlpha.500">JSON-RPC 2.0</Text>
        </HStack>
        <HStack spacing={1}>
          <Box w="6px" h="6px" borderRadius="full" bg="purple.400" />
          <Text fontSize="2xs" color="whiteAlpha.500">End-to-End Encrypted</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AgentCollabStrip;

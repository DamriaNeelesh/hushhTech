'use client';

import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { KycAgentsCollabScreenProps } from '../../../types/kyc';
import AgentCollabStrip from '../AgentCollabStrip';

// Pulse animation for step indicators
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

// Data flow animation for the dots
const flowAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

// Icons
const BankIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HushhIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * KYC Agents Collaboration Screen - Screen 3
 * 
 * Shows real-time agent collaboration animation while API call is in progress.
 * This is the "hero moment" of the flow.
 */
const KycAgentsCollabScreen: React.FC<KycAgentsCollabScreenProps> = ({
  isLoading,
  bankName = 'Your Bank',
  steps,
}) => {
  const progressSteps = [
    { id: 1, label: 'Checking existing KYC', active: isLoading },
    { id: 2, label: 'Applying bank policy', active: false },
    { id: 3, label: 'Confirming result', active: false },
  ];

  // Default conversation bubbles while loading
  const defaultBubbles = [
    { 
      actor: 'BANK', 
      message: "I'm checking if we can reuse your existing KYC to save you time..." 
    },
    { 
      actor: 'HUSHH', 
      message: "Looking up verified KYC records from trusted partners..." 
    },
  ];

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)"
      px={4}
      py={8}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <VStack spacing={2} mb={8} textAlign="center" maxW="400px" mx="auto">
        <Heading
          as="h1"
          size="lg"
          color="white"
          fontWeight="600"
        >
          Verifying...
        </Heading>
        <Text fontSize="sm" color="whiteAlpha.600" maxW="300px">
          Our agents are verifying your identity
        </Text>
      </VStack>

      <VStack flex="1" spacing={6} maxW="400px" mx="auto" w="100%">
        {/* Progress Steps */}
        <Flex w="100%" justify="space-between" align="center" px={2}>
          {progressSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <VStack spacing={2}>
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg={step.active 
                    ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                    : 'whiteAlpha.100'
                  }
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  animation={step.active ? `${pulseAnimation} 1.5s infinite` : undefined}
                  border={step.active ? 'none' : '1px solid'}
                  borderColor="whiteAlpha.200"
                >
                  <Text 
                    fontSize="xs" 
                    fontWeight="600" 
                    color={step.active ? 'white' : 'whiteAlpha.500'}
                  >
                    {step.id}
                  </Text>
                </Box>
                <Text 
                  fontSize="2xs" 
                  color={step.active ? 'white' : 'whiteAlpha.400'}
                  textAlign="center"
                  maxW="80px"
                >
                  {step.label}
                </Text>
              </VStack>
              
              {/* Connector line */}
              {index < progressSteps.length - 1 && (
                <Box 
                  flex="1" 
                  h="2px" 
                  bg="whiteAlpha.100"
                  mx={2}
                  position="relative"
                  top="-12px"
                >
                  {step.active && (
                    <Box
                      position="absolute"
                      left="0"
                      top="0"
                      h="2px"
                      w="50%"
                      bg="linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)"
                      borderRadius="full"
                    />
                  )}
                </Box>
              )}
            </React.Fragment>
          ))}
        </Flex>

        {/* Agent Collaboration Hero Section */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)"
          borderRadius="20px"
          border="1px solid"
          borderColor="whiteAlpha.100"
          p={6}
          boxShadow="0 8px 32px rgba(0,0,0,0.4)"
        >
          {/* Agent Icons with Animation */}
          <Flex justify="center" align="center" gap={4} mb={6}>
            {/* Bank Agent */}
            <VStack spacing={2}>
              <Box
                p={3}
                borderRadius="16px"
                bg="blue.500"
                color="white"
                position="relative"
              >
                <BankIcon />
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
              </Box>
              <Text fontSize="xs" fontWeight="600" color="white">
                {bankName}
              </Text>
              <Text fontSize="2xs" color="whiteAlpha.500">
                KYC Copilot
              </Text>
            </VStack>

            {/* Animated Connection */}
            <Flex align="center" gap={1} px={2}>
              {[0, 1, 2, 3].map((i) => (
                <Box
                  key={i}
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
                  animation={`${flowAnimation} 1.2s infinite ${i * 0.2}s`}
                />
              ))}
            </Flex>

            {/* Hushh Agent */}
            <VStack spacing={2}>
              <Box
                p={3}
                borderRadius="16px"
                bg="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
                color="white"
                position="relative"
              >
                <HushhIcon />
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
              </Box>
              <Text fontSize="xs" fontWeight="600" color="white">
                Hushh
              </Text>
              <Text fontSize="2xs" color="whiteAlpha.500">
                KYC Network
              </Text>
            </VStack>
          </Flex>

          {/* Conversation Bubbles */}
          <VStack spacing={3} align="stretch">
            {defaultBubbles.map((bubble, index) => (
              <Flex
                key={index}
                justify={bubble.actor === 'BANK' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  maxW="85%"
                  bg={bubble.actor === 'BANK' 
                    ? 'rgba(59, 130, 246, 0.15)' 
                    : 'rgba(99, 102, 241, 0.15)'
                  }
                  border="1px solid"
                  borderColor={bubble.actor === 'BANK' 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : 'rgba(99, 102, 241, 0.3)'
                  }
                  borderRadius="16px"
                  borderBottomLeftRadius={bubble.actor === 'BANK' ? '4px' : '16px'}
                  borderBottomRightRadius={bubble.actor === 'HUSHH' ? '4px' : '16px'}
                  px={4}
                  py={3}
                >
                  <Text fontSize="xs" color="whiteAlpha.800">
                    {bubble.message}
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Protocol Badges */}
          <Flex mt={5} justify="center" gap={4}>
            <Flex align="center" gap={1}>
              <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
              <Text fontSize="2xs" color="whiteAlpha.500">A2A Protocol</Text>
            </Flex>
            <Flex align="center" gap={1}>
              <Box w="6px" h="6px" borderRadius="full" bg="blue.400" />
              <Text fontSize="2xs" color="whiteAlpha.500">JSON-RPC 2.0</Text>
            </Flex>
          </Flex>
        </Box>

        {/* Result Skeleton Card */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(15,15,25,0.98) 100%)"
          borderRadius="20px"
          border="1px solid"
          borderColor="whiteAlpha.100"
          p={6}
        >
          <VStack spacing={4} align="stretch">
            <Skeleton 
              height="20px" 
              width="60%" 
              borderRadius="8px"
              startColor="whiteAlpha.100"
              endColor="whiteAlpha.200"
            />
            <Skeleton 
              height="16px" 
              width="80%" 
              borderRadius="8px"
              startColor="whiteAlpha.100"
              endColor="whiteAlpha.200"
            />
            <Skeleton 
              height="16px" 
              width="40%" 
              borderRadius="8px"
              startColor="whiteAlpha.100"
              endColor="whiteAlpha.200"
            />
          </VStack>
          
          <Text 
            fontSize="xs" 
            color="whiteAlpha.400" 
            textAlign="center" 
            mt={4}
          >
            Preparing your KYC result...
          </Text>
          <Text 
            fontSize="2xs" 
            color="whiteAlpha.300" 
            textAlign="center" 
            mt={1}
          >
            This usually takes less than 10 seconds.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default KycAgentsCollabScreen;

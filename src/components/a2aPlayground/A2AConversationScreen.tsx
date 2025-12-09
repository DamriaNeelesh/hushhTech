/**
 * A2A Conversation Screen (Screen 2)
 * 
 * The HERO screen showing Bank KYC Copilot and Hushh KYC Agent
 * talking to each other in real-time.
 */
'use client';

import React, { useEffect, useRef } from 'react';
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
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import {
  A2AConversationProps,
  ConversationMessage,
  AgentActor,
} from '../../types/a2aPlayground';

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
// Agent Card Component
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
      bg={isBank ? 'rgba(66, 153, 225, 0.05)' : 'rgba(159, 122, 234, 0.05)'}
      border="2px solid"
      borderColor={isActive 
        ? (isBank ? 'blue.500' : 'purple.500') 
        : 'gray.200'
      }
      borderRadius="xl"
      p={4}
      minW="160px"
      textAlign="center"
      transition="all 0.3s"
      transform={isActive ? 'scale(1.05)' : 'scale(1)'}
      boxShadow={isActive 
        ? `0 4px 12px ${isBank ? 'rgba(66, 153, 225, 0.2)' : 'rgba(159, 122, 234, 0.2)'}`
        : 'sm'
      }
    >
      <Text fontSize="2xl" mb={1}>
        {isBank ? '🏦' : '🔐'}
      </Text>
      <Text color="black" fontSize="sm" fontWeight="600">
        {name}
      </Text>
      <Text color="gray.600" fontSize="xs">
        {subtitle}
      </Text>
      {isActive && (
        <Badge 
          colorScheme={isBank ? 'blue' : 'purple'} 
          mt={2} 
          fontSize="xs"
          animation={`${pulse} 1s infinite`}
        >
          Speaking...
        </Badge>
      )}
    </Box>
  );
};

// =====================================================
// Agent Strip Component
// =====================================================

interface AgentStripProps {
  bankName: string;
  activeAgent: AgentActor | null;
  isRunning: boolean;
}

const AgentStrip: React.FC<AgentStripProps> = ({ bankName, activeAgent, isRunning }) => {
  return (
    <Flex 
      justify="center" 
      align="center" 
      gap={4}
      py={4}
      px={6}
      bg="gray.50"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
    >
      {/* Bank Agent */}
      <AgentCard
        type="BANK"
        name={bankName}
        subtitle="KYC Copilot"
        isActive={activeAgent === 'BANK_AGENT'}
      />

      {/* Connection Line */}
      <Box 
        position="relative" 
        w="100px" 
        h="4px" 
        bg="gray.200"
        borderRadius="full"
        overflow="hidden"
      >
        {isRunning && (
          <>
            <Box
              position="absolute"
              w="8px"
              h="8px"
              bg="purple.400"
              borderRadius="full"
              top="-2px"
              animation={`${flowDots} 1.5s ease-in-out infinite`}
            />
            <Box
              position="absolute"
              w="8px"
              h="8px"
              bg="blue.400"
              borderRadius="full"
              top="-2px"
              animation={`${flowDots} 1.5s ease-in-out infinite 0.5s`}
            />
          </>
        )}
      </Box>

      {/* Hushh Agent */}
      <AgentCard
        type="HUSHH"
        name="Hushh"
        subtitle="KYC Network Agent"
        isActive={activeAgent === 'HUSHH_AGENT'}
      />
    </Flex>
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
      maxW="80%"
    >
      {/* Agent label */}
      <Text 
        fontSize="xs" 
        color={isBank ? 'blue.300' : 'purple.300'}
        fontWeight="600"
        mb={1}
        textAlign={isBank ? 'left' : 'right'}
      >
        {isBank ? `${bankName} – KYC Copilot` : 'Hushh KYC Agent'}
      </Text>
      
      {/* Message bubble */}
      <Box
        bg={isBank ? 'rgba(66, 153, 225, 0.08)' : 'rgba(159, 122, 234, 0.08)'}
        border="1px solid"
        borderColor={isBank ? 'blue.200' : 'purple.200'}
        borderRadius="xl"
        borderTopLeftRadius={isBank ? '4px' : 'xl'}
        borderTopRightRadius={isBank ? 'xl' : '4px'}
        px={4}
        py={3}
      >
        <Text color="black" fontSize="sm" lineHeight="1.6">
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
        fontSize="xs" 
        color="gray.500" 
        mt={1}
        textAlign={isBank ? 'left' : 'right'}
      >
        {message.timestamp.toLocaleTimeString()}
      </Text>
    </Box>
  );
};

// =====================================================
// Status Panel Component
// =====================================================

interface StatusPanelProps {
  isRunning: boolean;
  messageCount: number;
  result: A2AConversationProps['result'];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ isRunning, messageCount, result }) => {
  return (
    <Box
      bg="gray.50"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={4}
    >
      <Text fontSize="xs" color="gray.600" fontWeight="600" mb={3} textTransform="uppercase">
        Status
      </Text>
      
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.600">State</Text>
          <Badge colorScheme={isRunning ? 'yellow' : (result ? 'green' : 'gray')}>
            {isRunning ? 'Running...' : (result ? 'Complete' : 'Idle')}
          </Badge>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.600">Messages</Text>
          <Text fontSize="sm" color="black">{messageCount}</Text>
        </HStack>
        
        {result && (
          <>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">KYC Status</Text>
              <Badge colorScheme={result.kycDecision.status === 'PASS' ? 'green' : 'yellow'}>
                {result.kycDecision.status}
              </Badge>
            </HStack>
            
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Risk</Text>
              <Text fontSize="sm" color="black">{result.kycDecision.verifiedVia.riskBand}</Text>
            </HStack>
            
            {result.keyMatchResult !== undefined && (
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Key Match</Text>
                <Badge colorScheme={result.keyMatchResult ? 'green' : 'red'}>
                  {result.keyMatchResult ? 'Match ✓' : 'No Match'}
                </Badge>
              </HStack>
            )}
            
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Duration</Text>
              <Text fontSize="sm" color="black">{(result.totalDurationMs / 1000).toFixed(1)}s</Text>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

// =====================================================
// Main Component
// =====================================================

export const A2AConversationScreen: React.FC<A2AConversationProps> = ({
  config,
  messages,
  isRunning,
  result,
  onViewResult,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Determine which agent is currently active
  const activeAgent = isRunning && messages.length > 0 
    ? messages[messages.length - 1].actor 
    : null;

  return (
    <Box
      minH="100vh"
      bg="white"
      py={6}
    >
      <Container maxW="6xl">
        {/* Header */}
        <VStack spacing={2} mb={6} textAlign="center">
          <Text color="gray.600" fontSize="sm">
            Verifying <Text as="span" color="black" fontWeight="600">{config.user.fullName}</Text> with two AI agents
          </Text>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="600"
            color="black"
          >
            {config.relyingParty.name} • KYC Copilot × Hushh • KYC Network Agent
          </Text>
        </VStack>

        {/* Agent Strip */}
        <Box mb={6}>
          <AgentStrip
            bankName={config.relyingParty.name}
            activeAgent={activeAgent}
            isRunning={isRunning}
          />
        </Box>

        {/* Main Content */}
        <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
          {/* Conversation Log */}
          <Box flex={1}>
            <Box
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              p={4}
              minH="400px"
              maxH="60vh"
              overflowY="auto"
            >
              {messages.length === 0 ? (
                <VStack h="200px" justify="center" spacing={4}>
                  <Skeleton height="40px" width="80%" borderRadius="xl" />
                  <Skeleton height="40px" width="60%" borderRadius="xl" alignSelf="flex-end" />
                  <Skeleton height="40px" width="70%" borderRadius="xl" />
                  <Text color="gray.600" fontSize="sm">
                    Waiting for conversation to start...
                  </Text>
                </VStack>
              ) : (
                <VStack spacing={4} align="stretch">
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      bankName={config.relyingParty.name}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </VStack>
              )}
            </Box>
          </Box>

          {/* Side Panel */}
          <Box w={{ base: '100%', lg: '280px' }}>
            <VStack spacing={4}>
              {/* Status Panel */}
              <StatusPanel
                isRunning={isRunning}
                messageCount={messages.length}
                result={result}
              />

              {/* View Result Button */}
              {result && !isRunning && (
                <Button
                  colorScheme="green"
                  size="lg"
                  w="100%"
                  onClick={onViewResult}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(72, 187, 120, 0.4)',
                  }}
                >
                  View Full Result →
                </Button>
              )}

              {/* A2A Protocol Info */}
              <Box
                bg="purple.50"
                border="1px solid"
                borderColor="purple.200"
                borderRadius="xl"
                p={4}
              >
                <HStack spacing={3}>
                  <Text fontSize="lg">🔗</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="xs" color="purple.600" fontWeight="500">
                      A2A Protocol
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      JSON-RPC 2.0 over HTTPS
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default A2AConversationScreen;

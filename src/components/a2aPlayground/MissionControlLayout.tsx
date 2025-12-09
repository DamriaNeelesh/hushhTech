'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AgentThoughtLog } from './AgentThoughtLog';
import { TrustGauge } from './TrustGauge';
import { DataVaultCard, DataVaultProgress, EncryptionBadge } from './DataVaultCard';
import type { ConversationMessage } from '../../types/a2aPlayground';

type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface MissionControlLayoutProps {
  // Left pane - Agent Network
  agents: {
    requester: { name: string; status: 'connected' | 'negotiating' | 'idle' };
    oracle: { name: string; status: 'connected' | 'processing' | 'idle' };
  };

  // Center pane - Terminal Messages
  messages: ConversationMessage[];
  isProcessing?: boolean;

  // Right pane - Live State
  trustScore: number;
  riskBand?: RiskBand;
  dataFields: Array<{
    name: string;
    label: string;
    value: string | null;
    status: 'locked' | 'unlocking' | 'unlocked' | 'protected';
    isSensitive?: boolean;
  }>;

  // Thought log
  thoughts: string[];
  decisionSummary?: string;

  children?: React.ReactNode;
}

/**
 * MissionControlLayout - 3-pane layout for the A2A Playground
 * Left: Agent Network | Center: Terminal | Right: Live State
 */
export const MissionControlLayout: React.FC<MissionControlLayoutProps> = ({
  agents,
  messages,
  isProcessing = false,
  trustScore,
  riskBand,
  dataFields,
  thoughts,
  decisionSummary,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Count unlocked fields
  const unlockedCount = dataFields.filter(f => f.status === 'unlocked').length;

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      p={{ base: 2, md: 4 }}
    >
      {/* Header */}
      <HStack
        justify="space-between"
        mb={4}
        p={4}
        bg="blackAlpha.600"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.700"
      >
        <HStack spacing={4}>
          <Heading size="md" fontFamily="mono" color="green.400">
            🛡️ MISSION CONTROL
          </Heading>
          <Badge colorScheme="green" variant="subtle" fontSize="xs">
            A2A PROTOCOL v1.0
          </Badge>
        </HStack>
        <HStack spacing={4}>
          <EncryptionBadge isActive={isProcessing} />
          <ConnectionStatus agents={agents} />
        </HStack>
      </HStack>

      {/* Main 3-pane layout */}
      <Grid
        templateColumns={{ base: '1fr', lg: '280px 1fr 320px' }}
        gap={4}
        h={{ base: 'auto', lg: 'calc(100vh - 140px)' }}
      >
        {/* Left Pane - Agent Network */}
        {!isMobile && (
          <GridItem>
            <VStack
              h="full"
              bg="blackAlpha.600"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              p={4}
              spacing={4}
              align="stretch"
            >
              <Text
                fontSize="xs"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                🌐 Agent Network
              </Text>
              
              <AgentNetworkVisualization agents={agents} />
              
              <Divider borderColor="gray.700" />
              
              {/* Thought log */}
              <AgentThoughtLog
                thoughts={thoughts}
                decisionSummary={decisionSummary}
                isActive={isProcessing}
                agentName="HUSHH_IDENTITY_ORACLE"
              />
            </VStack>
          </GridItem>
        )}

        {/* Center Pane - Terminal Messages */}
        <GridItem>
          <VStack
            h="full"
            bg="black"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.700"
            overflow="hidden"
            spacing={0}
          >
            {/* Terminal header */}
            <HStack
              w="full"
              px={4}
              py={2}
              bg="gray.800"
              borderBottom="1px solid"
              borderColor="gray.700"
              justify="space-between"
            >
              <HStack spacing={2}>
                <Box w={3} h={3} borderRadius="full" bg="red.400" />
                <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
                <Box w={3} h={3} borderRadius="full" bg="green.400" />
              </HStack>
              <Text fontSize="xs" color="gray.500" fontFamily="mono">
                a2a-protocol-terminal
              </Text>
              <HStack spacing={2}>
                {isProcessing && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Badge colorScheme="green" variant="solid" fontSize="10px">
                      LIVE
                    </Badge>
                  </motion.div>
                )}
                <Badge colorScheme="blue" variant="outline" fontSize="10px">
                  {messages.length} MSG
                </Badge>
              </HStack>
            </HStack>

            {/* Messages area */}
            <Box
              flex={1}
              w="full"
              overflowY="auto"
              p={4}
              css={{
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: '#1a1a1a' },
                '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: '3px' },
              }}
            >
              <VStack align="stretch" spacing={3}>
                {messages.map((msg, index) => (
                  <TerminalMessage key={msg.id || index} message={msg} />
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <HStack spacing={2} color="green.400">
                      <Text fontFamily="mono" fontSize="sm">▶ Processing</Text>
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        >
                          .
                        </motion.span>
                      ))}
                    </HStack>
                  </motion.div>
                )}
              </VStack>
            </Box>

            {/* Custom children (e.g., input area) */}
            {children}
          </VStack>
        </GridItem>

        {/* Right Pane - Live State */}
        <GridItem>
          <VStack
            h="full"
            bg="blackAlpha.600"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.700"
            p={4}
            spacing={4}
            align="stretch"
            overflowY="auto"
          >
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              📊 Live State
            </Text>

            {/* Trust Gauge */}
            <TrustGauge
              score={trustScore}
              riskBand={riskBand}
              showAnimation={true}
            />

            {/* Vault Progress */}
            <DataVaultProgress
              totalFields={dataFields.length}
              unlockedFields={unlockedCount}
            />

            {/* Data Vault */}
            <DataVaultCard fields={dataFields} />

            {/* Mobile-only thought log */}
            {isMobile && thoughts.length > 0 && (
              <AgentThoughtLog
                thoughts={thoughts}
                decisionSummary={decisionSummary}
                isActive={isProcessing}
              />
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

/**
 * Agent Network Visualization - Shows connection between agents
 */
const AgentNetworkVisualization: React.FC<{
  agents: MissionControlLayoutProps['agents'];
}> = ({ agents }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green.400';
      case 'negotiating':
      case 'processing': return 'yellow.400';
      default: return 'gray.500';
    }
  };

  return (
    <VStack spacing={6} py={4}>
      {/* Requester Agent */}
      <AgentNode
        name={agents.requester.name}
        role="VERIFIER NODE"
        color={getStatusColor(agents.requester.status)}
        status={agents.requester.status}
      />

      {/* Connection line */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <VStack spacing={1}>
          <Box h={8} w="2px" bg="blue.500" />
          <Box
            w={4}
            h={4}
            borderRadius="full"
            border="2px solid"
            borderColor="blue.400"
            bg="blackAlpha.800"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box w={2} h={2} borderRadius="full" bg="blue.400" />
          </Box>
          <Box h={8} w="2px" bg="blue.500" />
        </VStack>
      </motion.div>

      {/* Oracle Agent */}
      <AgentNode
        name={agents.oracle.name}
        role="IDENTITY ORACLE"
        color={getStatusColor(agents.oracle.status)}
        status={agents.oracle.status}
      />
    </VStack>
  );
};

/**
 * Individual agent node
 */
const AgentNode: React.FC<{
  name: string;
  role: string;
  color: string;
  status: string;
}> = ({ name, role, color, status }) => (
  <VStack
    p={3}
    bg="blackAlpha.700"
    borderRadius="lg"
    border="1px solid"
    borderColor={color}
    w="full"
    spacing={2}
  >
    <HStack spacing={2}>
      <motion.div
        animate={status !== 'idle' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.8, repeat: status !== 'idle' ? Infinity : 0 }}
      >
        <Box w={2} h={2} borderRadius="full" bg={color} />
      </motion.div>
      <Text fontSize="xs" color="gray.400" textTransform="uppercase">
        {role}
      </Text>
    </HStack>
    <Text fontSize="sm" fontWeight="bold" fontFamily="mono" color="white">
      {name}
    </Text>
    <Badge
      colorScheme={status === 'idle' ? 'gray' : status === 'connected' ? 'green' : 'yellow'}
      variant="subtle"
      fontSize="10px"
    >
      {status.toUpperCase()}
    </Badge>
  </VStack>
);

/**
 * Terminal message component
 */
const TerminalMessage: React.FC<{ message: ConversationMessage }> = ({ message }) => {
  const isHushh = message.actor === 'HUSHH_AGENT';
  const stageColor = message.stage === 'ERROR' ? 'red.400' :
                     message.stage === 'EXPORT_COMPLETE' ? 'green.400' :
                     message.stage === 'CHECKING' ? 'yellow.400' : 'blue.400';

  return (
    <motion.div
      initial={{ opacity: 0, x: isHushh ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={3}
        bg={isHushh ? 'green.900' : 'blue.900'}
        borderLeft="3px solid"
        borderColor={isHushh ? 'green.400' : 'blue.400'}
        borderRadius="md"
        opacity={0.9}
      >
        <HStack justify="space-between" mb={1}>
          <HStack spacing={2}>
            <Text fontSize="xs" color="gray.400" fontFamily="mono">
              {isHushh ? '🛡️ ORACLE' : '🏦 VERIFIER'}
            </Text>
            <Badge
              colorScheme={message.stage === 'ERROR' ? 'red' : message.stage === 'EXPORT_COMPLETE' ? 'green' : 'blue'}
              variant="subtle"
              fontSize="8px"
            >
              {message.stage?.toUpperCase() || 'MSG'}
            </Badge>
          </HStack>
          <Text fontSize="10px" color="gray.500" fontFamily="mono">
            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()}
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.100" whiteSpace="pre-wrap">
          {message.message}
        </Text>
      </Box>
    </motion.div>
  );
};

/**
 * Connection status indicator
 */
const ConnectionStatus: React.FC<{
  agents: MissionControlLayoutProps['agents'];
}> = ({ agents }) => {
  const isConnected = agents.requester.status !== 'idle' && agents.oracle.status !== 'idle';

  return (
    <HStack
      px={3}
      py={1}
      bg="blackAlpha.600"
      borderRadius="full"
      border="1px solid"
      borderColor={isConnected ? 'green.700' : 'gray.600'}
      spacing={2}
    >
      <motion.div
        animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: isConnected ? Infinity : 0 }}
      >
        <Box
          w={2}
          h={2}
          borderRadius="full"
          bg={isConnected ? 'green.400' : 'gray.500'}
        />
      </motion.div>
      <Text fontSize="xs" color={isConnected ? 'green.300' : 'gray.500'}>
        {isConnected ? 'CONNECTED' : 'STANDBY'}
      </Text>
    </HStack>
  );
};

export default MissionControlLayout;

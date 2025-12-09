'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Code,
  Collapse,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

// Icons
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ReceiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12H16L13 19L11 5L8 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface ConversationEntry {
  id: string;
  timestamp: string;
  direction: 'request' | 'response';
  from: string;
  to: string;
  method?: string;
  status?: 'pending' | 'success' | 'error';
  summary: string;
  payload?: object;
  latencyMs?: number;
}

interface AgentConversationLogProps {
  entries: ConversationEntry[];
  maxHeight?: string;
}

const ConversationEntryCard: React.FC<{ entry: ConversationEntry }> = ({ entry }) => {
  const { isOpen, onToggle } = useDisclosure();
  
  const isRequest = entry.direction === 'request';
  const bgColor = isRequest 
    ? 'rgba(59, 130, 246, 0.1)' 
    : 'rgba(139, 92, 246, 0.1)';
  const borderColor = isRequest 
    ? 'rgba(59, 130, 246, 0.3)' 
    : 'rgba(139, 92, 246, 0.3)';
  const iconBg = isRequest ? 'blue.500' : 'purple.500';

  const getStatusBadge = () => {
    if (!entry.status) return null;
    const colorScheme = {
      pending: 'yellow',
      success: 'green',
      error: 'red',
    }[entry.status];
    return (
      <Badge colorScheme={colorScheme} fontSize="2xs" px={2} borderRadius="full">
        {entry.status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Box
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="12px"
      p={3}
      _hover={{ borderColor: isRequest ? 'blue.400' : 'purple.400' }}
      transition="all 0.2s"
    >
      <Flex align="flex-start" gap={3}>
        {/* Direction Icon */}
        <Box
          p={2}
          borderRadius="8px"
          bg={iconBg}
          color="white"
          flexShrink={0}
        >
          {isRequest ? <SendIcon /> : <ReceiveIcon />}
        </Box>

        {/* Content */}
        <VStack align="stretch" flex="1" spacing={2}>
          {/* Header */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
            <HStack spacing={2}>
              <Text fontSize="xs" fontWeight="600" color="white">
                {entry.from}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500">→</Text>
              <Text fontSize="xs" fontWeight="600" color="white">
                {entry.to}
              </Text>
            </HStack>
            <HStack spacing={2}>
              {entry.method && (
                <Badge 
                  bg="whiteAlpha.100" 
                  color="whiteAlpha.800" 
                  fontSize="2xs" 
                  px={2} 
                  borderRadius="full"
                  fontFamily="mono"
                >
                  {entry.method}
                </Badge>
              )}
              {getStatusBadge()}
              {entry.latencyMs && (
                <Text fontSize="2xs" color="whiteAlpha.500">
                  {entry.latencyMs}ms
                </Text>
              )}
            </HStack>
          </Flex>

          {/* Summary */}
          <Text fontSize="sm" color="whiteAlpha.800">
            {entry.summary}
          </Text>

          {/* Timestamp */}
          <Text fontSize="2xs" color="whiteAlpha.400">
            {entry.timestamp}
          </Text>

          {/* Expandable Payload */}
          {entry.payload && (
            <>
              <Flex
                as="button"
                onClick={onToggle}
                align="center"
                gap={1}
                color="whiteAlpha.500"
                _hover={{ color: 'whiteAlpha.700' }}
                transition="all 0.2s"
                cursor="pointer"
                bg="transparent"
                border="none"
                p={0}
              >
                <Text fontSize="2xs">View Payload</Text>
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Flex>
              <Collapse in={isOpen}>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  fontSize="xs"
                  p={3}
                  borderRadius="8px"
                  bg="blackAlpha.400"
                  color="green.300"
                  overflowX="auto"
                >
                  {JSON.stringify(entry.payload, null, 2)}
                </Code>
              </Collapse>
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

const AgentConversationLog: React.FC<AgentConversationLogProps> = ({
  entries,
  maxHeight = '400px',
}) => {
  return (
    <Box
      bg="linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(15,15,25,0.98) 100%)"
      borderRadius="16px"
      border="1px solid"
      borderColor="whiteAlpha.100"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        p={4}
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        align="center"
        justify="space-between"
      >
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg="green.400" />
          <Text fontSize="sm" fontWeight="600" color="white">
            Agent Conversation Log
          </Text>
        </HStack>
        <Badge bg="whiteAlpha.100" color="whiteAlpha.600" fontSize="2xs">
          {entries.length} messages
        </Badge>
      </Flex>

      {/* Conversation Entries */}
      <Box maxH={maxHeight} overflowY="auto" p={4}>
        <VStack spacing={3} align="stretch">
          {entries.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              h="100px"
              color="whiteAlpha.400"
            >
              <Text fontSize="sm">No conversation yet</Text>
            </Flex>
          ) : (
            entries.map((entry) => (
              <ConversationEntryCard key={entry.id} entry={entry} />
            ))
          )}
        </VStack>
      </Box>

      {/* Footer with Protocol Info */}
      <Flex
        p={3}
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        justify="center"
        gap={4}
      >
        <Text fontSize="2xs" color="whiteAlpha.400">
          Protocol: A2A v1.0
        </Text>
        <Text fontSize="2xs" color="whiteAlpha.400">
          Format: JSON-RPC 2.0
        </Text>
        <Text fontSize="2xs" color="whiteAlpha.400">
          Encryption: TLS 1.3
        </Text>
      </Flex>
    </Box>
  );
};

export default AgentConversationLog;

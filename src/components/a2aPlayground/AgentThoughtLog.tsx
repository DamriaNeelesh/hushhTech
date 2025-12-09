'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Text, VStack, HStack, Icon, Collapse, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface AgentThoughtLogProps {
  thoughts: string[];
  decisionSummary?: string;
  isActive?: boolean;
  agentName?: string;
}

/**
 * AgentThoughtLog - Displays the AI agent's internal reasoning process
 * Styled as a cyber-terminal with green-on-black aesthetic
 */
export const AgentThoughtLog: React.FC<AgentThoughtLogProps> = ({
  thoughts,
  decisionSummary,
  isActive = false,
  agentName = 'HUSHH_KYC_AGENT',
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box
      bg="black"
      border="1px solid"
      borderColor="green.800"
      borderRadius="md"
      overflow="hidden"
      boxShadow="0 0 20px rgba(0, 255, 0, 0.1)"
      fontFamily="mono"
      fontSize="xs"
    >
      {/* Header - Click to collapse */}
      <HStack
        px={4}
        py={2}
        bg="gray.900"
        borderBottom="1px solid"
        borderColor="green.800"
        cursor="pointer"
        onClick={onToggle}
        _hover={{ bg: 'gray.800' }}
        transition="background 0.2s"
      >
        <HStack flex={1} spacing={2}>
          {isActive && (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#48BB78',
              }}
            />
          )}
          <Text color="green.400" textTransform="uppercase" letterSpacing="widest" fontSize="10px">
            💭 Neural Core {isActive ? 'Active' : 'Idle'}
          </Text>
        </HStack>
        <Text color="gray.500" fontSize="10px">
          {agentName}
        </Text>
        <Icon
          as={isOpen ? ChevronUpIcon : ChevronDownIcon}
          color="green.400"
          boxSize={4}
        />
      </HStack>

      {/* Collapsible content */}
      <Collapse in={isOpen} animateOpacity>
        <VStack align="stretch" p={4} spacing={2}>
          {/* Thought lines with animation */}
          <AnimatePresence mode="popLayout">
            {thoughts.map((thought, index) => (
              <motion.div
                key={`thought-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <HStack align="flex-start" spacing={2}>
                  <Text color="gray.600" flexShrink={0}>
                    [{new Date().toLocaleTimeString('en-US', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}]
                  </Text>
                  <Text color="green.300">{thought}</Text>
                </HStack>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Decision summary */}
          {decisionSummary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: thoughts.length * 0.1 + 0.2 }}
            >
              <Box
                mt={3}
                pt={3}
                borderTop="1px dashed"
                borderColor="green.800"
              >
                <HStack spacing={2}>
                  <Text color="cyan.400" fontWeight="bold">
                    ▶ DECISION:
                  </Text>
                  <Text color="cyan.200">{decisionSummary}</Text>
                </HStack>
              </Box>
            </motion.div>
          )}

          {/* Processing indicator when active */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <HStack spacing={1} pt={2}>
                <Text color="green.500">Processing</Text>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    style={{ color: '#48BB78' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </HStack>
            </motion.div>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

/**
 * Mini thought indicator - Shows brief processing status
 */
export const ThoughtIndicator: React.FC<{ text: string; isActive?: boolean }> = ({
  text,
  isActive = true,
}) => {
  return (
    <HStack
      px={3}
      py={1}
      bg="blackAlpha.700"
      borderRadius="full"
      border="1px solid"
      borderColor="green.700"
      spacing={2}
    >
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#48BB78',
          }}
        />
      )}
      <Text
        fontFamily="mono"
        fontSize="10px"
        color="green.300"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {text}
      </Text>
    </HStack>
  );
};

export default AgentThoughtLog;

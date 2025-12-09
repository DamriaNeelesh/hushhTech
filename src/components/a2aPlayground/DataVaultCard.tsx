'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Text, VStack, HStack, Icon, SimpleGrid, Badge } from '@chakra-ui/react';
import { LockIcon, UnlockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type FieldStatus = 'locked' | 'unlocking' | 'unlocked' | 'protected';

interface DataField {
  name: string;
  label: string;
  value: string | null;
  status: FieldStatus;
  isSensitive?: boolean;
}

interface DataVaultCardProps {
  fields: DataField[];
  title?: string;
}

/**
 * DataVaultCard - Visualizes data fields as locked/unlocked cards
 * Shows the data vault with encryption status for each field
 */
export const DataVaultCard: React.FC<DataVaultCardProps> = ({
  fields,
  title = 'Identity Data Vault',
}) => {
  return (
    <Box
      p={5}
      bg="blackAlpha.800"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="xl"
      backdropFilter="blur(10px)"
    >
      <HStack mb={4} spacing={2}>
        <Icon as={LockIcon} color="blue.400" boxSize={4} />
        <Text
          color="gray.300"
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="widest"
          fontWeight="bold"
        >
          {title}
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        {fields.map((field) => (
          <FieldCard key={field.name} field={field} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

/**
 * Individual field card with lock/unlock animation
 */
const FieldCard: React.FC<{ field: DataField }> = ({ field }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Status colors and icons
  const getStatusConfig = () => {
    switch (field.status) {
      case 'locked':
        return {
          icon: LockIcon,
          color: 'red.400',
          bg: 'red.900',
          borderColor: 'red.700',
          label: 'LOCKED',
        };
      case 'unlocking':
        return {
          icon: LockIcon,
          color: 'yellow.400',
          bg: 'yellow.900',
          borderColor: 'yellow.700',
          label: 'UNLOCKING...',
        };
      case 'unlocked':
        return {
          icon: UnlockIcon,
          color: 'green.400',
          bg: 'green.900',
          borderColor: 'green.700',
          label: 'VERIFIED',
        };
      case 'protected':
        return {
          icon: LockIcon,
          color: 'blue.400',
          bg: 'blue.900',
          borderColor: 'blue.700',
          label: 'KEY EXCHANGE',
        };
      default:
        return {
          icon: LockIcon,
          color: 'gray.400',
          bg: 'gray.800',
          borderColor: 'gray.600',
          label: 'UNKNOWN',
        };
    }
  };

  const config = getStatusConfig();

  // Mask sensitive data
  const getMaskedValue = () => {
    if (!field.value) return '—';
    if (!field.isSensitive || isRevealed) return field.value;
    
    // Mask most of the value
    if (field.name === 'ssn') {
      return '***-**-' + field.value.slice(-4);
    }
    if (field.name === 'phone') {
      return field.value.slice(0, 4) + '****' + field.value.slice(-4);
    }
    if (field.name === 'email') {
      const [local, domain] = field.value.split('@');
      return local.slice(0, 2) + '***@' + domain;
    }
    return field.value.slice(0, 3) + '***';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={3}
        bg={config.bg}
        border="1px solid"
        borderColor={config.borderColor}
        borderRadius="lg"
        position="relative"
        overflow="hidden"
      >
        {/* Unlocking animation overlay */}
        <AnimatePresence>
          {field.status === 'unlocking' && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(72, 187, 120, 0.3), transparent)',
                transformOrigin: 'left',
              }}
            />
          )}
        </AnimatePresence>

        <VStack align="stretch" spacing={2}>
          {/* Header with label and status */}
          <HStack justify="space-between">
            <Text
              fontSize="xs"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {field.label}
            </Text>
            <HStack spacing={1}>
              <motion.div
                animate={field.status === 'unlocking' ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5, repeat: field.status === 'unlocking' ? Infinity : 0 }}
              >
                <Icon as={config.icon} color={config.color} boxSize={3} />
              </motion.div>
              <Badge
                fontSize="8px"
                colorScheme={
                  field.status === 'unlocked' ? 'green' :
                  field.status === 'protected' ? 'blue' :
                  field.status === 'unlocking' ? 'yellow' : 'red'
                }
                variant="subtle"
              >
                {config.label}
              </Badge>
            </HStack>
          </HStack>

          {/* Value display */}
          <HStack justify="space-between">
            <Text
              fontSize="sm"
              fontFamily="mono"
              color={field.status === 'locked' ? 'gray.500' : 'white'}
              style={{
                filter: field.status === 'locked' ? 'blur(4px)' : 'none',
              }}
            >
              {field.status === 'locked' ? '••••••••' : getMaskedValue()}
            </Text>

            {/* Reveal toggle for sensitive data */}
            {field.isSensitive && field.status === 'unlocked' && (
              <Icon
                as={isRevealed ? ViewOffIcon : ViewIcon}
                color="gray.400"
                boxSize={4}
                cursor="pointer"
                _hover={{ color: 'white' }}
                onClick={() => setIsRevealed(!isRevealed)}
              />
            )}
          </HStack>
        </VStack>

        {/* Lock icon overlay for locked state */}
        {field.status === 'locked' && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0.3}
          >
            <Icon as={LockIcon} color="red.400" boxSize={8} />
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

/**
 * DataVaultProgress - Shows overall vault unlock progress
 */
export const DataVaultProgress: React.FC<{
  totalFields: number;
  unlockedFields: number;
}> = ({ totalFields, unlockedFields }) => {
  const percentage = Math.round((unlockedFields / totalFields) * 100);

  return (
    <HStack spacing={4} p={3} bg="blackAlpha.600" borderRadius="md">
      <VStack align="flex-start" spacing={0} flex={1}>
        <Text fontSize="xs" color="gray.400" textTransform="uppercase">
          Vault Access
        </Text>
        <HStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {unlockedFields}/{totalFields}
          </Text>
          <Text fontSize="sm" color="gray.500">
            fields unlocked
          </Text>
        </HStack>
      </VStack>
      
      <Box w={24} h={2} bg="gray.700" borderRadius="full" overflow="hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4299E1, #48BB78)',
            borderRadius: '9999px',
          }}
        />
      </Box>
      
      <Text fontSize="sm" fontFamily="mono" color="green.400">
        {percentage}%
      </Text>
    </HStack>
  );
};

/**
 * EncryptionBadge - Shows encryption status
 */
export const EncryptionBadge: React.FC<{
  algorithm?: string;
  isActive?: boolean;
}> = ({ algorithm = 'AES-256-GCM', isActive = true }) => {
  return (
    <HStack
      px={3}
      py={1.5}
      bg="blackAlpha.700"
      borderRadius="full"
      border="1px solid"
      borderColor={isActive ? 'green.700' : 'gray.600'}
      spacing={2}
    >
      {isActive && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box w={2} h={2} borderRadius="full" bg="green.400" />
        </motion.div>
      )}
      <Icon as={LockIcon} color={isActive ? 'green.400' : 'gray.500'} boxSize={3} />
      <Text
        fontSize="xs"
        fontFamily="mono"
        color={isActive ? 'green.300' : 'gray.500'}
        textTransform="uppercase"
      >
        {algorithm}
      </Text>
    </HStack>
  );
};

export default DataVaultCard;

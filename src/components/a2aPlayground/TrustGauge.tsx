'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';

interface TrustGaugeProps {
  score: number; // 0.0 to 1.0
  riskBand?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  label?: string;
  showAnimation?: boolean;
}

/**
 * TrustGauge - Animated trust score visualization
 * Displays a progress bar with color gradient and risk band indicator
 */
export const TrustGauge: React.FC<TrustGaugeProps> = ({
  score,
  riskBand,
  label = 'Identity Trust Score',
  showAnimation = true,
}) => {
  const [displayScore, setDisplayScore] = useState(showAnimation ? 0 : score);
  const percentage = Math.round(displayScore * 100);

  // Animate score counting up
  useEffect(() => {
    if (!showAnimation) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const steps = 50;
    const increment = score / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score, showAnimation]);

  // Determine color based on score
  const getScoreColor = () => {
    if (displayScore >= 0.75) return '#48BB78'; // green.400
    if (displayScore >= 0.5) return '#ECC94B';  // yellow.400
    if (displayScore >= 0.3) return '#ED8936';  // orange.400
    return '#F56565'; // red.400
  };

  // Risk band colors
  const getRiskBandColor = () => {
    switch (riskBand) {
      case 'LOW': return 'green';
      case 'MEDIUM': return 'yellow';
      case 'HIGH': return 'orange';
      case 'CRITICAL': return 'red';
      default: return 'gray';
    }
  };

  // Risk band label
  const getRiskBandLabel = () => {
    switch (riskBand) {
      case 'LOW': return '✅ VERIFIED';
      case 'MEDIUM': return '⚠️ PENDING CHECKS';
      case 'HIGH': return '🔴 MANUAL REVIEW';
      case 'CRITICAL': return '🚨 BLOCKED';
      default: return 'CALCULATING...';
    }
  };

  return (
    <Box
      p={6}
      bg="blackAlpha.700"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="xl"
      backdropFilter="blur(10px)"
    >
      <Text
        color="gray.400"
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="widest"
        mb={4}
      >
        {label}
      </Text>

      {/* Progress bar */}
      <Box
        position="relative"
        h={4}
        bg="gray.800"
        borderRadius="full"
        overflow="hidden"
        mb={4}
      >
        {/* Gradient background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to right, #F56565, #ED8936, #ECC94B, #48BB78)"
          opacity={0.3}
        />
        
        {/* Animated progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: `linear-gradient(to right, #F56565, #ED8936, #ECC94B, #48BB78)`,
            borderRadius: '9999px',
            boxShadow: `0 0 20px ${getScoreColor()}40`,
          }}
        />

        {/* Glow effect on the edge */}
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `calc(${percentage}% - 4px)` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0,
            width: '8px',
            height: '100%',
            background: getScoreColor(),
            borderRadius: '9999px',
            boxShadow: `0 0 15px ${getScoreColor()}, 0 0 30px ${getScoreColor()}`,
          }}
        />
      </Box>

      {/* Score and status */}
      <HStack justify="space-between" align="flex-end">
        <VStack align="flex-start" spacing={1}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <Text
              fontSize="4xl"
              fontWeight="bold"
              color="white"
              lineHeight={1}
            >
              {percentage}%
            </Text>
          </motion.div>
          
          {displayScore >= 0.8 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Text fontSize="xs" color="green.400">
                ★ High Confidence
              </Text>
            </motion.div>
          )}
        </VStack>

        <VStack align="flex-end" spacing={2}>
          {riskBand && (
            <Badge
              colorScheme={getRiskBandColor()}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
            >
              {riskBand}
            </Badge>
          )}
          <Text
            fontSize="sm"
            fontFamily="mono"
            color={`${getRiskBandColor()}.400`}
          >
            {getRiskBandLabel()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

/**
 * Mini trust indicator - Compact version for lists
 */
export const TrustIndicator: React.FC<{ score: number }> = ({ score }) => {
  const percentage = Math.round(score * 100);
  
  const getColor = () => {
    if (score >= 0.75) return 'green.400';
    if (score >= 0.5) return 'yellow.400';
    if (score >= 0.3) return 'orange.400';
    return 'red.400';
  };

  return (
    <HStack spacing={2}>
      <Box
        w={12}
        h={1.5}
        bg="gray.700"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          w={`${percentage}%`}
          h="100%"
          bg={getColor()}
          borderRadius="full"
        />
      </Box>
      <Text fontSize="xs" fontFamily="mono" color={getColor()}>
        {percentage}%
      </Text>
    </HStack>
  );
};

/**
 * Animated score counter
 */
export const ScoreCounter: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}> = ({ value, prefix = '', suffix = '%', duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const steps = 50;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <Text fontSize="3xl" fontWeight="bold" fontFamily="mono" color="white">
      {prefix}{displayValue}{suffix}
    </Text>
  );
};

export default TrustGauge;

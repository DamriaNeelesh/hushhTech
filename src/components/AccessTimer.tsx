// 30-Minute Access Timer Component
// Beautiful circular countdown with progress ring

import { Box, Text, VStack, HStack, Icon, Progress } from '@chakra-ui/react';
import { Clock, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AccessTimerProps {
  expiresAt: string; // ISO timestamp
  onExpired: () => void;
}

export function AccessTimer({ expiresAt, onExpired }: AccessTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 30, seconds: 0 });
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeRemaining({ minutes: 0, seconds: 0 });
        setPercentage(0);
        clearInterval(interval);
        onExpired();
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        setTimeRemaining({ minutes, seconds });
        
        // Calculate percentage (30 min = 1800 seconds)
        const percentRemaining = (totalSeconds / 1800) * 100;
        setPercentage(Math.max(0, Math.min(100, percentRemaining)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpired]);

  const isLowTime = timeRemaining.minutes < 5;
  const isVeryLowTime = timeRemaining.minutes < 2;

  return (
    <Box
      position="sticky"
      top={4}
      zIndex={100}
      bg={isVeryLowTime ? 'red.50' : isLowTime ? 'orange.50' : 'green.50'}
      borderRadius="16px"
      p={4}
      boxShadow="0 4px 12px rgba(0,0,0,0.1)"
      border="1px solid"
      borderColor={isVeryLowTime ? 'red.200' : isLowTime ? 'orange.200' : 'green.200'}
      transition="all 0.3s"
    >
      <HStack spacing={4} justify="space-between" align="center">
        {/* Timer Display */}
        <HStack spacing={3} flex={1}>
          <Box
            bg={isVeryLowTime ? 'red.500' : isLowTime ? 'orange.500' : 'green.500'}
            borderRadius="full"
            p={2}
          >
            <Icon 
              as={isVeryLowTime ? AlertCircle : Clock} 
              boxSize={5} 
              color="white" 
            />
          </Box>
          
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" fontWeight="500" color="gray.600">
              🔓 Access Unlocked
            </Text>
            <HStack spacing={1}>
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                color={isVeryLowTime ? 'red.600' : isLowTime ? 'orange.600' : 'green.600'}
                fontFamily="monospace"
              >
                {String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
              </Text>
              <Text fontSize="sm" color="gray.500">
                remaining
              </Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Circular Progress Indicator */}
        <Box position="relative" w="60px" h="60px">
          <svg
            width="60"
            height="60"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background circle */}
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke={isVeryLowTime ? '#EF4444' : isLowTime ? '#F97316' : '#10B981'}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize="xs"
            fontWeight="bold"
            color={isVeryLowTime ? 'red.600' : isLowTime ? 'orange.600' : 'green.600'}
          >
            {Math.round(percentage)}%
          </Text>
        </Box>
      </HStack>

      {/* Progress Bar */}
      <Progress
        value={percentage}
        size="sm"
        colorScheme={isVeryLowTime ? 'red' : isLowTime ? 'orange' : 'green'}
        mt={3}
        borderRadius="full"
        hasStripe
        isAnimated
      />

      {/* Warning Messages */}
      {isVeryLowTime && (
        <Text fontSize="xs" color="red.600" mt={2} fontWeight="500">
          ⚠️ Access expiring soon! Pay again to continue.
        </Text>
      )}
      {isLowTime && !isVeryLowTime && (
        <Text fontSize="xs" color="orange.600" mt={2} fontWeight="500">
          ⏰ Less than 5 minutes remaining
        </Text>
      )}
    </Box>
  );
}

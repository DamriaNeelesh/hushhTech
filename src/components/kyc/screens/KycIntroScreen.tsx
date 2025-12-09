'use client';

import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { KycIntroScreenProps } from '../../../types/kyc';

// Icons
const ShieldCheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      stroke="url(#shield-gradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(99, 102, 241, 0.1)"
    />
    <path 
      d="M9 12l2 2 4-4" 
      stroke="url(#shield-gradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="shield-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

const CheckIcon = ({ color = '#22C55E' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M20 6L9 17l-5-5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * KYC Intro Screen - Screen 1
 * 
 * Entry point for the KYC flow. Shows trust messaging and benefits.
 */
const KycIntroScreen: React.FC<KycIntroScreenProps> = ({
  onContinue,
  bankName = 'Your Bank',
}) => {
  const benefits = [
    'Fewer documents to upload',
    'Reuse your verified KYC instantly',
    'Powered by trusted Hushh KYC Network',
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
      {/* Main Content */}
      <VStack 
        flex="1" 
        spacing={8} 
        justify="center" 
        align="center"
        maxW="400px"
        mx="auto"
        textAlign="center"
      >
        {/* Hero Icon */}
        <Box
          p={4}
          borderRadius="24px"
          bg="linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          boxShadow="0 0 60px rgba(99, 102, 241, 0.2)"
        >
          <ShieldCheckIcon />
        </Box>

        {/* Title & Subtitle */}
        <VStack spacing={4}>
          <Heading
            as="h1"
            size="xl"
            bgGradient="linear(to-r, white, gray.300)"
            bgClip="text"
            fontWeight="600"
            lineHeight="1.2"
          >
            Verify your identity
          </Heading>
          <Text
            fontSize="md"
            color="whiteAlpha.700"
            lineHeight="1.6"
            px={4}
          >
            We'll securely verify your identity. Where possible, we'll reuse existing KYC to save you time.
          </Text>
        </VStack>

        {/* Benefits List */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(30,30,40,0.6) 0%, rgba(20,20,30,0.8) 100%)"
          borderRadius="16px"
          border="1px solid"
          borderColor="whiteAlpha.100"
          p={5}
          backdropFilter="blur(10px)"
        >
          <VStack spacing={4} align="stretch">
            {benefits.map((benefit, index) => (
              <Flex key={index} align="center" gap={3}>
                <Box flexShrink={0}>
                  <CheckIcon />
                </Box>
                <Text 
                  fontSize="sm" 
                  color="whiteAlpha.900"
                  fontWeight="400"
                >
                  {benefit}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Trust Badge */}
        <Flex 
          align="center" 
          gap={2} 
          opacity={0.6}
          fontSize="xs"
          color="whiteAlpha.600"
        >
          <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
          <Text>Secured with end-to-end encryption</Text>
        </Flex>
      </VStack>

      {/* Bottom CTA */}
      <Box 
        pt={6} 
        pb={4}
        maxW="400px"
        mx="auto"
        w="100%"
      >
        <Button
          w="100%"
          size="lg"
          bg="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
          color="white"
          borderRadius="14px"
          h="56px"
          fontSize="md"
          fontWeight="500"
          _hover={{
            opacity: 0.9,
            transform: 'translateY(-1px)',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          onClick={onContinue}
        >
          Continue
        </Button>

        {/* Bank Info */}
        <Text 
          textAlign="center" 
          fontSize="xs" 
          color="whiteAlpha.400"
          mt={4}
        >
          {bankName} × Hushh KYC Network
        </Text>
      </Box>
    </Box>
  );
};

export default KycIntroScreen;

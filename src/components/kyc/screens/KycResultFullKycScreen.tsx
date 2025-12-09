'use client';

import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { KycResultFullKycScreenProps, REASON_LABELS } from '../../../types/kyc';

// Icons
const InfoCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#info-gradient)" stroke="url(#info-gradient-stroke)" strokeWidth="1"/>
    <path d="M12 16v-4M12 8h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="info-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(156, 163, 175, 0.2)" />
        <stop offset="1" stopColor="rgba(156, 163, 175, 0.1)" />
      </linearGradient>
      <linearGradient id="info-gradient-stroke" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9CA3AF" />
        <stop offset="1" stopColor="#6B7280" />
      </linearGradient>
    </defs>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Gets the reason label for display
 */
const getReasonLabel = (reasonCode?: string): string => {
  if (!reasonCode) return 'No recent verified KYC found.';
  return REASON_LABELS[reasonCode] || 'We couldn\'t find a reusable KYC record.';
};

/**
 * KYC Result Full KYC Screen - Screen 4C
 * 
 * Shows when no usable KYC found - full verification required.
 */
const KycResultFullKycScreen: React.FC<KycResultFullKycScreenProps> = ({
  response,
  bankName = 'Your Bank',
  onStartFullKyc,
}) => {
  const reasonCode = response?.reasonCode;

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)"
      px={4}
      py={8}
      display="flex"
      flexDirection="column"
    >
      <VStack 
        flex="1" 
        spacing={6} 
        justify="center" 
        align="center"
        maxW="400px"
        mx="auto"
        textAlign="center"
      >
        {/* Info Icon */}
        <Box
          p={2}
          borderRadius="full"
          bg="rgba(156, 163, 175, 0.1)"
          boxShadow="0 0 40px rgba(156, 163, 175, 0.1)"
        >
          <InfoCircleIcon />
        </Box>

        {/* Title & Subtitle */}
        <VStack spacing={3}>
          <Heading
            as="h1"
            size="lg"
            color="white"
            fontWeight="600"
          >
            We need to complete full KYC this time
          </Heading>
          <Text
            fontSize="sm"
            color="whiteAlpha.700"
            lineHeight="1.6"
            px={2}
          >
            We couldn't find a reusable KYC record that meets {bankName}'s policy, 
            so we'll complete a standard KYC once.
          </Text>
        </VStack>

        {/* Result Card */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(156, 163, 175, 0.08) 0%, rgba(107, 114, 128, 0.05) 100%)"
          borderRadius="20px"
          border="1px solid"
          borderColor="whiteAlpha.100"
          p={5}
          mt={4}
        >
          <VStack spacing={4} align="stretch">
            {/* Existing KYC Reused */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                Existing KYC reused
              </Text>
              <HStack spacing={2}>
                <XIcon />
                <Text fontSize="sm" fontWeight="500" color="red.400">
                  No
                </Text>
              </HStack>
            </Flex>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* Reason */}
            <Flex justify="space-between" align="flex-start">
              <Text fontSize="sm" color="whiteAlpha.600">
                Reason
              </Text>
              <Text 
                fontSize="sm" 
                fontWeight="500" 
                color="whiteAlpha.800"
                textAlign="right"
                maxW="200px"
              >
                {getReasonLabel(reasonCode)}
              </Text>
            </Flex>
          </VStack>
        </Box>

        {/* Future Benefit Note */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)"
          borderRadius="16px"
          border="1px solid"
          borderColor="rgba(99, 102, 241, 0.1)"
          p={4}
        >
          <Text fontSize="xs" color="whiteAlpha.600" lineHeight="1.6">
            <Text as="span" color="purple.300" fontWeight="500">Good news: </Text>
            Once completed, your KYC can be reused with your consent in the future, 
            saving you time at other institutions.
          </Text>
        </Box>
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
          rightIcon={<ArrowRightIcon />}
          _hover={{
            opacity: 0.9,
            transform: 'translateY(-1px)',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          onClick={onStartFullKyc}
        >
          Start full KYC
        </Button>

        {/* Time estimate */}
        <Text 
          textAlign="center" 
          fontSize="xs" 
          color="whiteAlpha.400"
          mt={4}
        >
          Usually takes 5-10 minutes
        </Text>
      </Box>
    </Box>
  );
};

export default KycResultFullKycScreen;

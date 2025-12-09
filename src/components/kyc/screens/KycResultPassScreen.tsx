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
import { KycResultPassScreenProps } from '../../../types/kyc';

// Icons
const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#success-gradient)" stroke="url(#success-gradient-stroke)" strokeWidth="1"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="success-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(34, 197, 94, 0.2)" />
        <stop offset="1" stopColor="rgba(34, 197, 94, 0.1)" />
      </linearGradient>
      <linearGradient id="success-gradient-stroke" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22C55E" />
        <stop offset="1" stopColor="#16A34A" />
      </linearGradient>
    </defs>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Formats ISO date to relative time (e.g., "4 months ago")
 */
const formatRelativeTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Maps risk band to display text
 */
const formatRiskBand = (riskBand?: string): string => {
  switch (riskBand) {
    case 'LOW': return 'Low';
    case 'MEDIUM': return 'Medium';
    case 'HIGH': return 'High';
    default: return 'Low';
  }
};

/**
 * KYC Result PASS Screen - Screen 4A
 * 
 * Shows success when KYC is fully reused. No documents needed.
 */
const KycResultPassScreen: React.FC<KycResultPassScreenProps> = ({
  response,
  bankName = 'Your Bank',
  onContinue,
  onViewDetails,
}) => {
  const verifiedVia = response.verifiedVia;

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
        {/* Success Icon */}
        <Box
          p={2}
          borderRadius="full"
          bg="rgba(34, 197, 94, 0.1)"
          boxShadow="0 0 60px rgba(34, 197, 94, 0.2)"
        >
          <CheckCircleIcon />
        </Box>

        {/* Title & Subtitle */}
        <VStack spacing={3}>
          <Heading
            as="h1"
            size="lg"
            color="white"
            fontWeight="600"
          >
            Your identity is verified
          </Heading>
          <Text
            fontSize="sm"
            color="whiteAlpha.700"
            lineHeight="1.6"
            px={2}
          >
            We reused an existing KYC from a trusted institution. You don't need to upload documents again.
          </Text>
        </VStack>

        {/* Result Card */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(22, 163, 74, 0.05) 100%)"
          borderRadius="20px"
          border="1px solid"
          borderColor="rgba(34, 197, 94, 0.2)"
          p={5}
          mt={4}
        >
          <VStack spacing={4} align="stretch">
            {/* Verified Via */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                Verified via
              </Text>
              <Text fontSize="sm" fontWeight="500" color="white">
                {verifiedVia?.providerName || 'Trusted Institution'}
                {verifiedVia?.country && ` (${verifiedVia.country})`}
              </Text>
            </Flex>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* Last KYC Check */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                Last KYC check
              </Text>
              <Text fontSize="sm" fontWeight="500" color="white">
                {verifiedVia?.lastVerifiedAt 
                  ? formatRelativeTime(verifiedVia.lastVerifiedAt)
                  : '4 months ago'
                }
              </Text>
            </Flex>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* Risk Assessment */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                Risk assessment
              </Text>
              <HStack spacing={2}>
                <Box 
                  w="8px" 
                  h="8px" 
                  borderRadius="full" 
                  bg={verifiedVia?.riskBand === 'HIGH' 
                    ? 'red.400' 
                    : verifiedVia?.riskBand === 'MEDIUM' 
                      ? 'yellow.400' 
                      : 'green.400'
                  } 
                />
                <Text fontSize="sm" fontWeight="500" color="white">
                  {formatRiskBand(verifiedVia?.riskBand)}
                </Text>
              </HStack>
            </Flex>
          </VStack>

          {/* Fine Print */}
          <Text 
            fontSize="2xs" 
            color="whiteAlpha.400" 
            textAlign="center" 
            mt={4}
            lineHeight="1.5"
          >
            {bankName} applied its own KYC policy before accepting this verification.
          </Text>
        </Box>

        {/* View Details Link */}
        <Button
          variant="ghost"
          size="sm"
          color="whiteAlpha.600"
          fontWeight="400"
          _hover={{ color: 'white', bg: 'transparent' }}
          onClick={onViewDetails}
        >
          See how the agents collaborated →
        </Button>
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
          bg="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
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

        {/* Security Badge */}
        <Flex 
          justify="center" 
          align="center" 
          gap={2} 
          mt={4}
          opacity={0.5}
        >
          <Box color="green.400">
            <ShieldIcon />
          </Box>
          <Text fontSize="xs" color="whiteAlpha.500">
            Secured by Hushh KYC Network
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default KycResultPassScreen;

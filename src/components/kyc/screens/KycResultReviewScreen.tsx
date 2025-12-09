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
import { KycResultReviewScreenProps, REQUIREMENT_LABELS } from '../../../types/kyc';

// Icons
const AlertCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#warning-gradient)" stroke="url(#warning-gradient-stroke)" strokeWidth="1"/>
    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="warning-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(234, 179, 8, 0.2)" />
        <stop offset="1" stopColor="rgba(234, 179, 8, 0.1)" />
      </linearGradient>
      <linearGradient id="warning-gradient-stroke" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EAB308" />
        <stop offset="1" stopColor="#CA8A04" />
      </linearGradient>
    </defs>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Maps requirement code to human-readable label
 */
const getRequirementLabel = (code: string): string => {
  return REQUIREMENT_LABELS[code] || code.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * KYC Result REVIEW Screen - Screen 4B
 * 
 * Shows partial success - KYC reused but 1 additional document needed.
 */
const KycResultReviewScreen: React.FC<KycResultReviewScreenProps> = ({
  response,
  bankName = 'Your Bank',
  onUploadDoc,
  onViewDetails,
}) => {
  const verifiedVia = response.verifiedVia;
  const missingReq = response.additionalRequirements?.[0] || 'recent_address_proof';

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
        {/* Warning Icon */}
        <Box
          p={2}
          borderRadius="full"
          bg="rgba(234, 179, 8, 0.1)"
          boxShadow="0 0 60px rgba(234, 179, 8, 0.15)"
        >
          <AlertCircleIcon />
        </Box>

        {/* Title & Subtitle */}
        <VStack spacing={3}>
          <Heading
            as="h1"
            size="lg"
            color="white"
            fontWeight="600"
          >
            Almost done – we need one more thing
          </Heading>
          <Text
            fontSize="sm"
            color="whiteAlpha.700"
            lineHeight="1.6"
            px={2}
          >
            We reused your existing KYC, but {bankName} needs one additional document to complete verification.
          </Text>
        </VStack>

        {/* Result Card */}
        <Box
          w="100%"
          bg="linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, rgba(202, 138, 4, 0.05) 100%)"
          borderRadius="20px"
          border="1px solid"
          borderColor="rgba(234, 179, 8, 0.2)"
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
                <CheckIcon />
                <Text fontSize="sm" fontWeight="500" color="green.400">
                  Yes
                </Text>
              </HStack>
            </Flex>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* Verified Via */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                Verified via
              </Text>
              <Text fontSize="sm" fontWeight="500" color="white">
                {verifiedVia?.providerName || 'Previous Institution'}
              </Text>
            </Flex>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* We Still Need */}
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="whiteAlpha.600">
                We still need
              </Text>
              <Text fontSize="sm" fontWeight="500" color="yellow.300">
                {getRequirementLabel(missingReq)}
              </Text>
            </Flex>
          </VStack>
        </Box>

        {/* Why We Need This */}
        <Box
          w="100%"
          bg="whiteAlpha.50"
          borderRadius="12px"
          p={4}
        >
          <Text fontSize="xs" color="whiteAlpha.500" lineHeight="1.6">
            <Text as="span" color="whiteAlpha.700" fontWeight="500">Why do we need this? </Text>
            {bankName}'s policy requires a fresh document for this verification attribute, 
            even when previous KYC exists.
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
          bg="linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)"
          color="black"
          borderRadius="14px"
          h="56px"
          fontSize="md"
          fontWeight="500"
          leftIcon={<UploadIcon />}
          _hover={{
            opacity: 0.9,
            transform: 'translateY(-1px)',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          onClick={onUploadDoc}
        >
          Upload {getRequirementLabel(missingReq).split('(')[0].trim()}
        </Button>

        {/* Time estimate */}
        <Text 
          textAlign="center" 
          fontSize="xs" 
          color="whiteAlpha.400"
          mt={4}
        >
          This usually takes less than 1 minute
        </Text>
      </Box>
    </Box>
  );
};

export default KycResultReviewScreen;

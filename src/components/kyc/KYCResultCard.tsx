'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';

// Icons
const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface KYCResult {
  status: 'PASS' | 'REVIEW' | 'FAIL' | 'NOT_FOUND' | 'EXPIRED' | 'CONSENT_DENIED';
  riskBand?: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore?: number;
  verifiedAttributes?: string[];
  verificationLevel?: string;
  attestationAge?: number;
  missingRequirements?: string[];
  additionalInfo?: string;
  timestamp: string;
  providerName?: string;
}

interface KYCResultCardProps {
  result: KYCResult;
  bankName?: string;
}

const KYCResultCard: React.FC<KYCResultCardProps> = ({ result, bankName }) => {
  const getStatusConfig = () => {
    switch (result.status) {
      case 'PASS':
        return {
          icon: <CheckCircleIcon />,
          color: 'green',
          bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
          borderColor: 'green.500',
          title: 'KYC Verified',
          subtitle: 'User meets all verification requirements',
        };
      case 'REVIEW':
        return {
          icon: <AlertCircleIcon />,
          color: 'yellow',
          bgGradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(202, 138, 4, 0.1) 100%)',
          borderColor: 'yellow.500',
          title: 'Manual Review Required',
          subtitle: 'Some requirements need additional verification',
        };
      case 'FAIL':
        return {
          icon: <XCircleIcon />,
          color: 'red',
          bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.1) 100%)',
          borderColor: 'red.500',
          title: 'Verification Failed',
          subtitle: 'User does not meet verification requirements',
        };
      case 'NOT_FOUND':
        return {
          icon: <SearchIcon />,
          color: 'gray',
          bgGradient: 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.1) 100%)',
          borderColor: 'gray.500',
          title: 'No KYC Found',
          subtitle: 'No verification records exist for this user',
        };
      case 'EXPIRED':
        return {
          icon: <ClockIcon />,
          color: 'orange',
          bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(194, 65, 12, 0.1) 100%)',
          borderColor: 'orange.500',
          title: 'KYC Expired',
          subtitle: 'Verification is too old and needs renewal',
        };
      case 'CONSENT_DENIED':
        return {
          icon: <XCircleIcon />,
          color: 'purple',
          bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(126, 34, 206, 0.1) 100%)',
          borderColor: 'purple.500',
          title: 'Consent Denied',
          subtitle: 'User has not provided consent for this verification',
        };
      default:
        return {
          icon: <AlertCircleIcon />,
          color: 'gray',
          bgGradient: 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.1) 100%)',
          borderColor: 'gray.500',
          title: 'Unknown Status',
          subtitle: 'Unable to determine verification status',
        };
    }
  };

  const getRiskBandColor = (band?: string) => {
    switch (band) {
      case 'LOW': return 'green';
      case 'MEDIUM': return 'yellow';
      case 'HIGH': return 'red';
      default: return 'gray';
    }
  };

  const config = getStatusConfig();

  return (
    <Box
      bg="linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(15,15,25,0.98) 100%)"
      borderRadius="20px"
      border="1px solid"
      borderColor="whiteAlpha.100"
      overflow="hidden"
      boxShadow="0 20px 60px rgba(0,0,0,0.4)"
    >
      {/* Status Header */}
      <Box
        bg={config.bgGradient}
        borderBottom="1px solid"
        borderColor={config.borderColor}
        p={6}
      >
        <Flex align="center" gap={4}>
          <Box
            p={3}
            borderRadius="16px"
            bg={`${config.color}.500`}
            color="white"
          >
            {config.icon}
          </Box>
          <VStack align="start" spacing={1}>
            <Text fontSize="xl" fontWeight="700" color="white">
              {config.title}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.700">
              {config.subtitle}
            </Text>
          </VStack>
        </Flex>
      </Box>

      {/* Result Details */}
      <VStack spacing={0} align="stretch" divider={<Divider borderColor="whiteAlpha.100" />}>
        {/* Risk Assessment */}
        {(result.riskBand || result.riskScore !== undefined) && (
          <Box p={5}>
            <Text fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={3} textTransform="uppercase" letterSpacing="wide">
              Risk Assessment
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {result.riskBand && (
                <GridItem>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="2xs" color="whiteAlpha.500">Risk Band</Text>
                    <Badge 
                      colorScheme={getRiskBandColor(result.riskBand)} 
                      px={3} 
                      py={1} 
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {result.riskBand}
                    </Badge>
                  </VStack>
                </GridItem>
              )}
              {result.riskScore !== undefined && (
                <GridItem>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="2xs" color="whiteAlpha.500">Risk Score</Text>
                    <HStack spacing={2}>
                      <Text fontSize="lg" fontWeight="600" color="white">
                        {result.riskScore}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.500">/100</Text>
                    </HStack>
                    <Progress 
                      value={result.riskScore} 
                      size="xs" 
                      colorScheme={getRiskBandColor(result.riskBand)}
                      borderRadius="full"
                      w="100%"
                      bg="whiteAlpha.200"
                    />
                  </VStack>
                </GridItem>
              )}
            </Grid>
          </Box>
        )}

        {/* Verified Attributes */}
        {result.verifiedAttributes && result.verifiedAttributes.length > 0 && (
          <Box p={5}>
            <Text fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={3} textTransform="uppercase" letterSpacing="wide">
              Verified Attributes
            </Text>
            <Flex wrap="wrap" gap={2}>
              {result.verifiedAttributes.map((attr) => (
                <HStack
                  key={attr}
                  bg="whiteAlpha.100"
                  px={3}
                  py={1}
                  borderRadius="full"
                  spacing={1}
                >
                  <ShieldIcon />
                  <Text fontSize="xs" color="white">
                    {attr.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </HStack>
              ))}
            </Flex>
          </Box>
        )}

        {/* Missing Requirements */}
        {result.missingRequirements && result.missingRequirements.length > 0 && (
          <Box p={5}>
            <Text fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={3} textTransform="uppercase" letterSpacing="wide">
              Missing Requirements
            </Text>
            <VStack align="stretch" spacing={2}>
              {result.missingRequirements.map((req) => (
                <Flex
                  key={req}
                  align="center"
                  gap={2}
                  bg="rgba(239, 68, 68, 0.1)"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  border="1px solid"
                  borderColor="rgba(239, 68, 68, 0.3)"
                >
                  <XCircleIcon />
                  <Text fontSize="sm" color="red.300">
                    {req.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}

        {/* Verification Details */}
        <Box p={5}>
          <Text fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={3} textTransform="uppercase" letterSpacing="wide">
            Verification Details
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {result.verificationLevel && (
              <GridItem>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xs" color="whiteAlpha.500">Level</Text>
                  <Text fontSize="sm" fontWeight="500" color="white" textTransform="capitalize">
                    {result.verificationLevel}
                  </Text>
                </VStack>
              </GridItem>
            )}
            {result.attestationAge !== undefined && (
              <GridItem>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xs" color="whiteAlpha.500">KYC Age</Text>
                  <Text fontSize="sm" fontWeight="500" color="white">
                    {result.attestationAge} days
                  </Text>
                </VStack>
              </GridItem>
            )}
            {result.providerName && (
              <GridItem>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xs" color="whiteAlpha.500">Provider</Text>
                  <Text fontSize="sm" fontWeight="500" color="white">
                    {result.providerName}
                  </Text>
                </VStack>
              </GridItem>
            )}
            {bankName && (
              <GridItem>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xs" color="whiteAlpha.500">Requested By</Text>
                  <Text fontSize="sm" fontWeight="500" color="white">
                    {bankName}
                  </Text>
                </VStack>
              </GridItem>
            )}
          </Grid>
        </Box>

        {/* Additional Info */}
        {result.additionalInfo && (
          <Box p={5} bg="whiteAlpha.50">
            <HStack spacing={2} align="start">
              <AlertCircleIcon />
              <Text fontSize="sm" color="whiteAlpha.700">
                {result.additionalInfo}
              </Text>
            </HStack>
          </Box>
        )}

        {/* Timestamp Footer */}
        <Flex p={4} justify="space-between" align="center" bg="whiteAlpha.50">
          <Text fontSize="2xs" color="whiteAlpha.400">
            Verified at: {new Date(result.timestamp).toLocaleString()}
          </Text>
          <HStack spacing={2}>
            <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
            <Text fontSize="2xs" color="whiteAlpha.400">
              Powered by Hushh KYC Network
            </Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default KYCResultCard;

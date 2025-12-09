'use client';

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Divider,
  SimpleGrid,
  Flex,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiDownload,
  FiRefreshCw,
  FiMessageSquare,
  FiCopy,
  FiShield,
  FiDatabase,
  FiClock,
  FiUser,
  FiLock,
  FiSearch,
} from 'react-icons/fi';
import type { A2AResultSummaryProps, A2AKycDecision, A2AExportResult } from '../../types/a2aPlayground';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Get status styling
const getStatusConfig = (status: A2AKycDecision['status']) => {
  switch (status) {
    case 'PASS':
      return {
        icon: FiCheckCircle,
        color: 'green.400',
        bgGradient: 'linear(to-r, green.400, green.500)',
        label: 'KYC Approved',
        description: 'Identity verified successfully via attestation network',
      };
    case 'REVIEW':
      return {
        icon: FiAlertTriangle,
        color: 'yellow.400',
        bgGradient: 'linear(to-r, yellow.400, orange.400)',
        label: 'Review Required',
        description: 'Additional verification may be needed',
      };
    case 'NOT_FOUND':
      return {
        icon: FiSearch,
        color: 'blue.400',
        bgGradient: 'linear(to-r, blue.400, blue.500)',
        label: 'No Attestation Found',
        description: 'User needs to complete KYC with a provider',
      };
    case 'FAIL':
      return {
        icon: FiXCircle,
        color: 'red.400',
        bgGradient: 'linear(to-r, red.400, red.500)',
        label: 'KYC Failed',
        description: 'Unable to verify identity at this time',
      };
    default:
      return {
        icon: FiAlertTriangle,
        color: 'gray.400',
        bgGradient: 'linear(to-r, gray.400, gray.500)',
        label: 'Unknown',
        description: 'Status unknown',
      };
  }
};

// Get risk band styling
const getRiskBandConfig = (riskBand: string) => {
  switch (riskBand) {
    case 'LOW':
      return { color: 'green.400', bgColor: 'green.900', label: 'Low Risk' };
    case 'MEDIUM':
      return { color: 'yellow.400', bgColor: 'yellow.900', label: 'Medium Risk' };
    case 'HIGH':
      return { color: 'red.400', bgColor: 'red.900', label: 'High Risk' };
    default:
      return { color: 'gray.400', bgColor: 'gray.800', label: 'Unknown' };
  }
};

const A2AResultSummaryScreen: React.FC<A2AResultSummaryProps> = ({
  config,
  result,
  onRunAnother,
  onViewConversation,
}) => {
  const { kycDecision, exportResult, audit, totalDurationMs } = result;

  // Clipboard for check ID
  const checkId = audit.hushhCheckId;
  const { hasCopied, onCopy } = useClipboard(checkId);

  // Status config
  const statusConfig = getStatusConfig(kycDecision.status);
  const riskConfig = getRiskBandConfig(kycDecision.verifiedVia.riskBand);

  return (
    <Box
      minH="100vh"
      bg="white"
      py={8}
      px={{ base: 4, md: 8 }}
    >
      <VStack spacing={8} maxW="1200px" mx="auto">
        {/* Header */}
        <VStack spacing={2} textAlign="center" animation={`${fadeIn} 0.5s ease-out`}>
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="600"
            color="black"
          >
            A2A KYC Result Summary
          </Text>
          <Text fontSize="md" color="gray.600">
            Privacy-preserving verification complete in {totalDurationMs}ms
          </Text>
        </VStack>

        {/* Main Status Card */}
        <Box
          w="full"
          bg="gray.50"
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
          animation={`${fadeIn} 0.6s ease-out`}
          boxShadow="sm"
        >
          {/* Status Banner */}
          <Box
            bgGradient={statusConfig.bgGradient}
            py={6}
            px={8}
            animation={`${pulse} 2s ease-in-out infinite`}
          >
            <HStack spacing={4} justify="center">
              <Icon as={statusConfig.icon} boxSize={10} color="white" />
              <VStack spacing={0} align="flex-start">
                <Text fontSize="2xl" fontWeight="600" color="white">
                  {statusConfig.label}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900">
                  {statusConfig.description}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Status Details */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={0}>
            {/* Verified Via */}
            <Box p={6} borderRight={{ md: '1px solid' }} borderColor="gray.200">
              <VStack spacing={3} align="flex-start">
                <HStack spacing={2}>
                  <Icon as={FiShield} color="purple.500" />
                  <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                    Verified Via
                  </Text>
                </HStack>
                <Text fontSize="lg" color="black" fontWeight="500">
                  {kycDecision.verifiedVia.providerName}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {kycDecision.verifiedVia.providerType} • No raw PII shared
                </Text>
              </VStack>
            </Box>

            {/* Risk Band */}
            <Box p={6} borderRight={{ md: '1px solid' }} borderColor="gray.200">
              <VStack spacing={3} align="flex-start">
                <HStack spacing={2}>
                  <Icon as={FiAlertTriangle} color="yellow.500" />
                  <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                    Risk Assessment
                  </Text>
                </HStack>
                <Badge
                  bg={riskConfig.bgColor}
                  color={riskConfig.color}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="md"
                >
                  {riskConfig.label}
                </Badge>
              </VStack>
            </Box>

            {/* Verified Attributes */}
            <Box p={6}>
              <VStack spacing={3} align="flex-start">
                <HStack spacing={2}>
                  <Icon as={FiCheckCircle} color="green.500" />
                  <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                    Verified Attributes
                  </Text>
                </HStack>
                <Text fontSize="2xl" color="black" fontWeight="600">
                  {kycDecision.verifiedAttributes.length}
                </Text>
                <Flex wrap="wrap" gap={1}>
                  {kycDecision.verifiedAttributes.slice(0, 3).map((attr) => (
                    <Badge key={attr} colorScheme="green" fontSize="xs">
                      {attr}
                    </Badge>
                  ))}
                  {kycDecision.verifiedAttributes.length > 3 && (
                    <Badge colorScheme="gray" fontSize="xs">
                      +{kycDecision.verifiedAttributes.length - 3} more
                    </Badge>
                  )}
                </Flex>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Two Column Layout: Export + Audit */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} w="full">
          {/* Data Export Card */}
          <Box
            bg="gray.50"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            p={6}
            animation={`${fadeIn} 0.7s ease-out`}
            boxShadow="sm"
          >
            <VStack spacing={5} align="stretch">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  borderRadius="xl"
                  bg="blue.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiDatabase} boxSize={5} color="white" />
                </Box>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="lg" fontWeight="500" color="black">
                    Data Export
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Normalized JSON profile
                  </Text>
                </VStack>
              </HStack>

              <Divider borderColor="gray.200" />

              {exportResult ? (
                <>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Exported To</Text>
                    <Badge colorScheme="purple" borderRadius="full" px={3}>
                      {exportResult.exportedTo}
                    </Badge>
                  </HStack>

                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Schema</Text>
                    <Text fontSize="sm" color="black" fontFamily="mono">
                      {exportResult.profileSchema}
                    </Text>
                  </HStack>

                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Fields Included ({exportResult.includedFields.length})
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      {exportResult.includedFields.map((field: string) => (
                        <Badge
                          key={field}
                          bg="green.900"
                          color="green.400"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="xs"
                        >
                          <HStack spacing={1}>
                            <Icon as={FiCheckCircle} boxSize={3} />
                            <Text>{field}</Text>
                          </HStack>
                        </Badge>
                      ))}
                    </Flex>
                  </Box>

                  {exportResult.excludedFields.length > 0 && (
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Fields Excluded (Privacy Protected)
                      </Text>
                      <Flex wrap="wrap" gap={2}>
                        {exportResult.excludedFields.map((field: string) => (
                          <Badge
                            key={field}
                            bg="red.900"
                            color="red.400"
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="xs"
                          >
                            <HStack spacing={1}>
                              <Icon as={FiLock} boxSize={3} />
                              <Text>{field}</Text>
                            </HStack>
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  )}

                  <Box
                    bg="purple.50"
                    borderRadius="lg"
                    p={4}
                    border="1px solid"
                    borderColor="purple.200"
                  >
                    <HStack spacing={2} mb={2}>
                      <Icon as={FiLock} color="purple.600" boxSize={4} />
                      <Text fontSize="xs" color="purple.600" fontWeight="500">
                        Privacy Guarantee
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.700" lineHeight="tall">
                      Raw SSN was never shared. Only attestation-based verification 
                      (yes/no match) was used. Bank receives normalized profile, 
                      not raw secrets.
                    </Text>
                  </Box>
                </>
              ) : (
                <Text fontSize="sm" color="gray.600" textAlign="center" py={4}>
                  Export not requested for this scenario
                </Text>
              )}
            </VStack>
          </Box>

          {/* Audit Trail Card */}
          <Box
            bg="gray.50"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            p={6}
            animation={`${fadeIn} 0.8s ease-out`}
            boxShadow="sm"
          >
            <VStack spacing={5} align="stretch">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  borderRadius="xl"
                  bg="orange.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiClock} boxSize={5} color="white" />
                </Box>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="lg" fontWeight="500" color="black">
                    Audit Trail
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Verification record
                  </Text>
                </VStack>
              </HStack>

              <Divider borderColor="gray.200" />

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Check ID</Text>
                <HStack spacing={2}>
                  <Text fontSize="sm" color="black" fontFamily="mono">
                    {checkId.slice(0, 8)}...{checkId.slice(-4)}
                  </Text>
                  <Tooltip label={hasCopied ? 'Copied!' : 'Copy full ID'}>
                    <Box
                      as="button"
                      onClick={onCopy}
                      color="purple.500"
                      _hover={{ color: 'purple.600' }}
                    >
                      <Icon as={FiCopy} boxSize={4} />
                    </Box>
                  </Tooltip>
                </HStack>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Timestamp</Text>
                <Text fontSize="sm" color="black">
                  {new Date(audit.loggedAt).toLocaleString()}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Relying Party</Text>
                <Text fontSize="sm" color="black">
                  {config.relyingParty.name}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">User</Text>
                <HStack spacing={2}>
                  <Icon as={FiUser} color="gray.600" boxSize={4} />
                  <Text fontSize="sm" color="black">
                    {config.user.fullName}
                  </Text>
                </HStack>
              </HStack>

              <Box
                bg="purple.50"
                borderRadius="lg"
                p={4}
                border="1px solid"
                borderColor="purple.200"
              >
                <Text fontSize="xs" color="gray.600" mb={2}>
                  Operations Performed
                </Text>
                <Flex wrap="wrap" gap={2}>
                  {audit.operations.map((op: string) => (
                    <Badge key={op} colorScheme="purple" borderRadius="full" px={3}>
                      ✓ {op}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Action Buttons */}
        <HStack 
          spacing={4} 
          pt={4} 
          animation={`${fadeIn} 0.9s ease-out`}
          flexWrap="wrap"
          justify="center"
        >
          <Button
            size="lg"
            leftIcon={<FiRefreshCw />}
            bg="purple.500"
            color="white"
            _hover={{ bg: 'purple.400' }}
            borderRadius="xl"
            px={8}
            onClick={onRunAnother}
          >
            Run Another Scenario
          </Button>
          <Button
            size="lg"
            leftIcon={<FiMessageSquare />}
            variant="outline"
            borderColor="gray.300"
            color="black"
            _hover={{ bg: 'gray.50' }}
            borderRadius="xl"
            px={8}
            onClick={onViewConversation}
          >
            View Conversation
          </Button>
          {exportResult && (
            <Button
              size="lg"
              leftIcon={<FiDownload />}
              variant="outline"
              borderColor="gray.300"
              color="black"
              _hover={{ bg: 'gray.50' }}
              borderRadius="xl"
              px={8}
              onClick={() => {
                // Download JSON export
                const blob = new Blob(
                  [JSON.stringify(exportResult.profile, null, 2)],
                  { type: 'application/json' }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `kyc-export-${audit.hushhCheckId}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download Export
            </Button>
          )}
        </HStack>

        {/* Footer Note */}
        <Box
          bg="gray.50"
          borderRadius="xl"
          p={4}
          w="full"
          textAlign="center"
          animation={`${fadeIn} 1s ease-out`}
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontSize="sm" color="gray.600">
            🔒 This demo showcases privacy-preserving A2A verification. 
            In production, attestations are cryptographically signed and 
            verifiable on-chain.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default A2AResultSummaryScreen;

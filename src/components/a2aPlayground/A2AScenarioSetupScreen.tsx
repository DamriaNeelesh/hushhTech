/**
 * A2A Scenario Setup Screen (Screen 1)
 * 
 * Demo operator selects:
 * - Relying party (bank)
 * - User to verify (Ankit, etc.)
 * - Which A2A operations to demo
 */
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Divider,
  Icon,
  Badge,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import {
  A2AScenarioConfig,
  A2AScenarioSetupProps,
  DemoUserIdentifiers,
  ScenarioOperations,
  RelyingParty,
  DEMO_RELYING_PARTIES,
  DEFAULT_SCENARIO_CONFIG,
} from '../../types/a2aPlayground';

// =====================================================
// Animations
// =====================================================

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(159, 122, 234, 0.3); }
  50% { box-shadow: 0 0 40px rgba(159, 122, 234, 0.6); }
`;

// =====================================================
// Country Options
// =====================================================

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'UAE' },
  { value: 'SG', label: 'Singapore' },
];

const PHONE_CODES = [
  { value: '+1', label: '+1 (US)' },
  { value: '+91', label: '+91 (IN)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+971', label: '+971 (UAE)' },
  { value: '+65', label: '+65 (SG)' },
];

// =====================================================
// Component
// =====================================================

export const A2AScenarioSetupScreen: React.FC<A2AScenarioSetupProps> = ({
  onRunScenario,
}) => {
  // Form state
  const [selectedPartyId, setSelectedPartyId] = useState(
    DEFAULT_SCENARIO_CONFIG.relyingParty.id
  );
  const [user, setUser] = useState<DemoUserIdentifiers>(
    DEFAULT_SCENARIO_CONFIG.user
  );
  const [operations, setOperations] = useState<ScenarioOperations>(
    DEFAULT_SCENARIO_CONFIG.operations
  );

  // Get selected relying party
  const selectedParty = DEMO_RELYING_PARTIES.find(p => p.id === selectedPartyId) 
    || DEMO_RELYING_PARTIES[0];

  // Handle form submission
  const handleRun = () => {
    const config: A2AScenarioConfig = {
      relyingParty: selectedParty,
      user,
      operations,
    };
    onRunScenario(config);
  };

  // Check if at least one operation is selected
  const hasOperation = operations.verifyKycStatus || 
    operations.confirmKeyMatch || 
    operations.exportKycProfile;

  return (
    <Box
      minH="100vh"
      bg="white"
      py={8}
    >
      <Container maxW="lg">
        {/* Header */}
        <VStack spacing={2} mb={8} textAlign="center">
          <Badge
            colorScheme="purple"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
          >
            A2A PROTOCOL DEMO
          </Badge>
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="600"
            color="black"
          >
            Agent-to-Agent KYC Playground
          </Text>
          <Text color="gray.600" fontSize="sm" maxW="md">
            Watch Bank KYC Copilot and Hushh KYC Agent collaborate 
            in real-time to verify identity and export KYC data.
          </Text>
        </VStack>

        {/* Main Form Card */}
        <Box
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="2xl"
          p={6}
          boxShadow="sm"
        >
          <VStack spacing={6} align="stretch">
            {/* Section 1: Relying Party */}
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.600"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                1. Choose Relying Party
              </Text>
              
              <FormControl>
                <FormLabel color="gray.700" fontSize="sm">
                  Bank or Financial Institution
                </FormLabel>
                <Select
                  value={selectedPartyId}
                  onChange={(e) => setSelectedPartyId(e.target.value)}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  color="black"
                  _hover={{ borderColor: 'purple.500' }}
                  _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                >
                  {DEMO_RELYING_PARTIES.map((party) => (
                    <option 
                      key={party.id} 
                      value={party.id}
                    >
                      {party.name} {party.description ? `– ${party.description}` : ''}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider borderColor="gray.200" />

            {/* Section 2: User to Verify */}
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.600"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                2. User to Verify
              </Text>

              <VStack spacing={4}>
                {/* Full Name */}
                <FormControl>
                  <FormLabel color="gray.700" fontSize="sm">
                    Full Name
                  </FormLabel>
                  <Input
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    placeholder="Enter full name"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    color="black"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'purple.500' }}
                    _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                  />
                </FormControl>

                {/* Phone */}
                <FormControl>
                  <FormLabel color="gray.700" fontSize="sm">
                    Phone Number
                  </FormLabel>
                  <HStack>
                    <Select
                      value={user.phoneCountryCode}
                      onChange={(e) => setUser({ ...user, phoneCountryCode: e.target.value })}
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      color="black"
                      w="140px"
                      _hover={{ borderColor: 'purple.500' }}
                      _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                    >
                      {PHONE_CODES.map((code) => (
                        <option 
                          key={code.value} 
                          value={code.value}
                        >
                          {code.label}
                        </option>
                      ))}
                    </Select>
                    <Input
                      value={user.phoneNumber}
                      onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                      placeholder="Phone number"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      color="black"
                      _placeholder={{ color: 'gray.400' }}
                      _hover={{ borderColor: 'purple.500' }}
                      _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                    />
                  </HStack>
                </FormControl>

                {/* Country */}
                <FormControl>
                  <FormLabel color="gray.700" fontSize="sm">
                    Country
                  </FormLabel>
                  <Select
                    value={user.country}
                    onChange={(e) => setUser({ ...user, country: e.target.value })}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    color="black"
                    _hover={{ borderColor: 'purple.500' }}
                    _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                  >
                    {COUNTRY_OPTIONS.map((country) => (
                      <option 
                        key={country.value} 
                        value={country.value}
                      >
                        {country.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* Email (Optional) */}
                <FormControl>
                  <FormLabel color="gray.700" fontSize="sm">
                    Email (Optional)
                  </FormLabel>
                  <Input
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email@example.com"
                    type="email"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    color="black"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'purple.500' }}
                    _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                  />
                </FormControl>

                {/* SSN Last 4 (for key match demo) */}
                {operations.confirmKeyMatch && (
                  <FormControl>
                    <FormLabel color="gray.700" fontSize="sm">
                      SSN Last 4 Digits (for key match demo)
                    </FormLabel>
                    <Input
                      value={user.ssnLast4 || ''}
                      onChange={(e) => setUser({ ...user, ssnLast4: e.target.value })}
                      placeholder="1234"
                      maxLength={4}
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      color="black"
                      _placeholder={{ color: 'gray.400' }}
                      _hover={{ borderColor: 'purple.500' }}
                      _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
                    />
                    <Text fontSize="xs" color="gray.600" mt={1}>
                      🔒 This is only used to demo VerifyFieldMatch – never shared in clear
                    </Text>
                  </FormControl>
                )}
              </VStack>
            </Box>

            <Divider borderColor="gray.200" />

            {/* Section 3: Operations */}
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="purple.600"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                3. What should agents do?
              </Text>

              <VStack align="stretch" spacing={3}>
                <Checkbox
                  isChecked={operations.verifyKycStatus}
                  onChange={(e) => setOperations({ 
                    ...operations, 
                    verifyKycStatus: e.target.checked 
                  })}
                  colorScheme="purple"
                  size="lg"
                >
                  <VStack align="start" spacing={0}>
                    <Text color="black" fontSize="sm" fontWeight="500">
                      Verify KYC Status
                    </Text>
                    <Text color="gray.600" fontSize="xs">
                      CheckKYCStatus – Is this user verified?
                    </Text>
                  </VStack>
                </Checkbox>

                <Checkbox
                  isChecked={operations.confirmKeyMatch}
                  onChange={(e) => setOperations({ 
                    ...operations, 
                    confirmKeyMatch: e.target.checked 
                  })}
                  colorScheme="purple"
                  size="lg"
                >
                  <VStack align="start" spacing={0}>
                    <Text color="black" fontSize="sm" fontWeight="500">
                      Confirm Key Match
                    </Text>
                    <Text color="gray.600" fontSize="xs">
                      VerifyFieldMatch – Does SSN last4 match?
                    </Text>
                  </VStack>
                </Checkbox>

                <Checkbox
                  isChecked={operations.exportKycProfile}
                  onChange={(e) => setOperations({ 
                    ...operations, 
                    exportKycProfile: e.target.checked 
                  })}
                  colorScheme="purple"
                  size="lg"
                >
                  <VStack align="start" spacing={0}>
                    <Text color="black" fontSize="sm" fontWeight="500">
                      Export KYC Profile
                    </Text>
                    <Text color="gray.600" fontSize="xs">
                      ExportKYCProfile – Get normalized JSON profile
                    </Text>
                  </VStack>
                </Checkbox>
              </VStack>
            </Box>

            <Divider borderColor="gray.200" />

            {/* Run Button */}
            <Button
              size="lg"
              colorScheme="purple"
              onClick={handleRun}
              isDisabled={!user.fullName || !hasOperation}
              w="100%"
              h="56px"
              fontSize="md"
              fontWeight="600"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(159, 122, 234, 0.4)',
              }}
              transition="all 0.2s"
            >
              🚀 Run A2A KYC Scenario
            </Button>

            {/* Help Text */}
            <Text 
              fontSize="xs" 
              color="gray.600" 
              textAlign="center"
            >
              This will simulate a real A2A conversation between {selectedParty.name} 
              and Hushh KYC Agent.
            </Text>
          </VStack>
        </Box>

        {/* Footer */}
        <Text 
          fontSize="xs" 
          color="gray.500" 
          textAlign="center" 
          mt={6}
        >
          A2A Protocol Demo • Hushh KYC Network • ADFW 2025
        </Text>
      </Container>
    </Box>
  );
};

export default A2AScenarioSetupScreen;

'use client';

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Select,
  Checkbox,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import { 
  KycDetailsConsentScreenProps, 
  KycFormData,
  KycCheckRequest,
  ID_TYPE_OPTIONS,
  COUNTRY_OPTIONS,
} from '../../../types/kyc';

// Logos
const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HushhIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * KYC Details & Consent Screen - Screen 2
 * 
 * Collects user information and consent for KYC reuse.
 */
const KycDetailsConsentScreen: React.FC<KycDetailsConsentScreenProps> = ({
  onSubmit,
  bankName = 'Your Bank',
  relyingPartyId,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<KycFormData>({
    fullName: '',
    dob: '',
    country: '',
    idType: '',
    idNumber: '',
    email: '',
    phone: '',
    consentChecked: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof KycFormData, string>>>({});

  const handleChange = (field: keyof KycFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof KycFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.idType) {
      newErrors.idType = 'ID type is required';
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }
    if (!formData.consentChecked) {
      newErrors.consentChecked = 'Please agree to the consent';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Generate a simple consent token (in production, this would come from backend)
    const consentToken = `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const request: KycCheckRequest = {
      relyingPartyId,
      consentToken,
      identifiers: {
        fullName: formData.fullName.trim(),
        dob: formData.dob,
        country: formData.country,
        idType: formData.idType,
        idNumber: formData.idNumber.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
      },
    };

    onSubmit(request);
  };

  const isFormValid = 
    formData.fullName.trim() &&
    formData.dob &&
    formData.country &&
    formData.idType &&
    formData.idNumber.trim() &&
    formData.consentChecked;

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)"
      px={4}
      py={6}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box mb={6} maxW="400px" mx="auto" w="100%">
        <Heading
          as="h1"
          size="lg"
          color="white"
          fontWeight="600"
          mb={2}
        >
          Tell us about yourself
        </Heading>
        <Text fontSize="sm" color="whiteAlpha.600">
          We need a few details to check for existing KYC.
        </Text>
      </Box>

      {/* Form */}
      <VStack 
        flex="1" 
        spacing={4} 
        maxW="400px" 
        mx="auto" 
        w="100%"
        align="stretch"
      >
        {/* Full Name */}
        <FormControl isInvalid={!!errors.fullName}>
          <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
            Full Legal Name
          </FormLabel>
          <Input
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="As shown on your ID"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.fullName ? 'red.400' : 'whiteAlpha.200'}
            color="white"
            borderRadius="12px"
            h="48px"
            _placeholder={{ color: 'whiteAlpha.400' }}
            _hover={{ borderColor: 'whiteAlpha.400' }}
            _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
          />
        </FormControl>

        {/* DOB */}
        <FormControl isInvalid={!!errors.dob}>
          <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
            Date of Birth
          </FormLabel>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.dob ? 'red.400' : 'whiteAlpha.200'}
            color="white"
            borderRadius="12px"
            h="48px"
            _hover={{ borderColor: 'whiteAlpha.400' }}
            _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
            sx={{
              '::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
              },
            }}
          />
        </FormControl>

        {/* Country */}
        <FormControl isInvalid={!!errors.country}>
          <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
            Country / Nationality
          </FormLabel>
          <Select
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder="Select country"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor={errors.country ? 'red.400' : 'whiteAlpha.200'}
            color={formData.country ? 'white' : 'whiteAlpha.400'}
            borderRadius="12px"
            h="48px"
            _hover={{ borderColor: 'whiteAlpha.400' }}
            _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
            sx={{
              option: {
                background: '#1a1a2e',
                color: 'white',
              },
            }}
          >
            {COUNTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* ID Type & Number - Side by side on larger screens */}
        <HStack spacing={3}>
          <FormControl isInvalid={!!errors.idType} flex="1">
            <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
              ID Type
            </FormLabel>
            <Select
              value={formData.idType}
              onChange={(e) => handleChange('idType', e.target.value)}
              placeholder="Select"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor={errors.idType ? 'red.400' : 'whiteAlpha.200'}
              color={formData.idType ? 'white' : 'whiteAlpha.400'}
              borderRadius="12px"
              h="48px"
              _hover={{ borderColor: 'whiteAlpha.400' }}
              _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
              sx={{
                option: {
                  background: '#1a1a2e',
                  color: 'white',
                },
              }}
            >
              {ID_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isInvalid={!!errors.idNumber} flex="1.5">
            <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
              ID Number
            </FormLabel>
            <Input
              value={formData.idNumber}
              onChange={(e) => handleChange('idNumber', e.target.value)}
              placeholder="Last 4 digits"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor={errors.idNumber ? 'red.400' : 'whiteAlpha.200'}
              color="white"
              borderRadius="12px"
              h="48px"
              _placeholder={{ color: 'whiteAlpha.400' }}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
            />
          </FormControl>
        </HStack>

        {/* Optional: Email & Phone */}
        <HStack spacing={3}>
          <FormControl flex="1">
            <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
              Email (optional)
            </FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@example.com"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              borderRadius="12px"
              h="48px"
              _placeholder={{ color: 'whiteAlpha.400' }}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
            />
          </FormControl>

          <FormControl flex="1">
            <FormLabel fontSize="xs" color="whiteAlpha.600" mb={1}>
              Phone (optional)
            </FormLabel>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1..."
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              borderRadius="12px"
              h="48px"
              _placeholder={{ color: 'whiteAlpha.400' }}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              _focus={{ borderColor: '#6366F1', boxShadow: '0 0 0 1px #6366F1' }}
            />
          </FormControl>
        </HStack>

        {/* Consent Card */}
        <Box
          mt={4}
          bg="linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)"
          borderRadius="16px"
          border="1px solid"
          borderColor={errors.consentChecked ? 'red.400' : 'whiteAlpha.100'}
          p={4}
        >
          {/* Logos */}
          <Flex justify="center" align="center" gap={3} mb={3}>
            <Box color="blue.400" p={2} bg="whiteAlpha.100" borderRadius="10px">
              <BankIcon />
            </Box>
            <Text color="whiteAlpha.400" fontSize="xs">×</Text>
            <Box 
              color="purple.400" 
              p={2} 
              bg="linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
              borderRadius="10px"
            >
              <HushhIcon />
            </Box>
          </Flex>

          {/* Consent Text */}
          <Text fontSize="xs" color="whiteAlpha.600" textAlign="center" mb={4} lineHeight="1.6">
            With your permission, {bankName}'s KYC Copilot will ask the Hushh KYC Network if a verified KYC already exists, so you may not have to upload all documents again.
          </Text>

          {/* Checkbox */}
          <Checkbox
            isChecked={formData.consentChecked}
            onChange={(e) => handleChange('consentChecked', e.target.checked)}
            colorScheme="purple"
            size="md"
          >
            <Text fontSize="sm" color="white">
              I agree to securely reuse my existing KYC where possible.
            </Text>
          </Checkbox>
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
          isDisabled={!isFormValid}
          isLoading={isLoading}
          loadingText="Verifying..."
          opacity={isFormValid ? 1 : 0.5}
          _hover={{
            opacity: isFormValid ? 0.9 : 0.5,
            transform: isFormValid ? 'translateY(-1px)' : 'none',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          onClick={handleSubmit}
        >
          Verify with AI agents
        </Button>
      </Box>
    </Box>
  );
};

export default KycDetailsConsentScreen;

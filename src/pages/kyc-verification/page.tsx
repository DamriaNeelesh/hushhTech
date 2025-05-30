'use client'

import React from 'react'
import { FiCheck, FiSearch, FiFileText, FiUser, FiShield, FiArchive, FiActivity, FiClock, FiX } from 'react-icons/fi'
import { Box, Container, Heading, Text, Stack, HStack, VStack, Flex, Icon, useColorModeValue, Badge } from '@chakra-ui/react'

const KYCVerificationPage = () => {
  const primaryColor = "#0AADBC"
  const secondaryColor = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            <Text as="span" className='blue-gradient-text' fontWeight="bold">ANTI-MONEY LAUNDERING (AML)</Text>
            <Text as="span" color={secondaryColor} fontWeight="bold"> & KNOW YOUR CUSTOMER</Text>
          </Heading>
          <Heading as="h2" size="lg" color={secondaryColor} fontWeight="bold">(KYC) DOCUMENTATION</Heading>
          <Text mt={4} fontSize="md" color="gray.600">Hushh Renaissance Alpha & Alpha Fund, LP</Text>
        </Box>

        {/* Documentation Requirements */}
        <Box 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden"
          borderColor={borderColor}
          p={6}
        >
          <VStack spacing={8} align="stretch">
            {/* Section 1: Identity Verification */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">1</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Identity Verification</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Government-issued photo identification (passport, driver's license, or national ID)</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Proof of address (utility bill, bank statement, or lease agreement dated within 3 months)</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Social Security Number or Tax Identification Number verification</Text>
              </HStack>
            </VStack>

            {/* Section 2: Financial Background Verification */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">2</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Financial Background Verification</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Bank statements from the last 3 months</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Tax returns for the previous 2 years</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Employment verification or business ownership documentation</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Source of funds documentation for investment capital</Text>
              </HStack>
            </VStack>

            {/* Section 3: Investment Experience Documentation */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">3</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Investment Experience Documentation</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Investment portfolio statements or history</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Accredited investor certification (if applicable)</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Professional qualifications in finance (if applicable)</Text>
              </HStack>
            </VStack>

            {/* Section 4: Enhanced Due Diligence */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">4</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Enhanced Due Diligence (High-Risk Categories)</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Politically Exposed Persons (PEP) screening</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Sanctions list verification (OFAC, UN, EU, etc.)</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Additional documentation for high-risk jurisdictions</Text>
              </HStack>
            </VStack>

            {/* Section 5: Corporate Entity Verification */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">5</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Corporate Entity Verification (For Institutional Investors)</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Articles of incorporation or formation documents</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Board resolutions authorizing investment</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Beneficial ownership disclosure (25% threshold)</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Corporate structure chart</Text>
              </HStack>
            </VStack>

            {/* Section 6: Ongoing Monitoring */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">6</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Ongoing Monitoring Requirements</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Annual KYC refresh and document updates</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Transaction monitoring and suspicious activity reporting</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Periodic re-screening against sanctions lists</Text>
              </HStack>
            </VStack>

            {/* Section 7: Prohibited Activities & Red Flags */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">7</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Prohibited Activities & Red Flags</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Cash transactions above $10,000</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Funds from sanctioned countries or entities</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Structuring transactions to avoid reporting requirements</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                    <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Inconsistent or suspicious source of funds explanations</Text>
              </HStack>
            </VStack>

            {/* Section 8: Documentation Timeline & Process */}
            <Stack direction="row" align="center">
              <Box
                w={10}
                h={10}
                align="center"
                justify="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mr={4}
              >
                <Text fontWeight="bold" fontSize="lg" color="white">8</Text>
              </Box>
              <Heading as="h3" size="md" fontWeight="bold">Documentation Timeline & Process</Heading>
            </Stack>
            <VStack align="start" pl={14} spacing={3}>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Initial KYC completion required before fund admission</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Standard processing time: 5-10 business days</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Enhanced due diligence may require additional 10-15 business days</Text>
              </HStack>
              <HStack align="center">
                <Box w={6} display="flex" justifyContent="center">
                  <Icon as={FiCheck} color="green.500" boxSize={4} />
                </Box>
                <Text>Incomplete documentation will delay the onboarding process</Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>

        {/* Important Notice */}
        <Box 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden"
          borderColor={borderColor}
          bg="gray.50"
          p={6}
        >
          <VStack spacing={4} align="stretch">
            <Heading as="h3" size="md" fontWeight="bold">Important Notice</Heading>
            <Text>
              All documentation must be provided in English or accompanied by certified translations. Digital copies are acceptable for initial review, but original or 
              certified copies may be required for final verification. Hushh Technology LLC reserves the right to request additional documentation as deemed necessary 
              for compliance purposes.
            </Text>
          </VStack>
        </Box>

        {/* Data Protection & Privacy */}
        <Box 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden"
          borderColor={borderColor}
          bg="blue.50"
          p={6}
        >
          <VStack spacing={4} align="stretch">
            <Heading as="h3" size="md" fontWeight="bold">Data Protection & Privacy</Heading>
            <Text>
              All personal and financial information provided during the KYC process is handled in strict accordance with applicable privacy laws and regulations. Your 
              data is encrypted, secured, stored, and will only be shared with authorized third parties as required by law and/or compliance verification purposes.
            </Text>
          </VStack>
        </Box>

        {/* NDA Approval */}
        <Box 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden"
          borderColor={borderColor}
          bg="gray.100"
          p={4}
          textAlign="center"
        >
          <Text fontWeight="medium">NDA approval required to start KYC process</Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default KYCVerificationPage
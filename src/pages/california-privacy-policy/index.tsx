import React from "react";
import { Box, Heading, Text, Container, Divider, VStack } from "@chakra-ui/react";

const CaliforniaPrivacyPolicy = () => {
  return (
    <>
      <Box textAlign="center" mt={{md:'5rem',base:'2rem'}} mb={10}>
        <Heading as="h1" size="2xl" fontWeight={'500'} className="blue-gradient-text" my={{md:'5rem',base:'2rem'}}>
          California Privacy Policy
        </Heading>
      </Box>
      <Container maxW="container.lg" py={10} px={4}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={4}>Last Updated: February 6, 2025</Heading>
            <Text>
              Hushh Technologies LLC and its affiliates (collectively, “Hushh”) are committed to protecting the privacy of California residents (“California Residents,” “you,” or “your”) in accordance with the California Consumer Privacy Act (“CCPA”) as amended by the California Privacy Rights Act (“CPRA”). This California Privacy Policy explains how Hushh collects, uses, and safeguards your personal information, and it describes your rights under the CCPA/CPRA.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>California Investors</Heading>
            <Text>
              This section applies to California Residents who are individual investors, beneficial owners, shareholders, executive officers, directors, trustees, general partners, managing members, or persons acting in a similar capacity in connection with investments in private investment funds sponsored by Hushh.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Notice at Collection of Personal Information</Heading>
            <Text>Hushh collects the following categories of personal information:</Text>
            <Box pl={4}>
              <Text>1. Identifiers: Name, alias, postal address, email address, driver’s license number, and online identifiers.</Text>
              <Text>2. Financial Information: Education, name, signature, address, telephone number, and investment details.</Text>
              <Text>3. Protected Characteristics: Gender, age, citizenship status, national origin, and marital status.</Text>
              <Text>4. Internet Activity: Website interactions and use of online tools.</Text>
              <Text>5. Professional Information: Employment details, compensation, and title.</Text>
              <Text>6. Sensitive Personal Information: Social security numbers and passport numbers.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>How Hushh Uses Your Personal Information</Heading>
            <Text>
              Hushh uses personal information for business purposes, including:
            </Text>
            <Box pl={4}>
              <Text>• Delivering requested products, services, and information.</Text>
              <Text>• Managing investor accounts and processing transactions.</Text>
              <Text>• Compliance with legal and regulatory obligations.</Text>
              <Text>• Detecting and preventing fraud or illegal activity.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Retention of Personal Information</Heading>
            <Text>
              Hushh retains personal information for as long as required to fulfill its business purposes or comply with legal and regulatory requirements.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Your California Rights</Heading>
            <Text>California Residents have the right to:</Text>
            <Box pl={4}>
              <Text>1. Be informed about collected personal information and its purposes.</Text>
              <Text>2. Request deletion of personal information, subject to exceptions.</Text>
              <Text>3. Request details about categories and sources of collected personal information.</Text>
              <Text>4. Correct inaccuracies in personal information.</Text>
              <Text>5. Not be discriminated against for exercising privacy rights.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>California Job Candidates</Heading>
            <Text>
              This section applies to California Residents who are job candidates, interns, or independent contractors applying to Hushh.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Notice at Collection of Personal Information</Heading>
            <Text>Hushh collects the following categories of personal information for job applicants:</Text>
            <Box pl={4}>
              <Text>• Identifiers: Name, alias, postal address, email address, driver’s license number.</Text>
              <Text>• Professional Information: Employment history, previous job titles.</Text>
              <Text>• Sensitive Personal Information: Social security numbers, passport numbers.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Contact Information</Heading>
            <Text>
              If you have any questions about this California Privacy Policy, please contact:
            </Text>
            <Box pl={4}>
              <Text>• Email: ir@hushhtech.com</Text>
              <Text>• Phone: (888) 462-1726</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">
              Last Updated: February 6, 2025
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CaliforniaPrivacyPolicy;

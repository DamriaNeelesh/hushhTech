import React from "react";
import { Box, Heading, Text, Container, Divider, VStack } from "@chakra-ui/react";

const CareersPrivacyPolicy = () => {
  return (
    <>
      <Box textAlign="center" mt={{md:'5rem',base:'2rem'}} mb={10}>
        <Heading as="h1" size="2xl" fontWeight={'500'} className="blue-gradient-text" my={{md:'5rem',base:'2rem'}}>
          Careers Site Privacy Policy
        </Heading>
      </Box>
      <Container maxW="container.lg" py={10} px={4}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={4}>Last Updated: February 6, 2025</Heading>
            <Text>
              Hushh Technologies LLC and its affiliates (together, “Hushh”) value your trust and are committed to the responsible management, use, and protection of personal information. This Careers Site Privacy Notice (the “Notice”) applies to all information collected by Hushh from you during your use of our Careers site (the “Careers Site”).
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Your Consent</Heading>
            <Text>
              Submitting your personal information through the Careers Site is entirely voluntary. However, if you choose not to submit certain information, this may limit our ability to consider your candidacy. By agreeing to the terms of this Notice, you consent to the transfer of your personal information to Hushh and its service providers, which may be located in the United States or other jurisdictions.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Information You Provide</Heading>
            <Text>
              This Notice applies to any personal information you submit through the Careers Site as part of the job application or job search process, including:
            </Text>
            <Box pl={4} mt={2}>
              <Text>• Information provided in your resume, job application, or cover letter.</Text>
              <Text>• Any additional information shared during the recruitment process.</Text>
            </Box>
            <Text mt={4}>
              If you include personal information about a reference or any third party, you represent that you have obtained their consent before sharing their information with Hushh.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Use of Personal Information</Heading>
            <Text>
              Hushh operates the Careers Site to support its recruitment functions. Personal information collected through the Careers Site may be used for:
            </Text>
            <Box pl={4}>
              <Text>1. Assessing your qualifications for employment.</Text>
              <Text>2. Managing the recruitment process.</Text>
              <Text>3. Planning for onboarding, management, and related activities.</Text>
              <Text>4. Any other related purposes as permitted by U.S. law.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Disclosure of Personal Information</Heading>
            <Text>
              Your personal information may be accessed or reviewed by:
            </Text>
            <Box pl={4}>
              <Text>• Human resources personnel.</Text>
              <Text>• Technical services personnel.</Text>
              <Text>• Hiring managers and their designees.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Data Retention</Heading>
            <Text>
              Hushh retains personal information as long as necessary to fulfill the purposes for which it was collected or for other legitimate business needs, including compliance with legal and regulatory obligations.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Data Security</Heading>
            <Text>
              Hushh has implemented reasonable measures to protect the personal information submitted through the Careers Site.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Notice of Changes</Heading>
            <Text>
              Hushh may update this Notice periodically to reflect changes in its information collection, use, or disclosure practices. Any changes will become effective upon posting the revised Notice on the Careers Site.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Contact Information</Heading>
            <Text>
              For additional questions about this Notice, please contact:
            </Text>
            <Box pl={4}>
              <Text>• Email: legalcompliance@hushhtech.com</Text>
              <Text>• Phone: (425) 296-9050</Text>
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

export default CareersPrivacyPolicy;

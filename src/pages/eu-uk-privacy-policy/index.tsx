import React from "react";
import { Box, Heading, Text, Container, Divider, VStack } from "@chakra-ui/react";

const EUUKPrivacyPolicy = () => {
  return (
    <>
      <Box textAlign="center" mt={{md:'5rem',base:'2rem'}} mb={10}>
        <Heading as="h1" size="2xl" fontWeight={'500'} className="blue-gradient-text" my={{md:'5rem',base:'2rem'}}>
          Notice of EU and UK Privacy Policy for Job Candidates
        </Heading>
      </Box>
      <Container maxW="container.lg" py={10} px={4}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={4}>Last Updated: February 5, 2025</Heading>
            <Text>
              Hushh Technologies LLC and its affiliates (collectively, “Hushh”) are committed to protecting your privacy and maintaining the confidentiality and security of the personal information you provide in connection with your application for a position at Hushh (“Your Personal Information”). Any personal information processed by Hushh is controlled by Hushh, and Hushh acts as the data controller.
            </Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Collection of Your Personal Information</Heading>
            <Text>Hushh collects Your Personal Information from the following sources:</Text>
            <Box pl={4}>
              <Text>• The careers website hosted at www.hushhTech.com (the “Careers Site”);</Text>
              <Text>• Application forms, resumes, or CVs submitted to Hushh;</Text>
              <Text>• Other interactions with Hushh, such as email or telephone communications.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Your Personal Information May Include:</Heading>
            <Box pl={4}>
              <Text>• Identification data, including name, address, telephone number, email address.</Text>
              <Text>• Social insurance or national ID number.</Text>
              <Text>• Nationality and language proficiencies.</Text>
              <Text>• Educational and professional qualifications.</Text>
              <Text>• Work experience and employment history.</Text>
              <Text>• Contact information of your spouse, partner, or dependents (if required).</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Reasons for Collecting Personal Information</Heading>
            <Text>Hushh collects and processes Your Personal Information for:</Text>
            <Box pl={4}>
              <Text>• Compliance with legal obligations, including employment laws.</Text>
              <Text>• Performance of contractual obligations as a prospective employer.</Text>
              <Text>• Legitimate business interests, including recruitment and administration purposes.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Recipients of Your Personal Information</Heading>
            <Text>Hushh may share Your Personal Information with:</Text>
            <Box pl={4}>
              <Text>• Affiliates and agents assisting with recruitment.</Text>
              <Text>• Third-party service providers, such as background check providers.</Text>
              <Text>• Law enforcement agencies, courts, or regulators for compliance.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Storage and Protection of Personal Information</Heading>
            <Text>Hushh stores Your Personal Information in the United States and ensures appropriate safeguards are in place.</Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Your Rights</Heading>
            <Text>Under applicable law, you may have the following rights:</Text>
            <Box pl={4}>
              <Text>• Right to be informed about data collection and usage.</Text>
              <Text>• Right to access, correct, or erase Your Personal Information.</Text>
              <Text>• Right to restrict or object to processing.</Text>
              <Text>• Right to withdraw consent.</Text>
              <Text>• Right to lodge complaints with data protection authorities.</Text>
            </Box>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Further Information</Heading>
            <Text>To exercise your rights, contact DataRep at datarequest@datarep.com, quoting “Hushh Technologies LLC.”</Text>
          </Box>
          <Divider />
          
          <Box>
            <Heading as="h2" size="lg" mb={4}>Contact Information</Heading>
            <Text>
              For questions regarding this policy, contact legalcompliance@hushhTech.com.
            </Text>
          </Box>
          <Divider />
          
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">Last Updated: February 5, 2025</Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default EUUKPrivacyPolicy;

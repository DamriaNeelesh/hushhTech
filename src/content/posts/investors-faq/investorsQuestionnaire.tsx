import React from 'react';
import { Box, Text, Heading, Image, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import InvestorQImg from '../../../components/images/questionnaire.webp'
export const frontmatter = {
  title: "LP – Investor Suitability Questionnaire",
  publishedAt: "2025-02-03",
  description: "Confidential questionnaire to assess investor eligibility for Hushh Technologies Alpha Fund, LP in compliance with SEC regulations.",
  category: "legal agreements"
};

const InvestorSuitability = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
          <Image src={InvestorQImg} alt="Market Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        LP - Investor Suitability Questionnaire
      </Heading>
      
      <Text fontSize="lg" mb={4}>Confidential – For Internal Use Only</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Purpose</Heading>
      <Text>This questionnaire assesses your eligibility to invest in Hushh Technologies Alpha Fund, LP in compliance with SEC regulations and other applicable laws.</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 1: Investor Identification</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Investor Name (Legal Name):</ListItem>
        <ListItem>Entity Name (if applicable):</ListItem>
        <ListItem>Primary Contact Name (for entities):</ListItem>
        <ListItem>Mailing Address:</ListItem>
        <ListItem>Phone Number:</ListItem>
        <ListItem>Email Address:</ListItem>
        <ListItem>Tax Identification Number (SSN or EIN):</ListItem>
        <ListItem>Country of Citizenship / Incorporation:</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 2: Investor Classification</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Are you investing as an individual, joint investor, corporation, trust, or other entity?</ListItem>
        <ListItem>Accredited Investor Status – Meets SEC Rule 501 of Regulation D conditions.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 3: Qualified Purchaser Status</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Own at least $5,000,000 in investments?</ListItem>
        <ListItem>Entity owning at least $25,000,000 in investments?</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 4: Investment Experience & Risk Tolerance</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Years of investment experience?</ListItem>
        <ListItem>Primary investment focus (equities, fixed income, alternatives, etc.).</ListItem>
        <ListItem>Percentage of net worth allocated to this fund.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 5: Investment Commitment</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Class A, B, or C interest?</ListItem>
        <ListItem>Initial Capital Commitment:</ListItem>
        <ListItem>Additional capital contributions anticipated?</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 6: Compliance & Disclosures</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Subject to SEC, FINRA, or other regulatory restrictions?</ListItem>
        <ListItem>Convicted of securities fraud or financial misconduct?</ListItem>
        <ListItem>Politically Exposed Person (PEP) or subject to AML laws?</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Section 7: Certification & Signature</Heading>
      <Text>By signing, you certify that all information is accurate and complete.</Text>
      <Text>Investor Signature: _________________________ Date: ______________</Text>
      <Text>Print Name: _______________________________</Text>
    </Box>
  );
};

export default InvestorSuitability;

import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import FundsUpdateImg4 from '../../../components/images/3_Fund Performance.jpg';

export const frontmatter = {
  title: "ANTI-MONEY LAUNDERING (AML) & KNOW YOUR CUSTOMER (KYC) DOCUMENTATION",
  publishedAt: "2025-02-07",
  description: "Comprehensive compliance framework ensuring transparency and security in investor onboarding.",
  category: 'fund updates',
};

const AMLKYCDocumentation = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={FundsUpdateImg4} alt="AML KYC Documentation" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        ANTI-MONEY LAUNDERING (AML) & KNOW YOUR CUSTOMER (KYC) DOCUMENTATION
      </Heading>
      
      <Text fontSize="lg" mb={4}>Hushh Renaissance Aloha & Alpha Fund, LP</Text>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Purpose of AML/KYC Requirements</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Compliance with U.S. and global AML/KYC regulations.</ListItem>
        <ListItem>Prevention of illicit financial activities, including money laundering.</ListItem>
        <ListItem>Ensuring transparency and investor security.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Required AML/KYC Documentation</Heading>
      <Text>Investors must provide the following documents before capital acceptance:</Text>
      
      <Heading as="h4" size="md" color="teal.300" mt={4}>Individual Investors</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Government-Issued ID (Passport, Driver’s License, National ID).</ListItem>
        <ListItem>Proof of Address (Utility Bill, Bank Statement).</ListItem>
        <ListItem>Accredited Investor Certification (Form W-9 for U.S., W-8BEN for Non-U.S.).</ListItem>
        <ListItem>Source of Funds Disclosure (e.g., Business Income, Asset Sales).</ListItem>
      </List>
      
      <Heading as="h4" size="md" color="teal.300" mt={4}>Institutional & Corporate Investors</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Certified Articles of Incorporation or Formation.</ListItem>
        <ListItem>List of Beneficial Owners (25% Ownership).</ListItem>
        <ListItem>Certificate of Good Standing.</ListItem>
        <ListItem>Source of Funds Disclosure.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Enhanced Due Diligence (EDD)</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Required for high-risk investors (PEPs, large investors, or complex fund structures).</ListItem>
        <ListItem>May require additional bank references, financial statements, or virtual verification.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Sanctions Screening & Prohibited Investors</Heading>
      <List spacing={2} pl={4}>
        <ListItem>OFAC, EU, UK, UN, and FATF watchlisted individuals or entities.</ListItem>
        <ListItem>High-risk country investors (non-cooperative jurisdictions).</ListItem>
        <ListItem>Anonymous or undisclosed beneficial owners.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Investor Responsibilities & Compliance</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Full disclosure of identity and source of funds.</ListItem>
        <ListItem>Submission of required AML/KYC documents before fund participation.</ListItem>
        <ListItem>Adherence to Fund withdrawal and redemption policies.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Contact for Submission & Compliance</Heading>
      <Text>Email: compliance@hushhfund.com</Text>
      <Text>Investor Relations Hotline: +1 (XXX) XXX-XXXX</Text>
    </Box>
  );
};

export default AMLKYCDocumentation;

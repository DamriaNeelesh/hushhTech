import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack, UnorderedList } from '@chakra-ui/react';
import FundsUpdate from '../../../components/images/1_Fund Performance.jpg'

export const frontmatter = {
  title: "Wire Transfer Instructions for Initial Investment",
  publishedAt: "2025-02-08",
  description: "Confidential wire transfer instructions for subscribing to the Hushh Renaissance Aloha & Alpha Fund, LP.",
  category: 'fund updates',
};

const WireTransferInstructions = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={FundsUpdate} alt="Wire Transfer Instructions" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Wire Transfer Instructions for Initial Investment
      </Heading>

      <Text fontSize="lg" mb={4}>STRICTLY CONFIDENTIAL</Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>1. IMPORTANT NOTICE</Heading>
      <UnorderedList spacing={2} pl={4}>
        <ListItem>Wire transfers must originate from an account in the name of the investor. Third-party transfers are strictly prohibited.</ListItem>
        <ListItem>All funds must be in USD and must match the subscription amount in the executed Subscription Agreement.</ListItem>
        <ListItem>Funds must be wired within 5 business days of executing the Subscription Agreement.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>2. BANKING INFORMATION</Heading>
      <Text>Wire transfer details will be provided upon execution of the Subscription Agreement.</Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>3. MINIMUM INVESTMENT REQUIREMENTS</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Class A:</strong> $25,000,000 USD</ListItem>
        <ListItem><strong>Class B:</strong> $5,000,000 USD</ListItem>
        <ListItem><strong>Class C:</strong> $1,000,000 USD</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>4. WIRE TRANSFER PROCESS</Heading>
      <UnorderedList spacing={2} pl={4}>
        <ListItem>Execute & Submit the Subscription Agreement along with required AML/KYC documentation.</ListItem>
        <ListItem>Initiate the wire transfer from your registered bank account.</ListItem>
        <ListItem>Notify the Fund’s compliance team via email with the wire confirmation.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>5. WIRE TRANSFER VERIFICATION & PROCESSING</Heading>
      <Text>Same-day processing for domestic wires, international transfers may take 1-3 business days.</Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>6. CONTACT FOR SUPPORT</Heading>
      <Text>📩 Compliance Contact: [compliance@hushhfund.com]</Text>
      <Text>📞 Investor Relations Hotline: [+1 (XXX) XXX-XXXX]</Text>

      <Divider my={4} borderColor="teal.500" />

      <Text fontSize="lg" fontWeight="bold">🔹 Your security. Your investment. Your future. </Text>
      <Text fontSize="lg" fontWeight="bold">🔹 Welcome to Hushh Renaissance Aloha & Alpha Fund. 🔹</Text>
    </Box>
  );
};

export default WireTransferInstructions;

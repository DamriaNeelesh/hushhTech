import React from 'react';
import { Box, Heading, Text, VStack, Divider, List, ListItem } from '@chakra-ui/react';

const SubscriptionAgreement = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Class B Subscription Agreement
      </Heading>
      <Text fontSize="lg" mb={4}>
        HUSHH TECHNOLOGIES ALPHA FUND, L.P.
      </Text>
      <Text mb={4}>
        CONFIDENTIAL PRIVATE OFFERING OF CLASS B LIMITED PARTNERSHIP INTERESTS
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>1. Subscription and Purchase of Interests</Heading>
      <VStack align="start" spacing={4}>
        <Text>Minimum Commitment: $10,000,000</Text>
        <Text>Maximum Commitment: $250,000,000</Text>
        <Text>Subscription Price Per Interest: $1,000 per Class B LP Unit</Text>
      </VStack>

      <Heading as="h3" size="lg" color="teal.200" mt={6} mb={4}>2. Representations and Warranties of Subscriber</Heading>
      <List spacing={2}>
        <ListItem>Accredited Investor under Rule 501(a) of Regulation D of the Securities Act.</ListItem>
        <ListItem>Investment purposes only, not for resale.</ListItem>
        <ListItem>Reviewed PPM and LPA documents.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mt={6} mb={4}>3. Fund Operations & Capital Calls</Heading>
      <List spacing={2}>
        <ListItem>Capital calls must be funded within 10 business days.</ListItem>
        <ListItem>Preferred Return for Class B Shares: 12% per annum.</ListItem>
        <ListItem>Lock-up Period: 18 months.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mt={6} mb={4}>4. Fees & Expenses</Heading>
      <List spacing={2}>
        <ListItem>Management Fee: 1.25% of NAV annually</ListItem>
        <ListItem>Performance Fee: 15% above 12% hurdle</ListItem>
        <ListItem>Withdrawal Fee: 1.5% for early redemptions</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="yellow.300" mt={4}>Closing Note</Heading>
      <Text>
        This Agreement is governed by Delaware law. For detailed information, please refer to the Fund’s Confidential Private Placement Memorandum (PPM).
      </Text>
    </Box>
  );
};

export default SubscriptionAgreement;

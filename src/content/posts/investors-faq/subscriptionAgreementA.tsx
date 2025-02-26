import React from 'react';
import { Box, Heading, Image,Text, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import AgreementImg from  '../../../components/images/subscriptionAgreement1.webp'

const SubscriptionAgreement = () => {
  return (
    <Box color="black" borderRadius="md">
            {/* <Image src={AgreementImg} alt="Funds Update" mb={4} borderRadius="md" /> */}

      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Class A Subscription Agreement
      </Heading>
      <Text fontSize="lg" mb={4}>
        HUSHH TECHNOLOGIES ALPHA FUND, L.P.
      </Text>
      <Text mb={4}>
        CONFIDENTIAL PRIVATE OFFERING OF CLASS A LIMITED PARTNERSHIP INTERESTS
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>1. Subscription and Purchase of Interests</Heading>
      <VStack align="start" spacing={4}>
        <Text>🔹 Minimum Commitment: $25,000,000</Text>
        <Text>🔹 Maximum Commitment: No cap (subject to GP approval)</Text>
        <Text>🔹 Subscription Price Per Interest: $1,000 per Class A LP Unit</Text>
      </VStack>

      <Heading as="h3" fontSize="lg" color="black" mt={6} mb={4}>2. Representations and Warranties of Subscriber</Heading>
      <List spacing={2}>
        <ListItem>Accredited Investor under Rule 501(a) of Regulation D of the Securities Act.</ListItem>
        <ListItem>Investment purposes only, not for resale.</ListItem>
        <ListItem>Reviewed PPM and LPA documents.</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mt={6} mb={4}>3. Fund Operations & Capital Calls</Heading>
      <List spacing={2}>
        <ListItem>Capital calls must be funded within 10 business days.</ListItem>
        <ListItem>Preferred Return for Class A Shares: 15% per annum.</ListItem>
        <ListItem>Lock-up Period: 24 months.</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mt={6} mb={4}>4. Fees & Expenses</Heading>
      <List spacing={2}>
        <ListItem>Management Fee: 0.75% of NAV annually</ListItem>
        <ListItem>Performance Fee: 10% above 15% hurdle</ListItem>
        <ListItem>Withdrawal Fee: 1.0% for early redemptions</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mt={4}>Closing Note</Heading>
      <Text>
        This Agreement is governed by Delaware law. For detailed information, please refer to the Fund’s Confidential Private Placement Memorandum (PPM).
      </Text>
    </Box>
  );
};

export default SubscriptionAgreement;

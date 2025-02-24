import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image } from '@chakra-ui/react';
import AgreementImg from  '../../../components/images/subscriptionAgreement2.jpg'

const EvergreenFundSubscriptionAgreement = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
        <Image src={AgreementImg} alt='Subscription Agreement Hushh Tech LLC'/>
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        SUBSCRIPTION AGREEMENT
      </Heading>
      <Text fontSize="lg" mb={4}>
        Hushh Technologies LLC – Evergreen 🌲 Fund
      </Text>
      <Text mb={4}>
        This Subscription Agreement (the “Agreement”) is entered into as of the date set forth on the signature page hereto, by and between Hushh Technologies LLC (“the Company”), a Delaware Limited Liability Company, and the undersigned investor (“Investor”).
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        1. Subscription & Investment Terms
      </Heading>
      <Text mb={4}>
        <strong>1.1 Subscription</strong>
      </Text>
      <Text mb={4}>
        The Investor agrees to subscribe for and purchase limited partnership interests (LP Interests) in the Evergreen 🌲 Fund managed by Hushh Technologies LLC, in accordance with the terms set forth in this Agreement.
      </Text>
      <Text mb={4}>
        <strong>1.2 Minimum Investment</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Class A Shares: Minimum Investment: $25,000,000</ListItem>
        <ListItem>• Class B Shares: Minimum Investment: $5,000,000</ListItem>
        <ListItem>• Class C Shares: Minimum Investment: $1,000,000</ListItem>
      </List>
      <Text mb={4}>
        <strong>1.3 Fee Structure</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Class A: 1% management fee / 15% performance fee / 12% hurdle rate</ListItem>
        <ListItem>• Class B: 1.5% management fee / 15% performance fee / 10% hurdle rate</ListItem>
        <ListItem>• Class C: 1.5% management fee / 25% performance fee / 8% hurdle rate</ListItem>
      </List>
      <Text mb={4}>
        <strong>1.4 Investment Purpose</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>✅ Generate sustainable alpha through AI-driven options & long-term investments</ListItem>
        <ListItem>✅ Monetize the best free cash flow businesses globally</ListItem>
        <ListItem>✅ Optimize risk-adjusted returns using proprietary “Sell the Wall™” and other investment strategies</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        2. Representations & Warranties
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>1. Accredited Investor Status – Investor qualifies as an Accredited Investor under the U.S. Securities Act of 1933.</ListItem>
        <ListItem>2. Risk Acknowledgment – Investor understands that investing in derivatives and financial markets involves risk of total capital loss and no guarantee of future returns.</ListItem>
        <ListItem>3. Long-Term Commitment – Investor understands that liquidity may be restricted, and redemptions may be limited per fund policies.</ListItem>
        <ListItem>4. No Guarantees – Investor acknowledges that past performance is not indicative of future results.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        3. Fund Governance & Withdrawals
      </Heading>
      <Text mb={4}>
        <strong>3.1 Founder Control</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Hushh Technologies LLC retains full discretion over fund operations, capital allocations, and investment strategies.</ListItem>
        <ListItem>• The Board of Directors, led by Founder & CEO Manish Sainani, has exclusive decision-making authority over capital deployment.</ListItem>
      </List>
      <Text mb={4}>
        <strong>3.2 Withdrawal & Redemption Policy</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Redemptions available quarterly, subject to 45-day notice and board approval.</ListItem>
        <ListItem>• Early withdrawals may be subject to 5% liquidity fees for risk management purposes.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        4. Confidentiality & Compliance
      </Heading>
      <Text mb={4}>
        <strong>4.1 Investor Privacy</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Investor details, capital commitments, and fund allocations will remain strictly confidential.</ListItem>
        <ListItem>• Hushh Technologies LLC will comply with SEC, ADGM, and international financial regulations.</ListItem>
      </List>
      <Text mb={4}>
        <strong>4.2 Regulatory Approvals</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• The Evergreen 🌲 Fund operates under compliance with SEC (USA), ADGM (UAE), and other applicable regulatory bodies.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        5. Governing Law & Signatures
      </Heading>
      <Text mb={4}>
        This Agreement shall be governed by the laws of Delaware, USA, and disputes shall be resolved under binding arbitration in New York.
      </Text>
      <Text mb={4}>
        By signing below, the Investor agrees to all terms outlined in this Subscription Agreement.
      </Text>
      <Text mb={4}>
        Investor Signature: ___________________________<br />
        Date: _______________
      </Text>
      <Text mb={4}>
        Company Representative (Hushh Technologies LLC):<br />
        Name: Manish Sainani<br />
        Title: Founder & CEO<br />
        Signature: ___________________________<br />
        Date: _______________
      </Text>
      <Text mb={4}>
        🔐 Final Step: Secure Digital Signature & Execution via DocuSign / Legal Platform
      </Text>
      <Text mt={4} fontSize="sm" color="gray.500">
        Xo xo 🤫
      </Text>
    </Box>
  );
};

export default EvergreenFundSubscriptionAgreement;
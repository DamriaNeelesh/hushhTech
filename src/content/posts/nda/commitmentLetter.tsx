import React from 'react';
import { Box, Text, Heading, List, ListItem, Image } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

const CommitmentLetter = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Commitment Letter
      </Heading>
      <Text fontSize="lg" mb={4}>
        HushOne, Inc. (Hushh Technologies LLC – US Parent Holding Company)
      </Text>
      <Text mb={4}>
        Investor Commitment to Invest in HushOne, Inc.
      </Text>
      <Text mb={4}>
        Date: [Insert Date]
      </Text>
      <Text mb={4}>
        Investor Name: [Investor Full Name]
      </Text>
      <Text mb={4}>
        Investor Entity (if applicable): [Entity Name]
      </Text>
      <Text mb={4}>
        Investor Address: [Investor Address]
      </Text>
      <Text mb={4}>
        Investor Email: [Investor Email]
      </Text>
      <Text mb={4}>
        Investor Type: [Accredited Individual / Institutional Investor / Family Office / Other]
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        1. Investment Commitment
      </Heading>
      <Text mb={4}>
        This Commitment Letter (“Letter”) is made and entered into by and between HushOne, Inc. (“Company”) and the undersigned Investor (“Investor”), confirming the Investor’s intent to invest in the Company under the terms outlined below:
      </Text>
      <List spacing={2} pl={4} mb={4}>
        <ListItem>• Investment Amount Committed: $[Insert Investment Amount]</ListItem>
        <ListItem>• Security Type: [SAFE Note / Preferred Equity / Common Equity / Convertible Note]</ListItem>
        <ListItem>• Fund Transfer Date: [Insert Expected Transfer Date]</ListItem>
        <ListItem>• Investment Term (if applicable): [Specify Term]</ListItem>
        <ListItem>• Use of Funds: The funds will be used to further HushOne’s mission to develop AI-driven financial and investment technologies, expand operational capabilities, and accelerate growth initiatives.</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        2. Terms & Acknowledgments
      </Heading>
      <List spacing={2} pl={4} mb={2}>
        <ListItem>1. Binding Intent: This Letter represents a binding commitment to invest the stated amount under the final terms of the definitive investment agreement.</ListItem>
        <ListItem>2. Due Diligence Completed: The Investor has conducted all necessary due diligence and has reviewed Company financials, business plans, and disclosures.</ListItem>
        <ListItem>3. Regulatory Compliance: The Investor is an Accredited Investor under applicable securities laws and will comply with all regulatory requirements.</ListItem>
        <ListItem>4. No Guarantee of Returns: The Investor understands that this is a high-risk, long-term investment with no guaranteed liquidity or return.</ListItem>
        <ListItem>5. Final Agreement: The investment will be finalized upon execution of the Subscription Agreement, SAFE Note, or Share Purchase Agreement, as applicable.</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        3. Fund Transfer Instructions
      </Heading>
      <Text mb={4}>
        The Investor agrees to wire transfer funds per the following instructions on or before the agreed Fund Transfer Date:
      </Text>
      <List spacing={2} pl={4} mb={4}>
        <ListItem>• Receiving Bank: [Insert Bank Name]</ListItem>
        <ListItem>• Bank Address: [Insert Bank Address]</ListItem>
        <ListItem>• Account Name: HushOne, Inc.</ListItem>
        <ListItem>• Account Number: [Insert Account Number]</ListItem>
        <ListItem>• Routing Number (US): [Insert Routing Number]</ListItem>
        <ListItem>• SWIFT Code (International): [Insert SWIFT Code]</ListItem>
        <ListItem>• Reference: [Investor Name - Investment in HushOne, Inc.]</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        4. Confidentiality & Non-Disclosure
      </Heading>
      <Text mb={4}>
        The Investor agrees that all discussions, documentation, and details of this investment shall remain strictly confidential and shall not be disclosed to any third party without prior written consent from the Company, except as required by law.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        5. Signature & Acknowledgment
      </Heading>
      <Text mb={4}>
        By signing this Commitment Letter, the Investor confirms their intent to invest in HushOne, Inc., subject to execution of definitive agreements.
      </Text>
      <Text mb={4}>
        Investor Signature
      </Text>
      <Text mb={4}>
        Investor Name: [Investor Full Name]
      </Text>
      <Text mb={4}>
        Investor Entity (if applicable): [Entity Name]
      </Text>
      <Text mb={4}>
        Investor Signature: __________________________
      </Text>
      <Text mb={4}>
        Date Signed: [Insert Date]
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Issuer Confirmation & Acceptance
      </Heading>
      <Text mb={4}>
        This Commitment Letter is accepted by HushOne, Inc., confirming the Investor’s commitment to invest in the Company.
      </Text>
      <Text mb={4}>
        Authorized Representative:
      </Text>
      <Text mb={4}>
        HushOne, Inc.<br />
        By: [Founder/CEO Name]<br />
        Title: Founder & CEO<br />
        Date: [Insert Date]
      </Text>
      <Text mt={4} fontSize="sm" color="gray.500">
        🚀 Welcome to the Future of Investing with HushOne, Inc. 🚀
      </Text>
    </Box>
  );
};

export default CommitmentLetter;
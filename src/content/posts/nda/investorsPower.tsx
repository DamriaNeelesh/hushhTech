import React from 'react';
import { Box, Text, Heading, List, ListItem } from '@chakra-ui/react';

const InvestorPowerOfAttorney = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        INVESTOR POWER OF ATTORNEY (POA)
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        (For Execution of Investment Transactions & Fund Operations on Behalf of Investor)
      </Text>
      <Text mb={4}>
        This Power of Attorney (“POA”) is made and executed as of the date of signing between:
      </Text>
      <Text mb={4}>
        Investor Name: ____________________________________<br />
        Investor Address: __________________________________<br />
        Investor Contact: __________________________________<br />
        Email: ___________________________________________<br />
        (Hereinafter referred to as the “Investor”)
      </Text>
      <Text mb={4}>
        AND
      </Text>
      <Text mb={4}>
        HushOne, Inc.<br />
        (AKA Hushh AI Technologies and Computers Trading LLC for ADGM Investors)<br />
        A duly incorporated investment firm with its principal offices located at:<br />
        📍 [Insert Official Address]<br />
        (Hereinafter referred to as the “Fund Manager” or “Attorney-in-Fact”)
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        1. PURPOSE OF THIS POWER OF ATTORNEY
      </Heading>
      <Text mb={4}>
        The Investor hereby appoints HushOne, Inc. (the “Fund Manager”) as their true and lawful Attorney-in-Fact to manage and execute certain investment-related transactions exclusively within the HushOne investment funds, including but not limited to:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>
          1. Trading & Investment Execution
          <List spacing={2} ml={5}>
            <ListItem>• Buying, selling, and trading securities, including options, derivatives, private equity, venture capital, and structured financial instruments within the fund.</ListItem>
            <ListItem>• Executing options strategies, including “Sell the Wall™” and similar investment programs.</ListItem>
            <ListItem>• Reinvesting rental income, dividends, and capital gains in line with the fund’s stated objectives.</ListItem>
          </List>
        </ListItem>
        <ListItem>
          2. Administrative & Fund Operations
          <List spacing={2} ml={5}>
            <ListItem>• Submitting and managing brokerage & custody accounts at IBKR, Charles Schwab, Fidelity, JP Morgan, Goldman Sachs, Morgan Stanley, Bank of America, and Bank of NY Mellon.</ListItem>
            <ListItem>• Executing transactions and managing cash flows within designated fund bank accounts.</ListItem>
            <ListItem>• Handling compliance filings related to SEC, ADGM, UAE Central Bank, and other regulatory bodies.</ListItem>
          </List>
        </ListItem>
        <ListItem>
          3. Corporate Governance & Investor Representation
          <List spacing={2} ml={5}>
            <ListItem>• Acting on behalf of the Investor in Limited Partnership meetings, investor votes, and corporate actions within the fund.</ListItem>
            <ListItem>• Signing and submitting regulatory reports or financial documents as required by law.</ListItem>
            <ListItem>• Managing reallocation of investment stakes and fund distributions per the fund’s policies.</ListItem>
          </List>
        </ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        2. DURATION & REVOCABILITY
      </Heading>
      <Text mb={4}>
        This POA shall remain in full force and effect:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>✅ Until the Investor provides written revocation to the Fund Manager OR</ListItem>
        <ListItem>✅ Until the Investor fully exits their investment in HushOne, Inc.</ListItem>
      </List>
      <Text mb={4}>
        Revocation Procedure:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>• The Investor may revoke this POA at any time with 30 days’ written notice to the Fund Manager.</ListItem>
        <ListItem>• Upon revocation, all pending transactions will be completed before the revocation takes full effect.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        3. LIMITATIONS OF AUTHORITY
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>🚨 The Fund Manager CANNOT:</ListItem>
        <ListItem>❌ Withdraw or transfer the Investor’s personal funds outside the fund’s framework.</ListItem>
        <ListItem>❌ Modify the Investor’s beneficial ownership structure without consent.</ListItem>
        <ListItem>❌ Make any personal loans or guarantees in the Investor’s name.</ListItem>
        <ListItem>❌ Engage in transactions unrelated to fund operations.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        4. INDEMNIFICATION & LIABILITY PROTECTIONS
      </Heading>
      <Text mb={4}>
        The Fund Manager shall act in the best interests of the Investor, maintaining fiduciary duty and compliance with all SEC, ADGM, and global financial regulations. The Investor agrees to indemnify the Fund Manager from liability arising solely from market risks and standard fund operations, excluding any fraud or misconduct.
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        5. ACKNOWLEDGMENT & EXECUTION
      </Heading>
      <Text mb={4}>
        By signing below, the Investor acknowledges that they have read, understood, and voluntarily executed this POA, granting HushOne, Inc. the authority to act on their behalf within the scope of the fund’s investment strategies.
      </Text>
      <Text mb={4}>
        🔹 Investor Signature:<br />
        ✍️ ___________________________ Date: ________________
      </Text>
      <Text mb={4}>
        🔹 HushOne, Inc. Authorized Representative:<br />
        ✍️ ___________________________ Date: ________________<br />
        📍 Title: Chief Investment Officer / Fund Manager
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        🔐 FINAL REMARKS
      </Heading>
      <Text mb={4}>
        This POA is designed to simplify investment execution and ensure optimal fund management while maintaining investor protection. All transactions will be recorded, fully transparent, and auditable upon investor request.
      </Text>
      <Text fontSize="lg" color="teal.300">
        🚀 Welcome to the Future of Aloha & Alpha!
      </Text>
    </Box>
  );
};

export default InvestorPowerOfAttorney;
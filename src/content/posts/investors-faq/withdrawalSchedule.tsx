import React from 'react';
import { Box, Image, Text, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import WithdrawalImage from '../../../components/images/withdrawalScheduleImg.webp'
export const frontmatter = {
  title: "LP – Withdrawal Schedule",
  publishedAt: "2025-02-03",
  description: "Terms and conditions for investor withdrawals from Hushh Technologies Alpha Fund, LP, ensuring liquidity and portfolio stability.",
  category: 'investor relations & strategies',
};

const WithdrawalSchedule = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
         <Image src={WithdrawalImage} alt="Market Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Hushh Technologies Alpha Fund, LP - Withdrawal Schedule
      </Heading>
      
      <Text fontSize="lg" mb={4}>Effective Date: 2025-02-03</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Overview</Heading>
      <Text>This withdrawal schedule outlines the terms and conditions for investors seeking to redeem capital, balancing investor liquidity with portfolio stability.</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>1. Withdrawal Eligibility</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Minimum Holding Period: 12 months for initial investments, 6 months for additional contributions.</ListItem>
        <ListItem>Notice Requirement: 60-day written notice prior to redemption.</ListItem>
        <ListItem>Withdrawal Frequency: Processed quarterly on the last business day of each quarter.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>2. Withdrawal Tiers & Fees</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Class A Shares:</strong> 12-month lock-up, 50% NAV limit, 1.00% fee if withdrawn within 24 months.</ListItem>
        <ListItem><strong>Class B Shares:</strong> 12-month lock-up, 25% NAV limit, 1.50% fee if withdrawn within 24 months.</ListItem>
        <ListItem><strong>Class C Shares:</strong> 12-month lock-up, 15% NAV limit, 2.00% fee if withdrawn within 24 months.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>3. Liquidity Considerations & Pro Rata Redemptions</Heading>
      <Text>The fund may prorate withdrawals if total redemption requests exceed 20% of NAV in a single quarter.</Text>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>4. Distribution Method & Timing</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Withdrawals paid via wire transfer or ACH.</ListItem>
        <ListItem>Processing takes 15-30 business days.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>5. Exceptional Circumstances</Heading>
      <Text>The General Partner reserves the right to suspend withdrawals in extraordinary market conditions.</Text>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>6. Special Considerations for GP & Key LPs</Heading>
      <Text>Certain investors may have special withdrawal terms per their agreements.</Text>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>7. Tax Considerations</Heading>
      <Text>Withdrawals may result in taxable events; investors should consult tax professionals.</Text>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>8. Amendments & Updates</Heading>
      <Text>The fund may modify withdrawal policies with a 90-day investor notice.</Text>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>9. Contact & Submission Process</Heading>
      <Text>For withdrawal requests or inquiries, contact: investors@hushhtech.com</Text>
      <Text>Requests must be submitted in writing via email or certified mail.</Text>
    </Box>
  );
};

export default WithdrawalSchedule;

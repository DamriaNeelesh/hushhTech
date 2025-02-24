import React from 'react';
import { Box, Text, Heading, List, ListItem } from '@chakra-ui/react';

const SubscriptionAgreementCShares = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        SUBSCRIPTION AGREEMENT FOR CLASS C SHARES
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        🤫 Aloha & Alpha Fund<br />
        Hushh Technologies LLC<br />
        Effective Date: [Insert Date]
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        1. SUBSCRIPTION & CLASS C INVESTMENT TERMS
      </Heading>
      <Text mb={4}>
        This Subscription Agreement (the “Agreement”) is made between Hushh Technologies LLC, a Delaware limited liability company (the “Fund”), and the undersigned investor (the “Investor”), who wishes to subscribe for Class C Shares in the Fund under the terms and conditions outlined below.
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        2. SUBSCRIPTION DETAILS
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>• Minimum Investment: $1,000,000</ListItem>
        <ListItem>• Management Fee: 1.5% per annum</ListItem>
        <ListItem>• Performance Fee: 25% of net profits</ListItem>
        <ListItem>• Hurdle Rate: 8% (before performance fees apply)</ListItem>
        <ListItem>• Lock-Up Period: 12 months</ListItem>
        <ListItem>• Redemption Terms: Quarterly withdrawals allowed with 90 days’ notice</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        3. REPRESENTATIONS & WARRANTIES OF INVESTOR
      </Heading>
      <Text mb={4}>
        By executing this Agreement, the Investor represents and warrants that:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>1. Accredited Investor Status: Investor meets the qualifications of an Accredited Investor under Rule 501(a) of Regulation D under the U.S. Securities Act of 1933.</ListItem>
        <ListItem>2. Risk Understanding: Investor acknowledges that this is a high-risk investment and understands the volatility of derivatives, leverage, and options strategies employed by the Fund.</ListItem>
        <ListItem>3. Due Diligence: Investor has received, read, and understood the Fund’s Private Placement Memorandum (PPM) and agrees to the terms set forth therein.</ListItem>
        <ListItem>4. Capital Commitment: Investor confirms they have the financial capacity to commit capital without causing undue hardship or liquidity issues.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        4. FUND STRATEGY & USE OF PROCEEDS
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>✅ Sell the Wall™ – Selling covered calls & cash-secured puts to maximize short-term rental income on high FCF businesses (AAPL, NVDA, MSFT, AMZN, GOOGL, BRK.B, etc.).</ListItem>
        <ListItem>✅ AI-Driven Market Making – Leveraging machine learning and real-time risk modeling to capture statistical arbitrage and volatility premiums.</ListItem>
        <ListItem>✅ Capital Efficiency – Deploying capital in high-liquidity options markets to maximize return on risk-adjusted capital while maintaining strict risk controls.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        5. REDEMPTIONS & WITHDRAWALS
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>• Investors may redeem quarterly subject to a 90-day notice period.</ListItem>
        <ListItem>• The Fund reserves the right to suspend redemptions during periods of extreme market stress to protect all investors.</ListItem>
        <ListItem>• Early withdrawals (before lock-up expiry) are subject to a 5% early redemption fee.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        6. FUND RISKS & DISCLOSURES
      </Heading>
      <Text mb={4}>
        The Investor acknowledges the inherent risks in the Fund’s trading strategy, including but not limited to:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>⚠️ Market Risk – Options trading is highly sensitive to volatility, and markets may move unpredictably.</ListItem>
        <ListItem>⚠️ Liquidity Risk – While the Fund primarily trades high-liquidity names, sudden market disruptions may impact trade execution.</ListItem>
        <ListItem>⚠️ Regulatory Risk – Future changes in financial regulations may impact fund strategy, particularly in options markets.</ListItem>
        <ListItem>⚠️ Operational Risk – Any failures in trading infrastructure, margin management, or compliance could affect fund performance.</ListItem>
      </List>
      <Text mb={4}>
        Risk Acceptance: By subscribing, the Investor accepts all risks outlined in the Fund’s Private Placement Memorandum (PPM) and agrees that returns are not guaranteed.
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        7. CONFIDENTIALITY & RESTRICTED INFORMATION
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>• The Investor agrees to maintain strict confidentiality regarding the Fund’s proprietary strategies, holdings, and trade execution methods.</ListItem>
        <ListItem>• Any unauthorized sharing of Fund information will result in immediate termination of investment rights.</ListItem>
      </List>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        8. EXECUTION & ACCEPTANCE
      </Heading>
      <Text mb={4}>
        Upon execution of this Agreement and receipt of funds, the Investor shall be issued Class C Shares in the Fund. The Fund Manager reserves the right to accept or reject any subscription at their discretion.
      </Text>
      <Heading as="h3" size="lg" mb={3} color="teal.200">
        SIGNATURES & EXECUTION
      </Heading>
      <Text mb={4}>
        Investor:<br />
        📌 Name: [Investor Name]<br />
        📌 Entity (if applicable): [Entity Name]<br />
        📌 Signature: ______________________<br />
        📌 Date: _______________
      </Text>
      <Text mb={4}>
        Fund Manager – Hushh Technologies LLC<br />
        📌 Authorized Signatory: ______________________<br />
        📌 Title: Managing Partner & CIO<br />
        📌 Date: _______________
      </Text>
      <Text mb={4}>
        This Subscription Agreement shall be governed by and construed in accordance with the laws of the State of Delaware. Any disputes shall be resolved via arbitration in New York, NY.
      </Text>
      <Text fontSize="lg" color="teal.300">
        Welcome to the Aloha & Alpha Fund. Let’s create sustainable alpha together. 🚀
      </Text>
    </Box>
  );
};

export default SubscriptionAgreementCShares;
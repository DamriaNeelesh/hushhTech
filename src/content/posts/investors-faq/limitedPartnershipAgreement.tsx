import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';

export const frontmatter = {
  title: "LIMITED PARTNERSHIP AGREEMENT OF HUSHH TECHNOLOGIES ALPHA FUND, L.P.",
  publishedAt: "2025-02-03",
  description: "Agreement outlining the formation, management, and operational guidelines of Hushh Technologies Alpha Fund, L.P.",
  category: "legal agreements"
};

const LimitedPartnershipAgreement = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        LIMITED PARTNERSHIP AGREEMENT OF HUSHH TECHNOLOGIES ALPHA FUND, L.P.
      </Heading>

      <Text fontSize="lg" mb={4}>A Delaware Limited Partnership - Effective as of [Date]</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>ARTICLE I - FORMATION OF THE PARTNERSHIP</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>1.1 Formation & Name:</strong> The partnership is entered into by Hushh Technologies Alpha Fund GP, LLC, the General Partner (GP), and the Limited Partners (LPs).</ListItem>
        <ListItem><strong>1.2 Principal Office:</strong> Located in Kirkland, Washington, USA, with additional offices at the GP’s discretion.</ListItem>
        <ListItem><strong>1.3 Registered Agent & State of Formation:</strong> Formed under Delaware law with a registered agent in Delaware.</ListItem>
        <ListItem><strong>1.4 Purpose:</strong> Investing in Free Cash Flow (FCF) dominant businesses, utilizing AI & quantitative models, and maximizing risk-adjusted income.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>ARTICLE II - CAPITAL COMMITMENTS & INTERESTS</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>2.1 Classes of Interests:</strong>
          <List pl={4}>
            <ListItem>🔹 Class A: $25M minimum investment, priority distributions, reduced fees.</ListItem>
            <ListItem>🔹 Class B: $5M minimum investment, standard terms.</ListItem>
            <ListItem>🔹 Class C: $1M minimum investment, higher liquidity.</ListItem>
          </List>
        </ListItem>
        <ListItem><strong>2.2 Capital Contributions & Capital Calls:</strong> LPs must fund capital contributions upon demand.</ListItem>
        <ListItem><strong>2.3 Limited Liability:</strong> LPs are not personally liable beyond their committed capital.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>ARTICLE III - MANAGEMENT & OPERATIONS</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>3.1 General Partner Authority:</strong> The GP has full authority over investments, capital calls, risk management, and operations.</ListItem>
        <ListItem><strong>3.2 Advisory Board:</strong> The GP may appoint an LP Advisory Committee (LPAC) for governance oversight.</ListItem>
        <ListItem><strong>3.3 Fees & Expenses:</strong>
          <List pl={4}>
            <ListItem>Management Fee: 0.75% of NAV annually (Class A discounted).</ListItem>
            <ListItem>Performance Fee: 10% of profits above a 15% hurdle.</ListItem>
            <ListItem>Withdrawal Fee: 1.0% for early redemptions.</ListItem>
          </List>
        </ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>ARTICLE IV - DISTRIBUTIONS & WITHDRAWALS</Heading>
      <Text>Profits shall be distributed in accordance with the agreement terms.</Text>
    </Box>
  );
};

export default LimitedPartnershipAgreement;

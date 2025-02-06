import React from 'react';
import { Box, Heading, Image, Text, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import FundsUpdate from '../../../components/images/2_Fund Performance.jpg'

export const frontmatter = {
  title: "Hushh Technology Fund L.P.",
  publishedAt: "2025-01-01",
  description: "Executive summary and key details about the Hushh Technology Fund L.P., including structure, strategy, and projections.",
  category: "fund updates"
};

const FundAtHushh: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
     <Image src={FundsUpdate} alt="Funds Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Hushh Technology Fund L.P.
      </Heading>

      <Text fontSize="lg" mb={4}><strong>Inception Date:</strong> January 2025</Text>
      <Text mb={4}><strong>Legal Structure:</strong> Limited Partnership (L.P.)</Text>
      <Text mb={4}><strong>Target AUM:</strong> $250 million initial raise, targeting $10B over 7 years</Text>
      <Text mb={4}><strong>Objective:</strong> Leverage AI and value investing principles for superior risk-adjusted returns through investments in high-quality, low-beta stocks with strong free cash flow, enhanced by options trading.</Text>
      <Text mb={4}><strong>Management:</strong> Manish Sainani (Founder/CEO), Justin Donaldson (Chief Scientist/CPO)</Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Fund Structure & Governance</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Legal Structure:</strong> Delaware LLC, registered hedge fund in Upstate New York, compliant with the Investment Company Act of 1940 and SEC regulations.</ListItem>
        <ListItem><strong>Management:</strong> Led by Manish Sainani and Justin Donaldson, with an experienced team in AI and investment strategy.</ListItem>
        <ListItem><strong>Advisory Board:</strong> Finance, AI, and technology experts providing strategic guidance.</ListItem>
        <ListItem><strong>Governance:</strong> Regular board meetings, SEC compliance, annual audits.</ListItem>
        <ListItem><strong>Investor Rights:</strong> Quarterly performance reports, annual audits, regular strategy updates, voting rights on major changes.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Investment Strategy</Heading>
      <Text mb={4}><strong>Core Thesis:</strong> Concentrated portfolio of high-quality, low-beta stocks with strong free cash flow, supported by AI insights and options trading.</Text>
      <List spacing={2} pl={4}>
        <ListItem><strong>AI Insights:</strong> Proprietary models analyze data and uncover trends.</ListItem>
        <ListItem><strong>Options Strategy:</strong> Covered calls and cash-secured puts to generate income with leverage capped at 70%.</ListItem>
        <ListItem><strong>Reinvestment Strategy:</strong> 70% reinvested in core portfolio, 30% allocated to AI development and social initiatives.</ListItem>
        <ListItem><strong>Risk Management:</strong> Diversification, protective puts, and liquidity management.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Performance Projections</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Optimistic Case:</strong> 25-30% annualized returns.</ListItem>
        <ListItem><strong>Neutral Case:</strong> 15-20% annualized returns.</ListItem>
        <ListItem><strong>Conservative Case:</strong> 8-12% annualized returns.</ListItem>
      </List>

      <Text mb={4}><strong>Minimum Investment:</strong> $100,000 (Class A), $25,000 increments</Text>
      <Text mb={4}><strong>Expense Ratio:</strong> &lt;1% of AUM</Text>
      <Text mb={4}><strong>Fees:</strong> 1.5% management fee, 15% performance fee (6% hurdle)</Text>
      <Text mb={4}><strong>Reinvestment:</strong> All income reinvested</Text>
      <Text mb={4}><strong>Subscription/Redemption:</strong> Monthly subscriptions, 60-day notice for redemptions, quarterly windows.</Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Meet the Team</Heading>
      <Text mb={4}><strong>Manish Sainani:</strong> Founder & CEO, with leadership experience at Google, Microsoft, and Splunk, specializing in AI and data-driven innovation.</Text>
      <Text mb={4}><strong>Justin Donaldson:</strong> Chief Scientist & CPO, architect of proprietary strategies like "Sell the Wall," leveraging advanced quantitative models for consistent, risk-optimized returns.</Text>
    </Box>
  );
};

export default FundAtHushh;

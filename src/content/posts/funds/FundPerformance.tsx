import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, Badge, VStack } from '@chakra-ui/react';
import FundsUpdate from '../../../components/images/1_Fund Performance.jpg'

export const frontmatter = {
  title: "🤫 Fund Performance – January 28, 2025",
  publishedAt: "2025-01-28",
  description: "Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.",
  category: "funds",
  author: "Jane Doe",
  tags: ["market update", "daily update", "indices", "volatility", "investing"]
};

const FundPerformance: React.FC = () => {
  return (
    <Box p={5} bg="gray.800" color="white" borderRadius="md" shadow="lg">
     <Image src={FundsUpdate} alt="Funds Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        📊 Fund Overview
      </Heading>
      <VStack align="start" spacing={3}>
        <Text><strong>Net Liquidation Value:</strong> $6,000,654.31</Text>
        <Text><strong>Proceeds:</strong> $240,269.56</Text>
        <Text><strong>Net Gain:</strong> +15.28%</Text>
      </VStack>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Transaction Statistics
      </Heading>
      <List spacing={2}>
        <ListItem>Transaction Count: 29</ListItem>
        <ListItem>Gain Count: 29</ListItem>
        <ListItem>Loss Count: 0</ListItem>
        <ListItem>Gain/Loss Ratio: 100% gain rate</ListItem>
        <ListItem>Average Gain: +15.28%</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Weekly Overview (Including January 27, 2025)
      </Heading>
      <List spacing={2}>
        <ListItem>Total Proceeds: $546,255.67</ListItem>
        <ListItem>Total Cost Basis: $466,788.62</ListItem>
        <ListItem>Net Gain (Short Term): $79,467.05 (+14.61%)</ListItem>
        <ListItem>Gain Rate: 87.30%</ListItem>
        <ListItem>Total Gains: $81,888.26</ListItem>
        <ListItem>Total Losses: $2,421.21</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Top Performing Positions
      </Heading>
      <List spacing={2}>
        <ListItem><strong>Apple (AAPL):</strong> +$141,253.23. <Badge colorScheme="green">RSI: 52.27</Badge></ListItem>
        <ListItem><strong>NVIDIA (NVDA):</strong> +$137,013.25. <Badge colorScheme="green">RSI: 43.96</Badge></ListItem>
        <ListItem><strong>Alphabet Inc. (GOOGL):</strong> +$17,097.39. <Badge colorScheme="green">RSI: 54.13</Badge></ListItem>
        <ListItem><strong>Amazon (AMZN):</strong> +$11,054.70. <Badge colorScheme="green">RSI: 67.46</Badge></ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Strategic Commentary
      </Heading>
      <List spacing={2}>
        <ListItem><strong>Sell the Wall Execution:</strong> Maximized premium collection on AAPL and NVDA.</ListItem>
        <ListItem><strong>Balanced Strike Prices:</strong> Tesla (TSLA) and Amazon (AMZN) optimized for gains.</ListItem>
        <ListItem><strong>Hedged Exposure:</strong> Protective puts for META and TSLA.</ListItem>
        <ListItem><strong>Income Realized Today:</strong> $80,000 from options premiums.</ListItem>
        <ListItem><strong>Margin Utilization:</strong> Disciplined use for liquidity management.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Outlook
      </Heading>
      <List spacing={2}>
        <ListItem><strong>Market Direction:</strong> Strength in tech sectors expected.</ListItem>
        <ListItem><strong>Portfolio Adjustments:</strong> Rolling positions into higher volatility weeks.</ListItem>
        <ListItem><strong>Focus Areas:</strong> GOOGL, AAPL, and diversification with BRK.B.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" mb={2} color="teal.200">
        Summary
      </Heading>
      <Text>
        The Fund achieved a stellar +5.34% increase in value with a 100% gain rate. The "Sell the Wall" strategy continues to deliver sustainable income, positioning the fund for long-term growth.
      </Text>
    </Box>
  );
};

export default FundPerformance;

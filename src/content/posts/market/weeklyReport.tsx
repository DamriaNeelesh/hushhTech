import React from 'react';
import { Box, Heading, Image, Text, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/3_Daily Market Update.jpg'

export const frontmatter = {
  title: "Closing Day and Weekly Report – February 3, 2025",
  date: "2025-02-03",
  description: "Closing day and weekly report for February 3, 2025, covering performance overview, transaction summary, and portfolio highlights.",
  category: "market"
};

const WeeklyReport = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h1" fontSize="2xl" mb={4} color="black">
        Closing Day and Weekly Report – February 3, 2025
      </Heading>

      <VStack align="start" spacing={4}>
        <Heading as="h2" fontSize="lg">Daily and Weekly Performance Overview</Heading>
        <Text><strong>Total Proceeds:</strong> $22,070.41</Text>
        <Text><strong>Cost Basis:</strong> $13,244.00</Text>
        <Text><strong>Net Gain:</strong> $8,826.41 (+39.99%)</Text>
        <Text><strong>Gain Ratio:</strong> 100.00%</Text>

        <Heading as="h3" fontSize="md">Transaction Summary</Heading>
        <Text>Gain Count: 8 | Loss Count: 0 | Average Gain: +39.99% | Gain Rate: 100.00%</Text>

        <Heading as="h3" fontSize="md">Weekly Performance Recap</Heading>
        <Text>Weekly Total Income: $8,826.41</Text>
        <Text>Weekly NAV Performance: +0.11%</Text>
        <Text>Cumulative NAV: $7.68M</Text>

        <Divider borderColor="black" />

        <Heading as="h2" fontSize="lg">Portfolio Highlights</Heading>
        <List spacing={2}>
          <ListItem><strong>Apple (AAPL):</strong> +$2,579.25 - Strong demand, RSI 41.11</ListItem>
          <ListItem><strong>Alphabet Inc. (GOOGL):</strong> +$897.22 - Growth in cloud and ads, RSI 59.29</ListItem>
          <ListItem><strong>Tesla (TSLA):</strong> +$695.89 - EV optimism, RSI 43.42</ListItem>
          <ListItem><strong>Berkshire Hathaway (BRK/B):</strong> +$958.88 - Consistent cash flow, RSI 52.27</ListItem>
          <ListItem><strong>Nvidia (NVDA):</strong> +$813.49 - AI growth potential, RSI 36.81</ListItem>
        </List>

        <Divider borderColor="black" />

        <Heading as="h2" fontSize="lg">Market Insights</Heading>
        <Text>Dow and Nasdaq showed minor pullbacks driven by profit-taking amidst mixed earnings reports. VIX stable at 15.05.</Text>
        <Text>Sector Highlights: Tech and Consumer Staples showing resilience.</Text>

        <Divider borderColor="black" />

        <Heading as="h2" fontSize="lg">Strategic Commentary</Heading>
        <Text>"Sell the Wall" strategy validated with covered calls and cash-secured puts capturing consistent premium income.</Text>

        <Divider borderColor="black" />

        <Heading as="h2" fontSize="lg">Outlook</Heading>
        <Text>Focus on high-liquidity, free cash flow businesses. Tactical rotations into healthcare and consumer staples.</Text>

        <Divider borderColor="black" />

        <Heading as="h2" fontSize="lg">Closing Note</Heading>
        <Text>
          "The big money is not in the buying or selling, but in the waiting." – Charlie Munger
        </Text>
        <Text>Let’s maximize returns while navigating market complexity. Onward to creating more Aloha and Alpha!</Text>
      </VStack>
    </Box>
  );
};

export default WeeklyReport;
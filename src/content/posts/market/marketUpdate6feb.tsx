import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/2_Daily Market Update.jpg'

export const frontmatter = {
  title: "Alpha Aloha Fund Market and Fund Update Report",
  publishedAt: "2025-02-06",
  description: "Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.",
  category: 'fund updates',
};

const MarketUpdate6feb = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Alpha Aloha Fund Market and Fund Update Report
      </Heading>

      <Text fontSize="lg" mb={4}>Reporting Period: February 6, 2025</Text>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>NAV & Cash Position</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>NAV (Maintenance Capital at Risk):</strong> $7,678,000</ListItem>
        <ListItem><strong>Cash Position:</strong> $5,653,000</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Performance Overview</Heading>
      <Text fontSize="md" fontWeight="500">Daily Performance (Feb 6, 2025):</Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (Day): $16,928.45 (0.22% of NAV)</ListItem>
        <ListItem>Proceeds: $1,514,209.76 | Cost Basis: $1,522,770.83</ListItem>
        <ListItem>Gain/Loss Ratio: 100% | Win Rate: 100%</ListItem>
      </List>

      <Text fontSize="md" fontWeight="500" mt={4}>Month-to-Date Performance (Feb 2025):</Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income: $134,366.45 (1.75% of NAV)</ListItem>
        <ListItem>Proceeds: $3,028,419.52 | Cost Basis: $3,045,541.66</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy Highlights</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Amazon (AMZN) Earnings Play: Sold the wall on AMZN to capture IV volatility.</ListItem>
        <ListItem>Rolling Over High RSI Positions: Managed JPM holdings efficiently.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Market Commentary</Heading>
      <Text fontSize="md" fontWeight="500">Tech Sector Resilience:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Amazon (AMZN) reported strong earnings but provided lighter Q1 guidance.</ListItem>
        <ListItem>Alphabet (GOOGL) shares dipped due to increased CapEx plans.</ListItem>
      </List>
      
      <Text fontSize="md" fontWeight="500" mt={4}>Macro Insights:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Dow +0.71%, Nasdaq +1.64%, signaling investor optimism.</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Closing Remarks</Heading>
      <Text>
        The Alpha Aloha Fund maintains disciplined strategies in premium capture, risk management, and sector rotation.
        With a NAV of $7.678 million and a strong cash position of $5.653 million, we continue leveraging opportunities for alpha generation.
      </Text>

      <Text fontSize="lg" mt={4} fontWeight="500">Onward to new heights! 🙌</Text>
    </Box>
  );
};

export default MarketUpdate6feb;

import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import MarketUpdateImg from '../../../components/images/2_Daily Market Update.jpg';

export const frontmatter = {
  title: "🤫 Alpha Aloha Fund Market and Fund Update Report",
  publishedAt: "2025-03-05",
  description: "Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.",
  category: "market updates"
};

const MarketUpdate5Feb = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdateImg} alt="Market Update" mb={4} borderRadius="md" /> */}
 
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Alpha Aloha Fund Market and Fund Update Report
      </Heading>

      <Text fontSize="lg" mb={4}>Reporting Period: February 5, 2025</Text>
      <Text mb={2}><strong>NAV (Maintenance Capital at Risk):</strong> $7,619,000</Text>
      <Text mb={2}><strong>Cash Position:</strong> $5,632,000</Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Performance Overview</Heading>
      <Heading as="h4" fontSize="md" color="black" mb={2}>Daily Performance (Feb 5, 2025):</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Net Income (Day):</strong> $80,438 (1.06% of NAV)</ListItem>
        <ListItem><strong>Proceeds:</strong> $1,514,209.76</ListItem>
        <ListItem><strong>Cost Basis:</strong> $1,522,770.83</ListItem>
        <ListItem><strong>Gain/Loss Ratio:</strong> 99.66%</ListItem>
        <ListItem><strong>Transaction Count:</strong> Gains: 146 (15.72% avg gain), Losses: 4 (-0.02% avg loss)</ListItem>
      </List>

      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy Highlights</Heading>
      <Text mb={2}><strong>1. Selling the Walls</strong> – Strategic trades in GOOGL and SNAP delivered $80K in net income.</Text>
      <Text mb={2}><strong>2. Key Tech Holdings:</strong> GOOGL, SNAP, AAPL, TSLA</Text>
      <Text mb={2}><strong>3. Diversification Moves:</strong> Allocations in AAPL, TSLA, and consumer staples.</Text>
      <Text mb={2}><strong>4. Hedging:</strong> NVIDIA (NVDA) long puts for market risk hedging.</Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Market Commentary</Heading>
      <Text mb={2}><strong>Tech Sector Resilience:</strong> Mega-cap tech showed strength despite mixed earnings.</Text>
      <Text mb={2}><strong>Macro Insights:</strong> Dow +0.71%, Nasdaq +1.64%, signaling investor optimism.</Text>

      <Heading as="h4" fontSize="md" color="black" mt={4}>Humor & Highlights</Heading>
      <List spacing={2}>
        <ListItem>“GOOGL’s AI CapEx is like building a mansion to rent out—great if demand soars, but costly if it doesn’t.”</ListItem>
        <ListItem>“SNAP earnings: From loss-making to profitability. Next stop? Monetizing AI lenses for Mars selfies!”</ListItem>
        <ListItem>“Apple’s iCloud upsell game: ‘Need storage for your storage? We’ve got you covered for $9.99/month.’”</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>Closing Remarks</Heading>
      <Text mb={4}>
        The Alpha Aloha Fund celebrates a stellar week with over $80K daily income, $117K MTD, and $466K YTD gains. These results affirm our disciplined strategies of premium capture, risk management, and sector rotation.
      </Text>
      <Text>Onward to selling more walls and scaling new heights! 🚀</Text>
    </Box>
  );
};

export default MarketUpdate5Feb;

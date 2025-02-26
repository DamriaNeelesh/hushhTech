import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/alphaAloha.webp';

export const frontmatter = {
  title: "Alpha Aloha Fund Market and Fund Update Report",
  publishedAt: "2025-02-07",
  description: "Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.",
  category: 'fund updates',
};

const AlphaAlohaFundUpdate = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={AlphaAlohaImg} alt="Alpha Aloha Fund Update" mb={4} borderRadius="md" /> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Alpha Aloha Fund Market and Fund Update Report
      </Heading>

      <Text fontSize="lg" mb={4}>Reporting Period: February 7, 2025</Text>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>NAV & Cash Position</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>NAV (Net Liquidity Value):</strong> $7,715,000</ListItem>
        <ListItem><strong>Cash Position:</strong> $5,096,000</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Performance Overview</Heading>
      <Text fontSize="md" fontWeight="bold">Daily Performance (Feb 7, 2025):</Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (Day): $56,043.91 (0.73% of NAV)</ListItem>
        <ListItem>Proceeds: $567,828.30 | Cost Basis: $511,787.42</ListItem>
        <ListItem>Gain/Loss Ratio: 99.60% | Win Rate: 97.37%</ListItem>
      </List>

      <Text fontSize="md" fontWeight="bold" mt={4}>Month-to-Date Performance (Feb 2025):</Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income: $190,753.56 (2.47% of NAV)</ListItem>
        <ListItem>Proceeds: $2,555,853.42 | Cost Basis: $2,446,868.71</ListItem>
        <ListItem>Win Rate: 97.74%</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy Highlights</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Executed "Sell the Wall" Strategy, optimizing premium capture.</ListItem>
        <ListItem>Amazon Earnings Play: leveraged post-earnings volatility.</ListItem>
        <ListItem>Managed sector rotation & high-RSI positioning efficiently.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Market Commentary</Heading>
      <Text fontSize="md" fontWeight="bold">Tech Sector Observations:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Amazon (AMZN) reported strong Q4 earnings but mixed market reaction.</ListItem>
        <ListItem>Alphabet (GOOGL) investing heavily in AI CapEx, causing temporary declines.</ListItem>
      </List>
      
      <Text fontSize="md" fontWeight="bold" mt={4}>Macro Trends:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Major indices faced downward pressure: Dow -0.99%, Nasdaq -1.30%, S&P 500 -0.95%</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Closing Remarks</Heading>
      <Text>
        Despite market turbulence, Alpha Aloha Fund maintained resilience through disciplined execution.
        Our 97% win rate highlights strong risk management and consistent income generation.
      </Text>
      <List spacing={2} pl={4} mt={2}>
        <ListItem><strong>NAV:</strong> $7.715 million</ListItem>
        <ListItem><strong>Cash Hoard:</strong> $5.096 million</ListItem>
      </List>

      <Text fontSize="lg" mt={4} fontWeight="bold">Let’s keep building! Onward! 🙌</Text>
    </Box>
  );
};

export default AlphaAlohaFundUpdate;

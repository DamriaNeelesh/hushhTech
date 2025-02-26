import React from 'react';
import { Box, Heading, Text, VStack, Divider, Image } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/2_Daily Market Update.jpg'

export const frontmatter = {
  title: "Latest Fund Market and Fund Update Report",
  date: "2025-02-12",
  description: 'Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.',
  author: "Internal Team",
  tags: ["market update", "fund performance", "investment strategy", "AI"],
  category: "market"
};

const dmu11feb: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Fund and Market Update Report
      </Heading>

      <Text fontSize="lg" mb={4}>
        Reporting Period: February 11, 2025
      </Text>

      <Divider my={4} borderColor="black" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" fontSize="lg" color="black">NAV and Cash Position</Heading>
          <Text mt={2}><strong>NAV (Net Liquidity Value):</strong> $7,851,000</Text>
          <Text><strong>Cash Position:</strong> $5,214,326.10</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Performance Overview</Heading>
          <Text mt={2}><strong>Daily Performance (Feb 11, 2025):</strong></Text>
          <Text>• Net Income (Day): +$15,539.91</Text>
          <Text>• % of NAV: +0.50%</Text>
          <Text>• Proceeds: $296,247.03</Text>
          <Text>• Cost Basis: $280,707.12</Text>
          <Text>• Gain/Loss Ratio: 100.00%</Text>
          <Text>• Transaction Count: 29 gains, 0 losses</Text>
          <Text>• Average Gain: +5.25%</Text>
          <Text>• Win Rate: 100.00%</Text>
          <Text mt={2}>Another strong day, with all 29 trades closing profitably!</Text>

          <Text mt={4}><strong>Month-to-Date Performance (Feb 2025):</strong></Text>
          <Text>• Net Income (MTD): +$207,422.39</Text>
          <Text>• % of NAV: +4.91%</Text>
          <Text>• Proceeds: $4,131,960.71</Text>
          <Text>• Cost Basis: $4,117,550.28</Text>
          <Text>• Gain/Loss Ratio: 93.23%</Text>
          <Text>• Transaction Count: 438 gains, 22 losses</Text>
          <Text>• Average Gain: +11.86%</Text>
          <Text>• Average Loss: -0.69%</Text>
          <Text>• Win Rate: 95.22%</Text>
          <Text mt={2}>A solid start to February with continued momentum.</Text>

          <Text mt={4}><strong>Year-to-Date Performance (YTD - Jan 1 to Feb 11, 2025):</strong></Text>
          <Text>• Net Income (YTD): +$563,729.80</Text>
          <Text>• % of NAV: +7.18%</Text>
          <Text>• Proceeds: $13,433,352.51</Text>
          <Text>• Cost Basis: $13,229,997.44</Text>
          <Text>• Gain/Loss Ratio: 69.49%</Text>
          <Text>• Transaction Count: 1,495 gains, 105 losses</Text>
          <Text>• Average Gain: +15.45%</Text>
          <Text>• Average Loss: -6.19%</Text>
          <Text>• Win Rate: 93.44%</Text>
          <Text mt={2}>Strong YTD performance with risk-adjusted gains holding up well.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Strategy Highlights</Heading>
          <Text mt={2}><strong>1. Sell the Wall Strategy Execution</strong></Text>
          <Text>• Sold new walls on AAPL, NVDA, AMZN, TSLA as core positions, locking in strong rental income.</Text>
          <Text>• Managed risk-adjusted premium collection with high-RSI tickers like META (RSI: 80.22) and AVGO (RSI: 56.86).</Text>

          <Text mt={4}><strong>2. AI & Tech Sector Focus</strong></Text>
          <Text>• NVDA remains the key catalyst with earnings upcoming; stock at $133.26 (RSI: 51.98), up $3.73.</Text>
          <Text>• AMZN shows continued strength at $232.20 (RSI: 52.65), up $3.99.</Text>

          <Text mt={4}><strong>3. Risk Management in Play</strong></Text>
          <Text>• Balanced exposure while collecting premium in key sectors.</Text>
          <Text>• Maintaining over $5.2M in cash for strategic deployments.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Market Commentary</Heading>
          <Text mt={2}><strong>Tech Sector Movers (SPX5 Key Holdings):</strong></Text>
          <Text>• Nvidia (NVDA): ⬆️ $3.73 → $133.26 (RSI: 51.98)</Text>
          <Text>• Amazon (AMZN): ⬆️ $3.99 → $232.20 (RSI: 52.65)</Text>
          <Text>• Meta (META): ⬆️ $2.88 → $714.55 (RSI: 80.22) Approaching overbought territory</Text>
          <Text>• Alphabet (GOOGL): ⬆️ $1.13 → $185.86 (RSI: 42.41)</Text>
          <Text>• Apple (AAPL): ⬆️ $0.02 → $227.07 (RSI: 41.69)</Text>
          <Text mt={2}>Upcoming NVDA earnings expected to drive AI sector momentum.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Macro Trends</Heading>
          <Text mt={2}>• Dow Jones Industrial Average: ⬆️ +123.24 (+0.28%) → 44,593.65</Text>
          <Text>• S&P 500: ⬆️ +12.24 (+0.28%) → 6,071.58</Text>
          <Text>• Nasdaq Composite: ⬇️ -70.52 (-0.36%) → 19,643.86</Text>
          <Text mt={2}>Tech sector consolidating after recent gains; AI names remain in focus.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Closing Remarks</Heading>
          <Text mt={2}>• Another profitable day with 100% win rate.</Text>
          <Text>• Strong cash reserves for upcoming NVDA earnings play.</Text>
          <Text>• AI & tech remain the key focus with macro sentiment stabilizing.</Text>
          <Text mt={2}>We remain focused on execution, risk-adjusted returns, and taking alpha where we find it.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default dmu11feb;
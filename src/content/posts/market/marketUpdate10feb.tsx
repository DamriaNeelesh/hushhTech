import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

const MarketFundUpdate10feb = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={AlphaAlohaImg} alt="Market and Fund Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Alpha Aloha Fund Market and Fund Update Report
      </Heading>
      
      <Text mb={4}>
        📅 Reporting Period: February 10, 2025
      </Text>
      <Text mb={4}>
        NAV (Net Liquidity Value): $7,715,000
      </Text>
      <Text mb={4}>
        Cash Position: $5,096,000
      </Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Performance Overview</Heading>
      <Text mb={4}>
        <strong>Daily Performance (Feb 10, 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Net Income (Day): -$54,025.88</ListItem>
        <ListItem>• % of NAV: -0.70%</ListItem>
        <ListItem>• Proceeds: $1,135,416.45</ListItem>
        <ListItem>• Cost Basis: $1,237,888.32</ListItem>
        <ListItem>• Gain/Loss Ratio: 17.95%</ListItem>
        <ListItem>• Transaction Count: 17 gains, 11 losses</ListItem>
        <ListItem>• Average Gain: +14.41%</ListItem>
        <ListItem>• Average Loss: -6.66%</ListItem>
        <ListItem>• Win Rate: 60.71%</ListItem>
      </List>
      <Text mb={4}>
        📉 A red day, but our risk strategy held the line.
      </Text>
      
      <Text mb={4}>
        <strong>Month-to-Date Performance (Feb 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Net Income (MTD): +$137,639.12</ListItem>
        <ListItem>• % of NAV: +1.78%</ListItem>
        <ListItem>• Proceeds: $3,691,443.36</ListItem>
        <ListItem>• Cost Basis: $3,684,897.54</ListItem>
        <ListItem>• Gain/Loss Ratio: 74.82%</ListItem>
        <ListItem>• Transaction Count: 408 gains, 20 losses</ListItem>
        <ListItem>• Average Gain: +13.10%</ListItem>
        <ListItem>• Average Loss: -3.18%</ListItem>
        <ListItem>• Win Rate: 95.33%</ListItem>
      </List>
      <Text mb={4}>
        📈 Still net positive for February!
      </Text>
      
      <Text mb={4}>
        <strong>Year-to-Date Performance (YTD - Jan 1 to Feb 10, 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Net Income (YTD): +$493,946.53</ListItem>
        <ListItem>• % of NAV: +6.41%</ListItem>
        <ListItem>• Proceeds: $12,992,835.16</ListItem>
        <ListItem>• Cost Basis: $12,797,344.70</ListItem>
        <ListItem>• Gain/Loss Ratio: 66.65%</ListItem>
        <ListItem>• Transaction Count: 1,465 gains, 103 losses</ListItem>
        <ListItem>• Average Gain: +15.94%</ListItem>
        <ListItem>• Average Loss: -7.09%</ListItem>
        <ListItem>• Win Rate: 93.43%</ListItem>
      </List>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Strategy Highlights</Heading>
      <List spacing={2} pl={4}>
        <ListItem>1️⃣ Sell the Wall Strategy Execution</ListItem>
        <ListItem>✅ Maintained laddered calls and cash-covered puts to manage market swings.</ListItem>
        <ListItem>✅ Strategically rolled positions in high-RSI tickers like META (RSI: 80.22) and AVGO (RSI: 56.86).</ListItem>
        <ListItem>2️⃣ AI & Tech Sector Focus</ListItem>
        <ListItem>✅ AI stocks remain key—NVDA (RSI: 51.98) up $3.73 to $133.26.</ListItem>
        <ListItem>✅ AMZN RSI (52.65) shows strength; up $3.99 to $232.20.</ListItem>
        <ListItem>3️⃣ Risk Management in Play</ListItem>
        <ListItem>✅ Kept exposure balanced despite the macro volatility.</ListItem>
        <ListItem>✅ Still maintaining a strong cash hoard to deploy strategically.</ListItem>
      </List>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Market Commentary</Heading>
      <Text mb={4}>
        <strong>Tech Sector Movers</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Nvidia (NVDA) ⬆️ $3.73 → $133.26 (RSI 51.98) 🚀</ListItem>
        <ListItem>• Amazon (AMZN) ⬆️ $3.99 → $232.20 (RSI 52.65) 💪</ListItem>
        <ListItem>• Meta (META) ⬆️ $2.88 → $714.55 (RSI 80.22) 🏋️ Approaching overbought territory</ListItem>
        <ListItem>• Alphabet (GOOGL) ⬆️ $1.13 → $185.86 (RSI 42.41)</ListItem>
      </List>
      <Text mb={4}>
        <strong>Macro Trends</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Dow Jones Industrial Average: ⬆️ +167.01 (+0.38%) → 44,470.41</ListItem>
        <ListItem>• S&P 500: ⬆️ +40.45 (+0.67%) → 6,066.44</ListItem>
        <ListItem>• Nasdaq Composite: ⬆️ +190.87 (+1.00%) → 19,714.27</ListItem>
      </List>
      <Text mb={4}>
        🌍 Markets shrugged off rate hike fears today as AI and tech sectors flexed their muscles.
      </Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Closing Remarks</Heading>
      <Text mb={4}>
        🔴 A down day, but a winning month!
      </Text>
      <Text mb={4}>
        🧘 We stayed disciplined despite the turbulence.
      </Text>
      <Text mb={4}>
        🎯 Tech continues to lead—AI remains a core focus.
      </Text>
      <Text mb={4}>
        📢 We remain focused on execution, risk-adjusted returns, and taking alpha where we find it.
      </Text>
      <Text mb={4}>
        Onward! 🚀
      </Text>
    </Box>
  );
};

export default MarketFundUpdate10feb;
import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/1_Daily Market Update.jpg'

const dmu18feb = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
        <Image src={MarketUpdate} alt='Market Update 18 feb'/>
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        🤫 Aloha Alpha Fund Market and Fund Update Report
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: February 18, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        📊 Net Liquidity & Cash Position
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>NAV (Net Liquidity Value): $8,268,000 (New High-Water Mark)</ListItem>
        <ListItem>Cash & Sweep Vehicle: $6,002,000</ListItem>
      </List>
      <Text mb={4}>
        🔹 We continued executing “Sell the Wall™” strategy flawlessly today, maximizing short-term rental income while maintaining long-term ownership of the best businesses.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        🔥 Performance Overview
      </Heading>
      <Text mb={4}>
        <strong>📆 Daily Performance (Feb 18, 2025)</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (Day): +$21,061.63</ListItem>
        <ListItem>% of NAV: +0.25%</ListItem>
        <ListItem>Total Proceeds: $644,496.85</ListItem>
        <ListItem>Total Cost Basis: $623,467.31</ListItem>
        <ListItem>Gain/Loss Ratio: 92.32%</ListItem>
        <ListItem>Transaction Count: 115 gains, 12 losses</ListItem>
        <ListItem>Average Gain: +6.93%</ListItem>
        <ListItem>Average Loss: -0.61%</ListItem>
        <ListItem>Win Rate: 90.55%</ListItem>
      </List>
      <Text mb={4}>
        ✅ 115/127 winning rollovers—pure execution.
      </Text>

      <Text mb={4}>
        <strong>📆 Month-to-Date Performance (Feb 1 - Feb 18, 2025)</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (MTD): +$301,374.12</ListItem>
        <ListItem>% of NAV: +4.57%</ListItem>
        <ListItem>Total Proceeds: $6,479,598.57</ListItem>
        <ListItem>Total Cost Basis: $6,389,431.02</ListItem>
        <ListItem>Gain/Loss Ratio: 87.36%</ListItem>
        <ListItem>Transaction Count: 839 gains, 44 losses</ListItem>
        <ListItem>Average Gain: +9.59%</ListItem>
        <ListItem>Average Loss: -1.75%</ListItem>
        <ListItem>Win Rate: 95.02%</ListItem>
      </List>
      <Text mb={4}>
        📊 Steady rental income compounding into stronger delta-positive positions.
      </Text>

      <Text mb={4}>
        <strong>📆 Year-to-Date Performance (Jan 1 - Feb 18, 2025)</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (YTD): +$658,441.29</ListItem>
        <ListItem>% of NAV: +8.12%</ListItem>
        <ListItem>Total Proceeds: $15,780,567.40</ListItem>
        <ListItem>Total Cost Basis: $15,502,379.14</ListItem>
        <ListItem>Gain/Loss Ratio: 70.46%</ListItem>
        <ListItem>Transaction Count: 1,896 gains, 127 losses</ListItem>
        <ListItem>Average Gain: +13.67%</ListItem>
        <ListItem>Average Loss: -6.18%</ListItem>
        <ListItem>Win Rate: 93.72%</ListItem>
      </List>
      <Text mb={4}>
        🚀 2025 shaping up to be an absolute alpha monster.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        🔥 Strategy Highlights
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>
          <strong>1️⃣ “Sell the Wall™” Execution:</strong> Rolled over walls in: AAPL, GOOGL, AMZN, NIO, NVDA. Collected $28,405.08 in daily rental income—extracted peak RSI volatility. Hedges working perfectly, reducing delta exposure while optimizing cash flow.
        </ListItem>
        <ListItem>
          <strong>2️⃣ Core Positions Driving Cash Flow:</strong> Nvidia (NVDA): $144.76 (RSI: 54.26) 🚀, Amazon (AMZN): $237.50 (RSI: 54.02) 💪, Alphabet (GOOGL): $182.23 (RSI: 45.92), Apple (AAPL): $239.30 (RSI: 44.12). 📌 NVDA’s earnings event next week will be a major AI sector catalyst.
        </ListItem>
        <ListItem>
          <strong>3️⃣ Risk & Capital Deployment:</strong> Cash Reserves: $6M+ ready for redeployment. Hedges: Converting volatility into short-term income while maintaining exposure to best-in-class free cash flow assets.
        </ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        📊 Macro Trends & Market Commentary
      </Heading>
      <Text mb={4}>
        <strong>SPX5 Core Performance:</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Nvidia (NVDA): ⬆️ $1.20 → $144.76 (RSI: 54.26) 🚀</ListItem>
        <ListItem>Amazon (AMZN): ⬆️ $3.22 → $237.50 (RSI: 54.02) 💪</ListItem>
        <ListItem>Alphabet (GOOGL): ⬆️ $2.18 → $182.23 (RSI: 45.92)</ListItem>
        <ListItem>Apple (AAPL): ⬆️ $1.20 → $239.30 (RSI: 44.12)</ListItem>
      </List>
      <Text mb={4}>
        📌 Tech sector remains strong—our “Sell the Wall™” strategy continues to be the most effective way to optimize capital deployment.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        📈 Market Overview
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Dow Jones: ⬆️ +10.26 (+0.02%) → 44,556.34</ListItem>
        <ListItem>S&P 500: ⬆️ +63.24 (+1.04%) → 6,115.07</ListItem>
        <ListItem>Nasdaq: ⬆️ +284.16 (+1.43%) → 20,041.26</ListItem>
      </List>
      <Text mb={4}>
        📊 Markets are heating up ahead of key economic data releases.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        🚀 Closing Remarks
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>✅ 90%+ win rate today—maximized short-term premium capture.</ListItem>
        <ListItem>✅ $6M+ in cash reserves locked and loaded for the next premium-rich opportunity.</ListItem>
        <ListItem>✅ Tech, AI, and structured rental strategies continue to be primary alpha drivers.</ListItem>
        <ListItem>💡 “The math keeps winning. The discipline remains strong. We continue to own and monetize the best businesses on Earth.”</ListItem>
        <ListItem>🚀 Onward!</ListItem>
      </List>
      <Text mt={4} fontSize="sm" color="gray.500">
        Manish & Justin
      </Text>
    </Box>
  );
};

export default dmu18feb;
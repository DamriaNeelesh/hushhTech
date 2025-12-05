import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu22apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Bets Club | Daily Performance Summary
      </Heading>
      <Text mb={4}>Date: April 22, 2025</Text>
      <Text mb={4}>Fund: 🤫 Evergreen Renaissance AI First Fund A</Text>
      <Text mb={4}>Prepared for: Private LPs & Strategic Investors</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        1. Fund Performance Summary (YTD 2025)
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Total Proceeds: $55,211,712.56</ListItem>
          <ListItem>• Total Cost Basis: $56,066,076.96</ListItem>
          <ListItem>• Net Realized Gain (Short Term): $1,974,289.03 (+3.42%)</ListItem>
          <ListItem>• Disallowed Losses: ($2,828,653.43)</ListItem>
          <ListItem>• Gain/Loss Ratio: 68.51%</ListItem>
          <ListItem>• Win Rate: 91.43% (5,290 gains vs. 496 losses)</ListItem>
          <ListItem>• Average Gain: +9.84%</ListItem>
          <ListItem>• Average Loss: -8.17%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        2. Portfolio Snapshot
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          Net Liquidating Value (EOD): $4,003,759.71
          Cash & Sweep Vehicle: $1,873,139.76
          Option Buying Power: ($571,259.46)
          Margin Equity: $9,261,071.97
          Daily P&L: +$380,164.23 (+9.51% P/L Day)
        </Text>
        
        <Text mt={2} fontWeight="500">
          Top Position Movers (April 22, 2025)
        </Text>
        <List spacing={1}>
          <ListItem>• AAPL: +$124,150.73 (Delta 9,861.19)</ListItem>
          <ListItem>• GOOGL: +$68,933.46 (Delta 5,384.06)</ListItem>
          <ListItem>• AMZN: +$119,767.03 (Delta 4,584.84)</ListItem>
          <ListItem>• NVDA: +$49,346.24 (Delta 3,924.65)</ListItem>
          <ListItem>• TSLA: +$20,136.68 (Delta 157.57)</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        3. Strategy Execution Highlights
      </Heading>
      <VStack align="start" spacing={2}>
        <Text fontWeight="500">
          Sell The Wall Strategy:
        </Text>
        <List spacing={1}>
          <ListItem>• Successfully executed a large volume of covered call and cash-secured put strategies throughout Q1 and April, generating significant aloha income.</ListItem>
          <ListItem>• Premiums harvested reinvested into alpha bets (AAPL, AMZN, NVDA, GOOGL) during periods of RSI weakness and macro fear-driven volatility.</ListItem>
          <ListItem>• The fund remains delta-long, reinvesting rental income from weekly premiums to compound ownership in free cash flow compounding businesses.</ListItem>
        </List>
        
        <Text mt={2} fontWeight="500">
          Concern Over Brokerage-Initiated Trades:
        </Text>
        <Text>
          We've identified trades executed around 11:57am PT on April 22 that are currently under investigation with Charles Schwab. These trades were not authorized by the GP or trustees and were flagged due to system automation behavior inconsistent with internal approvals. We will share a compliance update with LPs once resolved.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        4. Market & Macro Commentary
      </Heading>
      <VStack align="start" spacing={2}>
        <Text fontWeight="500">
          Markets EOD:
        </Text>
        <List spacing={1}>
          <ListItem>• DJIA: +1,016.57 (+2.66%)</ListItem>
          <ListItem>• NASDAQ: +2.63%</ListItem>
          <ListItem>• SPX: +2.51%</ListItem>
        </List>
        
        <Text mt={2} fontWeight="500">
          Key Risks Ahead:
        </Text>
        <List spacing={1}>
          <ListItem>• Goldman Sachs: Raised recession probability to 35% amid rising trade tensions and sticky inflation prints.</ListItem>
          <ListItem>• Macro Headwinds:</ListItem>
          <ListItem>• Tariff chatter and protectionism sentiment resurging globally.</ListItem>
          <ListItem>• Sovereign deficits ballooning, with U.S. debt issuance hitting all-time highs.</ListItem>
          <ListItem>• 10Y bond yields remain volatile near 4.8–5.1%, signaling tightening liquidity.</ListItem>
          <ListItem>• Fund Response:</ListItem>
          <ListItem>• Increased sale of OTM puts for future entries at 20–30% below current prices.</ListItem>
          <ListItem>• Targeted selling of calls at 10–15% above current highs to lock in rental income.</ListItem>
          <ListItem>• Focus remains on price vs. value gap—when fear is high, we write premium and collect.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        5. Alpha & Aloha POV
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We believe in one thing above all: "Don't interrupt compounding unnecessarily."
          The world is worried. Tariffs, debt, inflation—all real. But fear creates premium, and premium is fuel for Aloha. We are selling it. Rolling it. Reinvesting it. Daily.
        </Text>
        <Text mt={2}>
          We are not traders. We are owners.
          Of ideas. Of principles. Of free cash flow. And every asset we own today, we own it with conviction that the future pays the patient and the curious. We are both.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        6. Final Word
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          In a world rushing to go fast, we choose to go deep.
          This fund is not for everyone. But it's made for those who want to think 10 years ahead, own the world's best cash flows, and sleep well knowing that every dollar is working—with AI-powered conviction and human-guided wisdom.
        </Text>
        <Text mt={2}>
          Thank you for your trust. Let's build the most valuable, private, free-cash-flow focused compounding machine ever imagined.
        </Text>
        <Text mt={2}>
          — Team 🤫 | Hushh Technologies
          "Where Aloha meets Alpha. Always."
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        KPI Summary from the April 22, 2025 Daily Performance Snapshot for the 🤫 Aloha Alpha Fund:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text fontWeight="500">Core KPIs</Text>
        <List spacing={1}>
          <ListItem>• Net Realized Gain: +$1,974,289.03 (+3.42%)</ListItem>
          <ListItem>• Total Proceeds: $55,211,712.56</ListItem>
          <ListItem>• Total Cost Basis: $56,066,076.96</ListItem>
          <ListItem>• Disallowed Losses: ($2,828,653.43)</ListItem>
        </List>
        
        <Text mt={2} fontWeight="500">Efficiency Metrics</Text>
        <List spacing={1}>
          <ListItem>• Gain/Loss Ratio: 68.51%</ListItem>
          <ListItem>• Win Rate: 91.43%</ListItem>
          <ListItem>• Average Gain: +9.84%</ListItem>
          <ListItem>• Average Loss: -8.17%</ListItem>
        </List>
        
        <Text mt={2} fontWeight="500">Daily Account Snapshot</Text>
        <List spacing={1}>
          <ListItem>• Net Liquidating Value: $4,003,758.71</ListItem>
          <ListItem>• Daily P/L: +$380,164.23</ListItem>
          <ListItem>• Margin Equity: $9,261,071.97</ListItem>
          <ListItem>• Top Movers:</ListItem>
          <ListItem>• AAPL: +$124,150.73</ListItem>
          <ListItem>• GOOGL: +$68,933.46</ListItem>
          <ListItem>• AMZN: +$119,767.03</ListItem>
          <ListItem>• NVDA: +$49,346.24</ListItem>
          <ListItem>• TSLA: +$20,136.68</ListItem>
        </List>
        
        <Text mt={2} fontWeight="500">Execution Note</Text>
        <Text>
          • Trades around 11:57am PT on April 22 are under internal review with Schwab—potential unauthorized activity flagged.
        </Text>
      </VStack>

      <MarketUpdateGallery 
        date="dmu22apr" 
        title="Fund A Performance Charts & Data"
        apiDateFormat={false}
        imageCount={3}
        showTestImage={true}
      />
    </Box>
  );
};

export default Dmu22apr;
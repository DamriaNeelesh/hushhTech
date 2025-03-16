import React from 'react';
import { Box, Text,Image, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import q1 from '../../../components/images/market-updates/dmu10mar/1.png';
import q2 from '../../../components/images/market-updates/dmu10mar/2.png';
import q3 from '../../../components/images/market-updates/dmu10mar/3.png';
import q4 from '../../../components/images/market-updates/dmu10mar/4.png';
import q5 from '../../../components/images/market-updates/dmu10mar/5.png';
import q6 from '../../../components/images/market-updates/dmu10mar/6.png';
import q7 from '../../../components/images/market-updates/dmu10mar/7.png';
import q8 from '../../../components/images/market-updates/dmu10mar/8.png';
import q9 from '../../../components/images/market-updates/dmu10mar/9.png';
import q10 from '../../../components/images/market-updates/dmu10mar/10.png';
import q11 from '../../../components/images/market-updates/dmu10mar/11.png';
import q12 from '../../../components/images/market-updates/dmu10mar/12.png';
import q13 from '../../../components/images/market-updates/dmu10mar/13.png';
import q14 from '../../../components/images/market-updates/dmu10mar/14.png';

const Dmu10Mar = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund – Performance & Market Update (March 10, 2025)
      </Heading>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Today’s Performance Summary (March 10, 2025):
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Gain: $117,839.74 (+19.13%)</ListItem>
          <ListItem>• Total Proceeds: $615,984.56</ListItem>
          <ListItem>• Total Cost Basis: $498,144.82</ListItem>
          <ListItem>• Transactions: 60 winning trades, 0 losses</ListItem>
          <ListItem>• Gain Rate: 100%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Year-to-Date Performance (Jan 1 – March 10, 2025):
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Gain: $1,164,533.63 (+3.86%)</ListItem>
          <ListItem>• Total Gains: $1,840,781.29</ListItem>
          <ListItem>• Total Losses: -$676,247.66</ListItem>
          <ListItem>• Gain/Loss Ratio: 73.13%</ListItem>
          <ListItem>• Gain Count: 3,289 transactions</ListItem>
          <ListItem>• Loss Count: 325 transactions</ListItem>
          <ListItem>• Average Gain: +11.88%</ListItem>
          <ListItem>• Average Loss: -4.61%</ListItem>
          <ListItem>• Gain Rate: 91.01%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Key Financial Metrics (as of March 10, 2025):
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Liquidating Value (NLV): $4.76M</ListItem>
          <ListItem>• Cash & Sweep Vehicle: $7.03M</ListItem>
          <ListItem>• Position Equity: $9.27M</ListItem>
          <ListItem>• Net Asset Value (NAV / Maintenance Requirement): $10.05M</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Portfolio and Market Commentary:
      </Heading>
      <Text mb={4}>
        Today, market sentiment took a challenging turn with major indices sharply down:
      </Text>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Dow Jones: -2.08%</ListItem>
          <ListItem>• NASDAQ: -4.12%</ListItem>
        </List>
      </VStack>
      <Text mb={4}>
        Despite these headwinds, our “Sell the Wall” strategy performed exceptionally well, maintaining a 100% gain rate today. Our disciplined approach in navigating market volatility continues to generate stable alpha, even in tumultuous conditions.
      </Text>
      <Text mb={4}>
        However, the steep decline seen in blue-chip technology names including AAPL, AMZN, TSLA, and NVDA today highlights the importance of our ongoing risk management strategies. With substantial unrealized losses reflecting current market volatility, it’s crucial we stay vigilant.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategic Insights & Risk Management:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>1. Enhancing Liquidity: Maintaining a substantial cash cushion ($7.03M) allows strategic flexibility.</ListItem>
          <ListItem>2. Delta-Neutral Hedging: Continued automation of delta-hedging processes to stabilize portfolio exposure.</ListItem>
          <ListItem>3. Focused Risk Assessment: Regularly stress-testing portfolio resilience against recessionary scenarios and severe market drawdowns.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Looking Forward:
      </Heading>
      <Text mb={4}>
        While we celebrate today’s strong execution and gains, we remain humble and cautious. Our core focus is sustainable growth and prudent capital preservation, especially in the face of potential recessionary pressures.
      </Text>
      <Text mb={4}>
        Thank you for your continued trust and partnership as we navigate these complex market environments together.
      </Text>
      <Text fontWeight="bold" mb={4}>
        Remember Warren’s advice - Buy blood 🩸 or be ready to buy blood when you see it. We all perhaps 🤔 have started that journey last week.
      </Text>

      <Divider my={4} borderColor="black" />
      <Box display="flex" flexWrap="wrap" justifyContent="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q1} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q2} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q3} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q4} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q5} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q6} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q7} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q8} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q9} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q10} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q11} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q12} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q13} alt='Hushh market update 28 feb' mr={2} boxSize="xl" />
          <Image src={q14} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
        </Box>
      </Box>

    </Box>
  );
};

export default Dmu10Mar;
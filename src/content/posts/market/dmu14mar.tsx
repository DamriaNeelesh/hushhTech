import React from 'react';
import { Box, Text, Image, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import q1 from '../../../components/images/market-updates/dmu14mar/1.png';
import q2 from '../../../components/images/market-updates/dmu14mar/2.png';
import q3 from '../../../components/images/market-updates/dmu14mar/3.png';
import q4 from '../../../components/images/market-updates/dmu14mar/4.png';
import q5 from '../../../components/images/market-updates/dmu14mar/5.png';
import q6 from '../../../components/images/market-updates/dmu14mar/6.png';
import q7 from '../../../components/images/market-updates/dmu14mar/7.png';
import q8 from '../../../components/images/market-updates/dmu14mar/8.png';
import q9 from '../../../components/images/market-updates/dmu14mar/9.png';
import q10 from '../../../components/images/market-updates/dmu14mar/10.png';
import q11 from '../../../components/images/market-updates/dmu14mar/11.png';
import q12 from '../../../components/images/market-updates/dmu14mar/12.png';
import q13 from '../../../components/images/market-updates/dmu14mar/13.png';

const Dmu14Mar = () => {
  return (
    <Box color="black" borderRadius="md" >
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Aloha Alpha Club – Weekly Market Update
      </Heading>
      <Text mb={4}>Date: March 14, 2025</Text>
      <Text fontWeight="500" mb={2}>
        Net Asset Value (NAV): $4,939,526.02 (+5.38% daily gain)
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Dow Jones Industrial Average: +1.65%, closing at 41,488.19</ListItem>
          <ListItem>• S&P 500 Index: +2.13%, closing at 5,638.94</ListItem>
          <ListItem>• NASDAQ 100 Index: +2.49% to 19,704.64</ListItem>
          <ListItem>• Russell 2000: +2.53%, underscoring broader market strength</ListItem>
        </List>
      </VStack>
      <Text mb={4}>
        The buoyant market sentiment was largely driven by improved economic outlooks, robust corporate earnings, and investors shaking off previous volatility concerns. Technology stocks particularly benefited, reflecting renewed confidence in AI and growth sectors.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Portfolio Highlights:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Apple (AAPL) led gains, adding $95,189 today alone, driven by renewed investor optimism and increased demand for premium tech offerings.</ListItem>
          <ListItem>• Amazon (AMZN) delivered substantial daily gains, supported by positive sentiment towards AI investments and AWS growth.</ListItem>
          <ListItem>• Tesla (TSLA) and NVIDIA (NVDA) contributed positively, reflecting renewed investor interest in disruptive technologies and AI applications.</ListItem>
          <ListItem>• However, Berkshire Hathaway (BRK/B) experienced downward pressure this week due to short-term market rotations away from defensive assets.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Trading Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Weekly Performance (03/08/2025 - 03/14/2025):</ListItem>
          <ListItem>• Net Gain: $496,041.38 (+11.63%)</ListItem>
          <ListItem>• Gain/Loss Ratio: 99.02%</ListItem>
          <ListItem>• Gain Rate: 96.36% (423 winning trades, 16 losing trades)</ListItem>
          <ListItem>• Average Gain: +12.52%</ListItem>
          <ListItem>• Average Loss: -1.86%</ListItem>
        </List>
      </VStack>
      <Text mb={4}>
        These figures clearly illustrate the efficiency of our approach, focusing on precise risk management and disciplined option premium capture strategies.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        March Month-to-Date Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Gain: $619,118.84 (+5.96%)</ListItem>
          <ListItem>• Gain/Loss Ratio: 88.31%</ListItem>
          <ListItem>• Gain Rate: 90.24%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Year-to-Date Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Gain: $1,540,403.26 (+4.53%)</ListItem>
          <ListItem>• Gain/Loss Ratio: 76.49%</ListItem>
          <ListItem>• Gain Rate: 91.40%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategic Commentary (In Warren Buffett’s Spirit):
      </Heading>
      <Text mb={4}>
        This week underscores our disciplined commitment to quality and clarity in our investment approach. While the market rewarded optimism, our strategy continues to hinge on selecting durable, fundamentally sound businesses. Despite the broader market’s enthusiasm, we remain cautious—always mindful that true investing success stems from sustainable returns built over years, not just a week or a month.
      </Text>
      <Text mb={4}>
        Our options strategy continues to generate consistent income, allowing us to reinvest these returns into our core holdings, creating a disciplined approach that aligns deeply with our long-term vision. The remarkable Gain/Loss ratio and gain rate this week reflect the careful execution and strategic risk management at the heart of our investment philosophy.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Looking Ahead:
      </Heading>
      <Text mb={4}>
        We remain committed to the disciplined principles of great investors—holding only businesses with strong free cash flow, competitive moats, and compelling long-term value creation stories. With market volatility always a potential risk, we will remain diligent and selective in managing our positions.
      </Text>
      <Text fontWeight="500" mb={4}>
        Thank you for your continued trust, and have a wonderful weekend.
      </Text>
      <Text fontSize="sm" color="gray.500">
        Warm regards,
      </Text>
      <Text fontSize="sm" color="gray.500">
        Manish
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
          {/* <Image src={q8} alt='Hushh market update 28 feb' mr={2} boxSize="md" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dmu14Mar;
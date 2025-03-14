import React from 'react';
import { Box, Text, Image, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import q1 from '../../../components/images/market-updates/dmu13mar/1.png';
import q2 from '../../../components/images/market-updates/dmu13mar/2.png';
import q3 from '../../../components/images/market-updates/dmu13mar/3.png';
import q4 from '../../../components/images/market-updates/dmu13mar/4.png';
import q5 from '../../../components/images/market-updates/dmu13mar/5.png';
import q6 from '../../../components/images/market-updates/dmu13mar/6.png';
import q7 from '../../../components/images/market-updates/dmu13mar/7.png';

const Dmu13Mar = () => {
  return (
    <Box color="black" borderRadius="md" >
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Aloha Alpha Club – Daily Update
      </Heading>
      <Text mb={4}>Date: March 13, 2025</Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Portfolio Snapshot:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Asset Value (NAV): $10,319,684.49</ListItem>
          <ListItem>• Net Liquidation Value (NLV): $4,729,395.47</ListItem>
          <ListItem>• Cash & Sweep Vehicle: $5,848,944.83</ListItem>
          <ListItem>• Long Stock Value: $4,782,911.04</ListItem>
          <ListItem>• Margin Equity: $9,465,790.63</ListItem>
          <ListItem>• Equity Percentage: 100%</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Today’s Market Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Volatility continued to dominate the markets, driving notable mark-to-market declines across several of our core holdings.</ListItem>
          <ListItem>• Despite significant downward pressure causing a daily mark-to-market drop of $262,000, our proactive hedging strategies effectively cushioned the impact.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Aloha Income & Strategy Highlights:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Successfully rolled over 61 “walls,” generating net aloha income of $59,969.27.</ListItem>
          <ListItem>• Achieved a 100% gain rate, averaging approximately 10% per transaction.</ListItem>
          <ListItem>• Actively managed deltas, allowing for effective short-term premium capture even amidst a challenging bearish market environment.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Key Delta Holdings at End-of-Day:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• NIO: Delta: 50,404.99</ListItem>
          <ListItem>• AAPL: Delta: 13,687.14</ListItem>
          <ListItem>• AMZN: Delta: 9,902.53</ListItem>
          <ListItem>• SNAP: Delta: 8,198.35</ListItem>
          <ListItem>• GOOGL: Delta: 5,008.06</ListItem>
          <ListItem>• JPM: Delta: 2,515.67</ListItem>
          <ListItem>• TSLA: Delta: 2,353.15</ListItem>
          <ListItem>• NVDA: Delta: 2,028.09</ListItem>
          <ListItem>• INTC: Delta: 1,309.27</ListItem>
          <ListItem>• PATH: Delta: 1,303.39</ListItem>
          <ListItem>• META: Delta: 888.32</ListItem>
          <ListItem>• BRK/B: Delta: -1,760.94 (hedge position)</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Insight:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Our significant positive deltas indicate a long-term bullish stance in core assets like NIO, Apple, Amazon, Alphabet, and NVIDIA, reflecting high conviction.</ListItem>
          <ListItem>• The negative delta in Berkshire Hathaway Class B shares (BRK/B) serves as an effective hedge, protecting our portfolio during market downturns.</ListItem>
          <ListItem>• We anticipate continued volatility and are well-positioned to leverage these conditions through disciplined premium collection and prudent risk management.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Closing Thoughts:
      </Heading>
      <Text>
        We remain cautiously optimistic, well-hedged, and strategically positioned to continue capturing premium income amidst market turbulence. Let’s embrace volatility responsibly, protecting and growing our aloha and alpha.
      </Text>
      <Text>
        Mahalo and Aloha,
      </Text>
      <Text>
        Manish
      </Text>

      <Divider my={4} borderColor="black" />

      <Text fontSize="sm" color="gray.500">
        Xo 🤫 Confidential 🤫 
      </Text>
      <Text fontSize="sm" color="gray.500">
        Older versions below 👇 
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Aloha & Alpha Fund – Daily Market Commentary
      </Heading>
      <Text fontSize="sm" color="gray.500">
        **Date:** March 13, 2025
      </Text>

      <Heading as="h4" fontSize="md" color="black" mb={2}>
        Key Performance Metrics
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>- **Net Income Today:** $59,969.27</ListItem>
          <ListItem>- **YTD Net Income:** $1,457,434.27 (+4.46%)</ListItem>
          <ListItem>- **3-Month Performance:** Gain Rate: 91.19%, Average Gain: +12.24%, Average Loss: -4.57%</ListItem>
          <ListItem>- **Net Liquidation Value (NLV):** $4,716,056.06</ListItem>
          <ListItem>- **Cash & Sweep Vehicle:** $5,848,944.83</ListItem>
          <ListItem>- **Assets at Risk:** ~$5M (initial nominal assets)</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h4" fontSize="md" color="black" mb={2}>
        Today's Market Insights
      </Heading>
      <Text>
        Today was another volatile ride, providing the perfect backdrop to execute our disciplined "Sell the Wall" strategy. Despite substantial market turbulence leading to a challenging mark-to-market day with over $262K in temporary unrealized losses, we confidently generated $59,969 in realized "Aloha" premium income by strategically rolling 61 walls with a 100% win rate.
      </Text>
      <Text>
        Our proactive delta management effectively buffered against broader market downturns, especially in core holdings such as Tesla and Alphabet, significantly reducing what otherwise would have been more severe short-term impacts.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h4" fontSize="md" color="black" mb={2}>
        Strategic Observations
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>- **Continued Volatility Advantage:** Volatility remains elevated—ideal for consistent premium capture and positioning for future gains.</ListItem>
          <ListItem>- **Market Sentiment:** Bears continue to dominate; however, a potential short-term bottom appears possible based on recent indicators. We're maintaining a cautious stance, ready to capitalize on further volatility.</ListItem>
          <ListItem>- **AI-Driven Execution Needs:** Today's market pace reinforced our strategic priority to develop AI-assisted automation, allowing parallel execution and more comprehensive delta adjustments, further optimizing our premium-capture strategies.</ListItem>
        </List>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h4" fontSize="md" color="black" mb={2}>
        Forward Outlook
      </Heading>
      <Text>
        We anticipate sustained volatility and are proactively positioned to leverage these conditions for continued premium income generation. Strategic delta management will remain central as we dynamically navigate the market’s choppiness.
      </Text>
      <Text>
        Thank you for your trust and partnership. Excited to navigate tomorrow's opportunities together.
      </Text>
      <Text fontSize="sm" color="gray.500">
        Aloha and mahalo,
      </Text>
      <Text fontSize="sm" color="gray.500">
        Manish Sainani <br/>
        Aloha & Alpha Fund Management
      </Text>
      <Divider my={4} borderColor="black" />
      <Box display="flex" flexWrap="wrap" justifyContent="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q1} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
          <Image src={q2} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q3} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
          <Image src={q4} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q5} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
          <Image src={q6} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" width={{ base: '100%', md: '50%' }}>
          <Image src={q7} alt='Hushh market update 28 feb' mr={2} boxSize="md" />
          {/* <Image src={q8} alt='Hushh market update 28 feb' mr={2} boxSize="md" /> */}
        </Box>
      </Box>
     
    </Box>
  );
};

export default Dmu13Mar;
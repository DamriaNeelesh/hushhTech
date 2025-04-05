import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/1_Daily Market Update.jpg'
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const dmu27mar = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 27 March 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 27, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 27, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Analysis
      </Heading>
      <Text mb={4}>
        VWAP analysis indicates net outflows from equities and net inflows into risk-off assets, such as gold and treasuries. Berkshire Hathaway B (BRK.B) is notably outperforming most constituents of the S&P 100.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Opportunities
      </Heading>
      <Text mb={4}>
        Current market conditions present an opportunity to sell volatility and acquire desired assets with a long-term investment horizon. Be prepared to hold positions through potential market fluctuations, including a possible 20% decline or rally by year-end.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Key Performance Indicators (KPIs) and Summary
      </Heading>
      <Text mb={4}>
        Aloha Alpha Fund A Execution: 73 total fills, with 51 roll-overs demonstrating win rates exceeding 90%, securing $15,000 in Aloha income (0.29% of Net Liquidating Value).
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy Update
      </Heading>
      <Text mb={4}>
        Our strategy remains consistent: selling options to generate income and working towards a delta-neutral position across core holdings. As the delta decreases, the effectiveness of our hedging strategy in navigating market volatility and time decay will become apparent. These market conditions are influenced by the noise-to-signal ratio since the current U.S. administration took office.
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>

      <MarketUpdateGallery 
        date="dmu27mar" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default dmu27mar;
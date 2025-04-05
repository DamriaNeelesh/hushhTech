import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu2apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund — April 2, 2025 Performance Recap
      </Heading>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Daily Update & Commentary:
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Tomorrow is anticipated to be a difficult day. AAPL is currently trading at 209, suggesting a potential retest of the 2024 lows.
          Key Performance Indicators and trade fills for the day are available.
        </Text>
        <Text>
          The chart presents a concerning picture. Note the surge at the close coinciding with the President's remarks, followed by a 600-point drop in /NQ after the close (3.2% decline).
          The remainder of this week and month is expected to be volatile and challenging. We anticipate substantial Aloha income due to the Selling the Wall strategy. We should prepare for potential buying opportunities during market downturns.
        </Text>

        <Text>
          NQ futures are experiencing a significant decline.
          We have breached several technical levels, and the 17000 level on NQ appears to be a critical support.
        </Text>

        <Text>
          Our delta increased sharply at the close with the downward movement, so we expect tomorrow to be a favorable day for the Sell the Wall program.
          A complete reversal of gains occurred - influenced by recent remarks.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu2apr" 
        title="Supporting Charts & Data"
      />
    
    </Box>
  );
};

export default Dmu2apr;
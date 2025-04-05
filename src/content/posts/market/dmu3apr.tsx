import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu3apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund — April 3, 2025 Performance Recap
      </Heading>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Daily Update & Commentary:
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Aloha Alphas - howdy 👋? Radio silence here tells me we are in a house of pain.
        </Text>
        
        <Text>
          Hope everyone is doing well and has recovered from the white wash we saw going into the close today. From a 🤫 Fund standpoint it was the single biggest drawdown day from our high water mark a few weeks ago (20% from peak to lows yesterday) since we started the fund in April last year so it was a very humbling moment. We closed down ~23% on our NLV - most of the carnage we suffered yesterday was due to our concentrated position in AAPL which was down 10%. On a brighter note we managed to lock in 5% (250k) in aloha income along the way which is as the only saving grace thanks to rolling over 200 walls of pain to lock and raised our cash position to 3.66M.
        </Text>

        <Text>
          By the time market closed, I have to say I was absolutely beat up thanks to day 2 of Jet Lag and the back and forth from Sharjah to Abu Dhabi car travel really kills your soul.
        </Text>

        <Text>
          We plan to stick to our strategy and continue to sell the wall using our cash position on the names we love as we continue to see the carnage.
        </Text>

        <Text>
          My wishful thinking is telling me we will get a bounce soon, perhaps in the next day or two but let's see what happens but that also might be short lived xx
        </Text>

        <Text>
          Spx closed right under the 5400 mark which has been the lows from Sep last year. Key level to watch as Rajesh Rajat and other technical gurus have pointed out.
        </Text>

        <Text>
          It's a good time to get your buy list ready as we're going to have some grand sales soon. Just make sure you have cash on hand to buy blood: 🩸.
        </Text>

        <Text>
          We continue to buy blood by selling the wall - and plan to do the same today and rest of the week.
        </Text>

        <Text>
          Cheers!
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu3apr" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default Dmu3apr;
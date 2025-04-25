import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu24apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Bets Club | Daily Performance Summary
      </Heading>
      <Text mb={4}>Date: April 24, 2025</Text>
      <Text mb={4}>Fund: 🤫 Evergreen Renaissance AI First Fund A</Text>

      <Divider my={4} borderColor="black" />

      <Text mb={4}>
        Aloha to you all, it turned out to be a great day after all. Hope the folks in Seattle are enjoying the sunshine ☀ xx
      </Text>

      <Text mb={4}>
        We let the aloha program do its thing again with some tweaks to keep our largest positions in delta neutral state until we see clear bulls back in control. I personally expect choppy waters for a while but I'm i think a minority in that camp. 🏕
      </Text>

      <Text mb={4}>
        We will try to not let human emotion get in the way and let the machines do their thing on good days like today.
      </Text>

      <Text mb={4}>
        I expect to take some short term losses to reduce our margin and get back to healthy levels of margin for my liking - that being said we are still within the guidelines and risk controls; happy to discuss the same with anyone interested.
      </Text>

      <Text mb={4}>
        Cheers!
      </Text>

      <MarketUpdateGallery 
        date="dmu24apr" 
        title="Fund A Performance Charts & Data"
        apiDateFormat={false}
        imageCount={3}
        showTestImage={true}
      />
    </Box>
  );
};

export default Dmu24apr;
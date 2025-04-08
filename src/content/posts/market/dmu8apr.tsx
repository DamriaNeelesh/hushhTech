import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu8apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 8, 2025</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We ended up rolled over 120 walls of pain and locked in a little over $155k in Aloha Income and further raised our cash position to 3.647M. Thank goodness to Selling the Wall - seeing our best of the best FCF names getting taken to the woodshed is extremely painful to see. Just look at the RSI indicators and you'll see blood 🩸on the street.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Monthly Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          For the month of April itself we are up 655K in aloha income while the market carnage continues.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy Update:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We are keeping our strategy intact and continue to Selling the Wall that helps us maximize our Aloha income while we increase our positioning in names we love by deploying our cash to work by selling cash covered puts going into the close on names like AAPL Googl Amzn nvda meta and JPM.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu8apr" 
        showTestImage={false} 
      />
    </Box>
  );
};

export default Dmu8apr;
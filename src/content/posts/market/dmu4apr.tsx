import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const dmu4apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 4, 2025</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          TGIF and thank God the market is closed. What a week; this will go down in history books for sure!
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Technical Challenges:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We ran into lots of technical issues with Schwab today while Selling the Wall into the close due to networking issues - connections kept failing so we were able to only roll over 13 walls of pain- ended up locking about 79K (1.5%) in aloha income.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Weekly Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          For the week 🤫 Fund is down 30% :( - we at this point have given up all our profits we had made in aloha income over the last 3 months. I wonder how much more the pain would have been if we didn't have the aloha component giving us income along the way. Will do some analysis on this as that will talk for itself.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Closing Thoughts:
      </Heading>
      <Text>
        Have a great weekend everyone!
      </Text>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu4apr" 
        showTestImage={false} 
      />
    </Box>
  );
};

export default dmu4apr;
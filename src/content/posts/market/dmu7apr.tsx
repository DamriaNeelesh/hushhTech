import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu7apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 7, 2025</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We rolled over 60 walls of pain and locked in 256K in aloha income (5%) today and raised our cash position further to 3.43M.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Looking Ahead:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          Let's see what tomorrow brings.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Closing Thoughts:
      </Heading>
      <Text>
        Hope you all survived the day!
      </Text>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu7apr" 
        showTestImage={false} 
      />
    </Box>
  );
};

export default Dmu7apr;
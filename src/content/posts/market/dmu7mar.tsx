import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu7mar = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund — March 7, 2025 Performance Recap
      </Heading>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Weekly Performance & Strategy Update:
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Aloha demonstrated exceptional performance this week, particularly in the 'Sell the Wall' strategy. A significant milestone was achieved, surpassing $1 million in net income over the past ten weeks. This achievement was crucial in mitigating substantial losses incurred from long-term holdings.
        </Text>

        <Text>
          Friday's market activity was notably volatile. Market conditions suggest a period of continued uncertainty.
        </Text>

        <Text>
          Key Performance Indicators are attached below.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu7mar" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default Dmu7mar;
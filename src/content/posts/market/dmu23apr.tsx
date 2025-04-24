import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu23apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Bets Club | Daily Performance Summary
      </Heading>
      <Text mb={4}>Date: April 23, 2025</Text>
      <Text mb={4}>Fund: 🤫 Evergreen Renaissance AI First Fund A</Text>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu23apr" 
        title="Fund A Performance Charts & Data"
        apiDateFormat={false}
        imageCount={3}
        showTestImage={true}
      />
    </Box>
  );
};

export default Dmu23apr;
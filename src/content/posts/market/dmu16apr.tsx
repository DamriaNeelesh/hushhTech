import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu16apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 16, 2025</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu16apr" 
        title="Supporting Charts & Data"
        apiDateFormat={false}
        imageCount={3}
        showTestImage={true}
      />
    </Box>
  );
};

export default Dmu16apr; 
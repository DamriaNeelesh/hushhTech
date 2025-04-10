import React from 'react';
import { Box, Text, Heading, VStack, Divider } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu9apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 9, 2025</Text>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu9apr" 
        showTestImage={false} 
      />
    </Box>
  );
};

export default Dmu9apr;
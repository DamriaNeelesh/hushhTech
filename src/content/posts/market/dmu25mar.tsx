import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image, SimpleGrid } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/1_Daily Market Update.jpg'
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const dmu25mar = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 25 March 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 25, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 25, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Daily Summary
      </Heading>
      <Text mb={4}>
        The day has yielded positive results. Approximately 100 walls were rolled, resulting in a 1% increase in Aloha income for the day.
      </Text>
      <Text mb={4}>
        This progress follows a challenging previous Monday.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Position
      </Heading>
      <Text mb={4}>
        We are maintaining a delta neutral stance as we enter April, indicating a more neutral position rather than bullish or bearish.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Summary
      </Heading>
      <Text mb={4}>
        In summary, active maintenance of the Aloha program during the closing period led to the successful rollover of over 100 walls. This activity generated an approximate 1% increase in Aloha income, which was reflected by a similar 1% rise in net asset value (NAV).
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>

      <MarketUpdateGallery 
        date="dmu25mar" 
        title="Supporting Charts & Data"
      />

    </Box>
  );
};

export default dmu25mar;
import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image, SimpleGrid } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/1_Daily Market Update.jpg'
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const dmu26mar = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 26 March 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 26, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 26, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview
      </Heading>
      <Text mb={4}>
        Market conditions are currently unfavorable, impacting multiple assets. Regarding fund execution, approximately 27 walls were rolled over through the Aloha program.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategic Position
      </Heading>
      <Text mb={4}>
        We have strategically shifted towards a delta-neutral position in anticipation of increased market volatility and choppiness expected in April, coinciding with upcoming tariff and tax deadlines.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Performance Metrics
      </Heading>
      <Text mb={4}>
        Key Performance Indicators (KPIs) and trade fills for the day are available below.
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>

      <MarketUpdateGallery 
        date="dmu26mar" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default dmu26mar;
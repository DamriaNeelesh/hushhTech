import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu10apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update
      </Heading>
      <Text mb={4}>Date: April 10, 2025</Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Overview:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          The market experienced heightened volatility today as tech stocks faced pressure following unexpected inflation data. Despite the challenging environment, our Aloha approach continued to deliver consistent results with our "Sell the Wall" strategy generating strong income.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      {/* <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Daily Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Asset Value (NAV): $10,512,850 (+0.42% daily)</ListItem>
          <ListItem>• Cash Position: $3,875,320 (+$228,000 from previous day)</ListItem>
          <ListItem>• Today's Income: +$44,145 from 87 wall rolls</ListItem>
          <ListItem>• Win Rate: 98.9% (87/88 trades successful)</ListItem>
          <ListItem>• Average Gain: +5.6% per position</ListItem>
        </List>
        <Text mt={2}>
          Another successful day of execution, with nearly $44K in Aloha income secured despite market turbulence.
        </Text>
      </VStack> */}
{/* 
      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy Update:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          We continue to maintain our disciplined approach focused on high-quality, free cash flow generating businesses. Our increased cash position provides both security and opportunity as we prepare for potential market dislocations heading into Q2 earnings season.
        </Text>
        <Text mt={2}>
          Key focus areas remain the technology, financial, and healthcare sectors where we see significant alpha opportunities through strategic option positioning.
        </Text>
      </VStack> */}

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu10apr" 
        title="Supporting Charts & Data"
        apiDateFormat={false}
        imageCount={3}
        showTestImage={true}
      />
    </Box>
  );
};

export default Dmu10apr; 
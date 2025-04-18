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
      <VStack align="start" spacing={2}>
        <Text>
          Markets staged a recovery today as the Fed's Beige Book indicated moderate economic growth across most regions with signs of cooling inflation. Technology stocks led the advance, with semiconductor names particularly strong following positive earnings surprises from key industry players.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Fund Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Net Asset Value (NAV): $10,845,350 (+1.2% daily)</ListItem>
          <ListItem>• Cash Position: $4,458,690 (41.1% of portfolio)</ListItem>
          <ListItem>• Today's Income: +$52,650 from 95 wall rolls</ListItem>
          <ListItem>• Daily Win Rate: 98.9% (95/96 trades successful)</ListItem>
          <ListItem>• Average Gain: +5.8% per position</ListItem>
        </List>
        <Text mt={2}>
          Another exceptional day with nearly $53K in Aloha income generated. Our disciplined approach continues to deliver regardless of market direction, with only one losing trade out of 96 total.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy Implementation:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          Today's market rally provided excellent opportunities to roll over existing walls at favorable prices while establishing new positions in high-quality names ahead of earnings. We've increased our exposure to select semiconductor names while maintaining our core positions in mega-cap technology.
        </Text>
        <Text mt={2}>
          Cash reserves remain elevated at over 40% of the portfolio, providing both stability and optionality as earnings season accelerates.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Risk Management:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          With volatility metrics at elevated levels and the VIX above 21, we're continuing to focus on shorter-dated options to minimize exposure to unexpected market movements. Our position sizing remains conservative, with no single name representing more than 3% of the portfolio's delta exposure.
        </Text>
      </VStack>

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
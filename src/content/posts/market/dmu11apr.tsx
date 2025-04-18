import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu11apr = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Update - Week in Review
      </Heading>
      <Text mb={4}>Date: April 11, 2025</Text>

      {/* <Divider my={4} borderColor="black" /> */}

      {/* <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Weekly Market Summary:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          Markets closed the week with a mixed performance as investors digested a series of important economic reports. The S&P 500 finished slightly higher, while the NASDAQ struggled amid continued rotation out of technology names. Earnings season officially kicked off with major bank reports showing resilience despite challenging lending conditions.
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Fund Performance:
      </Heading>
      <VStack align="start" spacing={2}>
        <List spacing={1}>
          <ListItem>• Weekly Income: +$197,830 total Aloha income</ListItem>
          <ListItem>• Net Asset Value (NAV): $10,587,430 (+2.8% weekly gain)</ListItem>
          <ListItem>• Cash Position: $4,105,620 (38.8% of portfolio)</ListItem>
          <ListItem>• Weekly Transactions: 378 total (368 gains, 10 losses)</ListItem>
          <ListItem>• Weekly Win Rate: 97.4%</ListItem>
          <ListItem>• Average Weekly Gain per Position: +5.2%</ListItem>
        </List>
        <Text mt={2}>
          Another strong week for our Aloha strategy, converting market volatility into consistent income through our disciplined approach.
        </Text>
      </VStack> */}

      {/* <Divider my={4} borderColor="black" /> */}
{/* 
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy & Outlook:
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          As we move deeper into earnings season, we're maintaining our balanced approach with significant cash reserves to capitalize on opportunities. Our focus remains on high-quality businesses with strong free cash flow generation that can weather potential economic headwinds.
        </Text>
        <Text mt={2}>
          Technical indicators suggest increasing volatility ahead, which aligns perfectly with our "Sell the Wall" strategy. We remain positioned to benefit from time decay and fear-driven premiums in the options market.
        </Text>
      </VStack> */}

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu11apr" 
        title="Weekly Performance Charts & Data"
        apiDateFormat={true}
      />
    </Box>
  );
};

export default Dmu11apr; 
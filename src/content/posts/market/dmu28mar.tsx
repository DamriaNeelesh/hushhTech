import React from 'react';
import { Box, Text, Heading, Divider } from '@chakra-ui/react';

const dmu28mar = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 28 March 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 28, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 28, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Close Summary
      </Heading>
      <Text mb={4}>
        The market closed today with significant volume and a surge of sellers, resulting in an unusual close coinciding with month-end options expiration. We successfully rolled over 203 walls and secured approximately 2.5% (127k) in income amidst market volatility.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Performance Update
      </Heading>
      <Text mb={4}>
        Selling the wall mitigated potential losses. We have achieved a 15% gain for the month on our risk capital (5M). This level of income may represent a high point.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Month-End Status
      </Heading>
      <Text mb={4}>
        We have one more day remaining in the month and should acknowledge these achievements. The Q1 Investment update was provided to Limited Partners for early review, as requested, and is now accessible via hushhTech.com.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        End-of-Day Metrics
      </Heading>
      <Text mb={4}>
        Here are the end-of-day KPIs and trade fills.
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>
    </Box>
  );
};

export default dmu28mar;
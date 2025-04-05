import React from 'react';
import { Box, Text, Heading, Divider } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const dmu24mar = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 24, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 24, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Trading Summary
      </Heading>
      <Text mb={4}>
        Approximately 120 trades were executed today, involving the sale of option walls and the rollover of profitable positions.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Strategy Update
      </Heading>
      <Text mb={4}>
        Our strategy involved selling option walls across the value chain to optimize income.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Performance Results
      </Heading>
      <Text mb={4}>
        The day concluded with an approximate 1% return on capital at risk, amounting to $45,000.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Position
      </Heading>
      <Text mb={4}>
        Delta readings indicate an increased hedging position during the rally, reflecting an expectation of continued market volatility.
      </Text>
      <Text mb={4}>
        Current portfolio positioning is shifting towards delta neutral rather than delta long.
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>

      {/* Use the reusable gallery component */}
      <MarketUpdateGallery 
        date="dmu24mar" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default dmu24mar;
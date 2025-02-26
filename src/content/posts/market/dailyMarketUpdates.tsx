import React from 'react';
import { Box, Heading, Image, Text, VStack, Divider } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/0_Daily Market Update.jpg'

export const frontmatter = {
  title: "Daily Market Update – January 28, 2025",
  date: "2025-01-28",
  description: 'Markets rallied, driven by strong earnings from major tech companies and optimism about the Federal Reserve’s upcoming decisions on interest rates.',
  author: "Jane Doe",
  tags: ["market update", "daily update", "indices", "volatility", "investing"],
  category: "market"
};

const DailyMarketUpdate: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt="Funds Update" mb={4} borderRadius="md" /> */}

      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Daily Market Update – January 28, 2025
      </Heading>

      <Text fontSize="lg" mb={4}>
        Markets rallied, driven by strong earnings from major tech companies and optimism about the Federal Reserve’s upcoming decisions on interest rates.
      </Text>

      <Divider my={4} borderColor="black" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" fontSize="lg" color="black">Market Overview</Heading>
          <Text mt={2}><strong>Indices Performance:</strong></Text>
          <Text>• <strong>Dow Jones Industrial Average (DJIA):</strong> Closed at 44,850.35, up +0.31% (+136.77 points).</Text>
          <Text>• <strong>S&P 500 (SPX):</strong> Closed at 6,067.70, up +0.92%.</Text>
          <Text>• <strong>Nasdaq (NDX):</strong> Closed at 21,463.04, up +1.59%.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Sector Highlights</Heading>
          <Text mt={2}>• Technology led gains, buoyed by Apple (AAPL) and NVIDIA (NVDA) posting significant intraday growth.</Text>
          <Text>• Consumer Discretionary saw positive momentum from strong e-commerce growth in Amazon (AMZN).</Text>
          <Text>• Financials remained stable, with JPMorgan Chase (JPM) continuing to perform well amidst solid economic indicators.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Volatility</Heading>
          <Text mt={2}>The VIX (Volatility Index) remained subdued at 15.02, reflecting continued investor confidence.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default DailyMarketUpdate;

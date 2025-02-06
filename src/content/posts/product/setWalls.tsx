import React from 'react';
import { Box, Heading, Text, VStack, Divider, Image } from '@chakra-ui/react';

const SellTheWallPresentation = () => {
  return (
    <VStack spacing={6} p={5} bg="gray.50">
      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="xl" color="teal.600">“Sell the Wall” Strategy</Heading>
        <Text fontSize="lg" mt={2}>Turning Your Stocks Into a Cash Machine</Text>
        <Text>Generate Steady Income While Investing in Top-Performing Companies - 29 January 2025</Text>
      </Box>

      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="lg">Imagine Getting Paid Weekly</Heading>
        <Text>Own shares in Apple, Tesla, Google, and more. Generate a steady income stream without selling your stocks.</Text>
        <Text>Like owning a premium real estate portfolio where the market pays you rent.</Text>
      </Box>

      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="lg">How “Sell the Wall” Strategy Works</Heading>
        <Text>Think of Your Stocks Like Rental Properties:</Text>
        <Text>- Covered Calls: Sell the right to buy your shares at a higher price.</Text>
        <Text>- Cash-Secured Puts: Sell the right to sell shares to you at a lower price.</Text>
        <Text>Monetizing volatility into a reliable income stream.</Text>
      </Box>

      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="lg">Why This Works</Heading>
        <Text>Prime Stocks for Maximum Income:</Text>
        <Text>- Apple (AAPL), Tesla (TSLA), NVIDIA (NVDA), Google (GOOGL)</Text>
        <Text>- Generate billions in free cash flow, resilient, highly liquid options markets.</Text>
        <Text>Total Weekly Income: $182,440 | In 6 weeks → $1,094,640</Text>
      </Box>

      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="lg">Why Investors Love This Strategy</Heading>
        <Text>- Consistent Cash Flow: Earn weekly regardless of market direction.</Text>
        <Text>- Stay Invested: Keep long-term growth potential intact.</Text>
        <Text>- Smart Risk Management: Income cushions downturns.</Text>
        <Text>- Scalable: Works even with large capital investments.</Text>
      </Box>

      <Box p={4} bg="white" shadow="md" borderRadius="md">
        <Heading size="lg">The Ask</Heading>
        <Text>Raising capital for a fund targeting SPX’s top free cash flow companies.</Text>
        <Text>Aim: Deliver predictable income and long-term growth.</Text>
        <Text>Call to Action: Turn volatility into income and build wealth week by week.</Text>
      </Box>
    </VStack>
  );
};

export default SellTheWallPresentation;

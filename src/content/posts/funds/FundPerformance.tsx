import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, Badge, VStack } from '@chakra-ui/react';

export const frontmatter = {
  title: "🤫 Fund Performance – January 28, 2025",
  publishedAt: "2025-01-28",
  description: "Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.",
  category: "funds",
  author: "Jane Doe",
  tags: ["market update", "daily update", "indices", "volatility", "investing"]
};

const FundPerformance: React.FC = () => {
  return (
    <Box p={0} maxW="900px" mx="auto" textAlign="left" bg="white" color="black">
      <Heading as="h1" fontSize="2xl" fontWeight="500" mt={2} mb={4}>
        Fund Updates – January 28, 2025
      </Heading>
            
      <Text color="gray.600" fontSize="md" mb={4}>
        Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.
      </Text>
      
      <Divider my={4} borderColor="gray.300" />
      
      <VStack align="start" spacing={2} mt={6}>
        <Heading as="h3" fontSize="md" fontWeight="bold">
          📊 Fund Overview
        </Heading>
        <Text fontSize="md" color="gray.700"><strong>Net Liquidation Value:</strong> $6,000,654.31</Text>
        <Text fontSize="md" color="gray.700"><strong>Proceeds:</strong> $240,269.56</Text>
        <Text fontSize="md" color="gray.700"><strong>Net Gain:</strong> +15.28%</Text>
      </VStack>
      
      <Divider my={4} borderColor="gray.300" />
      
      <Heading as="h3" fontSize="md" fontWeight="bold">
        Transaction Statistics
      </Heading>
      <List spacing={2}>
        <ListItem>Transaction Count: 29</ListItem>
        <ListItem>Gain Count: 29</ListItem>
        <ListItem>Loss Count: 0</ListItem>
        <ListItem>Gain/Loss Ratio: 100% gain rate</ListItem>
        <ListItem>Average Gain: +15.28%</ListItem>
      </List>
      
      <Divider my={4} borderColor="gray.300" />
      
      <Heading as="h3" fontSize="md" fontWeight="bold">
        Strategic Commentary
      </Heading>
      <List spacing={2}>
        <ListItem><strong>Sell the Wall Execution:</strong> Maximized premium collection on AAPL and NVDA.</ListItem>
        <ListItem><strong>Balanced Strike Prices:</strong> Tesla (TSLA) and Amazon (AMZN) optimized for gains.</ListItem>
        <ListItem><strong>Hedged Exposure:</strong> Protective puts for META and TSLA.</ListItem>
      </List>
      
      <Divider my={4} borderColor="gray.300" />
      
      <Heading as="h3" fontSize="md" fontWeight="bold">
        Outlook
      </Heading>
      <List spacing={2}>
        <ListItem><strong>Market Direction:</strong> Strength in tech sectors expected.</ListItem>
        <ListItem><strong>Portfolio Adjustments:</strong> Rolling positions into higher volatility weeks.</ListItem>
        <ListItem><strong>Focus Areas:</strong> GOOGL, AAPL, and diversification with BRK.B.</ListItem>
      </List>
    </Box>
  );
};

export default FundPerformance;

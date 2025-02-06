import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';

export const frontmatter = {
  title: "Fund A Hushh",
  publishedAt: "2025-02-05",
  description: "An in-depth overview of Fund A Hushh, focusing on AI-driven, risk-managed investment strategies.",
  category: "investor relations"
};

const FundAHushh: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Fund A Hushh
      </Heading>

      <Text fontSize="lg" mb={4}>
        Welcome to Fund A Hushh, where AI-driven strategies meet risk-managed investment principles.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        Core Principles
      </Heading>

      <VStack spacing={4} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.800">
          <Heading as="h4" size="md" color="teal.100" mb={2}>Mission</Heading>
          <Text>
            Deploy $7.5M NAV in the world’s smartest, AI-driven, risk-managed hedge fund strategies.
          </Text>
        </Box>

        <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.800">
          <Heading as="h4" size="md" color="teal.100" mb={2}>Goal</Heading>
          <Text>
            Maximize free cash flow alpha while ensuring absolute capital protection and scalability.
          </Text>
        </Box>
      </VStack>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>
        Investment Strategies
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>AI-powered quantitative models for predictive analysis.</ListItem>
        <ListItem>Systematic risk management frameworks ensuring capital preservation.</ListItem>
        <ListItem>Diversified asset allocation across high-liquidity markets.</ListItem>
        <ListItem>Real-time data analytics to optimize investment decisions.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>
        Performance Highlights
      </Heading>
      <Text mb={4}>
        Achieved a strong growth trajectory through disciplined execution and strategic diversification, with a focus on maximizing returns while minimizing risk.
      </Text>

      <Heading as="h4" size="md" color="yellow.300" mt={4}>
        Final Thought
      </Heading>
      <Text>
        "The best way to grow is to let compounding do its work." — Inspired by Munger & Simons
      </Text>
      <Text mt={2}>
        Join us in building a future where financial precision meets sustainable growth.
      </Text>
    </Box>
  );
};

export default FundAHushh;

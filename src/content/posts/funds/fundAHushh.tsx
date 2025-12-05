import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import FundsUpdate from '../../../components/images/0_Fund Performance.jpg';

export const frontmatter = {
  title: "Fund A Hushh",
  publishedAt: "2025-02-05",
  description: "An in-depth overview of Fund A Hushh, focusing on AI-driven, risk-managed investment strategies.",
  category: "investor relations"
};

const FundAHushh: React.FC = () => {
  return (
    <Box p={0} maxW="900px" mx="auto" textAlign="left" bg="white" color="black">
      <Heading as="h1" fontSize="2xl" fontWeight="500" mt={2} mb={4}>
        Fund A Hushh
      </Heading>

      <Text color="gray.600" fontSize="md" mb={4}>
        Welcome to Fund A Hushh, where AI-driven strategies meet risk-managed investment principles.
      </Text>

      <Divider my={4} borderColor="gray.300" />

      <VStack align="start" spacing={4} mt={6}>
        <Heading as="h3" fontSize="md" fontWeight="500">
          Core Principles
        </Heading>
        <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.100">
          <Heading as="h4" fontSize="md" fontWeight="500" mb={2}>Mission</Heading>
          <Text color="gray.700">
            Deploy $7.5M NAV in the world’s smartest, AI-driven, risk-managed hedge fund strategies.
          </Text>
        </Box>

        <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.100">
          <Heading as="h4" fontSize="md" fontWeight="500" mb={2}>Goal</Heading>
          <Text color="gray.700">
            Maximize free cash flow alpha while ensuring absolute capital protection and scalability.
          </Text>
        </Box>
      </VStack>

      <Divider my={4} borderColor="gray.300" />

      <Heading as="h3" fontSize="md" fontWeight="500">
        Investment Strategies
      </Heading>
      <List spacing={2} pl={4} color="gray.700">
        <ListItem>AI-powered quantitative models for predictive analysis.</ListItem>
        <ListItem>Systematic risk management frameworks ensuring capital preservation.</ListItem>
        <ListItem>Diversified asset allocation across high-liquidity markets.</ListItem>
        <ListItem>Real-time data analytics to optimize investment decisions.</ListItem>
      </List>

      <Divider my={4} borderColor="gray.300" />

      <Heading as="h3" fontSize="md" fontWeight="500">
        Performance Highlights
      </Heading>
      <Text mb={4} color="gray.700">
        Achieved a strong growth trajectory through disciplined execution and strategic diversification, with a focus on maximizing returns while minimizing risk.
      </Text>

      <Heading as="h4" fontSize="md" fontWeight="500" mt={4}>
        Final Thought
      </Heading>
      <Text color="gray.700">
        "The best way to grow is to let compounding do its work." — Inspired by Munger & Simons
      </Text>
      <Text mt={2} color="gray.700">
        Join us in building a future where financial precision meets sustainable growth.
      </Text>
    </Box>
  );
};

export default FundAHushh;
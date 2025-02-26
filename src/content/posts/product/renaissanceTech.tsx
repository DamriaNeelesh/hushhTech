import React from 'react';
import { Box, Text, Heading, Image,List, ListItem, Divider, Badge, VStack, UnorderedList } from '@chakra-ui/react';
import ProductUpdateImg from '../../../components/images/product-update.webp'

export const frontmatter = {
  title: "The 🤫 Fund – First 12 Investment Programs & Systems Inspired by Renaissance Technologies",
  publishedAt: "2025-02-03",
  description: "An overview of the first 12 investment programs of The 🤫 Fund, detailing AI-driven strategies inspired by Renaissance Technologies.",
  category: "funds"
};

const RenaissanceTech: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🚀 The Fund – First 12 Investment Programs
      </Heading>
      <Text fontSize="lg" mb={4}>
        Mission: Deploy $7.5M NAV in the world’s smartest, AI-driven, risk-managed hedge fund strategies. 
        Goal: Maximize free cash flow alpha while ensuring absolute capital protection and scalability.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={2}> The First 12 Investment Programs of the 🤫 Fund</Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h4" fontSize="md" color="black"> Einstein – AI-Driven Statistical Arbitrage</Heading>
          <UnorderedList spacing={1} ml={4}>
            <ListItem> Trades microsecond inefficiencies across SPX, NDX, and mega-cap stocks.</ListItem>
            <ListItem> Uses mean-reversion and time-series ML models to predict short-term price fluctuations.</ListItem>
            <ListItem> HFT execution with AI-based order flow analysis.</ListItem>
            <ListItem> Alpha Source: Price mispricings, bid-ask spreads, and inefficiencies.</ListItem>
            <ListItem> Target Return: 10-20% annualized.</ListItem>
            <ListItem> Risk: Very low but requires real-time AI execution.</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h4" fontSize="md" color="black"> Tesla – The Sell the Wall Engine</Heading>
          <UnorderedList spacing={1} ml={4}>
            <ListItem>Sells covered calls and cash-secured puts on AAPL, MSFT, NVDA, AMZN, META, TSLA, GOOGL.</ListItem>
            <ListItem>Weekly premium income generation = consistent paycheck.</ListItem>
            <ListItem>AI optimizes strike selection & rolling strategies for max efficiency.</ListItem>
            <ListItem>Alpha Source: Time decay (Theta) & volatility contraction.</ListItem>
            <ListItem>Target Return: 50-100% annualized.</ListItem>
            <ListItem>Risk: Low (positions always backed by real stock).</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h4" fontSize="md" color="black">🧠 Musk – Macro & AI-Powered Thematic Investing</Heading>
          <UnorderedList spacing={1} ml={4}>
            <ListItem>Blends macro models & AI sentiment analysis to predict the next big waves.</ListItem>
            <ListItem>Focuses on AI, automation, energy, biotech, space, and Web3.</ListItem>
            <ListItem>AI dynamically allocates capital across thematic sectors.</ListItem>
            <ListItem>Alpha Source: Front-running structural shifts.</ListItem>
            <ListItem>Target Return: 20-40% annualized.</ListItem>
            <ListItem>Risk: Medium (macro shocks).</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h4" fontSize="md" color="black">🚀 Next Steps: The Fund Execution Plan</Heading>
          <UnorderedList spacing={1} ml={4}>
            <ListItem>Deploy $7.5M across these 12 programs immediately.</ListItem>
            <ListItem>Automate execution using AI & quant-driven strategies.</ListItem>
            <ListItem>Show clean dashboards for real-time reporting.</ListItem>
            <ListItem>Scale to $100M+ AUM by proving risk-adjusted returns.</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Text fontSize="lg" mt={4} fontStyle="italic">
            "The best way to win is to systematically remove losing trades. The best way to grow is to let compounding do its work." — Inspired by Munger & Simons
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default RenaissanceTech;

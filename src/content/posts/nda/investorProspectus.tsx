import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "🤫 Fund Investor Prospectus",
  publishedAt: "2025-01-01",
  description: "AI-Driven Systematic Options Income Hedge Fund",
  category: 'investment strategies',
};

const InvestorProspectus = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Fund Investor Prospectus
      </Heading>

      <Text fontSize="lg" mb={4}>
        AI-Driven Systematic Options Income Hedge Fund
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        I. EXECUTIVE SUMMARY
      </Heading>
      <Text mb={4}>
        The 🤫 Fund is an AI-powered, systematic options income hedge fund designed to maximize weekly and monthly cash flow while maintaining exposure to the world’s top free cash flow businesses. Our proprietary “Sell the Wall” strategy generates consistent income through disciplined risk-managed options execution, making this fund one of the most efficient wealth-building vehicles in the market.
      </Text>
      <Text mb={4}>
        We are raising $2.5 billion in institutional and private capital, with an initial $25M LP commitment, to scale our proven yield-enhancing strategy across SPX 500 mega-cap businesses.
      </Text>

      <Heading as="h4" fontSize="md" mb={2}>
        Fund Highlights
      </Heading>
      <List spacing={2} pl={4} mb={4}>
        <ListItem>Current AUM: $7.5M</ListItem>
        <ListItem>Annualized Yield on NAV: ~104%</ListItem>
        <ListItem>Weekly Income: $150,734 (~2.01% of NAV)</ListItem>
        <ListItem>Win Rate: ~93.4%</ListItem>
        <ListItem>Risk-Managed AI Execution</ListItem>
        <ListItem>Scalable to $50B+ AUM</ListItem>
      </List>

      <Heading as="h4" fontSize="md" mb={2}>
        Target Raise
      </Heading>
      <List spacing={2} pl={4} mb={4}>
        <ListItem>$2.5B in Institutional & Private Capital</ListItem>
        <ListItem>Minimum Investment: $5M per LP</ListItem>
        <ListItem>Fund Structure: Cayman-domiciled hedge fund</ListItem>
        <ListItem>Lock-up Period: 12-24 months</ListItem>
        <ListItem>Management Fee: 2%</ListItem>
        <ListItem>Performance Fee: 20%</ListItem>
      </List>

      {/* Add additional sections in a similar format here */}

      <Divider my={4} borderColor="black" />

      <Text mt={4}>
        Disclaimers: This document is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Investments in hedge funds are speculative and involve a high degree of risk. Please consult with a professional advisor before making any investment decisions.
      </Text>
    </Box>
  );
};

export default InvestorProspectus;
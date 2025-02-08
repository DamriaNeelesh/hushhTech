import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/inve.jpg';

export const frontmatter = {
  title: "Liquidity Management Guidelines",
  publishedAt: "2025-02-08",
  description: "A comprehensive framework for ensuring capital availability & portfolio stability.",
  category: 'investor relations & strategies',
};

const LiquidityManagement = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={AlphaAlohaImg} alt="Liquidity Management" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Liquidity Management Guidelines
      </Heading>

      <Text fontSize="lg" mb={4}>Hushh Renaissance Aloha & Alpha Fund, LP</Text>
      <Text>(A Comprehensive Framework for Ensuring Capital Availability & Portfolio Stability)</Text>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Liquidity Tiers</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Tier 1:</strong> Immediate Liquidity (Cash & Equivalents) - 20-30% of NAV, Daily liquidity.</ListItem>
        <ListItem><strong>Tier 2:</strong> Short-Term Options Premium Income - 40-50% of NAV, Weekly to Monthly liquidity.</ListItem>
        <ListItem><strong>Tier 3:</strong> Long-Term Core Equity Positions - 20-30% of NAV, Quarterly to Annual liquidity.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Redemption Policies</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Class A ($25M Min.):</strong> 12-month lock-up, quarterly redemptions with 60 days’ notice.</ListItem>
        <ListItem><strong>Class B ($5M Min.):</strong> 12-month lock-up, quarterly redemptions with 60 days’ notice.</ListItem>
        <ListItem><strong>Class C ($1M Min.):</strong> 12-month lock-up, semi-annual redemptions with 90 days’ notice.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Liquidity Stress Testing & Crisis Management</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Mild Stress:</strong> Reduce option exposures and raise cash.</ListItem>
        <ListItem><strong>Moderate Stress:</strong> Delay non-essential withdrawals, shift to ultra-short Treasuries.</ListItem>
        <ListItem><strong>Severe Crisis:</strong> Activate crisis response, freeze redemptions temporarily.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Capital Deployment Strategy</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Weekly liquidity buffer adjustments based on VIX readings, options expiry risks, and redemption requests.</ListItem>
        <ListItem>AI-driven reallocation models track market conditions and optimize liquidity distribution.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Transparency & Reporting</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Monthly reports include NAV breakdown, redemption pipeline tracking, and market risk assessment.</ListItem>
        <ListItem>Quarterly liquidity review ensures alignment with fund objectives.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Final Thought: The Future of Institutional Liquidity Management</Heading>
      <Text>
        Effective liquidity management ensures operational stability, controlled drawdowns, and strategic capital allocation. Through
        AI-driven models and disciplined execution, the Fund maintains resilience in various market conditions.
      </Text>
    </Box>
  );
};

export default LiquidityManagement;

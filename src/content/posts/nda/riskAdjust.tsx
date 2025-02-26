import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "Example Risk-Adjusted Returns Scenarios",
  publishedAt: "2025-02-07",
  description: "Quantitative exploration of potential return outcomes based on market conditions and strategy performance.",
  category: 'investor relations & strategies',
};

const RiskAdjustedReturns = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Example Risk-Adjusted Returns Scenarios
      </Heading>

      <Text fontSize="lg" mb={4}>Hushh Renaissance Aloha & Alpha Fund, LP</Text>
      <Text>(A Quantitative Exploration of Potential Return Outcomes Based on Market Conditions and Strategy Performance)</Text>
      
      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Scenario 1: Base Case (Expected Outcome)</Heading>
      <Text fontWeight="bold">Market Conditions:</Text>
      <List spacing={2} pl={4}>
        <ListItem>S&P 500 grows at 6-8% annualized return.</ListItem>
        <ListItem>Implied volatility remains between 16-22 VIX.</ListItem>
        <ListItem>No major geopolitical shocks or liquidity crises.</ListItem>
      </List>
      <Text fontWeight="bold" mt={4}>Expected Returns:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Annualized Net Return: 15-18% (after fees).</ListItem>
        <ListItem>Sharpe Ratio: ~1.8.</ListItem>
        <ListItem>Max Drawdown: ~12-15%.</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Scenario 2: Bull Case</Heading>
      <Text fontWeight="bold">Market Conditions:</Text>
      <List spacing={2} pl={4}>
        <ListItem>S&P 500 surges 12-18% annually.</ListItem>
        <ListItem>VIX fluctuates between 22-30.</ListItem>
        <ListItem>Interest rates remain low.</ListItem>
      </List>
      <Text fontWeight="bold" mt={4}>Expected Returns:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Annualized Net Return: 22-28% (after fees).</ListItem>
        <ListItem>Sharpe Ratio: ~2.2.</ListItem>
        <ListItem>Max Drawdown: ~10%.</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>Scenario 3: Bear Case</Heading>
      <Text fontWeight="bold">Market Conditions:</Text>
      <List spacing={2} pl={4}>
        <ListItem>S&P 500 declines 15-25% over 12 months.</ListItem>
        <ListItem>VIX spikes to 30-45.</ListItem>
        <ListItem>Interest rates remain high.</ListItem>
      </List>
      <Text fontWeight="bold" mt={4}>Expected Returns:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Annualized Net Return: 3-6% (after fees).</ListItem>
        <ListItem>Sharpe Ratio: ~0.9.</ListItem>
        <ListItem>Max Drawdown: ~18-22%.</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Scenario 4: Worst-Case Black Swan Event</Heading>
      <Text fontWeight="bold">Market Conditions:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Global liquidity crisis.</ListItem>
        <ListItem>S&P 500 collapses 35-50% in six months.</ListItem>
        <ListItem>VIX spikes above 60.</ListItem>
      </List>
      <Text fontWeight="bold" mt={4}>Expected Returns:</Text>
      <List spacing={2} pl={4}>
        <ListItem>Annualized Net Return: (-10% to -25%).</ListItem>
        <ListItem>Sharpe Ratio: -1.5 to -2.0.</ListItem>
        <ListItem>Max Drawdown: 40%+.</ListItem>
      </List>
      
      <Divider my={4} borderColor="black" />
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Final Thought: Building Wealth the Alpha & Aloha Way</Heading>
      <Text>
        At Hushh Renaissance Aloha & Alpha Fund, LP, we are committed to risk-adjusted wealth creation with a strategy that aligns
        market efficiency with human psychology and AI-driven execution. Our focus is not just on profits, but on sustainability and long-term compounding.
      </Text>
    </Box>
  );
};

export default RiskAdjustedReturns;

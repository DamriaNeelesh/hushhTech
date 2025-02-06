import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem, Divider } from '@chakra-ui/react';

export const frontmatter = {
  title: "🤫 Alpha Aloha Fund Update",
  publishedAt: "2025-02-04",
  description: "Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.",
  category: "market"
};

const AlphaAlohaFundUpdate: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        🤫 Alpha Aloha Fund Update – February 4, 2025
      </Heading>

      <Text fontSize="lg" mb={4}>
        A Day of Reflection and Resilience: Celebrating a new high-water NAV of $7.614M and a strong cash position of $4.4M.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Alphabet (GOOGL): A Disappointing Revenue Miss and Expanding AI Investments</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Revenue: $96.47B (vs. $96.56B expected)</ListItem>
        <ListItem>EPS: $2.15 (vs. $2.13 expected)</ListItem>
        <ListItem>Google Cloud Revenue: $11.96B (vs. $12.19B expected)</ListItem>
      </List>

      <Heading as="h4" size="md" color="yellow.300" mt={4}>Insights:</Heading>
      <List spacing={2} pl={4}>
        <ListItem>AI-Focused CapEx: $75B planned for 2025.</ListItem>
        <ListItem>Cloud Revenue Miss: Tight supply-demand conditions.</ListItem>
        <ListItem>Slowing Ad Growth: YouTube ad growth at 13.8% YoY.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Snap (SNAP): A Better-Than-Expected Quarter</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Revenue: $1.56B (+14% YoY)</ListItem>
        <ListItem>EPS: $0.16 (vs. $0.14 expected)</ListItem>
        <ListItem>Daily Active Users: 453M (vs. 451.1M expected)</ListItem>
      </List>

      <Heading as="h4" size="md" color="yellow.300" mt={4}>Highlights:</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Snapchat+ Momentum: 14M subscribers.</ListItem>
        <ListItem>Advertiser Diversification amid regulatory shifts.</ListItem>
        <ListItem>AI Commentary: Efficiency gains via new AI models.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Market Commentary and Broader Trends</Heading>
      <List spacing={2} pl={4}>
        <ListItem>S&P 500: +0.7%, led by healthcare and tech.</ListItem>
        <ListItem>Dow Jones: +0.3%, driven by industrials.</ListItem>
        <ListItem>Nasdaq: +1.4%, fueled by AI optimism.</ListItem>
      </List>

      <Heading as="h4" size="md" color="yellow.300" mt={4}>Sector Highlights:</Heading>
      <List spacing={2} pl={4}>
        <ListItem>Tech: AI-driven growth themes with execution hurdles.</ListItem>
        <ListItem>Consumer Discretionary: Retail data boosts confidence.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>YTD Income Performance</Heading>
      <Text>$389,300 generated YTD, representing 5.11% of NAV.</Text>

      <Heading as="h3" size="lg" color="teal.200" mt={4}>Looking Forward</Heading>
      <Text mb={4}>
        Focus on disciplined execution, strategic allocations, and capturing opportunities in a dynamic market environment.
      </Text>

      <Text fontStyle="italic" color="gray.400">
        “Great returns come from enduring great challenges. Let’s stay the course.” – Charlie Munger
      </Text>
    </Box>
  );
};

export default AlphaAlohaFundUpdate;

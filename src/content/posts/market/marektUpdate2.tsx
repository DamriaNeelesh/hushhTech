import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';

export const frontmatter = {
  title: "🤫 Alpha Aloha Fund Update",
  publishedAt: "2025-02-04",
  description: "Tuesday Evening Report – February 4, 2025: A Day of Reflection and Resilience with fund insights, market commentary, and performance highlights.",
  category: "market updates"
};

const MarketUpdate: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        🤫 Alpha Aloha Fund Update
      </Heading>
      <Text fontSize="md" mb={4}>
        <strong>Tuesday Evening Report – February 4, 2025</strong>
      </Text>
      <Text mb={4}>
        Today was marked by mixed market movements, headline earnings reports, and a significant milestone for the fund. Despite recovering from a tough cold, we celebrate a new high-water NAV of $7.614M and an impressive cash position of $4.4M.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={3}>Alphabet (GOOGL): A Disappointing Revenue Miss and Expanding AI Investments</Heading>
      <List spacing={2}>
        <ListItem>Revenue: $96.47B (vs. $96.56B expected)</ListItem>
        <ListItem>EPS: $2.15 (vs. $2.13 expected)</ListItem>
        <ListItem>Google Cloud Revenue: $11.96B (vs. $12.19B expected)</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={3}>Snap (SNAP): A Better-Than-Expected Quarter</Heading>
      <List spacing={2}>
        <ListItem>Revenue: $1.56B (+14% YoY)</ListItem>
        <ListItem>EPS: $0.16 (vs. $0.14 expected)</ListItem>
        <ListItem>Daily Active Users: 453M (vs. 451.1M expected)</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={3}>Market Commentary and Broader Trends</Heading>
      <List spacing={2}>
        <ListItem>S&P 500: +0.7%, buoyed by healthcare and tech gains</ListItem>
        <ListItem>Dow Jones: +0.3%, led by industrials</ListItem>
        <ListItem>Nasdaq: +1.4%, driven by AI-related optimism</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={3}>YTD Income Performance</Heading>
      <Text mb={4}>
        As of February 4, 2025, the fund has generated $389,300 in YTD income, representing 5.11% of NAV.
      </Text>

      <Heading as="h4" size="md" color="yellow.300" mt={4}>Looking Forward with Humility and Optimism</Heading>
      <Text mb={4}>
        As we celebrate February’s achievements, we remain focused on the road ahead. With a cash position of $4.4M and NAV at $7.614M, the Fund is well-positioned to capitalize on opportunities in a dynamic market environment.
      </Text>

      <Text fontStyle="italic" color="gray.400">
        “Great returns come from enduring great challenges. Let’s stay the course.” – Charlie Munger
      </Text>
    </Box>
  );
};

export default MarketUpdate;

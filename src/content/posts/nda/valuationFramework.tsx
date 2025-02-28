import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

export const frontmatter = {
  title: "Valuation Framework for Fund A",
  publishedAt: "2025-02-09",
  description: "A detailed analysis of the unique valuation model employed by Fund A.",
  category: 'fund valuation strategies',
};

const ValuationFramework = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Valuation Framework for Fund A
      </Heading>

      <Text fontSize="lg" mb={4}>
        Assessing the true worth of a fund that generates perpetual alpha and aloha through options premium income while owning assets.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Core Valuation Model: Moving Beyond Traditional Hedge Fund Metrics
      </Heading>
      <Text mb={4}>
        Most hedge funds are valued based on AUM (Assets Under Management) and performance fees, but Fund A operates differently—it isn’t just a fund, it’s a capital-generating machine that rents out its assets for continuous cash flow.
      </Text>
      
      <Table variant="simple" mb={4}>
        <Thead>
          <Tr>
            <Th color="black">Valuation Metric</Th>
            <Th color="black">Traditional Hedge Funds</Th>
            <Th color="black">Fund A’s Model</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>AUM-Based Valuation</Td>
            <Td>1-2% of AUM</Td>
            <Td>1-3% of AUM + premium generation multiple</Td>
          </Tr>
          <Tr>
            <Td>Management & Performance Fees</Td>
            <Td>Valued at 3-5x annual fees</Td>
            <Td>Valued at 5-10x due to recurring alpha & aloha income</Td>
          </Tr>
          <Tr>
            <Td>Cash Flow Valuation</Td>
            <Td>Limited recurring income</Td>
            <Td>Consistent, predictable premium income from options sales</Td>
          </Tr>
          <Tr>
            <Td>Intrinsic Value</Td>
            <Td>Market-dependent</Td>
            <Td>Self-funding through option premiums, independent of market</Td>
          </Tr>
        </Tbody>
      </Table>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Key Valuation Components
      </Heading>
      <VStack align="start" spacing={4}>
        <Box>
          <Heading as="h4" fontSize="md" mb={2}>
            1. Net Asset Value (NAV) Approach (Baseline)
          </Heading>
          <Text>
            NAV represents the real-time worth of the fund’s holdings. However, for Fund A, NAV understates its true value because it doesn’t account for the weekly premium rental income being generated.
          </Text>
          <List spacing={2} pl={4} mt={2}>
            <ListItem>Current NAV (Feb 7, 2025): $7.715 million</ListItem>
            <ListItem>Cash Position: $5.096 million</ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h4" fontSize="md" mb={2}>
            2. Cash Flow Valuation (DCF for Perpetual Premium Income)
          </Heading>
          <Text>
            Since Fund A generates consistent weekly premium income, we treat this like a business cash flow model, similar to a real estate REIT that rents out assets.
          </Text>
          <Text mt={2}>
            <strong>Formula:</strong>
          </Text>
          <List spacing={2} pl={4}>
            <ListItem>Annualized Options Premium Income (Projected): $4.5M (60% of NAV annually)</ListItem>
            <ListItem>Discount Rate: 10% (Weighted Average Cost of Capital for hedge funds)</ListItem>
            <ListItem>Growth Rate: 7% (Projected increase in capital through reinvestment of premiums)</ListItem>
            <ListItem><strong>DCF-Based Valuation:</strong> $150 million</ListItem>
          </List>
          <Text mt={2}>
            (This assumes premium income grows steadily as capital compounds.)
          </Text>
        </Box>

        {/* Add additional valuation methods in a similar format here */}
      </VStack>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        The Final Valuation Estimate
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color="black">Method</Th>
            <Th color="black">Valuation Estimate</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>NAV-Based Valuation (1.5-2.5x NAV)</Td>
            <Td>$12M - $19M</Td>
          </Tr>
          <Tr>
            <Td>DCF-Based (Premium Income Approach)</Td>
            <Td>$150M</Td>
          </Tr>
          <Tr>
            <Td>Fee-Based Hedge Fund Valuation</Td>
            <Td>$20M - $30M</Td>
          </Tr>
          <Tr>
            <Td>Market Comps (3-5x NAV)</Td>
            <Td>$25M - $75M</Td>
          </Tr>
        </Tbody>
      </Table>
      <Text mt={4}>
        By combining all these approaches, we can triangulate the fair valuation range of Fund A today:
      </Text>
      <Text fontSize="lg" mt={2}>
        <strong>Final Valuation Range (Feb 2025):</strong> $60M - $100M
      </Text>
    </Box>
  );
};

export default ValuationFramework;

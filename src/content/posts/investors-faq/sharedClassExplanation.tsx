import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, VStack, Divider } from '@chakra-ui/react';

const HushhAlphaFund = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h1" size="xl" mb={4} color="teal.300">
        Hushh Technologies Alpha Fund, LP
      </Heading>
      <Text mb={4}>Understanding the Different Classes of Shares & Investor FAQ</Text>

      <Heading as="h2" size="lg" color="teal.200" mb={2}>
        Understanding the Different Classes of Shares
      </Heading>

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Share Class</Th>
            <Th>Minimum Investment</Th>
            <Th>Investor Type</Th>
            <Th>Lock-Up Period</Th>
            <Th>Annual Withdrawal Limit</Th>
            <Th>Performance Fee</Th>
            <Th>Management Fee</Th>
            <Th>Special Privileges</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[
            ["Class A", "$25M+", "Institutional Investors", "12 Months", "50% of NAV", "10%", "0.75%", "Priority liquidity"],
            ["Class B", "$5M+", "Family Offices", "12 Months", "25% of NAV", "12.5%", "1.00%", "Dedicated IR"],
            ["Class C", "$1M+", "Accredited Investors", "12 Months", "15% of NAV", "15%", "1.25%", "Limited GP access"],
            ["Class D", "$250K+", "Early-Stage Investors", "18 Months", "10% of NAV", "17.5%", "1.50%", "Standard allocations"]
          ].map((row, i) => (
            <Tr key={i}>{row.map((cell, j) => <Td key={j}>{cell}</Td>)}</Tr>
          ))}
        </Tbody>
      </Table>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h2" size="lg" color="teal.200" mb={2}>
        Investor FAQ
      </Heading>
      <VStack align="start" spacing={4}>
        {["What is the Hushh Alpha & Aloha Fund Strategy?", "What does 'Sell the Wall' mean?", "How do you measure Alpha & Aloha?", "What is the fund’s maximum drawdown target?"]
          .map((q, i) => (
            <Box key={i}>
              <Text fontWeight="bold">❓ {q}</Text>
              <Text>✔ Sample answer to {q.toLowerCase()}.</Text>
            </Box>
          ))}
      </VStack>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h2" size="lg" color="teal.200" mb={2}>
        Closing Note
      </Heading>
      <Text>
        At Hushh Technologies Alpha Fund, we engineer income from the best FCF businesses. Our "Sell the Wall" strategy ensures risk-adjusted, tax-efficient, compounding income.
      </Text>
    </Box>
  );
};

export default HushhAlphaFund;

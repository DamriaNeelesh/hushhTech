import React from 'react';
import { Box, Text, Heading,Image, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import ExhibitLPAImg from '../../../components/images/management-fees.webp'
export const frontmatter = {
  title: "Hushh Technologies Alpha Fund, LP – Fee Schedule",
  publishedAt: "2025-02-03",
  description: "Detailed breakdown of management and performance-based fees for Limited Partners investing in Hushh Technologies Alpha Fund, LP.",
  category: "fund updates"
};

const FeeSchedule = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
          <Image src={ExhibitLPAImg} alt="Market Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Hushh Technologies Alpha Fund, LP – Fee Schedule
      </Heading>

      <Text fontSize="lg" mb={4}>Effective Date: 2025-02-03</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>1. Management & Performance Fee Structure</Heading>
      <Text>The Fund charges a management fee for operational expenses and a performance fee based on net new profits. Fees vary by LP Class.</Text>
      
      <Heading as="h4" size="md" color="teal.100" mb={2}>1.1 Summary of Fees by Class</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Class A (Institutional LPs):</strong> Minimum Investment: $25M | Management Fee: 1.50% | Performance Fee: 20%</ListItem>
        <ListItem><strong>Class B (HNW & Family Offices):</strong> Minimum Investment: $5M | Management Fee: 1.75% | Performance Fee: 22.5%</ListItem>
        <ListItem><strong>Class C (Accredited LPs):</strong> Minimum Investment: $1M | Management Fee: 2.00% | Performance Fee: 25%</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>2. Fee Breakdown & Calculation Methodology</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Management Fee:</strong> Charged quarterly based on AUM.</ListItem>
        <ListItem><strong>Performance Fee:</strong> Applied annually, only on new profits above the high-water mark.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>3. Additional Fees & Expense Allocations</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Trading & Execution Costs:</strong> Competitive brokerage rates applied.</ListItem>
        <ListItem><strong>Legal & Compliance Costs:</strong> SEC, CFTC, and state-level compliance expenses prorated across LPs.</ListItem>
        <ListItem><strong>Technology & AI Infrastructure:</strong> Costs covered by management fees.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>4. Redemption & Early Exit Fees</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Class A:</strong> No redemption fees (subject to lock-up period).</ListItem>
        <ListItem><strong>Class B & C:</strong> Redemptions above 20% of NAV per quarter may incur a 1.0% liquidity surcharge.</ListItem>
        <ListItem><strong>Early Exit Fees:</strong>
          <List pl={4}>
            <ListItem>Class A: 1.5% penalty.</ListItem>
            <ListItem>Class B: 2.0% penalty.</ListItem>
            <ListItem>Class C: 3.0% penalty.</ListItem>
          </List>
        </ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>5. Summary</Heading>
      <Text>The Hushh Technologies Alpha Fund employs a transparent fee structure focused on long-term value creation and investor alignment.</Text>
    </Box>
  );
};

export default FeeSchedule;

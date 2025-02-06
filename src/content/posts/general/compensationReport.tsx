import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, VStack } from '@chakra-ui/react';

const CompensationReport = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Comprehensive Report on Compensation Patterns in Pune, Maharashtra
      </Heading>

      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg">Overview</Heading>
          <Text>
            This report provides detailed insights into compensation patterns for young professionals in Pune, focusing on bachelor’s, master’s, and PhD graduates. It also outlines internship and contractor compensation levels, emphasizing candidates skilled in science, creativity, engineering, storytelling, and product development.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Compensation Philosophy</Heading>
          <Text>
            Hushh’s approach to compensation prioritizes a competitive yet sustainable structure:
          </Text>
          <ul>
            <li>Low Base, High Variable Model: Interns and early-career hires start with modest base pay, supplemented by performance bonuses and equity grants.</li>
            <li>Equity Ownership for High Performers: Equity is granted at par value (₹83 per share) to incentivize long-term commitment.</li>
            <li>Merit-Based Adjustments: Regular performance reviews ensure that exceptional contributors move rapidly through pay bands.</li>
          </ul>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Salary and Stipend Ranges (INR)</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Role</Th>
                <Th>Stipend/Salary (INR)</Th>
                <Th>Responsibilities</Th>
                <Th>Equity</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>High School Interns</Td>
                <Td>₹5,000–₹10,000/month</Td>
                <Td>Basic project assistance, introductory coding tasks, data collection</Td>
                <Td>None</Td>
              </Tr>
              <Tr>
                <Td>Bachelor’s Degree Interns</Td>
                <Td>₹15,000–₹30,000/month</Td>
                <Td>Entry-level coding, data analysis, minor project contributions</Td>
                <Td>5,000–10,000 shares</Td>
              </Tr>
              <Tr>
                <Td>Master’s Degree Interns</Td>
                <Td>₹25,000–₹50,000/month</Td>
                <Td>Advanced coding, prototype development, data modeling</Td>
                <Td>10,000–15,000 shares</Td>
              </Tr>
              <Tr>
                <Td>PhD Interns</Td>
                <Td>₹50,000–₹75,000/month</Td>
                <Td>Cutting-edge research, AI/ML model development</Td>
                <Td>15,000–20,000 shares</Td>
              </Tr>
              <Tr>
                <Td>Entry-Level Full-Time</Td>
                <Td>₹600,000–₹1,200,000/year</Td>
                <Td>Core product engineering, data pipelines</Td>
                <Td>15,000–25,000 shares</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Implementation Plan</Heading>
          <ul>
            <li>Data Updates: Regular market analysis to ensure competitiveness.</li>
            <li>Performance Reviews: Bi-annual reviews to adjust compensation.</li>
            <li>Equity Vesting: Four-year vesting schedule for equity grants.</li>
            <li>Transparency: Open communication of pay ranges within the company.</li>
          </ul>
        </Box>
      </VStack>
    </Box>
  );
};

export default CompensationReport;

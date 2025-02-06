import React from 'react';
import { Box, Heading,Image, Text, Table, Thead, Tbody, Tr, Th, Td, Divider } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/ecommerce.webp'

export const frontmatter = {
  title: "AI-First E-Commerce Solution for UAE Small Merchants",
  publishedAt: "2025-02-06",
  description: "A cost-efficient, AI-powered, scalable e-commerce solution for small merchants in the UAE.",
  category: "ecommerce"
};

const AIEcommerceBudget: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
                          <Image src={MarketUpdate} alt="Funds Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Realistic AI-First E-Commerce Solution for UAE Small Merchants
      </Heading>

      <Text mb={4}>
        For a small merchant in the UAE with 150,000 users and an average purchase price of AED 800,
        we provide a cost-efficient, AI-powered, scalable solution.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Best AI-Powered E-Commerce Platforms</Heading>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Platform</Th>
            <Th>Best For</Th>
            <Th>AI Features</Th>
            <Th>Cost (AED/Month)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Shopify Basic + AI Plugins</Td>
            <Td>Small stores, easy setup</Td>
            <Td>AI chatbots, AI marketing tools</Td>
            <Td>120 – 500 + Plugins</Td>
          </Tr>
          <Tr>
            <Td>NexMind Commerce</Td>
            <Td>AI-powered small business eCommerce</Td>
            <Td>AI SEO, AI recommendations</Td>
            <Td>1,500 – 3,500</Td>
          </Tr>
          <Tr>
            <Td>Fabric Commerce</Td>
            <Td>AI-first mid-sized eCommerce</Td>
            <Td>AI pricing, AI inventory</Td>
            <Td>2,000 – 5,500</Td>
          </Tr>
          <Tr>
            <Td>WooCommerce + AI Add-ons</Td>
            <Td>Custom open-source solution</Td>
            <Td>AI-powered search, automation</Td>
            <Td>500 – 1,500</Td>
          </Tr>
        </Tbody>
      </Table>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Estimated Budget for Small UAE Merchant</Heading>
      <Text mb={2}>Expected Order Volume: 5,000 – 15,000 orders/month</Text>
      <Text mb={4}>Expected GMV: AED 4M – 12M/month</Text>

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Component</Th>
            <Th>Cost (AED 🇦🇪)</Th>
            <Th>Cost (INR 🇮🇳)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Website & Storefront Setup</Td>
            <Td>10,000 – 35,000</Td>
            <Td>1,50,000 – 4,50,000</Td>
          </Tr>
          <Tr>
            <Td>AI Product Recommendations</Td>
            <Td>5,000 – 15,000</Td>
            <Td>75,000 – 2,00,000</Td>
          </Tr>
          <Tr>
            <Td>AI SEO & Marketing Automation</Td>
            <Td>5,000 – 20,000</Td>
            <Td>75,000 – 2,50,000</Td>
          </Tr>
        </Tbody>
      </Table>

      <Text mt={4}>
        ✅ Best for Low Cost & Easy Setup → Shopify Basic + AI Plugins<br />
        ✅ Best for AI-Driven Store with Growth Potential → NexMind Commerce<br />
        ✅ Best for Scalable AI Inventory & Logistics → Fabric Commerce<br />
        ✅ Best for Full Control & Cost Savings → WooCommerce + AI Add-ons
      </Text>
    </Box>
  );
};

export default AIEcommerceBudget;

import React from 'react';
import { Box, Text,Image, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';
import ExhibitLPAImg from '../../../components/images/exhibitLPA.webp' 
export const frontmatter = {
  title: "Exhibit A: Limited Partnership Agreement (LPA) of Hushh Technologies Alpha Fund, LP",
  publishedAt: "2025-02-03",
  description: "Institutional-grade, SEC-compliant investment framework for Hushh Technologies Alpha Fund, LP.",
  category: 'investor relations & strategies',
};

const ExhibitLPA = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
    <Image src={ExhibitLPAImg} alt="Market Update" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Exhibit A: Limited Partnership Agreement (LPA) of Hushh Technologies Alpha Fund, LP
      </Heading>

      <Text fontSize="lg" mb={4}>Institutional-Grade | SEC Compliant | Investor-Centric Framework</Text>
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article I - Formation of the Limited Partnership</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>1.1 Name and Principal Office:</strong> The fund is named Hushh Technologies Alpha Fund, LP, with its principal office in Kirkland, WA, USA.</ListItem>
        <ListItem><strong>1.2 Formation & Compliance:</strong> Formed under Delaware law, registered in Washington State, and compliant with SEC and CFTC regulations.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article II - Investment Objective & Strategy</Heading>
      <Text>The Fund’s core strategy focuses on generating sustainable, risk-adjusted returns from top Free Cash Flow (FCF) businesses.</Text>
      <List spacing={2} pl={4}>
        <ListItem><strong>Sell the Wall:</strong> Covered calls & puts on FCF stocks using AI-driven execution.</ListItem>
        <ListItem><strong>Alpha Machine:</strong> Multi-layered options overlays for dividend-enhancing strategies.</ListItem>
        <ListItem><strong>Tesla Protocol:</strong> AI-based hedging against macroeconomic volatility.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article III - Capital Contributions & Class Structure</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>3.1 Investor Class Tiers:</strong>
          <List pl={4}>
            <ListItem>🔹 Class A (Institutional): $25M+ investment, 12-month lock-up.</ListItem>
            <ListItem>🔹 Class B (HNW & Family Offices): $5M investment, 6-month lock-up.</ListItem>
            <ListItem>🔹 Class C (Accredited LPs): $1M investment, 3-month lock-up.</ListItem>
          </List>
        </ListItem>
        <ListItem><strong>3.2 Capital Commitment Process:</strong> Requires a subscription agreement and wired contributions within 5 days.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article IV - Management & Fees</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>4.1 General Partner & Key Roles:</strong> Managed by Hushh Technologies Fund Management LLC.</ListItem>
        <ListItem><strong>4.2 Fee Structure:</strong>
          <List pl={4}>
            <ListItem>Management Fee: 1.50% AUM annually.</ListItem>
            <ListItem>Performance Fee: 20% on Net New Profits (7.5% hurdle rate).</ListItem>
          </List>
        </ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article V - Risk Management</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Max Drawdown:</strong> Limited to S&P 500 ± 15% at all times.</ListItem>
        <ListItem><strong>Liquidity Management:</strong> 50% of assets in highly liquid positions.</ListItem>
      </List>
      
      <Divider my={4} borderColor="teal.500" />
      
      <Heading as="h3" size="lg" color="teal.200" mb={4}>Article VI - NAV Reporting & Fund Transparency</Heading>
      <Text>Daily NAV calculation, weekly reports, and quarterly performance reports available via secured portal.</Text>
    </Box>
  );
};

export default ExhibitLPA;

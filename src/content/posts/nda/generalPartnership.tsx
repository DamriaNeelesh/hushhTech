import React from 'react';
import { Box, Text, Heading,Image, List, ListItem, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';


const GeneralPartnershipAgreement = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
    <Image src={AlphaAlohaImg} alt="General Parnetship Agreement" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        GENERAL PARTNERSHIP AGREEMENT (GPA)
      </Heading>
      <Text fontSize="lg" mb={4}>
        OF 🤫 Hushh AI Technologies and Computers Trading LLC
      </Text>
      <Text mb={4}>
        (A General Partnership under the Laws of Abu Dhabi Global Market (ADGM))
      </Text>
      <Text mb={4}>
        This General Partnership Agreement (“Agreement”) is made and entered into as of [Effective Date], by and between:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>1. Hushh AI Technologies and Computers Trading LLC, a Limited Liability Company incorporated under ADGM, acting as the Managing General Partner (“GP”);</ListItem>
        <ListItem>2. Additional General Partners (“GPs”), collectively referred to as “Partners”.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        1. FORMATION AND PURPOSE
      </Heading>
      <Text mb={4}>
        <strong>1.1 Formation of the General Partnership</strong>
      </Text>
      <Text mb={4}>
        The Partnership is formed as a General Partnership under ADGM laws, allowing Hushh AI Technologies and Computers Trading LLC to oversee all investment, trading, and AI-driven initiatives in a decentralized and aligned manner with multiple General Partners.
      </Text>
      <Text mb={4}>
        <strong>1.2 Business Purpose</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Developing proprietary AI-driven investment strategies such as “Sell the Wall.”</ListItem>
        <ListItem>• Executing systematic risk-adjusted investment programs (options, derivatives, structured finance).</ListItem>
        <ListItem>• Leveraging ML, big data, and predictive analytics to optimize investment allocation.</ListItem>
        <ListItem>• Ensuring regulatory compliance and transparency across ADGM, UAE, SEC, and global jurisdictions.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        2. PARTNER ROLES & CAPITAL STRUCTURE
      </Heading>
      <Text mb={4}>
        <strong>2.1 General Partners</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Each General Partner (GP) plays a strategic role in managing operations, investment execution, and technology development.</ListItem>
        <List spacing={2} pl={4}>
          <ListItem>• Managing General Partner (MGP): Hushh AI Technologies and Computers Trading LLC holds primary control over strategic direction and execution.</ListItem>
          <ListItem>• Operating General Partners (OGPs): Contribute capital, expertise, or strategic market access.</ListItem>
        </List>
      </List>
      <Text mb={4}>
        <strong>2.2 Capital Contributions</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Partners may contribute cash, intellectual property, operational expertise, or technological infrastructure.</ListItem>
        <ListItem>• The Managing GP retains a minimum controlling stake (≥51%).</ListItem>
        <ListItem>• Contributions determine profit-sharing ratios and voting power.</ListItem>
      </List>
      <Text mb={4}>
        <strong>2.3 Profit and Loss Allocation</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Profits and losses are distributed based on ownership stakes.</ListItem>
        <ListItem>• MGP retains a management and performance-based allocation (15-25%).</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        3. MANAGEMENT, GOVERNANCE, AND DECISION-MAKING
      </Heading>
      <Text mb={4}>
        <strong>3.1 Authority of the Managing General Partner</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• The Managing GP retains exclusive operational and investment decision-making power.</ListItem>
        <ListItem>• OGPs provide advisory input but do not interfere in day-to-day execution.</ListItem>
      </List>
      <Text mb={4}>
        <strong>3.2 Voting Rights</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Major strategic decisions (M&A, liquidity events, expansion plans) require a 75% consensus vote among GPs.</ListItem>
        <ListItem>• Routine investment decisions and trade execution remain under MGP authority.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        4. ECONOMIC TERMS & COMPENSATION STRUCTURE
      </Heading>
      <Text mb={4}>
        <strong>4.1 Revenue Share Model</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• GPs receive a proportional share of net income from executed strategies.</ListItem>
        <ListItem>• MGP reserves the right to reinvest earnings for fund growth.</ListItem>
      </List>
      <Text mb={4}>
        <strong>4.2 Performance-Based Incentives</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• High-performing GPs receive bonus equity stakes and profit participation.</ListItem>
        <ListItem>• Performance fees (15-25%) apply post-hurdle rate (8-12%).</ListItem>
      </List>
      <Text mb={4}>
        <strong>4.3 Management Fees</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• MGP charges management fees (1-1.5%) to cover operational expenses.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        5. LEGAL, REGULATORY, AND COMPLIANCE
      </Heading>
      <Text mb={4}>
        <strong>5.1 Compliance & Regulatory Adherence</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• The partnership adheres to ADGM, UAE Central Bank, SEC, and global financial regulations.</ListItem>
        <ListItem>• AML (Anti-Money Laundering) and KYC (Know Your Customer) policies are strictly enforced.</ListItem>
      </List>
      <Text mb={4}>
        <strong>5.2 Confidentiality & Non-Compete</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• GPs must maintain strict confidentiality regarding proprietary investment strategies.</ListItem>
        <ListItem>• A non-compete clause prevents participation in rival funds for 5 years post-exit.</ListItem>
      </List>
      <Text mb={4}>
        <strong>5.3 Dispute Resolution</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• ADGM arbitration applies in case of disputes.</ListItem>
        <ListItem>• Legal proceedings may only be initiated in ADGM courts.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        6. EXIT STRATEGY & DISSOLUTION
      </Heading>
      <Text mb={4}>
        <strong>6.1 Liquidity Events & Buyouts</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• GPs may exit via structured buyouts or secondary sales.</ListItem>
        <ListItem>• The Managing GP has the right to acquire an exiting GP’s stake at fair market valuation.</ListItem>
      </List>
      <Text mb={4}>
        <strong>6.2 Dissolution Conditions</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>The General Partnership may be dissolved if:</ListItem>
        <List spacing={2} pl={4}>
          <ListItem>1. MGP elects dissolution due to regulatory or financial challenges.</ListItem>
          <ListItem>2. ≥75% of GPs vote for dissolution.</ListItem>
          <ListItem>3. Market conditions make operations unsustainable.</ListItem>
        </List>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        7. EXECUTION
      </Heading>
      <Text mb={4}>
        IN WITNESS WHEREOF, the Managing General Partner and General Partners have executed this Agreement as of the Effective Date.
      </Text>
      <Text mb={4}>
        📌 For Hushh AI Technologies and Computers Trading LLC (Managing GP):
      </Text>
      <Text mb={4}>
        Signature: _______________________<br />
        Name: Manish Sainani<br />
        Title: Founder & CEO
      </Text>
      <Text mb={4}>
        📌 For General Partner:<br />
        Signature: _______________________<br />
        Name: ___________________________<br />
        Equity Stake: ______%
      </Text>
      <Text mb={4}>
        Key Highlights:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>✔ Founder-friendly structure – MGP maintains control over execution.</ListItem>
        <ListItem>✔ Defined equity model – aligns incentives while ensuring centralized leadership.</ListItem>
        <ListItem>✔ Clear economic terms – revenue-sharing, performance fees, and hurdle rates structured.</ListItem>
        <ListItem>✔ Regulatory-first approach – ensures full ADGM, UAE, and SEC compliance.</ListItem>
        <ListItem>✔ Scalable investment framework – AI-powered trading, quant strategies, and risk-optimized alpha generation.</ListItem>
      </List>
      <Text mt={4} fontSize="sm" color="gray.500">
        This GPA serves as a legally sound governance framework, aligning all General Partners under a shared, scalable, and AI-driven investment strategy. 🚀
      </Text>
    </Box>
  );
};

export default GeneralPartnershipAgreement;
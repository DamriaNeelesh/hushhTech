import React from 'react';
import { Box, Text, Heading, List, ListItem, Image } from '@chakra-ui/react';
import SellImg from '../../../components/images/blog2o.png'

const InvestorAccreditationCertificate = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={SellImg} alt="Investor Accreditation" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Investor Accreditation Certificate
      </Heading>
      <Text fontSize="lg" mb={4}>
        HushOne, Inc. (Hushh Technologies LLC – US Parent Holding Company)
      </Text>
      <Text mb={4}>
        Date Issued: [Insert Date]
      </Text>
      <Text mb={4}>
        Investor Name: [Investor Full Name]
      </Text>
      <Text mb={4}>
        Investor Entity (if applicable): [Entity Name]
      </Text>
      <Text mb={4}>
        Investor Address: [Investor Address]
      </Text>
      <Text mb={4}>
        Investor Email: [Investor Email]
      </Text>
      <Text mb={4}>
        Investor Type: [Accredited Individual / Institutional Investor / Family Office / Other]
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        1. Certification of Accredited Investor Status
      </Heading>
      <Text mb={4}>
        The undersigned investor hereby certifies that they qualify as an Accredited Investor under the U.S. Securities Act of 1933, Regulation D, and applicable international securities regulations based on the following criteria (check all that apply):
      </Text>
      <Text mb={4}>
        For Individual Investors:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>☐ High Net Worth Individual: Net worth exceeds $1,000,000 (excluding primary residence).</ListItem>
        <ListItem>☐ High-Income Individual: Earned income exceeding $200,000 (or $300,000 with spouse) in each of the past two years and expects the same in the current year.</ListItem>
        <ListItem>☐ Knowledgeable Professional: Holds valid Series 7, Series 65, or Series 82 license.</ListItem>
        <ListItem>☐ Family Office Executive: Directly responsible for financial investment decisions of a qualifying family office.</ListItem>
      </List>
      <Text mb={4}>
        For Institutional Investors:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>☐ Corporation / LLC / Partnership: Entity has total assets exceeding $5,000,000 and was not formed for the purpose of acquiring this investment.</ListItem>
        <ListItem>☐ Family Office: A family office with over $5,000,000 in assets under management.</ListItem>
        <ListItem>☐ Bank / Investment Company / Insurance Firm: A financial institution registered with a recognized regulatory body.</ListItem>
        <ListItem>☐ Other Qualified Institutional Buyer (QIB): Meets the SEC Rule 144A definition of a Qualified Institutional Buyer.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        2. Investment Representations
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>1. Investment Risk: This investment is high-risk and illiquid, with no guarantee of returns.</ListItem>
        <ListItem>2. No Public Market: Securities offered by HushOne, Inc. are private and non-tradable until a liquidity event occurs.</ListItem>
        <ListItem>3. Due Diligence Responsibility: The Investor has conducted independent due diligence and understands the business, risks, and terms.</ListItem>
        <ListItem>4. No Resale Without Compliance: Securities cannot be resold unless in full compliance with securities laws.</ListItem>
        <ListItem>5. No Influence on Business Operations: The Investor does not have voting or decision-making rights unless otherwise specified.</ListItem>
        <ListItem>6. Compliance with Laws: The Investor meets all regulatory and legal requirements to participate in this offering.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        3. Investor Acknowledgment & Signature
      </Heading>
      <Text mb={4}>
        I, the undersigned, certify that the information provided is accurate, complete, and true to the best of my knowledge. I understand the risks and limitations associated with investing in HushOne, Inc. and agree to comply with all applicable securities laws and regulations.
      </Text>
      <Text mb={4}>
        Investor Name: [Investor Full Name]
      </Text>
      <Text mb={4}>
        Investor Signature: __________________________
      </Text>
      <Text mb={4}>
        Date Signed: [Insert Date]
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        4. Issuer Verification
      </Heading>
      <Text mb={4}>
        This certificate is issued by HushOne, Inc. (Hushh Technologies LLC – US Parent Holding Company) to confirm the investor’s accreditation status for participation in private securities offerings.
      </Text>
      <Text mb={4}>
        Authorized Representative:
      </Text>
      <Text mb={4}>
        HushOne, Inc.<br />
        By: [Founder/CEO Name]<br />
        Title: Founder & CEO<br />
        Date: [Insert Date]
      </Text>
      <Text mt={4} fontSize="sm" color="gray.500">
        🚀 Welcome to the future of investing with HushOne, Inc. – where accredited investors and visionaries create the next era of financial innovation.
      </Text>
    </Box>
  );
};

export default InvestorAccreditationCertificate;
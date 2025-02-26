import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

const SafeNote = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        SAFE (Simple Agreement for Future Equity)
      </Heading>
      <Text fontSize="lg" mb={4}>
        Friends & Family Round
      </Text>
      <Text fontSize="lg" mb={4}>
        Hushh AI Technologies and Computers Trading LLC
      </Text>
      <Text fontSize="md" mb={4}>
        This SAFE Note (“Agreement”) is made as of [DATE], by and between Hushh AI Technologies and Computers Trading LLC, a company incorporated in ADGM/UAE/USA (or applicable jurisdiction) (the “Company”), and the investor listed in the signature section below (the “Investor”).
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        1. Investment Terms
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>• Minimum Investment: $25,000 USD</ListItem>
        <ListItem>• Valuation Cap: $[TBD] (To be determined based on fair valuation)</ListItem>
        <ListItem>• Discount Rate: 15% (Investors receive a discount on the next financing round price)</ListItem>
        <ListItem>• Maturity Date: [TBD, typically 24-36 months]</ListItem>
        <ListItem>• Conversion Event: Converts to preferred equity at the next Qualified Financing Round of at least $[TBD] million</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        2. Conversion Mechanics
      </Heading>
      <Text fontSize="md" mb={4}>
        Upon the next equity financing, this SAFE automatically converts into preferred shares at the lower of:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>(a) The valuation cap divided by the company’s pre-money valuation per share, OR</ListItem>
        <ListItem>(b) The discounted price (i.e., 15% discount to the next round valuation per share).</ListItem>
      </List>
      <Text fontSize="md" mb={4}>
        If no equity financing occurs before maturity, investors can either:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Convert at the valuation cap price</ListItem>
        <ListItem>• Receive a cash settlement option (subject to board discretion)</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        3. Investor Rights & Protections
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>✅ Pro-Rata Rights: Investor may invest additional funds in future rounds to maintain equity position.</ListItem>
        <ListItem>✅ MFN Clause (Most Favored Nation): If the Company offers better SAFE terms to future investors, these terms will apply retroactively.</ListItem>
        <ListItem>✅ No Voting Rights: SAFE holders do not have board or voting rights until conversion to equity.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        4. No Debt, No Dividends
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>This SAFE is not debt—it only converts into equity.</ListItem>
        <ListItem>• No repayment obligations.</ListItem>
        <ListItem>• No interest accrues.</ListItem>
        <ListItem>• No dividends before conversion.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        5. Founders’ Control & Governance
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>✅ Board Control: Founders maintain full control until an institutional investment event.</ListItem>
        <ListItem>✅ No Drag-Along: SAFE investors cannot force a sale, merger, or IPO.</ListItem>
        <ListItem>✅ Founder Equity Protection: No dilution beyond planned funding rounds.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        6. Transferability & Exit Options
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>🚫 Non-transferable: Investors cannot sell or assign this SAFE without company approval.</ListItem>
        <ListItem>🔓 Liquidity Event Clause: If the Company is acquired or IPOs before SAFE conversion, investors receive the greater of:</ListItem>
        <List spacing={2} pl={4}>
          <ListItem>(a) 2x their investment, OR</ListItem>
          <ListItem>(b) Their converted shares’ fair market value</ListItem>
        </List>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        7. Representations & Acknowledgments
      </Heading>
      <Text fontSize="md" mb={4}>
        By signing, the Investor confirms they are an accredited investor (as per SEC/ADGM/UAE laws) and understands the risks of investing in an early-stage venture.
      </Text>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        8. Miscellaneous
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>📜 Jurisdiction: This Agreement is governed by the laws of [ADGM/UAE/USA].</ListItem>
        <ListItem>🛑 Entire Agreement: This SAFE constitutes the entire agreement between parties and supersedes any prior agreements.</ListItem>
        <ListItem>⚖️ Amendments: Any changes must be agreed upon in writing by both parties.</ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        SIGNATURES
      </Heading>
      <Text fontSize="md" mb={4}>
        Company: Hushh AI Technologies and Computers Trading LLC
      </Text>
      <Text fontSize="md" mb={4}>
        By: ________________________<br />
        Manish Sainani, Founder & CEO<br />
        Date: [DATE]
      </Text>
      <Text fontSize="md" mb={4}>
        Investor: [Investor Name]<br />
        Investment Amount: $[AMOUNT]<br />
        Signature: ________________________<br />
        Date: [DATE]
      </Text>
    </Box>
  );
};

export default SafeNote;
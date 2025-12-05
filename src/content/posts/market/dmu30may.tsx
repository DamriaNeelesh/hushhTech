import React from 'react';
import { Box, Divider, Text, VStack, Heading, Table, Tbody, Tr, Td, TableContainer, HStack, Icon } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';
import { FiCheckSquare } from 'react-icons/fi';

const dmu30may = () => {
  return (
    <Box fontFamily="'Inter', sans-serif" color={'black'} maxW="4xl" mx="auto" p={5}>
      <Heading as="h1" fontSize={{md:"2xl",base:'xl'}} fontWeight="500" mb={6} textAlign="center">
        HUSSH Renaissance AI First Fund A
      </Heading>
      <Text fontWeight="500" fontSize={{md:"xl",base:'lg'}} textAlign="center" mb={2}>
        Daily Market & Execution Memo
      </Text>
      <Text textAlign="center" mb={2}>Date: May 30, 2025</Text>
      <Text textAlign="center" fontWeight="500" fontSize={{md:"lg",base:'md'}} mb={6}>
        "From GOOG to Great: How One Position Became the Foundation of a Machine for Alpha, 
        Aloha, and Ownership."
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Origin Story: 32,727 Shares of GOOG → Multi-Strategy Platform
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        On April 1, 2024, we launched HUSSH Fund A with 32,727 shares of GOOGL Class C as our 
        founding asset.
      </Text>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        We didn't diversify blindly. We didn't chase returns.
      </Text>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        We did what disciplined investors do—we turned one great asset into a flywheel:
      </Text>
      <VStack align="start" spacing={2} pl={5} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Text>● A delta-neutral, machine-augmented investment system</Text>
        <Text>● Monetizing implied volatility daily (Aloha)</Text>
        <Text>● Allocating capital only into high free cash flow growth equities (Alpha)</Text>
        <Text>● Occasionally swinging for the fences (Ultra)</Text>
      </VStack>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}   >
        Now, our Alpha 27, Aloha 27, and Ultra 27 portfolios work in tandem to grow capital, reduce risk, 
        and increase share ownership over time—without tax drag, portfolio churn, or dilution.
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Daily Highlights
      </Heading>
      <VStack align="start" spacing={2} pl={5} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Text>● Net Liquidating Value (NLV): $4,395,203.83</Text>
        <Text>● Total Market Value (Gross): $9,149,481.45</Text>
        <Text>● Cash & Sweep: $3.33M</Text>
        <Text>● Margin Equity: $8.80M</Text>
        <Text>● Option Buying Power: ($345K)</Text>
        <Text>● Day's Net P/L: +$26,219.84</Text>
        <Text>● Delta Position: Maintained &lt;1% net exposure</Text>
        <Text>● Margin Usage: Conservative, with all leverage supported by blue-chip equity</Text>
      </VStack>
      <Text mb={6} fontWeight="medium" fontStyle="italic" fontSize={{md:'md',base:'sm'}}>
        We're not guessing direction. We're monetizing fear, greed, and complacency—every single day.
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Strategy Execution Notes
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Aloha 27 – Daily Premium Engine</Text>
          </HStack>
          <VStack align="start" spacing={2} pl={10} fontSize={{md:'md',base:'sm'}}>
            <Text>● "Sell the Wall" hit again today across AAPL, BRK.B, TSLA.</Text>
            <Text>● Premium was harvested safely, outside gamma clusters.</Text>
            <Text>● Cash is already earmarked for share accumulation next cycle.</Text>
          </VStack>
        </Box>
        
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Alpha 27 – Core Compounding</Text>
          </HStack>
          <VStack align="start" spacing={2} pl={10} fontSize={{md:'md',base:'sm'}}>
            <Text>● AAPL, AMZN, GOOGL, BRK.B: still compounding intrinsic value.</Text>
            <Text>● Proceeds from Aloha are increasing share count—every week.</Text>
            <Text>● We don't trade them. We collect from them and accumulate more.</Text>
          </VStack>
        </Box>
        
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Ultra 27 – Asymmetric Alpha</Text>
          </HStack>
          <VStack align="start" spacing={2} pl={10} fontSize={{md:'md',base:'sm'}}>
            <Text>● Initiated new AI infrastructure trades via calls/synthetics.</Text>
            <Text>● Risk-budgeted and gold-backed; delta-hedged on entry.</Text>
            <Text>● Targeting 3–5x asymmetry from modeled events.</Text>
          </VStack>
        </Box>
      </VStack>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Portfolio Philosophy
      </Heading>
      <Text mb={2} fontSize={{md:'md',base:'sm'}}>We don't run a strategy. We run a system.</Text>
      <Text mb={2} fontSize={{md:'md',base:'sm'}}>Everything we own is marginable.</Text>
      <Text mb={2} fontSize={{md:'md',base:'sm'}}>Everything we write is monetizable.</Text>
      <Text mb={2} fontSize={{md:'md',base:'sm'}}>Every position must either throw off cash or serve as collateral.</Text>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>This is a compounding machine—not a hedge fund hobby.</Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Asset Book Snapshot (Select Positions)
      </Heading>
      <TableContainer mb={6}>
        <Table variant="simple" size="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="500">Ticker</Td>
              <Td fontWeight="500">Position Value</Td>
              <Td fontWeight="500">Day P/L</Td>
              <Td fontWeight="500">Delta</Td>
              <Td fontWeight="500">Note</Td>
            </Tr>
            <Tr>
              <Td>AAPL</Td>
              <Td>$2.99M</Td>
              <Td>+$13.8K</Td>
              <Td>9,831</Td>
              <Td>Core anchor</Td>
            </Tr>
            <Tr>
              <Td>NVDA</Td>
              <Td>$1.83M</Td>
              <Td>-$17.1K</Td>
              <Td>7,276</Td>
              <Td>Volatility adjustment</Td>
            </Tr>
            <Tr>
              <Td>AMZN</Td>
              <Td>$1.29M</Td>
              <Td>+$3.9K</Td>
              <Td>969</Td>
              <Td>Rolled into new put spread</Td>
            </Tr>
            <Tr>
              <Td>BRK/B</Td>
              <Td>$824K</Td>
              <Td>+$4.9K</Td>
              <Td>-311</Td>
              <Td>Net neutral post-roll</Td>
            </Tr>
            <Tr>
              <Td>TSLA</Td>
              <Td>$618K</Td>
              <Td>+$29K</Td>
              <Td>-1,996</Td>
              <Td>Aloha windfall</Td>
            </Tr>
            <Tr>
              <Td>META</Td>
              <Td>$609K</Td>
              <Td>-$247</Td>
              <Td>-694</Td>
              <Td>Trimmed on spike</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text mb={6} fontWeight="medium">
        We care more about share count than share price. Every roll and premium deposit brings us closer to owning more.
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Real Performance (Reference)
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>Verified realized gain data (audited where applicable):</Text>
      <VStack align="start" spacing={2} pl={5} mb={4} fontSize={{md:'md',base:'sm'}}>
        <Text>● Realized Gains (Since Launch): $9.8M</Text>
        <Text>● Net P/L: +$5.64M</Text>
        <Text>● Gain/Loss Ratio: ~70%</Text>
        <Text>● Avg Gain vs. Loss: +14.04% / -6.51%</Text>
        <Text>● Win Rate: ~90% over 10,000+ trades</Text>
      </VStack>
      <Text mb={2} fontSize={{md:'md',base:'sm'}}>This isn't a streak. It's the system working.</Text>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>We focus on repeatability, not razzle-dazzle.</Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Risk Management
      </Heading>
      <VStack align="start" spacing={2} pl={5} mb={4} fontSize={{md:'md',base:'sm'}}>
        <Text>● Net Delta Exposure: ~0</Text>
        <Text>● Margin Usage: ~35%, tightly managed</Text>
        <Text>● Short Book: $1.77M – structured and risk-neutral</Text>
        <Text>● Cash on Hand: $3.33M – ready for opportunity</Text>
        <Text>● Maintenance Headroom: $1.62M over trigger</Text>
      </VStack>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>
        Leverage is only used when we're getting paid to use it. And only when we have premium offsets in place.
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        LP Takeaways
      </Heading>
      <VStack align="start" spacing={2} pl={5} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Text>1. We're Growing Share Counts: Our holdings are rising because we're reinvesting daily income.</Text>
        <Text>2. We're Staying Delta-Neutral: This isn't a directional bet. It's a monetization engine.</Text>
        <Text>3. Every Asset Earns Its Keep: No lazy capital. No idling stocks.</Text>
        <Text>4. We Respect Risk: Our cash buffer and margin strategy ensures durability, not drama.</Text>
      </VStack>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}}    fontWeight="500" mb={4}>
        Final Thought
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>We turned a single GOOG position into a precision-built platform that:</Text>
      <VStack align="start" spacing={2} pl={5} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Text>● Owns what matters</Text>
        <Text>● Sells what's overvalued</Text>
        <Text>● Increases share count daily</Text>
        <Text>● Defends capital</Text>
        <Text>● Compounds alpha + aloha in concert</Text>
      </VStack>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>We'll keep doing that—with your trust and our conviction.</Text>

      <Text mb={2} fontSize={{md:'md',base:'sm'}}>With gratitude and clarity,</Text>
      <Text fontWeight="500" mb={1} fontSize={{md:'md',base:'sm'}}>Manish</Text>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>Managing Partner</Text>
      
      <Text fontWeight="500" mb={2} fontSize={{md:'md',base:'sm'}}>HUSSH Fund A | Renaissance AI First Fund</Text>
      
      <Text fontStyle="italic" textAlign="center" mt={8} mb={4} fontSize={{md:'md',base:'sm'}}  >Confidential</Text>

      <Divider my={4} borderColor="black" />

      {/* <MarketUpdateGallery 
        date="dmu30may" 
        title="Supporting Charts & Data"
      /> */}
    </Box>
  );
};

export default dmu30may;
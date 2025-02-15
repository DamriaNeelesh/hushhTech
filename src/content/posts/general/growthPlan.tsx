import React from 'react';
import { Box, Heading,Image, Text, VStack, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/fundsStanding.png';

export const frontmatter = {
  title: "A Realistic Growth Plan for Hushh Alpha Fund",
  date: "2025-02-14",
  description: 'A comprehensive growth plan for scaling the Hushh Alpha Fund to $1B AUM with sustainable, cash flow-driven alpha.',
  author: "Internal Team",
  tags: ["growth plan", "investment strategy", "AUM", "institutional credibility"],
  category: "investment strategy"
};

const HushhAlphaFundGrowthPlan: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
        {/* <Image src={AlphaAlohaImg}  alt=''/> */}
        <Image src={AlphaAlohaImg} alt="Funds Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        A Realistic Growth Plan for Hushh Alpha Fund
      </Heading>

      <Text fontSize="lg" mb={4}>
        Starting AUM (GP Risk Capital): $7.5M
        <br />
        Primary Goal: Achieve sustainable cash flow-driven alpha while scaling AUM responsibly with institutional credibility.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" size="lg" color="teal.200">Phase 1: Proof of Concept & LP Trust (0-12 Months)</Heading>
          <Text mt={2}>AUM Target: $7.5M → $50M</Text>
          <Text>Net Cash Flow Target: $150K/month → $5M/year (~1.5% weekly return)</Text>
          <Text>Max Drawdown Threshold: SPX ±15%</Text>
          <Text>LP Capital Raised: $50M ($5M minimum ticket size)</Text>
          <Text mt={2}><strong>Key Focus Areas</strong></Text>
          <Text>• Validate ‘Sell the Wall’ as a Sustainable Income Machine</Text>
          <Text>• Build Institutional Credibility</Text>
          <Text>• First LP Raise ($50M Cap Target)</Text>
          <Text mt={2}><strong>Success Looks Like:</strong></Text>
          <Text>• $50M in AUM</Text>
          <Text>• Weekly P&L growth of $1M+ in premium income</Text>
          <Text>• Strong audited Sharpe Ratio (1.8+) & Max Drawdown Control</Text>
          <Text>• Solid LP pipeline for next phase</Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" color="teal.200">Phase 2: Expansion to $250M AUM (12-36 Months)</Heading>
          <Text mt={2}>AUM Target: $50M → $250M</Text>
          <Text>Annualized Cash Flow Target: $30M+ (12-15% target net return)</Text>
          <Text>Max Drawdown Threshold: SPX ±12% (tighter risk controls)</Text>
          <Text>LP Capital Raised: $200M ($10M minimum ticket size)</Text>
          <Text mt={2}><strong>Key Focus Areas</strong></Text>
          <Text>• Scale ‘Sell the Wall’ Across Market Cycles</Text>
          <Text>• Launch Institutional Investor Access & Structured Products</Text>
          <Text>• Refine Technology & Execution</Text>
          <Text>• Second LP Raise ($250M Cap Target)</Text>
          <Text mt={2}><strong>Success Looks Like:</strong></Text>
          <Text>• $250M in AUM with $30M+ in annualized returns</Text>
          <Text>• 15-20 long-term LPs secured</Text>
          <Text>• Institutional fund registration & compliance</Text>
          <Text>• Cash Flow Scaling Without Increasing Risk Exposure</Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" color="teal.200">Phase 3: $1B Institutional Fund (36-60 Months)</Heading>
          <Text mt={2}>AUM Target: $250M → $1B</Text>
          <Text>Annualized Cash Flow Target: $120M+</Text>
          <Text>Max Drawdown Threshold: SPX ±10% (Institutional-Grade Hedging)</Text>
          <Text>LP Capital Raised: $750M ($25M+ minimum ticket size)</Text>
          <Text mt={2}><strong>Key Focus Areas</strong></Text>
          <Text>• Expand ‘Sell the Wall’ Into Market-Making & AI Trading</Text>
          <Text>• Structured Investment Vehicles for Pension & SWFs</Text>
          <Text>• Third LP Raise ($1B Cap Target)</Text>
          <Text mt={2}><strong>Success Looks Like:</strong></Text>
          <Text>• $1B AUM with stable institutional capital</Text>
          <Text>• Risk-adjusted cash flow generation exceeding $120M/year</Text>
          <Text>• Hedge Fund Positioned for Market Resilience & Growth</Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" color="teal.200">Long-Term Outlook ($5B-$10B AUM Horizon)</Heading>
          <Text mt={2}>• Expand into hedge fund market-making & systematic yield for public markets.</Text>
          <Text>• Develop structured derivative products for ultra-high-net-worth clients.</Text>
          <Text>• Scale institutional investor base with $50M+ commitments per LP.</Text>
          <Text>• Optimize AI trading & execution to maintain risk-adjusted alpha.</Text>
          <Text mt={2}><strong>The Earthy, Realistic Path to $1B+ AUM</strong></Text>
          <Text>• Phase 1: $7.5M → $50M (Prove the model, build investor trust).</Text>
          <Text>• Phase 2: $50M → $250M (Expand LP base & trading efficiency).</Text>
          <Text>• Phase 3: $250M → $1B+ (Institutional-grade execution & risk control).</Text>
          <Text>• Final Vision: A $5B-$10B fund delivering sustainable, risk-adjusted income while holding the best FCF businesses in the world.</Text>
          <Text mt={2}>“If Berkshire Hathaway and Renaissance Technologies had a baby, Hushh would be it.”</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default HushhAlphaFundGrowthPlan;
import React from 'react';
import { Box, Heading, Image, Text, VStack, Divider } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/0_Daily Market Update.jpg';

export const frontmatter = {
  title: "Aloha Alpha Fund Market & Fund Update Report",
  date: "2025-02-14",
  description: 'Internal review and investor communication for the Aloha Alpha Fund, highlighting performance and strategy updates.',
  author: "Internal Team",
  tags: ["market update", "fund update", "performance", "strategy", "investing"],
  category: "market"
};

const Dmu14feb: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt="Aloha Alpha Fund Update" mb={4} borderRadius="md" /> */}

      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Aloha Alpha Fund Market & Fund Update Report
      </Heading>

      <Text fontSize="lg" mb={4}>
        Reporting Period: February 14, 2025
        <br />
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Divider my={4} borderColor="black" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" fontSize="lg" color="black">Net Liquidity & Cash Position</Heading>
          <Text mt={2}>• NAV (Net Liquidity Value): $8.156M (increased from $7.989M)</Text>
          <Text>• Cash & Sweep Vehicle: $5.256M (increased from $5.103M)</Text>
          <Text mt={2}>Another strong trading session as we continued to execute our strategy, maximizing rental income while maintaining strategic exposure to high-quality free cash flow businesses.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Performance Overview</Heading>
          <Text mt={2}><strong>Daily Performance (Feb 14, 2025)</strong></Text>
          <Text>• Net Income (Day): +$28,405.08</Text>
          <Text>• % of NAV: +0.35%</Text>
          <Text>• Proceeds: $663,018.78</Text>
          <Text>• Cost Basis: $635,132.86</Text>
          <Text>• Gain/Loss Ratio: 95.47%</Text>
          <Text>• Transaction Count: 92 gains, 4 losses</Text>
          <Text>• Average Gain: +4.75%</Text>
          <Text>• Average Loss: -3.95%</Text>
          <Text>• Win Rate: 95.83%</Text>
          <Text mt={2}>92 out of 96 trades were successful, demonstrating consistent high win-rate execution.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Month-to-Date Performance (Feb 2025)</Heading>
          <Text mt={2}>• Net Income (MTD): +$279,469.61 (increased from $277,463.96)</Text>
          <Text>• % of NAV: +5.49%</Text>
          <Text>• Proceeds: $5,835,101.72</Text>
          <Text>• Cost Basis: $5,765,963.71</Text>
          <Text>• Gain/Loss Ratio: 87.00%</Text>
          <Text>• Transaction Count: 724 gains, 32 losses</Text>
          <Text>• Average Gain: +9.83%</Text>
          <Text>• Average Loss: -1.89%</Text>
          <Text>• Win Rate: 95.77%</Text>
          <Text mt={2}>Momentum remains strong, with February shaping up as an outstanding month for alpha generation.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Year-to-Date Performance (YTD - Jan 1 to Feb 14, 2025)</Heading>
          <Text mt={2}>• Net Income (YTD): +$636,530.75 (increased from $633,440.51)</Text>
          <Text>• % of NAV: +7.94%</Text>
          <Text>• Proceeds: $15,136,070.55</Text>
          <Text>• Cost Basis: $14,878,911.83</Text>
          <Text>• Gain/Loss Ratio: 70.10%</Text>
          <Text>• Transaction Count: 1,781 gains, 115 losses</Text>
          <Text>• Average Gain: +13.94%</Text>
          <Text>• Average Loss: -6.41%</Text>
          <Text>• Win Rate: 93.93%</Text>
          <Text mt={2}>Pushing towards 8% YTD returns in just six weeks, demonstrating alpha compounding at scale.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Strategy Highlights</Heading>
          <Text mt={2}><strong>1. Execution of Strategy</strong></Text>
          <Text>• Rolled over positions in: AAPL, BRK/B, TSLA, NVDA, GOOGL.</Text>
          <Text>• Extracted volatility and turned it into rental income.</Text>
          <Text>• Maintained delta-neutral bias while keeping hedges in place.</Text>
          <Text mt={2}><strong>2. AI & Tech Sector Driving Rental Income</strong></Text>
          <Text>• Nvidia (NVDA): $135.18 (RSI: 54.26)</Text>
          <Text>• Amazon (AMZN): $235.42 (RSI: 54.02)</Text>
          <Text>• Meta (META): $722.88 (RSI: 81.35) (Overbought—rental income play.)</Text>
          <Text>• Alphabet (GOOGL): $189.30 (RSI: 45.92)</Text>
          <Text mt={2}>The NVDA earnings event is the key focus for next week.</Text>
          <Text mt={2}><strong>3. Risk & Capital Deployment</strong></Text>
          <Text>• Cash reserves at $5.256M—positioned for tactical redeployment.</Text>
          <Text>• Hedges continue to function as expected, keeping drawdowns limited.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Market Commentary</Heading>
          <Text mt={2}><strong>SPX5 Core Positions & Performance</strong></Text>
          <Text>• Nvidia (NVDA): $1.20 increase to $135.18 (RSI: 54.26)</Text>
          <Text>• Amazon (AMZN): $3.22 increase to $235.42 (RSI: 54.02)</Text>
          <Text>• Meta (META): $3.68 increase to $722.88 (RSI: 81.35) (Overbought—selling premium aggressively.)</Text>
          <Text>• Alphabet (GOOGL): $2.18 increase to $189.30 (RSI: 45.92)</Text>
          <Text>• Apple (AAPL): $1.20 increase to $228.63 (RSI: 44.12)</Text>
          <Text mt={2}>Tech & AI sectors remain dominant, while AAPL & GOOGL present deep-value rental opportunities.</Text>
          <Text mt={2}><strong>Macro Trends</strong></Text>
          <Text>• Dow Jones: +342.87 (+0.77%) to 44,711.43</Text>
          <Text>• S&P 500: +63.24 (+1.04%) to 6,115.07</Text>
          <Text>• Nasdaq: +284.16 (+1.43%) to 19,945.64</Text>
          <Text mt={2}>Markets are heating up ahead of major economic data releases.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Closing Remarks</Heading>
          <Text mt={2}>The win rate today was 95.83%, indicating strong cash flow compounding.</Text>
          <Text>Cash reserves are at $5.256M, ready for tactical redeployment.</Text>
          <Text>Tech, AI, and structured rental strategies remain the primary drivers of free cash flow.</Text>
          <Text mt={2}>“The math keeps winning. The discipline remains strong. We continue to own and monetize the best businesses on Earth.”</Text>
          <Text mt={2}>Onward!</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dmu14feb;
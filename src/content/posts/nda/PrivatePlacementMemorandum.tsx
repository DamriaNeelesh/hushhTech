import React from 'react';
import { Box, Heading,Image, Text, VStack, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "Private Placement Memorandum (PPM)",
  date: "[Insert Date]",
  description: 'Confidential offering of limited partnership interests in Hushh Technologies Renaissance AI Fund, LP.',
  author: "Internal Team",
  tags: ["PPM", "investment strategy", "AI fund", "private offering"],
  category: "investment strategy"
};

const PrivatePlacementMemorandum: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Private Placement Memorandum (PPM)
      </Heading>

      <Text fontSize="lg" mb={4}>
        Hushh Technologies Renaissance AI Fund, LP
        <br />
        A Delaware Limited Partnership
        <br />
        Confidential Offering of Limited Partnership Interests
      </Text>

      <Divider my={4} borderColor="black" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" fontSize="lg" color="black">Important Notices</Heading>
          <Text mt={2}>
            This Memorandum contains important information regarding the Fund and its investment strategy, risks, and operational structure. Investors should read it carefully before making an investment decision. Investment in this Fund is speculative, involves a high degree of risk, and is suitable only for sophisticated investors capable of sustaining losses.
          </Text>
          <Text mt={2}>
            This is not an offer to sell securities—interests will be offered only pursuant to an executed Subscription Agreement and Limited Partnership Agreement.
          </Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">I. Executive Summary</Heading>
          <Text mt={2}><strong>1.1 Fund Overview</strong></Text>
          <Text>The Hushh Technologies Renaissance AI Fund is a quantitative hedge fund that combines AI-driven financial modeling, systematic free cash flow investing, and options-based premium harvesting to generate sustainable alpha and income.</Text>
          <Text>The Fund’s Sell the Wall™ Strategy monetizes high-quality, free cash flow-generating equities (FCF Giants), using automated AI-powered execution models to optimize return outcomes in all market conditions.</Text>
          <Text>The strategy is designed for ultra-high-net-worth individuals (UHNWIs), family offices, and institutional investors who seek consistent income and compounding returns while holding the best businesses on their books.</Text>
          <Text mt={2}><strong>1.2 Investment Objective</strong></Text>
          <Text>• Generate Superior Risk-Adjusted Returns – Leveraging free cash flow giants and options income strategies.</Text>
          <Text>• Maximize Income While Remaining Long Equities – Using covered calls, cash-secured puts, and structured derivatives.</Text>
          <Text>• Maintain Downside Protection – Through active risk hedging and AI-driven execution.</Text>
          <Text>• Operate a Low-Cost, Scalable Model – Using AI automation to optimize every investment decision.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">II. Fund Structure & Terms</Heading>
          <Text mt={2}><strong>2.1 Structure</strong></Text>
          <Text>• Fund Entity: Hushh Technologies Renaissance AI Fund, LP</Text>
          <Text>• General Partner: Hushh Technologies GP, LLC</Text>
          <Text>• Investment Manager: Hushh Technologies LLC</Text>
          <Text>• Fund Type: AI-Driven Hedge Fund</Text>
          <Text>• Legal Structure: Delaware Limited Partnership</Text>
          <Text mt={2}><strong>2.2 Classes of Interests & Minimum Investment</strong></Text>
          <Text>• Class A Interests: $25M minimum investment (Institutional & UHNW Investors)</Text>
          <Text>• Class B Interests: $5M minimum investment (Qualified Investors & Family Offices)</Text>
          <Text>• Class C Interests: $1M minimum investment (Selective Accredited Investors)</Text>
          <Text mt={2}><strong>2.3 Fees & Expenses</strong></Text>
          <Text>• Management Fee: 1.5% annually on AUM</Text>
          <Text>• Performance Fee: 20% of profits above 8% hurdle rate</Text>
          <Text>• Lock-Up Period: 12 months</Text>
          <Text>• Redemption Frequency: Quarterly with 90-day notice</Text>
          <Text mt={2}><strong>2.4 Taxation</strong></Text>
          <Text>• Tax Treatment: The Fund is structured as a pass-through entity for tax purposes. Investors receive K-1 tax forms annually.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">III. Investment Strategy</Heading>
          <Text mt={2}><strong>3.1 Overview: “Sell the Wall™” Strategy</strong></Text>
          <Text>• Core Investment Thesis: Own the world’s best free cash flow companies (e.g., AAPL, MSFT, NVDA, GOOGL) while selling options to generate weekly/monthly income.</Text>
          <Text>• Income Engine: Monetize volatility by selling covered calls and cash-secured puts in the most liquid, high-volume equities.</Text>
          <Text>• Downside Protection: Implement dynamic hedging and stop-loss triggers to mitigate losses.</Text>
          <Text>• AI-Driven Execution: Deploy proprietary AI models to optimize strike price selection, timing, and risk exposure dynamically.</Text>
          <Text mt={2}><strong>3.2 Target Portfolio Allocation</strong></Text>
          <Text>• 80% Core Free Cash Flow Stocks: Apple, Microsoft, Google, Amazon, Meta, Nvidia, Tesla, Berkshire Hathaway, JPMorgan, and ExxonMobil.</Text>
          <Text>• 20% Systematic Options Strategies: High-probability premium collection via weekly/monthly contracts.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">IV. Risk Factors</Heading>
          <Text mt={2}><strong>4.1 General Investment Risks</strong></Text>
          <Text>Investors must recognize the following key risks:</Text>
          <Text>1. Market Volatility: The Fund’s strategies are exposed to equity and options market risks.</Text>
          <Text>2. Liquidity Risk: Certain options contracts may experience pricing inefficiencies.</Text>
          <Text>3. Black Swan Events: Sudden market collapses may require rapid hedging adjustments.</Text>
          <Text>4. Regulatory Changes: SEC and CFTC rules may evolve, impacting fund operations.</Text>
          <Text>5. Leverage Risks: While the Fund does not use excessive leverage, structured trades have inherent margin requirements.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">V. Fund Governance & Compliance</Heading>
          <Text mt={2}><strong>5.1 Regulatory Oversight</strong></Text>
          <Text>The Fund adheres to:</Text>
          <Text>• SEC & CFTC Regulations – Compliance with Dodd-Frank & Investment Company Act of 1940</Text>
          <Text>• AML & KYC Policies – Full verification of investor eligibility</Text>
          <Text>• Risk Controls & Audits – Annual third-party audits & independent risk monitoring</Text>
          <Text mt={2}><strong>5.2 Governance & Reporting</strong></Text>
          <Text>• Quarterly Performance Reports – Detailed NAV updates & earnings reports</Text>
          <Text>• Monthly Investor Calls – Direct engagement with LPs & institutional partners</Text>
          <Text>• Annual K-1 Tax Filings – Transparent pass-through reporting</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">VI. Subscription & Redemption Procedures</Heading>
          <Text mt={2}><strong>6.1 Subscription Process</strong></Text>
          <Text>1. Accredited Investor Verification: Subscription is open only to qualified investors.</Text>
          <Text>2. Subscription Agreement Execution: Investors must sign legally binding agreements.</Text>
          <Text>3. Capital Commitment: Minimum investment of $25M for Class A Shares.</Text>
          <Text mt={2}><strong>6.2 Redemption Terms</strong></Text>
          <Text>• Lock-Up Period: 12 months (limited early redemption under hardship provisions).</Text>
          <Text>• Quarterly Redemption Windows: 90-day prior notice required.</Text>
          <Text>• Pro Rata Distributions: Capital returned on a first-come, first-serve basis during high-demand exit periods.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">VII. Conclusion & Next Steps</Heading>
          <Text mt={2}>Hushh Technologies Renaissance AI Fund represents a next-generation, AI-first investment vehicle designed to:</Text>
          <Text>• Monetize free cash flow businesses with systematic options income.</Text>
          <Text>• Deliver risk-adjusted alpha through AI execution models.</Text>
          <Text>• Raise $2.5B from the world’s best investors seeking sustainable wealth creation.</Text>
          <Text>Qualified investors are invited to participate in this exclusive opportunity.</Text>
          <Text mt={2}>To Subscribe, Contact:</Text>
          <Text>Investor Relations: [Insert Contact]</Text>
          <Text>Email: [Insert Email]</Text>
          <Text>Website: [Insert Website]</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Disclaimer</Heading>
          <Text mt={2}>This PPM is not an offer to sell securities. Investment in the Fund is highly speculative, involves significant risks, and is suitable only for sophisticated investors. The Fund’s past performance is not indicative of future results. Investors should review the full legal documentation and consult financial, tax, and legal professionals before investing.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default PrivatePlacementMemorandum;
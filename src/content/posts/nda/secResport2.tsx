import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "SEC Report for Reg D Filing",
  publishedAt: "2025-02-09",
  description: "A detailed analysis of Alpha Aloha Fund’s financial health and performance as of February 7, 2025.",
  category: 'fund compliance',
};

const SECReportRegD = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={AlphaAlohaImg} alt="SEC Report for Reg D Filing" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        SEC Report for Reg D Filing
      </Heading>

      <Text fontSize="lg" mb={4}>
        🤫 Alpha Aloha Fund A
      </Text>
      <Text fontSize="lg" mb={4}>
        End of Day Summary: February 7, 2025
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        Key Performance Indicators (KPI) Overview
      </Heading>
      <Text mb={4}>
        This report provides a comprehensive analysis of the Alpha Aloha Fund’s financial health and performance metrics as of February 7, 2025. The data is presented to comply with SEC filing requirements under Regulation D.
      </Text>

      <Heading as="h4" size="md" mt={4} mb={2}>
        1. Financial Position Overview
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Liquidating Value (NAV): $5,861,430.15</ListItem>
        <ListItem>Cash & Sweep Vehicle: $5,203,483.22</ListItem>
        <ListItem>Margin Balance: $3,171,841.67 (short positions covered by margin)</ListItem>
        <ListItem>Maintenance Requirement: $7,775,819.80 (ensuring sufficient coverage of open positions)</ListItem>
        <ListItem>Equity Percentage: 100% (ensuring full coverage of liabilities)</ListItem>
      </List>
      <Text mt={4}>
        <strong>Key Insights:</strong>
        <br />
        • The fund maintains a high level of equity to ensure stability and risk control.<br />
        • Cash reserves are sufficient to manage liquidity needs, despite active use of margin for leveraging high-quality positions.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        2. Profit & Loss Performance
      </Heading>
      <Text>
        <strong>Daily Performance (Feb 7, 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (Day): $56,043.91</ListItem>
        <ListItem>Proceeds: $567,828.30</ListItem>
        <ListItem>Cost Basis: $511,787.42</ListItem>
        <ListItem>Win Rate: 97.37%</ListItem>
        <ListItem>Average Gain: +10.46%</ListItem>
        <ListItem>Average Loss: -1.74%</ListItem>
      </List>
      <Text>
        <strong>Month-to-Date Performance (Feb 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (MTD): $190,753.56</ListItem>
        <ListItem>Proceeds: $2,555,853.42</ListItem>
        <ListItem>Cost Basis: $2,446,868.71</ListItem>
        <ListItem>Win Rate: 97.74%</ListItem>
      </List>
      <Text>
        <strong>Year-to-Date Performance (YTD - Jan 1 to Feb 7, 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (YTD): $545,369.67</ListItem>
        <ListItem>Proceeds: $11,857,245.22</ListItem>
        <ListItem>Cost Basis: $11,559,315.87</ListItem>
        <ListItem>Win Rate: 94.02%</ListItem>
      </List>
      <Text mt={4}>
        <strong>Key Insights:</strong>
        <br />
        • A consistent 97% win rate reflects strong execution of the “Sell the Wall” strategy.<br />
        • The fund generated steady premium income, bolstering liquidity and NAV growth.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        3. Portfolio Composition
      </Heading>
      <Text>
        <strong>Top Positions (as of Feb 7, 2025):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>META: $152,254.53 profit YTD (+12.90% return on open position).</ListItem>
        <ListItem>AMZN: $119,724.00 profit YTD (+24.94% return on open position).</ListItem>
        <ListItem>GOOGL: $51,826.63 profit YTD (+25.48% return on open position).</ListItem>
        <ListItem>BRK/B: $36,746.11 profit YTD (+16.24% return on open position).</ListItem>
        <ListItem>JPM: $41,810.80 profit YTD (+16.44% return on open position).</ListItem>
      </List>
      <Text>
        <strong>Short Balances and Marginal Coverage:</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Short Balance: $2,031,641.55</ListItem>
        <ListItem>Short Marginal Value: $2,062,637.85</ListItem>
      </List>
      <Text mt={4}>
        <strong>Key Insights:</strong>
        <br />
        • Portfolio emphasizes investments in free cash flow giants with significant market moats.<br />
        • Risk is well-managed through dynamic margin balances and conservative leverage.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        4. Risk Management and Liquidity
      </Heading>
      <Text>
        <strong>Option Buying Power:</strong> ($183,903.28)
      </Text>
      <Text mt={2}>
        Reflects calculated use of leverage to drive returns while maintaining adequate liquidity buffers.
      </Text>
      <Text mt={4}>
        <strong>Maintenance Margin Coverage:</strong>
      </Text>
      <Text mt={2}>
        Adequate margin equity ($7,578,752.57) to withstand potential adverse market conditions.
      </Text>
      <Text mt={4}>
        <strong>Drawdown Analysis:</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>5% Drawdown: Net NAV impact: ($293,071.50).</ListItem>
        <ListItem>10% Drawdown: Net NAV impact: ($586,143.02).</ListItem>
        <ListItem>15% Drawdown: Net NAV impact: ($879,214.53).</ListItem>
      </List>
      <Text mt={4}>
        <strong>Key Insights:</strong>
        <br />
        • Liquidity reserves remain robust, ensuring ability to meet margin calls in extreme scenarios.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        5. Fee Structure and Returns
      </Heading>
      <Text>
        <strong>Fee Structure:</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Class A Shares: 1% management fee / 15% performance fee (12% hurdle rate).</ListItem>
        <ListItem>Class B Shares: 1.5% management fee / 15% performance fee (10% hurdle rate).</ListItem>
        <ListItem>Class C Shares: 1.5% management fee / 25% performance fee (8% hurdle rate).</ListItem>
      </List>
      <Text mt={4}>
        <strong>Projected IRR (Risk-Adjusted Scenarios):</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Best Case: 25% annualized returns over 3 years.</ListItem>
        <ListItem>Most Likely: 15% annualized returns over 3 years.</ListItem>
        <ListItem>Worst Case: 5% annualized returns over 3 years.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        6. Compliance and Governance
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>AML/KYC Documentation: Verified for all current investors.</ListItem>
        <ListItem>Risk Disclosure: Fully communicated to investors during onboarding.</ListItem>
        <ListItem>Reg D Filing Status: All material changes and financial updates documented for regulatory review.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        Recommendations and Strategic Actions
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Leverage Optimization: Adjust marginal exposure in high-RSI positions to reduce risk further.</ListItem>
        <ListItem>Premium Capture: Continue rolling covered calls and cash-secured puts for predictable income.</ListItem>
        <ListItem>Risk Mitigation: Maintain a larger portion of cash for unexpected volatility spikes.</ListItem>
        <ListItem>Compliance: Update investor documents to reflect the fund’s latest performance data and strategic outlook.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" mt={4} mb={2}>
        Prepared for:
      </Heading>
      <Text>
        The Securities and Exchange Commission (SEC)
        <br />
        Fund Manager: Manish Sainani
        <br />
        Date: February 7, 2025
      </Text>
    </Box>
  );
};

export default SECReportRegD;

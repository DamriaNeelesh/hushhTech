import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "SEC Report for Alpha Aloha Fund",
  publishedAt: "2025-02-09",
  description: "End of Day Summary: February 7, 2025 - Comprehensive performance and strategy analysis for the Alpha Aloha Fund.",
  category: 'fund compliance',
};

const SECReport = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={AlphaAlohaImg} alt="SEC Report" mb={4} borderRadius="md" />
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        SEC Report for Alpha Aloha Fund
      </Heading>

      <Text fontSize="lg" mb={4}>
        End of Day Summary: February 7, 2025
      </Text>

      <Text fontSize="lg" mb={4}>
        Discipline: Staying True to the Alpha Aloha Fund’s Core Strategy
      </Text>

      <Text mb={4}>
        The Alpha Aloha Fund operates with an unwavering focus on a proven “Sell the Wall” strategy—a systematic method that generates consistent returns through disciplined premium capture. By aligning with free cash flow giants that boast defensible moats, the fund builds its foundation on predictability, resilience, and scalable performance.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        1. Financial Position Overview
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Liquidating Value (NAV): $5,861,430.15</ListItem>
        <ListItem>Cash Reserves: $5,203,483.22</ListItem>
        <ListItem>Margin Balance: $3,171,841.67 (strategic short-term leverage for cash-flow optimization).</ListItem>
        <ListItem>Equity Percentage: 100%</ListItem>
      </List>
      <Text mt={4}>
        The fund maintains a cash-heavy strategy, serving as a financial buffer to protect against volatility while providing flexibility to capitalize on opportunities.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        2. Performance Metrics
      </Heading>
      <Heading as="h4" size="md" mt={4} mb={2}>
        Daily Performance (Feb 7, 2025):
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (Day): $56,043.91 (0.73% of NAV).</ListItem>
        <ListItem>Proceeds: $567,828.30; Cost Basis: $511,787.42.</ListItem>
        <ListItem>Win Rate: 97.37%</ListItem>
        <ListItem>Average Gain: +10.46%; Average Loss: -1.74%.</ListItem>
      </List>
      <Heading as="h4" size="md" mt={4} mb={2}>
        Month-to-Date (Feb 2025):
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (MTD): $190,753.56 (2.47% of NAV).</ListItem>
        <ListItem>Win Rate: 97.74%</ListItem>
      </List>
      <Heading as="h4" size="md" mt={4} mb={2}>
        Year-to-Date (YTD - Jan 1 to Feb 7, 2025):
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Income (YTD): $545,369.67 (7.07% of NAV).</ListItem>
        <ListItem>Proceeds: $11,857,245.22; Cost Basis: $11,559,315.87.</ListItem>
        <ListItem>Win Rate: 94.02%</ListItem>
      </List>
      <Text mt={4}>
        These metrics reflect the consistency and predictability of the strategy, with robust returns achieved through disciplined execution.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        3. Portfolio Composition
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Top Profitable Positions (YTD):</ListItem>
        <List pl={4}>
          <ListItem>META: +$152,254.53 (+12.90%)</ListItem>
          <ListItem>AMZN: +$119,724.00 (+24.94%)</ListItem>
          <ListItem>GOOGL: +$51,826.63 (+25.48%)</ListItem>
        </List>
        <ListItem>High-RSI Positions: META and AMZN require careful monitoring to ensure margin efficiency and maintain performance consistency.</ListItem>
      </List>
      <Text mt={4}>
        The fund demonstrates a balance of leveraging core performers while strategically managing positions with elevated short-term risk indicators.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        4. Risk Management Framework
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Drawdown Scenarios:</ListItem>
        <List pl={4}>
          <ListItem>5% Market Drawdown: NAV Impact: ($293,071.50).</ListItem>
          <ListItem>10% Market Drawdown: NAV Impact: ($586,143.02).</ListItem>
        </List>
        <ListItem>Liquidity Buffer:</ListItem>
        <List pl={4}>
          <ListItem>Cash Reserves: 88.7% of NAV ensures coverage of sudden margin calls or unexpected volatility.</ListItem>
        </List>
      </List>
      <Text mt={4}>
        By maintaining strong liquidity, the fund mitigates risks while enabling proactive reinvestment during market fluctuations.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        Focus on Execution and Alignment
      </Heading>
      <Text mb={4}>
        The fund prioritizes long-term investments in free cash flow-rich businesses with durable competitive advantages. Options strategies, including cash-covered puts and covered calls, are executed with precision to optimize premium capture and reduce cost bases.
      </Text>

      <Heading as="h4" size="md" mt={4} mb={2}>
        Fee Structure with Alignment:
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Class A: 1%/15% fees with a 12% hurdle rate.</ListItem>
        <ListItem>Class B: 1.5%/15% fees with a 10% hurdle rate.</ListItem>
        <ListItem>Class C: 1.5%/25% fees with an 8% hurdle rate.</ListItem>
      </List>
      <Text mt={4}>
        This transparent fee structure ensures shared success and reflects the fund’s alignment with investor outcomes.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        5. Mission-Driven Investment Strategy
      </Heading>
      <Heading as="h4" size="md" mt={4} mb={2}>
        Mission:
      </Heading>
      <Text mb={4}>
        To build generational wealth by adhering to a disciplined investment philosophy rooted in premium capture and risk-adjusted returns.
      </Text>

      <Heading as="h4" size="md" mt={4} mb={2}>
        Vision:
      </Heading>
      <Text mb={4}>
        To empower investors by creating a fund that combines consistent returns with transparency and a long-term outlook.
      </Text>

      <Heading as="h4" size="md" mt={4} mb={2}>
        Core Values:
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Discipline in execution.</ListItem>
        <ListItem>Alignment with investor interests.</ListItem>
        <ListItem>Resilience through financial flexibility.</ListItem>
      </List>

      <Text mt={4}>
        By balancing innovation with proven principles, the fund delivers reliable results while maintaining flexibility to adapt to changing market conditions.
      </Text>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={4}>
        6. Closing Recommendations
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Double-Down on Strengths: Allocate additional resources to top-performing positions like META and AMZN while exploring undervalued opportunities through cash-covered puts.</ListItem>
        <ListItem>Fortify Liquidity: Increase the cash buffer to 90% of NAV to safeguard against unexpected drawdowns.</ListItem>
        <ListItem>Systematize Risk Monitoring: Implement AI-driven tools to enhance oversight of RSI levels and sector-specific risks in real time.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Text>
        Conclusion: The Alpha Aloha Fund exemplifies a disciplined approach to premium capture, leveraging strong free cash flow businesses to generate consistent, risk-adjusted returns. With a robust risk management framework and a mission-driven philosophy, the fund is positioned to deliver sustainable wealth creation for its investors.
      </Text>
      <Text mt={4}>
        This report reflects the fund’s commitment to excellence and transparency, ensuring alignment with all regulatory requirements and stakeholder expectations.
      </Text>
    </Box>
  );
};

export default SECReport;

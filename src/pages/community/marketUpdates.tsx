import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const MarketUpdates = () => {
  return (
    <Box p={{ base: 2, md: 8 }}>
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Market Updates</Tab>
          <Tab>Fund Performance</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size={{md:"lg",base:'md'}}>Daily Market Update – January 28, 2025</Heading>

              <Box mt={4}>
                <Heading size={{md:"md",base:'sm'}}>Market Overview</Heading>
                <UnorderedList spacing={2} mt={2} pl={5}>
                  <ListItem><strong>Indices Performance:</strong></ListItem>
                  <UnorderedList pl={5}>
                    <ListItem><strong>Dow Jones Industrial Average (DJIA):</strong> Closed at 44,850.35, up +0.31% (+136.77 points).</ListItem>
                    <ListItem><strong>S&P 500 (SPX):</strong> Closed at 6,067.70, up +0.92%.</ListItem>
                    <ListItem><strong>Nasdaq (NDX):</strong> Closed at 21,463.04, up +1.59%.</ListItem>
                  </UnorderedList>
                  <Text mt={2}>Markets rallied, driven by strong earnings from major tech companies and optimism about the Federal Reserve’s upcoming decisions on interest rates.</Text>
                </UnorderedList>

                <Heading size={{md:"md",base:'sm'}} mt={4}>Sector Highlights</Heading>
                <UnorderedList spacing={2} pl={5}>
                  <ListItem>Technology led gains, buoyed by Apple (AAPL) and NVIDIA (NVDA) posting significant intraday growth.</ListItem>
                  <ListItem>Consumer Discretionary saw positive momentum from strong e-commerce growth in Amazon (AMZN).</ListItem>
                  <ListItem>Financials remained stable, with JPMorgan Chase (JPM) continuing to perform well amidst solid economic indicators.</ListItem>
                </UnorderedList>

                <Heading size={{md:"md",base:'sm'}} mt={4}>Volatility</Heading>
                <Text>The VIX (Volatility Index) remained subdued at 15.02, reflecting continued investor confidence.</Text>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg">🤫 Fund Performance – January 28, 2025</Heading>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Net Liquidation Value</Heading>
              <Text>$6,000,654.31, reflecting a +5.34% increase in portfolio value for the day.</Text>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Proceeds and Gains</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Total Proceeds: $240,269.56.</ListItem>
                <ListItem>Total Cost Basis: $203,563.20.</ListItem>
                <ListItem>Net Gain (Short Term): $36,706.36 (+15.28%).</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Transaction Statistics</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Transaction Count: 29.</ListItem>
                <ListItem>Gain Count: 29.</ListItem>
                <ListItem>Loss Count: 0.</ListItem>
                <ListItem>Gain/Loss Ratio: 100% gain rate.</ListItem>
                <ListItem>Average Gain: +15.28%.</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Weekly Overview (Including January 27, 2025)</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Total Proceeds: $546,255.67.</ListItem>
                <ListItem>Total Cost Basis: $466,788.62.</ListItem>
                <ListItem>Net Gain (Short Term): $79,467.05 (+14.61%).</ListItem>
                <ListItem>Gain Rate: 87.30%.</ListItem>
                <ListItem>Total Gains: $81,888.26.</ListItem>
                <ListItem>Total Losses: $2,421.21.</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Top Performing Positions</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem><strong>Apple (AAPL):</strong> +$141,253.23. RSI at 52.27 suggests moderate bullish momentum.</ListItem>
                <ListItem><strong>NVIDIA (NVDA):</strong> +$137,013.25. RSI at 43.96 indicates potential for additional upside.</ListItem>
                <ListItem><strong>Alphabet Inc. (GOOGL):</strong> +$17,097.39. RSI at 54.13 reflects steady technical strength.</ListItem>
                <ListItem><strong>Amazon (AMZN):</strong> +$11,054.70. RSI at 67.46 suggests strong momentum in e-commerce and cloud services.</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Strategic Commentary</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Sell the Wall Execution: Maximized premium collection on Apple (AAPL) and NVIDIA (NVDA) due to elevated implied volatility.</ListItem>
                <ListItem>Balanced strike prices for Tesla (TSLA) and Amazon (AMZN), capturing strong premiums while ensuring upside participation.</ListItem>
                <ListItem>Hedged exposure in Meta Platforms (META) and TSLA with protective puts to mitigate risk from potential downside.</ListItem>
                <ListItem>Income Realized Today: Covered Call Premiums (~$48,000), Cash-Secured Puts ($32,000), Total Income from Options Premiums (~$80,000).</ListItem>
                <ListItem>Margin Utilization: Maintained disciplined margin usage across core positions, ensuring liquidity for future volatility events.</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Outlook</Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Market Direction: Expect continued strength in tech-heavy sectors as earnings season progresses. Volatility may increase ahead of the Fed meeting.</ListItem>
                <ListItem>Portfolio Adjustments: Roll existing options positions into higher implied volatility weeks to maximize decay income. Monitor RSI levels for overbought signals.</ListItem>
                <ListItem>Focus Areas for Tomorrow: Sell additional walls on GOOGL and AAPL. Consider adding to Berkshire Hathaway (BRK.B) positions for diversification.</ListItem>
              </UnorderedList>

              <Heading size={{md:"md",base:'sm'}} mt={4}>Summary</Heading>
              <Text>The 🤫 Fund had a stellar performance today, closing with a +5.34% increase in portfolio value and achieving a 100% gain rate across transactions. The disciplined implementation of the “Sell the Wall” strategy continues to generate sustainable income, positioning the fund for long-term growth while mitigating risk effectively.</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MarketUpdates;

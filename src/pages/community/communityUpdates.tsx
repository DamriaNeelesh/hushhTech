import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  List,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Container
} from '@chakra-ui/react';

const CommunitySection = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Tabs variant="enclosed-colored" colorScheme="blue" isFitted>
        <TabList mb="1em">
          <Tab>Market Updates</Tab>
          <Tab>Fund Performance</Tab>
          <Tab>Product Updates</Tab>
          <Tab>Manifesto</Tab>
        </TabList>

        <TabPanels>
          {/* Market Updates Tab */}
          <TabPanel>
            {/* Existing Market Update Post */}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size={{ md: "lg", base: "md" }}>
                Daily Market Update – January 28, 2025
              </Heading>

              <Box mt={4}>
                <Heading size={{ md: "md", base: "sm" }}>Market Overview</Heading>
                <UnorderedList spacing={2} mt={2} pl={5}>
                  <ListItem>
                    <strong>Indices Performance:</strong>
                  </ListItem>
                  <UnorderedList pl={5}>
                    <ListItem>
                      <strong>Dow Jones Industrial Average (DJIA):</strong> Closed at 44,850.35, up +0.31% (+136.77 points).
                    </ListItem>
                    <ListItem>
                      <strong>S&P 500 (SPX):</strong> Closed at 6,067.70, up +0.92%.
                    </ListItem>
                    <ListItem>
                      <strong>Nasdaq (NDX):</strong> Closed at 21,463.04, up +1.59%.
                    </ListItem>
                  </UnorderedList>
                  <Text mt={2}>
                    Markets rallied, driven by strong earnings from major tech companies and optimism about the Federal Reserve’s upcoming decisions on interest rates.
                  </Text>
                </UnorderedList>

                <Heading size={{ md: "md", base: "sm" }} mt={4}>
                  Sector Highlights
                </Heading>
                <UnorderedList spacing={2} pl={5}>
                  <ListItem>
                    Technology led gains, buoyed by Apple (AAPL) and NVIDIA (NVDA) posting significant intraday growth.
                  </ListItem>
                  <ListItem>
                    Consumer Discretionary saw positive momentum from strong e-commerce growth in Amazon (AMZN).
                  </ListItem>
                  <ListItem>
                    Financials remained stable, with JPMorgan Chase (JPM) continuing to perform well amidst solid economic indicators.
                  </ListItem>
                </UnorderedList>

                <Heading size={{ md: "md", base: "sm" }} mt={4}>
                  Volatility
                </Heading>
                <Text>
                  The VIX (Volatility Index) remained subdued at 15.02, reflecting continued investor confidence.
                </Text>
              </Box>
            </Box>

            {/* New Market Update Post */}
            <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size={{ md: "lg", base: "md" }}>
                Closing Day and Weekly Report – February 3, 2025
              </Heading>

<Box mt={4}>
  <Heading as="h2" size="md" mb={2}>
    Daily and Weekly Performance Overview
  </Heading>
  <Text fontSize={{ base: "sm", md: "md" }}>
    Net Income for February 3, 2025:
  </Text>
  <List spacing={1} pl={5}>
    <ListItem>• Total Proceeds: $22,070.41</ListItem>
    <ListItem>• Cost Basis: $13,244.00</ListItem>
    <ListItem>• Net Gain: $8,826.41 (+39.99%)</ListItem>
    <ListItem>• Gain Ratio: 100.00%</ListItem>
  </List>

  <Text fontSize={{ base: "sm", md: "md" }} mt={4}>
    Transaction Summary:
  </Text>
  <List spacing={1} pl={5}>
    <ListItem>• Gain Count: 8</ListItem>
    <ListItem>• Loss Count: 0</ListItem>
    <ListItem>• Average Gain: +39.99%</ListItem>
    <ListItem>• Gain Rate: 100.00%</ListItem>
  </List>

  <Text fontSize={{ base: "sm", md: "md" }} mt={4}>
    Weekly Performance Recap (As of 02/03/2025):
  </Text>
  <List spacing={1} pl={5}>
    <ListItem>• Weekly Total Income: $8,826.41</ListItem>
    <ListItem>• Weekly NAV Performance (%): +0.11%</ListItem>
    <ListItem>• Cumulative NAV: $7.68M</ListItem>
  </List>

  <Heading as="h3" size="sm" mt={4}>
    Portfolio Highlights
  </Heading>
  <List spacing={1} pl={5}>
    <ListItem>
      <Text as="span" fontWeight="bold">1. Apple (AAPL):</Text> • P/L Day: +$2,579.25
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">2. Alphabet Inc. (GOOGL):</Text> • P/L Day: +$897.22
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">3. Tesla (TSLA):</Text> • P/L Day: +$695.89
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">4. Berkshire Hathaway (BRK/B):</Text> • P/L Day: +$958.88
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">5. Nvidia (NVDA):</Text> • P/L Day: +$813.49
    </ListItem>
  </List>

  <Heading as="h3" size="sm" mt={4}>
    Market Insights
  </Heading>
  <List spacing={1} pl={5}>
    <ListItem>
      <Text as="span" fontWeight="bold">1. Broader Market Trends:</Text> • Dow and Nasdaq showed minor pullbacks, driven by profit-taking amidst mixed corporate earnings reports.
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">2. Sector Observations:</Text> • Semiconductors: Nvidia (NVDA) led cautious rebounds after softening chip demand sentiment.
    </ListItem>
    <ListItem>
      <Text as="span" fontWeight="bold">3. SPX10 Overview:</Text> Core positions in high-liquidity, free cash flow-driven businesses (AAPL, GOOGL, BRK/B) remain the backbone of portfolio stability and income generation.
    </ListItem>
  </List>

  <Heading as="h3" size="sm" mt={4}>
    Strategic Commentary
  </Heading>
  <Text fontSize={{ base: "sm", md: "md" }} mt={2}>
    “Sell the Wall” Strategy Execution: Today’s results validate the effectiveness of systematically monetizing free cash flow businesses through covered calls and cash-secured puts. This disciplined approach captures consistent premium income while managing downside risks.
  </Text>
  <List spacing={1} pl={5}>
    <ListItem>• Options Strategies in Focus: Covered calls generated predictable income, leveraging high-IV periods before earnings.</ListItem>
    <ListItem>• Cash-secured puts allowed opportunistic entry into core names like Tesla and Nvidia at favorable prices.</ListItem>
    <ListItem>• Risk Management: Maintained conservative margin exposure, leveraging cash positions ($4.445M) to preserve flexibility.</ListItem>
  </List>

  <Heading as="h3" size="sm" mt={4}>
    Outlook
  </Heading>
  <List spacing={1} pl={5}>
    <ListItem>• Core Focus: Prioritize high-liquidity businesses with strong free cash flow for sustainable alpha generation.</ListItem>
    <ListItem>• Tactical Adjustments: Rotate capital into healthcare and consumer staples to hedge against potential valuation compressions in tech and semiconductors.</ListItem>
    <ListItem>• Key Near-Term Goals: Maintain weekly premium income targets above 1% of NAV.</ListItem>
  </List>

  <Text fontSize={{ base: "sm", md: "md" }} mt={4}>
    Closing Note: The Fund’s performance underscores the value of combining disciplined execution with market insights. By focusing on free cash flow giants and leveraging behavioral inefficiencies, we continue to turn volatility into consistent alpha. As Charlie Munger would say: “The big money is not in the buying or selling, but in the waiting.” Let’s stay patient, deliberate, and focused on maximizing returns while navigating market complexity. Onward to creating more Aloha and Alpha!
  </Text>
</Box>


            </Box>
          </TabPanel>

          {/* Fund Performance Tab */}
          <TabPanel>
            {/* Existing Fund Performance Post */}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg">
                🤫 Fund Performance – January 28, 2025
              </Heading>
              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Net Liquidation Value
              </Heading>
              <Text>
                $6,000,654.31, reflecting a +5.34% increase in portfolio value for the day.
              </Text>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Proceeds and Gains
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Total Proceeds: $240,269.56.</ListItem>
                <ListItem>Total Cost Basis: $203,563.20.</ListItem>
                <ListItem>Net Gain (Short Term): $36,706.36 (+15.28%).</ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Transaction Statistics
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Transaction Count: 29.</ListItem>
                <ListItem>Gain Count: 29.</ListItem>
                <ListItem>Loss Count: 0.</ListItem>
                <ListItem>Gain/Loss Ratio: 100% gain rate.</ListItem>
                <ListItem>Average Gain: +15.28%.</ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Weekly Overview (Including January 27, 2025)
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Total Proceeds: $546,255.67.</ListItem>
                <ListItem>Total Cost Basis: $466,788.62.</ListItem>
                <ListItem>Net Gain (Short Term): $79,467.05 (+14.61%).</ListItem>
                <ListItem>Gain Rate: 87.30%.</ListItem>
                <ListItem>Total Gains: $81,888.26.</ListItem>
                <ListItem>Total Losses: $2,421.21.</ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Top Performing Positions
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>
                  <strong>Apple (AAPL):</strong> +$141,253.23. RSI at 52.27 suggests moderate bullish momentum.
                </ListItem>
                <ListItem>
                  <strong>NVIDIA (NVDA):</strong> +$137,013.25. RSI at 43.96 indicates potential for additional upside.
                </ListItem>
                <ListItem>
                  <strong>Alphabet Inc. (GOOGL):</strong> +$17,097.39. RSI at 54.13 reflects steady technical strength.
                </ListItem>
                <ListItem>
                  <strong>Amazon (AMZN):</strong> +$11,054.70. RSI at 67.46 suggests strong momentum in e-commerce and cloud services.
                </ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Strategic Commentary
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>
                  Sell the Wall Execution: Maximized premium collection on Apple (AAPL) and NVIDIA (NVDA) due to elevated implied volatility.
                </ListItem>
                <ListItem>
                  Balanced strike prices for Tesla (TSLA) and Amazon (AMZN), capturing strong premiums while ensuring upside participation.
                </ListItem>
                <ListItem>
                  Hedged exposure in Meta Platforms (META) and TSLA with protective puts to mitigate risk from potential downside.
                </ListItem>
                <ListItem>
                  Income Realized Today: Covered Call Premiums (~$48,000), Cash-Secured Puts ($32,000), Total Income from Options Premiums (~$80,000).
                </ListItem>
                <ListItem>
                  Margin Utilization: Maintained disciplined margin usage across core positions, ensuring liquidity for future volatility events.
                </ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Outlook
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>
                  Market Direction: Expect continued strength in tech-heavy sectors as earnings season progresses. Volatility may increase ahead of the Fed meeting.
                </ListItem>
                <ListItem>
                  Portfolio Adjustments: Roll existing options positions into higher implied volatility weeks to maximize decay income. Monitor RSI levels for overbought signals.
                </ListItem>
                <ListItem>
                  Focus Areas for Tomorrow: Sell additional walls on GOOGL and AAPL. Consider adding to Berkshire Hathaway (BRK.B) positions for diversification.
                </ListItem>
              </UnorderedList>

              <Heading size={{ md: "md", base: "sm" }} mt={4}>
                Summary
              </Heading>
              <Text>
                The 🤫 Fund had a stellar performance today, closing with a +5.34% increase in portfolio value and achieving a 100% gain rate across transactions. The disciplined implementation of the “Sell the Wall” strategy continues to generate sustainable income, positioning the fund for long-term growth while mitigating risk effectively.
              </Text>
            </Box>

            {/* New Fund Update Post - Formatted */}
            <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size={{ md: "lg", base: "md" }}>
                The 🤫 Fund – First 12 Investment Programs & Systems Inspired by Renaissance Technologies
              </Heading>
              <Text mt={4}>
                <strong>Mission:</strong> Deploy $7.5M NAV in the world’s smartest, AI-driven, risk-managed hedge fund strategies.
              </Text>
              <Text mt={2}>
                <strong>Goal:</strong> Maximize free cash flow alpha while ensuring absolute capital protection and scalability.
              </Text>
              <Text mt={2}>
                Each program is named after a world-class innovator, builder, or leader who exemplifies excellence in execution.
              </Text>
              <Heading size="md" mt={6}>
                🏆 The First 12 Investment Programs of the 🤫 Fund
              </Heading>

              {/* Program 1: Einstein */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🔬 Einstein – AI-Driven Statistical Arbitrage (Pure Quant Alpha)
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Trades microsecond inefficiencies across SPX, NDX, and mega-cap stocks.</ListItem>
                  <ListItem>✅ Uses mean-reversion and time-series ML models to predict short-term price fluctuations.</ListItem>
                  <ListItem>✅ HFT execution with AI-based order flow analysis.</ListItem>
                  <ListItem>👉 Alpha Source: Price mispricings, bid-ask spreads, and inefficiencies.</ListItem>
                  <ListItem>📈 Target Return: 10-20% annualized.</ListItem>
                  <ListItem>🚨 Risk: Very low but requires real-time AI execution.</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 2: Tesla */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🚀 Tesla – The Sell the Wall Engine (Options Income Machine)
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Sells covered calls and cash-secured puts on AAPL, MSFT, NVDA, AMZN, META, TSLA, GOOGL.</ListItem>
                  <ListItem>✅ Weekly premium income generation = consistent paycheck.</ListItem>
                  <ListItem>✅ AI optimizes strike selection & rolling strategies for max efficiency.</ListItem>
                  <ListItem>👉 Alpha Source: Time decay (Theta) & volatility contraction.</ListItem>
                  <ListItem>📈 Target Return: 50-100% annualized.</ListItem>
                  <ListItem>🚨 Risk: Low (positions always backed by real stock).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 3: Musk */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🧠 Musk – Macro & AI-Powered Thematic Investing
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Blends macro models & AI sentiment analysis to predict the next big waves.</ListItem>
                  <ListItem>✅ Focuses on AI, automation, energy, biotech, space, and Web3.</ListItem>
                  <ListItem>✅ AI dynamically allocates capital across thematic sectors.</ListItem>
                  <ListItem>👉 Alpha Source: Front-running structural shifts.</ListItem>
                  <ListItem>📈 Target Return: 20-40% annualized.</ListItem>
                  <ListItem>🚨 Risk: Medium (macro shocks).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 4: Jensen */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🤯 Jensen – The Deep AI Hedge (Risk & Volatility Protection)
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ AI predicts volatility events and auto-hedges portfolio with SPX & NDX options.</ListItem>
                  <ListItem>✅ Dynamically adjusts put protection based on real-time market stress.</ListItem>
                  <ListItem>✅ Optimized for tail-risk hedging without excessive cost.</ListItem>
                  <ListItem>👉 Alpha Source: Long volatility positions at optimal times.</ListItem>
                  <ListItem>📈 Target Return: 5-10% annualized (while reducing portfolio risk).</ListItem>
                  <ListItem>🚨 Risk: Low (insurance layer).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 5: Jobs */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  📱 Jobs – The AI-Driven Buy & Hold Machine
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Owns the world’s best free cash flow businesses (BRK, AAPL, MSFT, V, MA, UNH).</ListItem>
                  <ListItem>✅ Uses AI to reinvest weekly option income into these stocks at the best prices.</ListItem>
                  <ListItem>✅ Never sells, only accumulates more.</ListItem>
                  <ListItem>👉 Alpha Source: FCF compounding & stock buybacks.</ListItem>
                  <ListItem>📈 Target Return: 12-18% annualized (excluding options income).</ListItem>
                  <ListItem>🚨 Risk: Near-zero (market risk only).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 6: Gates */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  📊 Gates – The Quant Portfolio Balancer (Risk Parity & Leverage Mgmt)
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Optimizes leverage ratios across all strategies to ensure max efficiency.</ListItem>
                  <ListItem>✅ AI dynamically reallocates between high & low beta assets.</ListItem>
                  <ListItem>✅ Maintains a constant risk profile.</ListItem>
                  <ListItem>👉 Alpha Source: Systematic risk-adjusted rebalancing.</ListItem>
                  <ListItem>📈 Target Return: 8-12% annualized.</ListItem>
                  <ListItem>🚨 Risk: Medium (market-dependent).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 7: Modi */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🛡️ Modi – The BRICS Arbitrage Fund (Global Macro Play)
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Focuses on emerging market FCF giants in India, China, Middle East, and Latin America.</ListItem>
                  <ListItem>✅ Uses macro trend analysis & local currency arbitrage for alpha.</ListItem>
                  <ListItem>✅ Trades multi-currency & ADR-backed positions.</ListItem>
                  <ListItem>👉 Alpha Source: Global economic divergences.</ListItem>
                  <ListItem>📈 Target Return: 15-25% annualized.</ListItem>
                  <ListItem>🚨 Risk: Medium-High (geo-political risks).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 8: Trump */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🏛 Trump – The Dividend & Buyback Alpha Engine
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Tracks the highest dividend + buyback yielding stocks (V, MA, JPM, BRK, COST).</ListItem>
                  <ListItem>✅ Optimized covered call selling strategy to double up on income.</ListItem>
                  <ListItem>✅ Focuses on defensive but high-returning assets.</ListItem>
                  <ListItem>👉 Alpha Source: Income & capital appreciation.</ListItem>
                  <ListItem>📈 Target Return: 10-15% annualized.</ListItem>
                  <ListItem>🚨 Risk: Low (income-focused).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 9: Winfrey */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  📢 Winfrey – Sentiment-Driven Momentum & AI Media Analysis
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Uses natural language processing (NLP) to scan financial media, social trends & earnings calls.</ListItem>
                  <ListItem>✅ Identifies high-momentum stocks before Wall Street catches on.</ListItem>
                  <ListItem>✅ AI trading executes instantly when signals hit.</ListItem>
                  <ListItem>👉 Alpha Source: Retail & institutional FOMO before big moves.</ListItem>
                  <ListItem>📈 Target Return: 20-40% annualized.</ListItem>
                  <ListItem>🚨 Risk: Medium (momentum-based).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 10: Bezos */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  📡 Bezos – The Private Market & SPX10 Futures Arbitrage Fund
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Focuses on SPX10 blue-chip futures vs. cash market pricing.</ListItem>
                  <ListItem>✅ Uses machine learning to predict arbitrage spreads.</ListItem>
                  <ListItem>✅ Automates risk-free arbitrage trades using AI-driven execution.</ListItem>
                  <ListItem>👉 Alpha Source: Structural inefficiencies in futures markets.</ListItem>
                  <ListItem>📈 Target Return: 15-25% annualized.</ListItem>
                  <ListItem>🚨 Risk: Low (hedged).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 11: Ambanis */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  💰 Ambanis – The AI-Powered Fixed Income & Bonds Desk
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ Optimizes T-bill, high-yield corporate debt, & bond options trading.</ListItem>
                  <ListItem>✅ AI-based yield curve positioning.</ListItem>
                  <ListItem>✅ Focuses on capital preservation + yield enhancement.</ListItem>
                  <ListItem>👉 Alpha Source: Interest rate inefficiencies & credit spreads.</ListItem>
                  <ListItem>📈 Target Return: 8-12% annualized.</ListItem>
                  <ListItem>🚨 Risk: Low (bond desk focus).</ListItem>
                </UnorderedList>
              </Box>

              {/* Program 12: Wozniak */}
              <Box mt={4}>
                <Heading as="h3" size="md" mt={4}>
                  🕶 Wozniak – Crypto & Digital Asset Arbitrage
                </Heading>
                <UnorderedList mt={2} pl={5}>
                  <ListItem>✅ AI trades BTC, ETH, & top DeFi projects using market-neutral strategies.</ListItem>
                  <ListItem>✅ Arbitrage across futures, spot, & on-chain liquidity pools.</ListItem>
                  <ListItem>✅ Focuses only on high-liquidity, low-slippage trades.</ListItem>
                  <ListItem>👉 Alpha Source: Market inefficiencies in crypto.</ListItem>
                  <ListItem>📈 Target Return: 30-50% annualized.</ListItem>
                  <ListItem>🚨 Risk: Medium (but hedged).</ListItem>
                </UnorderedList>
              </Box>

              <Heading size="md" mt={6}>
                🚀 Next Steps: The 🤫 Fund Execution Plan
              </Heading>
              <UnorderedList mt={2} pl={5}>
                <ListItem>✅ Deploy $7.5M across these 12 programs immediately.</ListItem>
                <ListItem>✅ Automate execution using AI & quant-driven strategies.</ListItem>
                <ListItem>✅ Show clean dashboards for real-time reporting.</ListItem>
                <ListItem>✅ Scale to $100M+ AUM by proving risk-adjusted returns.</ListItem>
              </UnorderedList>
              <Text mt={4}>
                <strong>Final Thought:</strong> “The best way to win is to systematically remove losing trades. The best way to grow is to let compounding do its work.” — Inspired by Munger & Simons
              </Text>
              <Text mt={2}>
                Let’s make alpha and aloha work together. 🚀🔥
              </Text>
            </Box>
          </TabPanel>

          {/* Product Updates Tab */}
          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg">
                Product Update: Exciting New Features Coming Soon!
              </Heading>
              <Text
                mt={4}
                whiteSpace="pre-wrap"
                fontSize={{ base: "sm", md: "md" }}
              >
                We are excited to announce that new product features are on the horizon! Stay tuned for updates that will revolutionize the way you manage your investments and community interactions. More details coming soon!
              </Text>
            </Box>
          </TabPanel>

          {/* Manifesto Tab */}
          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg" mb={4}>
                Hushh Technologies Manifesto
              </Heading>
              <Text size={'md'}>The Future of Systematic AI-Driven Income Investing</Text>

              {/* Section 1 */}
              <Heading size="md" mt={4}>
                1. Introduction: Why We Exist
              </Heading>
              <Text mt={2}>
                The financial markets are filled with inefficiencies, and the traditional asset management industry is plagued by outdated models, excessive fees, and risk-laden strategies that fail to protect investors. Hushh Technologies was founded to rewrite the rules of investing.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>We are not here to speculate.</ListItem>
                <ListItem>We are not here to chase returns.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                We are here to systematically extract alpha while controlling risk—every second, every day, every year.
              </Text>
              <Text mt={2}>
                Our philosophy is rooted in free cash flow, risk-adjusted returns, and perpetual income generation. We do not gamble on companies. We own the best businesses on the planet, monetize their volatility, and ensure capital preservation while generating superior yield.
              </Text>
              <Text mt={2}>
                Welcome to the future of investing. Welcome to Hushh Technologies.
              </Text>

              {/* Section 2 */}
              <Heading size="md" mt={6}>
                2. Our North Star: A New Era of Wealth Creation
              </Heading>
              <Text mt={2}>
                For decades, investors have been forced to choose between passive long-term investing and high-risk speculation. Hushh Technologies eliminates this false choice.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Vision:</Text> A financial system where investors generate sustainable, perpetual income while remaining long the greatest businesses in the world.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Mission:</Text> To create an AI-powered, risk-first investment platform that continuously monetizes volatility, capitalizes on human behavior, and maximizes free cash flow yield.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Strategy:</Text>
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>✅ Own the best of the best – AI-first, high-FCF, dividend-growing businesses.</ListItem>
                    <ListItem>✅ Sell the Wall – Monetize volatility in liquid, high-premium stocks.</ListItem>
                    <ListItem>✅ Maximize income while controlling risk – A hedge fund that prioritizes alpha and capital preservation.</ListItem>
                    <ListItem>✅ Risk-adjusted alpha – Not just absolute returns, but superior returns per unit of risk.</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>

              {/* Section 3 */}
              <Heading size="md" mt={6}>
                3. The Engine: AI, Systematic Trading, and Free Cash Flow
              </Heading>
              <Text mt={2}>
                At the core of our strategy lies a systematic investment approach powered by AI-driven execution and deep quantitative modeling.
              </Text>
              <Heading size="sm" mt={4}>
                3.1 The Foundation: Free Cash Flow and AI-First Businesses
              </Heading>
              <Text mt={2}>
                Our portfolio is not a random collection of stocks—it’s a curated selection of the most dominant, cash-rich, and AI-powered enterprises that the world runs on:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🔹 Apple (AAPL) – iPhone, Services, AI.</ListItem>
                <ListItem>🔹 Microsoft (MSFT) – Cloud, Enterprise AI, Recurring Revenue Machine.</ListItem>
                <ListItem>🔹 Google (GOOGL) – Search, AI, Digital Ads, YouTube.</ListItem>
                <ListItem>🔹 NVIDIA (NVDA) – AI Infrastructure, GPUs, Data Centers.</ListItem>
                <ListItem>🔹 Meta (META) – Digital Ads, Reels, AI-powered engagement.</ListItem>
                <ListItem>🔹 Tesla (TSLA) – EV, Robotics, AI-driven automation.</ListItem>
                <ListItem>🔹 Amazon (AMZN) – AWS, AI-driven commerce, Logistics.</ListItem>
                <ListItem>🔹 JPMorgan (JPM) – AI-driven finance and investment banking.</ListItem>
                <ListItem>🔹 Visa (V) – Digital payments, AI-powered risk analytics.</ListItem>
                <ListItem>🔹 Berkshire Hathaway (BRK.A) – The ultimate cash-flow compounding machine.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                These aren’t just stocks—they are the foundation of modern society and global commerce.
              </Text>
              <Heading size="sm" mt={4}>
                3.2 Monetizing Volatility: Sell the Wall 23/7/365
              </Heading>
              <Text mt={2}>
                Traditional funds make one fatal mistake: They leave money on the table.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 We don’t just hold assets—we make them work.</ListItem>
                <ListItem>📌 We systematically harvest premium through options strategies.</ListItem>
                <ListItem>📌 We generate perpetual income while maintaining long exposure to the best businesses in the world.</ListItem>
              </UnorderedList>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Sell Covered Calls – When volatility spikes, we sell rich premiums.</ListItem>
                <ListItem>✅ Sell Cash-Secured Puts – Get paid to buy great stocks at better prices.</ListItem>
                <ListItem>✅ Roll, Hedge, and Adapt – AI-driven execution adjusts dynamically to optimize profits.</ListItem>
                <ListItem>✅ Risk-Managed Execution – Ensure capital preservation, prevent margin blow-ups, and maintain absolute downside control.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                Annualized Target Yield: 15-25%+ on capital at risk.
              </Text>

              {/* Section 4 */}
              <Heading size="md" mt={6}>
                4. The Ultimate Risk-First Strategy
              </Heading>
              <Heading size="sm" mt={4}>
                4.1 Max Drawdown Control: SPX +/- 15%
              </Heading>
              <Text mt={2}>
                Most hedge funds ignore drawdowns—we engineer for them.
                Most investors react to crashes—we prepare for them.
                We ensure:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 Capital preservation in the worst market environments.</ListItem>
                <ListItem>📌 AI-driven risk overlays that dynamically hedge against downside shocks.</ListItem>
                <ListItem>📌 Adaptive exposure management that shifts risk dynamically based on market conditions.</ListItem>
              </UnorderedList>
              <Text mt={2}>We will never be caught off guard.</Text>
              <Heading size="sm" mt={4}>
                4.2 Sharpe Ratio, Sortino Ratio, and True Risk-Adjusted Returns
              </Heading>
              <Text mt={2}>
                Hushh Technologies does not optimize for raw returns—we optimize for efficiency of returns.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Sharpe Ratio &gt; 2.0 → Consistently generating high returns per unit of risk.</ListItem>
                <ListItem>✅ Sortino Ratio &gt; 3.0 → Ensuring downside risk is limited and controlled.</ListItem>
                <ListItem>✅ Capture Ratio &gt; 1.5 → Capturing more upside than downside consistently.</ListItem>
                <ListItem>✅ Rolling Alpha → Sustaining yield generation across market cycles.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                Risk-adjusted alpha is the only alpha that matters.
              </Text>

              {/* Section 5 */}
              <Heading size="md" mt={6}>
                5. Scaling to $2.5B AUM: The Institutional Roadmap
              </Heading>
              <Text mt={2}>
                The beauty of our system? It scales.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 1:</Text> $100M AUM
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Prove Sell the Wall as a sustainable income engine.</ListItem>
                    <ListItem>📌 Optimize AI-driven execution models.</ListItem>
                    <ListItem>📌 Enhance tactical risk overlays to reinforce capital preservation.</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 2:</Text> $500M AUM
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Expand AI-first risk modeling and tactical overlays.</ListItem>
                    <ListItem>📌 Deploy automation for real-time hedging and trade execution.</ListItem>
                    <ListItem>📌 Enhance institutional-grade infrastructure for scaling to $2.5B+.</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 3:</Text> $2.5B AUM+
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Fully AI-driven execution and automated risk optimization at scale.</ListItem>
                    <ListItem>📌 Institutional adoption and family office integrations.</ListItem>
                    <ListItem>📌 Scaling systematic investing across multiple global markets.</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>

              {/* Section 6 */}
              <Heading size="md" mt={6}>
                6. The Hushh Technologies Investment Philosophy
              </Heading>
              <Heading size="sm" mt={4}>
                6.1 Who We Are
              </Heading>
              <Text mt={2}>
                We are not Wall Street.
                <br />
                We are not gamblers.
                <br />
                We are not short-term traders.
                <br />
                We are engineers of sustainable alpha.
                <br />
                We are creators of perpetual income.
                <br />
                We are masters of risk-adjusted returns.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 We do not bet—we systematically extract value from the best companies in the world.</ListItem>
                <ListItem>📌 We do not chase—we build a machine that monetizes volatility every single week.</ListItem>
                <ListItem>📌 We do not suffer extreme drawdowns—our AI-first risk models prevent catastrophic losses.</ListItem>
              </UnorderedList>
              <Text mt={2}>This is the future of investing.</Text>
              <Heading size="sm" mt={4}>
                6.2 Who This Is For
              </Heading>
              <Text mt={2}>
                Hushh Technologies is built for investors who want:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Perpetual cash flow from the best businesses on the planet.</ListItem>
                <ListItem>✅ Systematic, AI-driven risk-adjusted returns.</ListItem>
                <ListItem>✅ Downside protection while maintaining long exposure.</ListItem>
                <ListItem>✅ A next-generation hedge fund that maximizes efficiency and capital preservation.</ListItem>
              </UnorderedList>
              <Text mt={2} fontWeight="bold">
                Investor Profile:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🔹 Institutional investors & family offices seeking high-yield, risk-controlled strategies.</ListItem>
                <ListItem>🔹 High-net-worth individuals who need sustainable passive income.</ListItem>
                <ListItem>🔹 AI-first quant traders looking for scalable, algorithmically driven execution.</ListItem>
              </UnorderedList>

              {/* Section 7 */}
              <Heading size="md" mt={6}>
                7. Conclusion: The Future of Alpha & Aloha
              </Heading>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ AI-driven, systematic, and risk-first.</ListItem>
                <ListItem>✅ Engineered to harvest premium while preserving capital.</ListItem>
                <ListItem>✅ Focused on the best FCF businesses, ensuring durability across all markets.</ListItem>
              </UnorderedList>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🚀 This is the future of investing.</ListItem>
                <ListItem>🚀 This is the future of perpetual income.</ListItem>
                <ListItem>🚀 This is Hushh Technologies.</ListItem>
              </UnorderedList>
              <Text mt={4} fontWeight="bold">
                📢 Invest Today.
              </Text>
            </Box>
          </TabPanel>

          {/* Product Updates Tab */}
          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg">Product Update: Exciting New Features Coming Soon!</Heading>
              <Text
                mt={4}
                whiteSpace="pre-wrap"
                fontSize={{ base: "sm", md: "md" }}
              >
                We are excited to announce that new product features are on the horizon! Stay tuned for updates that will revolutionize the way you manage your investments and community interactions. More details coming soon!
              </Text>
            </Box>
          </TabPanel>

          {/* Manifesto Tab */}
          <TabPanel>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
              <Heading size="lg" mb={4}>Hushh Technologies Manifesto</Heading>
              <Text size={'md'}>The Future of Systematic AI-Driven Income Investing</Text>
              {/* Section 1 */}
              <Heading size="md" mt={4}>1. Introduction: Why We Exist</Heading>
              <Text mt={2}>
                The financial markets are filled with inefficiencies, and the traditional asset management industry is plagued by outdated models, excessive fees, and risk-laden strategies that fail to protect investors. Hushh Technologies was founded to rewrite the rules of investing.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>We are not here to speculate.</ListItem>
                <ListItem>We are not here to chase returns.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                We are here to systematically extract alpha while controlling risk—every second, every day, every year.
              </Text>
              <Text mt={2}>
                Our philosophy is rooted in free cash flow, risk-adjusted returns, and perpetual income generation. We do not gamble on companies. We own the best businesses on the planet, monetize their volatility, and ensure capital preservation while generating superior yield.
              </Text>
              <Text mt={2}>
                Welcome to the future of investing. Welcome to Hushh Technologies.
              </Text>
              {/* Section 2 */}
              <Heading size="md" mt={6}>2. Our North Star: A New Era of Wealth Creation</Heading>
              <Text mt={2}>
                For decades, investors have been forced to choose between passive long-term investing and high-risk speculation. Hushh Technologies eliminates this false choice.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Vision:</Text> A financial system where investors generate sustainable, perpetual income while remaining long the greatest businesses in the world.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Mission:</Text> To create an AI-powered, risk-first investment platform that continuously monetizes volatility, capitalizes on human behavior, and maximizes free cash flow yield.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">Our Strategy:</Text>
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>✅ Own the best of the best – AI-first, high-FCF, dividend-growing businesses.</ListItem>
                    <ListItem>✅ Sell the Wall – Monetize volatility in liquid, high-premium stocks.</ListItem>
                    <ListItem>✅ Maximize income while controlling risk – A hedge fund that prioritizes alpha and capital preservation.</ListItem>
                    <ListItem>✅ Risk-adjusted alpha – Not just absolute returns, but superior returns per unit of risk.</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>
              {/* Section 3 */}
              <Heading size="md" mt={6}>3. The Engine: AI, Systematic Trading, and Free Cash Flow</Heading>
              <Text mt={2}>
                At the core of our strategy lies a systematic investment approach powered by AI-driven execution and deep quantitative modeling.
              </Text>
              <Heading size="sm" mt={4}>3.1 The Foundation: Free Cash Flow and AI-First Businesses</Heading>
              <Text mt={2}>
                Our portfolio is not a random collection of stocks—it’s a curated selection of the most dominant, cash-rich, and AI-powered enterprises that the world runs on:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🔹 Apple (AAPL) – iPhone, Services, AI.</ListItem>
                <ListItem>🔹 Microsoft (MSFT) – Cloud, Enterprise AI, Recurring Revenue Machine.</ListItem>
                <ListItem>🔹 Google (GOOGL) – Search, AI, Digital Ads, YouTube.</ListItem>
                <ListItem>🔹 NVIDIA (NVDA) – AI Infrastructure, GPUs, Data Centers.</ListItem>
                <ListItem>🔹 Meta (META) – Digital Ads, Reels, AI-powered engagement.</ListItem>
                <ListItem>🔹 Tesla (TSLA) – EV, Robotics, AI-driven automation.</ListItem>
                <ListItem>🔹 Amazon (AMZN) – AWS, AI-driven commerce, Logistics.</ListItem>
                <ListItem>🔹 JPMorgan (JPM) – AI-driven finance and investment banking.</ListItem>
                <ListItem>🔹 Visa (V) – Digital payments, AI-powered risk analytics.</ListItem>
                <ListItem>🔹 Berkshire Hathaway (BRK.A) – The ultimate cash-flow compounding machine.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                These aren’t just stocks—they are the foundation of modern society and global commerce.
              </Text>
              <Heading size="sm" mt={4}>3.2 Monetizing Volatility: Sell the Wall 23/7/365</Heading>
              <Text mt={2}>
                Traditional funds make one fatal mistake: They leave money on the table.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 We don’t just hold assets—we make them work.</ListItem>
                <ListItem>📌 We systematically harvest premium through options strategies.</ListItem>
                <ListItem>📌 We generate perpetual income while maintaining long exposure to the best businesses in the world.</ListItem>
              </UnorderedList>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Sell Covered Calls – When volatility spikes, we sell rich premiums.</ListItem>
                <ListItem>✅ Sell Cash-Secured Puts – Get paid to buy great stocks at better prices.</ListItem>
                <ListItem>✅ Roll, Hedge, and Adapt – AI-driven execution adjusts dynamically to optimize profits.</ListItem>
                <ListItem>✅ Risk-Managed Execution – Ensure capital preservation, prevent margin blow-ups, and maintain absolute downside control.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                Annualized Target Yield: 15-25%+ on capital at risk.
              </Text>
              {/* Section 4 */}
              <Heading size="md" mt={6}>4. The Ultimate Risk-First Strategy</Heading>
              <Heading size="sm" mt={4}>4.1 Max Drawdown Control: SPX +/- 15%</Heading>
              <Text mt={2}>
                Most hedge funds ignore drawdowns—we engineer for them.
                Most investors react to crashes—we prepare for them.
                We ensure:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 Capital preservation in the worst market environments.</ListItem>
                <ListItem>📌 AI-driven risk overlays that dynamically hedge against downside shocks.</ListItem>
                <ListItem>📌 Adaptive exposure management that shifts risk dynamically based on market conditions.</ListItem>
              </UnorderedList>
              <Text mt={2}>We will never be caught off guard.</Text>
              <Heading size="sm" mt={4}>4.2 Sharpe Ratio, Sortino Ratio, and True Risk-Adjusted Returns</Heading>
              <Text mt={2}>
                Hushh Technologies does not optimize for raw returns—we optimize for efficiency of returns.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Sharpe Ratio &gt; 2.0 → Consistently generating high returns per unit of risk.</ListItem>
                <ListItem>✅ Sortino Ratio &gt; 3.0 → Ensuring downside risk is limited and controlled.</ListItem>
                <ListItem>✅ Capture Ratio &gt; 1.5 → Capturing more upside than downside consistently.</ListItem>
                <ListItem>✅ Rolling Alpha → Sustaining yield generation across market cycles.</ListItem>
              </UnorderedList>
              <Text mt={2}>
                Risk-adjusted alpha is the only alpha that matters.
              </Text>
              {/* Section 5 */}
              <Heading size="md" mt={6}>5. Scaling to $2.5B AUM: The Institutional Roadmap</Heading>
              <Text mt={2}>
                The beauty of our system? It scales.
              </Text>
              <UnorderedList mt={2} pl={5}>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 1:</Text> $100M AUM
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Prove Sell the Wall as a sustainable income engine.</ListItem>
                    <ListItem>📌 Optimize AI-driven execution models.</ListItem>
                    <ListItem>📌 Enhance tactical risk overlays to reinforce capital preservation.</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 2:</Text> $500M AUM
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Expand AI-first risk modeling and tactical overlays.</ListItem>
                    <ListItem>📌 Deploy automation for real-time hedging and trade execution.</ListItem>
                    <ListItem>📌 Enhance institutional-grade infrastructure for scaling to $2.5B+.</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  🚀 <Text as="span" fontWeight="bold">Phase 3:</Text> $2.5B AUM+
                  <UnorderedList mt={1} pl={5} style={{ listStyleType: 'none' }}>
                    <ListItem>📌 Fully AI-driven execution and automated risk optimization at scale.</ListItem>
                    <ListItem>📌 Institutional adoption and family office integrations.</ListItem>
                    <ListItem>📌 Scaling systematic investing across multiple global markets.</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>
              {/* Section 6 */}
              <Heading size="md" mt={6}>6. The Hushh Technologies Investment Philosophy</Heading>
              <Heading size="sm" mt={4}>6.1 Who We Are</Heading>
              <Text mt={2}>
                We are not Wall Street.
                <br />
                We are not gamblers.
                <br />
                We are not short-term traders.
                <br />
                We are engineers of sustainable alpha.
                <br />
                We are creators of perpetual income.
                <br />
                We are masters of risk-adjusted returns.
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>📌 We do not bet—we systematically extract value from the best companies in the world.</ListItem>
                <ListItem>📌 We do not chase—we build a machine that monetizes volatility every single week.</ListItem>
                <ListItem>📌 We do not suffer extreme drawdowns—our AI-first risk models prevent catastrophic losses.</ListItem>
              </UnorderedList>
              <Text mt={2}>This is the future of investing.</Text>
              <Heading size="sm" mt={4}>6.2 Who This Is For</Heading>
              <Text mt={2}>
                Hushh Technologies is built for investors who want:
              </Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ Perpetual cash flow from the best businesses on the planet.</ListItem>
                <ListItem>✅ Systematic, AI-driven risk-adjusted returns.</ListItem>
                <ListItem>✅ Downside protection while maintaining long exposure.</ListItem>
                <ListItem>✅ A next-generation hedge fund that maximizes efficiency and capital preservation.</ListItem>
              </UnorderedList>
              <Text mt={2} fontWeight="bold">Investor Profile:</Text>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🔹 Institutional investors & family offices seeking high-yield, risk-controlled strategies.</ListItem>
                <ListItem>🔹 High-net-worth individuals who need sustainable passive income.</ListItem>
                <ListItem>🔹 AI-first quant traders looking for scalable, algorithmically driven execution.</ListItem>
              </UnorderedList>
              {/* Section 7 */}
              <Heading size="md" mt={6}>7. Conclusion: The Future of Alpha & Aloha</Heading>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>✅ AI-driven, systematic, and risk-first.</ListItem>
                <ListItem>✅ Engineered to harvest premium while preserving capital.</ListItem>
                <ListItem>✅ Focused on the best FCF businesses, ensuring durability across all markets.</ListItem>
              </UnorderedList>
              <UnorderedList mt={2} pl={5} style={{ listStyleType: 'none' }}>
                <ListItem>🚀 This is the future of investing.</ListItem>
                <ListItem>🚀 This is the future of perpetual income.</ListItem>
                <ListItem>🚀 This is Hushh Technologies.</ListItem>
              </UnorderedList>
              <Text mt={4} fontWeight="bold">📢 Invest Today.</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default CommunitySection;

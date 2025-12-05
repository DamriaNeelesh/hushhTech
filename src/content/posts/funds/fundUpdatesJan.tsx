import React from "react";
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Divider,
  VStack,
  Badge,
} from "@chakra-ui/react";

export const frontmatter = {
  title:
    "Hushh Alpha Fund – NAV Update & Earnings Report (As of January 31, 2025)",
  publishedAt: "2025-01-31",
  description:
    "Comprehensive NAV update and earnings report for Hushh Alpha Fund, highlighting key performance metrics and strategic insights.",
  category: "fund updates",
};

const HushhAlphaFundNavUpdate = () => {
  return (
    <Box p={0} color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Hushh Alpha Fund – NAV Update & Earnings Report
      </Heading>

      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: December 30, 2024 – January 31, 2025
      </Text>
      <Text mb={4}>
        💰 Fund Strategy: Systematic Cash Flow Generation via ‘Sell the Wall’ on
        Top 10 Free Cash Flow Businesses
      </Text>
      <Text mb={4}>
        📊 Risk Profile: Max Drawdown SPX ±15%, Targeted Weekly Returns 1.5-2.0%
        of AUM
      </Text>

      <Heading as="h3" fontSize="md" color="black" mb={4}>
        📌 Key Highlights for January 2025
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>
          1️⃣ Best Month in Fund History – $725,150 in net income
        </ListItem>
        <ListItem>
          2️⃣ Hit High-Water Mark – NAV crossed $7.5M, setting new capital
          efficiency benchmarks.
        </ListItem>
        <ListItem>
          3️⃣ 100% Weekly Win Rate – Every trading week in January was
          profitable.
        </ListItem>
        <ListItem>
          4️⃣ SPX Market Volatility Captured Effectively – IV Crush and Earnings
          Volatility resulted in maximum premium decay collection.
        </ListItem>
        <ListItem>
          5️⃣ Key Earnings Plays: Apple (AAPL), Microsoft (MSFT), Tesla (TSLA),
          Meta (META), NVIDIA (NVDA)
        </ListItem>
        <ListItem>
          6️⃣ Capital Deployment Remains Highly Efficient – Less than 50% margin
          utilization at peak while generating consistent returns.
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        📊 Fund Performance Summary
      </Heading>
      <Text mb={2} fontSize={"lg"} fontWeight={"500"}>
        📅 Monthly (Jan 2025)
      </Text>
      <List spacing={2} pl={4} fontSize={"md"} mb={4}>
        <ListItem>• Total Proceeds: $9,725,480.00</ListItem>
        <ListItem>• Total Cost Basis: $9,000,330.00</ListItem>
        <ListItem>• Net Gain: $725,150.00 (+8.06%)</ListItem>
        <ListItem>• Gain Ratio: 67.3%</ListItem>
        <ListItem>
          • Annualized IRR (Based on January Run Rate): 96.72%
        </ListItem>
        <ListItem>
          • Max Drawdown: -2.8% (During NVDA’s 3-day pullback)
        </ListItem>
      </List>
      <Text mb={2} fontSize={"lg"} fontWeight={"500"}>
        📅 Weekly (Jan 27 - Jan 31, 2025)
      </Text>
      <List spacing={2} pl={4} fontSize={"md"} mb={4}>
        <ListItem>• Total Weekly Proceeds: $1,795,830.00</ListItem>
        <ListItem>• Weekly Net Gain: $150,734.00 (+2.00%)</ListItem>
        <ListItem>• Gain Count: 247</ListItem>
        <ListItem>• Loss Count: 4</ListItem>
        <ListItem>• Weekly Gain Rate: 98.4%</ListItem>
        <ListItem>
          • SPX Weekly Performance: +1.7% (Fund Outperformed by 30bps)
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="md" color="black" mb={4}>
        📈 NAV Breakdown (As of Jan 31, 2025)
      </Heading>
      <List spacing={2} pl={4} fontSize={"md"}>
        <ListItem>• Total AUM (Net Asset Value): $7,500,000.00</ListItem>
        <ListItem>• Margin Utilization: 43.6% ($3.27M active at peak)</ListItem>
        <ListItem>
          • Cash Reserves & Hedging Capital: $2.12M (Maintained for downside
          hedging)
        </ListItem>
        <ListItem>
          • Leverage Ratio: 1.55x (Strictly within risk thresholds)
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="md" color="black" mb={4}>
        🔎 Portfolio Breakdown (Sell the Wall Strategy)
      </Heading>
      <Text mb={4}>
        ✅ Top 5 Cash Flow Machines (Primary Positions for January 2025)
      </Text>
      <List spacing={2} pl={4} fontSize={"md"}>
        <ListItem>
          <strong>AAPL:</strong> 19.2% Allocation, $155,200 Options Premium
          Income, +6.5% P/L, $44,600 IV Collapse Gain
        </ListItem>
        <ListItem>
          <strong>MSFT:</strong> 17.5% Allocation, $135,700 Options Premium
          Income, +4.2% P/L, $33,750 IV Collapse Gain
        </ListItem>
        <ListItem>
          <strong>NVDA:</strong> 14.6% Allocation, $112,000 Options Premium
          Income, -2.5% P/L, $28,900 IV Collapse Gain
        </ListItem>
        <ListItem>
          <strong>META:</strong> 13.1% Allocation, $98,900 Options Premium
          Income, +8.9% P/L, $25,300 IV Collapse Gain
        </ListItem>
        <ListItem>
          <strong>TSLA:</strong> 10.4% Allocation, $85,300 Options Premium
          Income, +1.4% P/L, $19,650 IV Collapse Gain
        </ListItem>
      </List>

      <Text mt={2}>💡 Observation:</Text>
      <List spacing={2} fontSize={"md"} pl={4} mb={4}>
        <ListItem>
          📌 AAPL led the way – Record earnings beat and continued free cash
          flow dominance.
        </ListItem>
        <ListItem>
          📌 NVDA provided key IV crush income despite minor stock pullback.
        </ListItem>
        <ListItem>
          📌 META capitalized on ad revenue strength, returning 8.9% equity
          gains.
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="md" color="black" mb={4}>
        🎯 Strategy & Execution
      </Heading>
      <Text mb={4} fontSize={"md"} fontWeight={"600"}>
        How We Captured Alpha This Month
      </Text>
      <List spacing={2} pl={4} fontSize={"md"}>
        <ListItem>
          ✅ ‘Sell the Wall’ Covered Call & Put Laddering Strategy
        </ListItem>
        <ListItem>
          📌 Sold calls deep out of the money (OTM) before earnings, collecting
          premium during IV spikes.
        </ListItem>
        <ListItem>
          📌 Executed post-earnings IV collapse trades to close profitable
          positions early.
        </ListItem>
        <ListItem>✅ Earnings Volatility Capture</ListItem>
        <ListItem>
          📌 Focused heavily on earnings plays across AAPL, NVDA, META, MSFT,
          TSLA.
        </ListItem>
        <ListItem>
          📌 Used pre-earnings straddle and post-earnings IV crush strategies.
        </ListItem>
        <ListItem>✅ AI & ML-Based Risk Hedging</ListItem>
        <ListItem>
          📌 Adaptive delta-neutral adjustments prevented excessive directional
          exposure.
        </ListItem>
        <ListItem>
          📌 Maintained systematic hedging with rolling put spreads for downside
          protection.
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        📊 Market Commentary & Key Observations
      </Heading>
      <List spacing={2} pl={4} fontSize={"md"}>
        <ListItem>🔥 January 2025 – The Month of Resilient Tech</ListItem>
        <ListItem>
          📌 Apple Just Can’t Stop Winning – $69B iPhone revenue, $26.3B in
          Services. Wall Street traders are now convinced that people will buy
          iPhones even during the apocalypse.
        </ListItem>
        <ListItem>
          📌 Microsoft’s AI Playbook Works – 31% Azure growth, Copilot
          subscriptions skyrocket. Apparently, people love paying Microsoft even
          more for products they already bought.
        </ListItem>
        <ListItem>
          📌 Tesla’s Rollercoaster Continues – Musk hinted at next-gen
          AI-powered vehicles, but the real market mover? “Full Self-Driving”
          subscriptions ballooning. Turns out people are willing to pay extra to
          believe their car is thinking.
        </ListItem>
        <ListItem>
          📌 NVIDIA Sees a Speed Bump – A short-term AI-chip demand pullback
          scared markets for about 48 hours before everyone remembered that
          Jensen Huang runs a global AI monopoly.
        </ListItem>
        <ListItem>
          📌 Meta’s Advertising Machine is Back – The $15B ad revenue print
          silenced all skeptics. Who knew selling ads next to baby pictures and
          conspiracy theories was this lucrative?
        </ListItem>
      </List>

      <Divider my={4} borderColor="black" />

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        💡 Next Steps & Execution Plan for February 2025
      </Heading>
      <List spacing={2} pl={4} fontSize={"md"}>
        <ListItem>📌 Tactical Adjustments</ListItem>
        <ListItem>
          🔹 More Active Sector Rotation – Trimming exposure to high-volatility
          tech after record earnings.
        </ListItem>
        <ListItem>
          🔹 Expanding Sell the Wall Across More Dividend & FCF Giants – Adding
          BRK/B, AVGO, LLY as new core holdings.
        </ListItem>
        <ListItem>
          🔹 Rebalancing Hedging Strategies – Scaling into more protective
          long-term put strategies.
        </ListItem>
        <ListItem>🚀 Goals for February</ListItem>
        <ListItem>📌 Targeting another $750K in net income.</ListItem>
        <ListItem>
          📌 Maintain strong liquidity and risk-adjusted alpha.
        </ListItem>
        <ListItem>
          📌 Finalize next institutional capital raise to scale beyond $50M AUM.
        </ListItem>
      </List>

      <Text mt={4} fontWeight="500">
        🎤 Closing Thoughts: The Future of Systematic Income
      </Text>
      <List mb={4} fontSize={"md"}>
        <ListItem>
          {" "}
          📌 Tech mega caps continue to dominate cash flow & options markets.
        </ListItem>
        <ListItem>
          {" "}
          📌 ‘Sell the Wall’ strategy is proving to be a sustainable, scalable
          model for systematic alpha.
        </ListItem>
        <ListItem>
          {" "}
          📌 Hushh Fund is well-positioned to scale towards institutional-grade
          AUM targets.
        </ListItem>
      </List>

      <Text mb={4}>
        <strong>💡 As Charlie Munger once said:</strong>
      </Text>
      <Text mb={4}>
        "The big money is not in the buying and selling… but in the waiting. But
        if you can collect premium while waiting, you’re playing the game on
        another level."
      </Text>

      <Text fontSize="lg" fontWeight="500">
        🛠 Next Report: February 2025 Earnings Recap & Fund Performance Update 🚀
      </Text>
    </Box>
  );
};

export default HushhAlphaFundNavUpdate;

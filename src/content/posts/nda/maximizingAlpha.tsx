import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider } from '@chakra-ui/react';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

const MaximizingAlpha = () => {
  return (
    <Box color="black" borderRadius="md">

      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Maximizing Alpha: Advanced Strategies for Selling the Wall on Apple (AAPL)
      </Heading>
      
      <Text mb={4}>
        Prepared for Manish Sainani | Alpha Aloha Fund
      </Text>
      <Text mb={4}>
        Date: February 10, 2025
      </Text>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Overview of the AAPL Position</Heading>
      <List spacing={2} pl={4}>
        <ListItem>• Total Delta Long Exposure: 22,000</ListItem>
        <ListItem>• Liquid AAPL Shares Held: 11,072</ListItem>
        <ListItem>• Core Strategy: Sell the Wall—Maximizing weekly rental income by systematically selling covered calls and cash-covered puts at optimal strike levels.</ListItem>
        <ListItem>• Objective: Convert delta long exposure into sustained cash flow while maintaining core ownership of AAPL as an asset we always want on our books.</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy 1: Laddering Covered Calls for Maximum Premium Extraction</Heading>
      <Text mb={4}>
        Objective: Generate consistent weekly/monthly premium while ensuring optimal roll opportunities and preserving long-term upside.
      </Text>
      <Text mb={4}>
        Execution Plan:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>1. Strike Selection:</ListItem>
        <ListItem>• ATM to Slightly OTM (2-5%): Target high-implied-volatility zones for maximum premium.</ListItem>
        <ListItem>• Rolling Methodology: Always stay 1-2 weeks ahead of expiration to avoid early assignment risk and maximize time decay income.</ListItem>
        <ListItem>2. Expiration Selection:</ListItem>
        <ListItem>• Near-Term (1W-2W): Higher decay (theta) + higher IV plays.</ListItem>
        <ListItem>• Monthly (4-5W out): Larger premiums with rollover flexibility.</ListItem>
        <ListItem>3. Position Sizing:</ListItem>
        <ListItem>• Short-Term (1W-2W) Calls → 40-50% of Liquid Stock (~5,500 Shares)</ListItem>
        <ListItem>• Mid-Term (1M) Calls → 25% of Liquid Stock (~2,750 Shares)</ListItem>
        <ListItem>• Hedged Buffer (Hold for Delta Hedging) → Remaining 25% (~2,750 Shares)</ListItem>
        <ListItem>4. Rolling Triggers:</ListItem>
        <ListItem>• Roll Up if AAPL rallies 2-3% above current strike.</ListItem>
        <ListItem>• Roll Out if IV spikes near expiration (e.g., pre-earnings, FOMC).</ListItem>
        <ListItem>• Close at 50-75% Premium Capture to avoid gamma risk in the final days.</ListItem>
      </List>
      <Text mb={4}>
        Income Target:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Weekly Premium Target: $1.00 - $2.50 per contract = $11K - $27.5K/week</ListItem>
        <ListItem>• Monthly Premium Target: $4.00 - $6.00 per contract = $44K - $66K/month</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy 2: Enhancing Returns with Cash-Secured Puts</Heading>
      <Text mb={4}>
        Objective: Utilize cash reserves ($5.1M) to sell OTM puts on AAPL, allowing entry at a discount OR capturing premium if unassigned.
      </Text>
      <Text mb={4}>
        Execution Plan:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>1. Strike Selection:</ListItem>
        <ListItem>• 5-10% Below Current Price: Safe entry levels with juicy premium.</ListItem>
        <ListItem>• ATM Short-Term Puts for High Volatility Periods: Quick income capture.</ListItem>
        <ListItem>2. Expiration Selection:</ListItem>
        <ListItem>• 1W-2W Puts (High IV) → Fast time decay (theta).</ListItem>
        <ListItem>• 1M Puts (Lower IV, Defensive Play) → Hedge against market dips.</ListItem>
        <ListItem>3. Position Sizing:</ListItem>
        <ListItem>• Allocate $1.5M - $2.5M for cash-secured puts.</ListItem>
        <ListItem>• Target 20-30 put contracts weekly at 5-10% OTM strikes.</ListItem>
        <ListItem>4. Rolling Triggers:</ListItem>
        <ListItem>• Close at 50-75% Premium Capture.</ListItem>
        <ListItem>• Roll Down & Out if AAPL dips 5%+ unexpectedly.</ListItem>
      </List>
      <Text mb={4}>
        Income Target:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>• Weekly Put Premium: $15K - $30K/week</ListItem>
        <ListItem>• Monthly Put Premium: $60K - $120K/month</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Strategy 3: Delta Hedging with Vertical Spreads</Heading>
      <Text mb={4}>
        Objective: Hedge potential AAPL declines while keeping an optimal long delta position.
      </Text>
      <Text mb={4}>
        Execution Plan:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>1. Sell Near-Term Call Credit Spreads (Bearish Hedge)</ListItem>
        <ListItem>• Example: Sell $195C / Buy $200C</ListItem>
        <ListItem>• Target Income: ~$0.80 - $1.20 per contract.</ListItem>
        <ListItem>• Contracts: 100-200 contracts per week for $8K - $24K in hedge income.</ListItem>
        <ListItem>2. Buy Protective Puts with a Fraction of Call Premiums</ListItem>
        <ListItem>• Example: Buy $175P LEAPS (1Y Out) with 5% of call premium income.</ListItem>
        <ListItem>• Purpose: Covers catastrophic downside risk.</ListItem>
        <ListItem>• Expected Cost: ~$10K per month from put hedging.</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Total Expected Weekly & Monthly Income</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Strategy</strong></ListItem>
        <ListItem>Weekly Income Target</ListItem>
        <ListItem>Monthly Income Target</ListItem>
        <ListItem>Covered Calls (50-75% Allocation)</ListItem>
        <ListItem>$11K - $27.5K</ListItem>
        <ListItem>$44K - $66K</ListItem>
        <ListItem>Cash-Secured Puts</ListItem>
        <ListItem>$15K - $30K</ListItem>
        <ListItem>$60K - $120K</ListItem>
        <ListItem>Credit Spreads (Hedging Income)</ListItem>
        <ListItem>$8K - $24K</ListItem>
        <ListItem>$32K - $96K</ListItem>
        <ListItem>Total Expected Income</ListItem>
        <ListItem>$34K - $81.5K</ListItem>
        <ListItem>$136K - $282K</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Risk Considerations</Heading>
      <List spacing={2} pl={4}>
        <ListItem>1. Market Sell-Off (AAPL Drops 10%+):</ListItem>
        <ListItem>• Protective put hedging activates to absorb losses.</ListItem>
        <ListItem>• Cash reserves allow rolling down CSPs to enter lower.</ListItem>
        <ListItem>2. Assignment Risk (Calls Exercised Early):</ListItem>
        <ListItem>• Roll before assignment by closing or rolling up/out.</ListItem>
        <ListItem>• Maintain 50% of shares unencumbered for flexibility.</ListItem>
        <ListItem>3. Liquidity Shocks (IV Collapse or Spike):</ListItem>
        <ListItem>• Adjust strike selection dynamically to exploit volatility.</ListItem>
      </List>
      
      <Heading as="h3" fontSize="lg" color="black" mb={4}>Conclusion</Heading>
      <Text mb={4}>
        By optimizing covered calls, cash-secured puts, and delta hedging strategies, we can systematically extract $136K - $282K in monthly premium from our AAPL position without giving up long-term ownership. This ensures we maximize alpha while maintaining robust risk management and continue leveraging AAPL as a core rental and long-term hold asset.
      </Text>
      <Text mb={4}>
        Let’s Sell the Wall and Own the Best.
      </Text>
      <Text mb={4}>
        🚀 Onward! 🚀
      </Text>
    </Box>
  );
};

export default MaximizingAlpha;
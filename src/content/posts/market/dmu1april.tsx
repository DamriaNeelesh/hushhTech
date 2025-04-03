import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image } from '@chakra-ui/react';

const dmu1april = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 1 April 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot Q2 Day 1 - April 1, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        Dear Partners,
      </Text>
      <Text fontSize="lg" mb={4}>
        Welcome to the first trading day of Q2—where springtime optimism faces off against a swirl of global worries: tariffs, inflation, interest-rate jitters, the U.S. deficit on an upward spiral, and fresh commentary from Goldman Sachs proclaiming a 35% chance of recession. It's a classic scene out of a Charlie Munger and Warren Buffett novel: markets fret about every macro threat, while a few strong businesses just keep compounding.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        1. Fund Performance YTD (through March 31, 2025)
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Net Gain: +3.65% (short-term gains) since January 1</ListItem>
        <ListItem>Total Gains vs. Losses: Gains of $2.63M vs. $1.04M in losses</ListItem>
        <ListItem>Transaction Metrics:</ListItem>
        <ListItem pl={4}>Average Gain: +10.52%</ListItem>
        <ListItem pl={4}>Average Loss: -5.59%</ListItem>
        <ListItem pl={4}>Win Rate: ~91.59% (4509 wins / 414 losses)</ListItem>
        <ListItem pl={4}>Net Liquidating Value: ~$4.95M</ListItem>
      </List>
      <Text mb={4}>
        Our "alpha + aloha" approach continues to churn out stable short-term wins (thanks in large part to covered calls and put-selling on big free-cash-flow names). We're staying hungry and staying foolish—fearless in the face of daily volatility, yet disciplined about picking only our best shots.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        2. Market in a Nutshell
      </Heading>
      <Text mb={4}>
        <strong>a) Tariffs, Inflation, and Rates</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Tariffs: Renewed talk of U.S. trade restrictions rattled supply chains yet again. Short-term volatility? Yes. But from a our perspective, we see "occasional storms" as a chance to "buy more hamburgers cheaper." 😝</ListItem>
        <ListItem>Inflation & Interest Rates: We're still in a delicate spot. The Fed signaled caution, yet unemployment data remains robust. Our portfolio's big-tech moats can handle moderate inflation, and we keep an eye out for any short-term bond or TIPS trades if yields spike.</ListItem>
      </List>

      <Text mb={4}>
        <strong>b) U.S. Deficit & Potential Recession</strong>
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>Deficit: Large deficits can complicate future interest rates. However, as Charlie Munger would caution, "Don't bet against America in the long run." We remain cautious about leverage but see no reason to panic-sell.</ListItem>
        <ListItem>Goldman's 35% Recession Odds: A year ago, folks said the same or higher percentages. The best businesses power through. We keep a slice of hedges in the event the "worse case" hits, but at the end of the day, we're building positions in unstoppable free-cash-flow companies that can ride out a cyclical slowdown.</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        3. Portfolio Perspectives & Moves
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>
          <strong>1. Sell-the-Wall Tactics:</strong> We continue collecting weekly premiums on names like Apple, Alphabet, Tesla, and NVDA. Yes, markets might bounce around on inflation or tariff news, but that short-term fear is exactly our weekly "rent check."
        </ListItem>
        <ListItem>
          <strong>2. Select Growth:</strong> Our Ultra 10 pipeline remains strong in AI-driven retail solutions and next-gen robotics. We're not overextending. If a recession materializes, better valuations could be ahead; we keep dry powder for that scenario.
        </ListItem>
        <ListItem>
          <strong>3. Cash & Margin:</strong> Net Liq stands near $4.95M and we have a little over $3M in cash and sweep reserves invested in short term us treasuries that pay us over 5% yield on sitting on our hands 🙌. We maintain moderate margin usage (~$9.2M portfolio) for optionality.
        </ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        4. "Springtime" Outlook
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Bullish on Innovation: The AI revolution doesn't care about a 6-month policy shift. We keep forging deeper into big-data IP, hushh.ai, and moat-like free-cash-flow beasts.</ListItem>
        <ListItem>Hedging Recession: We do hold index puts or inverse positions in small measure. If a recession hits, we'll buy panic cheaply.</ListItem>
        <ListItem>Daily Waves: As Steve Jobs would say, "Focus and simplicity" often yield the best results. We're ignoring day-to-day noise and zeroing in on companies whose fundamentals blow away ephemeral macro drama and while doing that we have managed to roll in $1.59M in realized gains - adding to our cash 💵 pile</ListItem>
      </List>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        5. Closing Thoughts
      </Heading>
      <List spacing={2} pl={4}>
        <ListItem>Performance: +3.65% net YTD is a comfortable start, especially in this climate.</ListItem>
        <ListItem>Market Anxiety: Tariffs, deficits, and rate hikes remain short-term storms—"no big deal if you have a fortress portfolio," to paraphrase Buffett.</ListItem>
        <ListItem>Our Strategy: We keep collecting "rent" from volatility while positioning for leaps in AI-driven growth. Over time, that synergy aims to produce steady compounding.</ListItem>
        <ListItem>Stay the Course: Q2 might be a bit choppier if recession talk grows. But as we all know, The big money is not in the buying or the selling, but in the waiting.</ListItem>
      </List>

      <Text mb={4}>
        Thank you for your trust. We'll continue blending a calm, rational mindset with opportunistic trades to serve your capital best—through inflation, tariff talk, or any "35% chance of an impending recessionary talks." If you have any questions or want a deeper dive on specific holdings, we're here.
      </Text>

      <Text mb={4}>
        Warm regards,<br />
        Manish
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>
    </Box>
  );
};

export default dmu1april;
import React from 'react';
import { Box, Text, Heading, VStack, Divider, List, ListItem } from '@chakra-ui/react';
import MarketUpdateGallery from '../../../components/MarketUpdateGallery';

const Dmu4mar = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund — March 4, 2025 Market & Fund Performance Recap
      </Heading>

      <Divider my={4} borderColor="black" />

      <VStack align="start" spacing={4}>
        <Text fontWeight="500">
          Aloha, Alphas! 🌊🚀
        </Text>

        <Text>
          Another day, another bag of premium scooped from the market's indecision. The Sell the Wall Aloha Program is printing like a dream, and we're marching towards our first $1M in 2025 Aloha income. That's right—by the end of this month, we'll likely be crossing that milestone.
        </Text>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          📊 Daily Market Recap: March 4, 2025
        </Heading>
        <List spacing={2}>
          <ListItem>• Dow Jones: -1.55% (the boomers are shook)</ListItem>
          <ListItem>• S&P 500: -1.22% (honestly, just a dip to buy)</ListItem>
          <ListItem>• NASDAQ: -0.36% (big tech held up, barely)</ListItem>
          <ListItem>• Volatility? Yup. The market tried to shake us, but we love selling insurance on fear.</ListItem>
        </List>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          💰 Fund Performance Highlights (March 4, 2025)
        </Heading>
        <List spacing={2}>
          <ListItem>• Net Liquidating Value (NLV): $5.312M</ListItem>
          <ListItem>• Net Asset Value (NAV): $9.229M</ListItem>
          <ListItem>• Cash & Sweep Vehicle: $6.208M</ListItem>
          <ListItem>• Daily Aloha Income: $24,554.58 (from 8/8 winning rolls of Sell The Wall program, 100% gain rate)</ListItem>
          <ListItem>• Gain/Loss Ratio: 100% win rate today (yes, we'll take that W)</ListItem>
          <ListItem>• YTD Aloha Income: $980,309.72 (New High Water Mark 💦💰)</ListItem>
        </List>

        <Text>
          This puts us in striking distance of hitting $1M in 2025 premium income, and we're just getting warmed up.
        </Text>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          ⚡️ Trading & Strategy Notes
        </Heading>
        <Text>
          It was a super choppy day. Delta exposure was all over the place, and the hedging game was on overdrive. RSI and volatility swings gave us multiple opportunities to roll our positions, keeping the theta burn working in our favor while making sure we remained delta-neutral.
        </Text>
        <Text>
          👉 Key Takeaway? On days like today, automation is king. Manually keeping delta balanced is a workout, but with the right execution model, we'll be extracting even more Aloha income from pure delta hedging and RSI-driven roll decisions.
        </Text>
        <Text>
          We absolutely love selling the wall. It's like getting paid to let the market be wrong for a little longer. 😝
        </Text>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          📈 Market Insights & Humor of the Day
        </Heading>
        <List spacing={2}>
          <ListItem>• "The Dow dropped 1.5%" → You mean it's on sale? Let's be real, nobody should be panicking. We'll happily sell puts on the dip and roll them into even more Aloha income.</ListItem>
          <ListItem>• "Tech stocks held up better than expected" → That's cute. Meanwhile, we're rolling call walls and cashing theta checks like it's our job.</ListItem>
          <ListItem>• "The Fed still hasn't figured out what it's doing" → Fantastic. That means volatility stays juicy, and we keep selling insurance to the indecisive traders.</ListItem>
        </List>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          💡 Looking Ahead
        </Heading>
        <List spacing={2}>
          <ListItem>1. Scaling Up the Strategy: Now that we're nearly at $1M in 2025 Aloha Income, we'll start deploying more capital into delta-hedged premium strategies. More cash-secured puts. More call walls. More premium.</ListItem>
          <ListItem>2. Refining the Automation: We already know that rolling the wall is a cash machine. Next up: scaling the automated delta hedging system to squeeze every last drop of inefficiency out of the market.</ListItem>
          <ListItem>3. Hitting $2M in Premiums by Mid-Year: It's not just about income—it's about reinvestment. The Aloha income is compounding back into BRK.B, AAPL, and GOOGL, and every roll builds a bigger foundation for the strategy.</ListItem>
        </List>

        <Heading as="h3" fontSize="lg" color="black" mt={4}>
          🏆 Closing Thoughts
        </Heading>
        <List spacing={2}>
          <ListItem>Mission for March: Break $1M in collected premium.</ListItem>
          <ListItem>Big Picture: Keep stacking gains, rolling smart, and playing this game like we're Renaissance 2.0.</ListItem>
          <ListItem>Mood Today: When the market panics, we smile and sell more options. 😎</ListItem>
        </List>

        <Text mt={4}>
          That's the update for today, Alphas. Keep stacking. Keep compounding. See you at the next high-water mark. 🚀
        </Text>

        <Text>
          Xo xo,<br />
          Manish
        </Text>
      </VStack>

      <Divider my={4} borderColor="black" />

      <MarketUpdateGallery 
        date="dmu4mar" 
        title="Supporting Charts & Data"
      />
    </Box>
  );
};

export default Dmu4mar;
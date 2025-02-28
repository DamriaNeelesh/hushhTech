import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';

const Dmu26Feb = () => {
  return (
    <Box p={4} color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Aloha Alpha Fund – Daily Market & Performance Update (February 26, 2025)
      </Heading>
      <Text mb={4} fontSize="lg">
        Written in Bill Ackman candor <em>written by AI with our founder training it over time on hushh</em>
      </Text>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Introductory Note
      </Heading>
      <Text mb={4}>
        Our overarching priority is to invest in extraordinary businesses underpinned by robust fundamentals, while employing prudent hedging and option-selling strategies to capture recurring income. Today’s results, supported by significant volatility around Nvidia’s earnings announcement, reaffirm our discipline and highlight the ongoing prospects for generating both sustainable returns and prudent risk management.
      </Text>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Market Context & Nvidia Earnings
      </Heading>
      <List spacing={2} mb={4}>
        <ListItem>
          • Nvidia (NVDA) reported outstanding results after the bell, confirming their leadership in AI and data center technologies. However, the stock’s subsequent after-hours movement has been relatively subdued, an outcome we anticipated given the market’s lofty expectations.
        </ListItem>
        <ListItem>
          • Volatility Outlook: Higher implied volatility leading into the announcement provided the Fund an optimal window to sell calls (our “Sell the Wall” strategy), securing notable premium. Whether NVDA gaps up or remains flat in the coming sessions, we’ve effectively monetized fear-driven pricing, preserving upside through rolling if needed.
        </ListItem>
      </List>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Fund Performance & Key Highlights
      </Heading>
      <List spacing={2} mb={4}>
        <ListItem>
          1. Net Gains YTD: We have now realized $735,246.99 in net income thus far in 2025—outperforming the broader market’s more muted progress.
        </ListItem>
        <ListItem>
          2. New High-Water Mark: Our NAV stands at $8.926M, the highest level this year. While pleasing, we remain committed to maintaining a conservative underwriting process and disciplined approach to risk.
        </ListItem>
        <ListItem>
          3. Cash & Sweep: Holding $8.368M in ready capital, we are positioned to capitalize on opportunities arising from potential mispricing or overreactions, whether from earnings or macro developments.
        </ListItem>
        <ListItem>
          4. Option “Rent” Income: Consistent option-selling has produced strong recurring “rental income.” In periods such as these, when volatility spikes around events like Nvidia’s release, the yield on our calls increases markedly, contributing to both cash flow and downside risk mitigation.
        </ListItem>
      </List>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Navigating Risk & Delta Exposures
      </Heading>
      <Text mb={4}>
        We employ hedging methods designed to limit excessive exposures while allowing the Fund to benefit from the upward trajectory of high-quality equity holdings. This discipline was particularly evident in the run-up to Nvidia’s results, where we captured elevated call premiums without overextending net long risk. Our approach is as follows:
      </Text>
      <List spacing={2} mb={4}>
        <ListItem>
          • Selling Calls at Elevated Implied Volatility: By selling calls on NVDA prior to earnings, we extracted substantial premium while preserving the option to roll up if the stock surges, thus retaining a portion of potential upside.
        </ListItem>
        <ListItem>
          • Balanced Core Holdings: Alongside selective hedging, we continue to hold free cash flow stalwarts such as Apple, Tesla, Google, and Berkshire Hathaway. Any moderate pullbacks in these names are typically offset by the collected option premiums, fortifying our net returns.
        </ListItem>
      </List>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Forward-Looking Considerations
      </Heading>
      <List spacing={2} mb={4}>
        <ListItem>
          1. Near-Term Outlook: Upcoming economic data—particularly relating to inflation—may trigger additional volatility. We plan to maintain an adequate cash reserve to purchase assets if the market responds irrationally.
        </ListItem>
        <ListItem>
          2. Earnings Continuation: As the tail end of earnings season approaches, any isolated corporate disappointments could create attractive entry points.
        </ListItem>
        <ListItem>
          3. Strategic Discipline: While reaching a new high-water mark is commendable, our mission centers on consistent compounding of returns. We do not deviate from this strategy to chase short-lived gains.
        </ListItem>
      </List>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Final Remarks
      </Heading>
      <Text mb={4}>
        We consider these strong results to be an outgrowth of focused underwriting principles combined with measured option-based monetization. The stability of our cash position, disciplined investment posture, and proven methodology for capturing event-driven premiums position the Aloha Alpha Fund for enduring performance in a wide range of market conditions. I remain optimistic about the future, confident in our capacity to manage downside risk while pursuing exceptional long-term returns for our investors.
      </Text>
      <Text mb={4}>
        — The Aloha Alpha Fund Team
      </Text>
      <Divider my={4} borderColor="black" />
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Content with Actuals
      </Heading>
      <List spacing={2} mb={4}>
        <ListItem>
          Mark to Market: Up 1.46% for day
        </ListItem>
        <ListItem>
          Daily Aloha Income: Sell the Wall in execution delivering $36,738.83/- in 47/48 winners of rolling the walls today.
        </ListItem>
        <ListItem>
          The gains for YTD are $735,246.99 with a baseline or $8.926M as the nominal value of the fund value and NAV and cash and sweep at: $8.368M in real cash for deployment yes 🙌 🙌
        </ListItem>
        <ListItem>
          Celebrate the new high mark in NAV CASH and Net Income for 2025 🙌
        </ListItem>
        <ListItem>
          131 confirmed fills
        </ListItem>
        <ListItem>
          65 cancelled and rejected fills
        </ListItem>
        <ListItem>
          2 working orders
        </ListItem>
      </List>
    </Box>
  );
};

export default Dmu26Feb;
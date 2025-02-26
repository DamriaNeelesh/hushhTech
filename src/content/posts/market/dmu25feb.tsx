import React from 'react';
import { Box, Image,Text, Heading, List, ListItem } from '@chakra-ui/react';
import m1 from '../../../components/images/market-updates/dmu25feb/m1.png';
import m2 from '../../../components/images/market-updates/dmu25feb/m2.png';
import m3 from '../../../components/images/market-updates/dmu25feb/m3.png';
import m4 from '../../../components/images/market-updates/dmu25feb/m4.png';
import m5 from '../../../components/images/market-updates/dmu25feb/m5.png';
import m6 from '../../../components/images/market-updates/dmu25feb/m6.png';
import m7 from '../../../components/images/market-updates/dmu25feb/m7.png';
import m8 from '../../../components/images/market-updates/dmu25feb/m8.png';
import m9 from '../../../components/images/market-updates/dmu25feb/m9.png';

const dmu25feb = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Aloha Alpha Fund – Daily Update
      </Heading>
      <Text mb={4} fontSize={{md:"lg",base:'sm'}}>
        <strong>Date:</strong> Monday, Feb 24, 2024<br />
        <strong>Prepared For:</strong> Internal Review & Investor Communication<br />
        <strong>Author:</strong> Manish S. (Founder & Portfolio Strategist)
      </Text>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        Summary:
      </Heading>
      <Heading as="h4" fontSize="md" mb={2} color="black">
        # Market Backdrop
      </Heading>
      <List spacing={2} mb={4} fontSize={{md:"lg",base:'sm'}}>
        <ListItem>-3.96% decline in fund's mark-to-market value</ListItem>
        <ListItem>Net delta long in a choppy environment</ListItem>
      </List>
      <Heading as="h4" fontSize="md" mb={2} color="black">
        # Fund Highlights
      </Heading>
      <List spacing={2} mb={4} fontSize={{md:"lg",base:'sm'}}>
        <ListItem>Generated $72,784.78 in "aloha income" from rolling and selling calls/puts</ListItem>
        <ListItem>YTD short-term gains: $765,465.59</ListItem>
        <ListItem>92.70% overall success rate across 2,548 trades</ListItem>
      </List>
      <Heading as="h4" fontSize="md" mb={2} color="black">
        # Strategy Insights
      </Heading>
      <List spacing={2} mb={4} fontSize={{md:"lg",base:'sm'}}>
        <ListItem>Rolled calls on BRK.B, NIO, and NVDA</ListItem>
        <ListItem>Adjusted hedges for NVDA earnings</ListItem>
        <ListItem>Embracing volatility with "Sell the Wall" strategy</ListItem>
      </List>
      <Heading as="h4" fontSize="md" mb={2} color="black">
        # Closing Perspective
      </Heading>
      <List spacing={2} mb={4} fontSize={{md:"lg",base:'sm'}}>
        <ListItem>Focus on owning best FCF machines, renting out price movement, and reinvesting premium</ListItem>
        <ListItem>Building a machine-like approach to generate alpha</ListItem>
      </List>
      <Heading as="h4" fontSize="md" mb={2} color="black">
        # Looking Ahead
      </Heading>
      <List spacing={2} mb={4} fontSize={{md:"lg",base:'sm'}}>
        <ListItem>NVDA earnings after close tomorrow</ListItem>
        <ListItem>Continuing to roll and capture implied volatility</ListItem>
        <ListItem>Long-term plan: "own the best, rent the rest"</ListItem>
      </List>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        Detailed Report 👇
      </Heading>
      <Text mb={4} fontSize={{md:"lg",base:'sm'}}>
        {/* Insert the detailed report content here, following the same structure as above */}
      </Text>
      <Text mb={4} fontSize={{md:"md",base:'sm'}} color="gray.500">
        Xo xo,<br />
        Manishushh<br />
        Founder & Portfolio Strategist, 🤫 Aloha Alpha Fund
      </Text>
      <Text fontSize={{md:"md",base:'sm'}} color="gray.500">
        Disclaimer: All performance metrics reported are net of fees and best estimates as of market close. Past performance does not guarantee future results. This commentary is for internal review & investor communication only, not an offer to sell or a solicitation of an offer to buy securities. We remain fully compliant with SEC & ADGM regulations. Proceed with caution, do your own due diligence, and never bet the farm.
      </Text>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Image src={m1} alt="Market Update Screenshot 1"  m={2} />
        <Image src={m2} alt="Market Update Screenshot 2"  m={2} />
        <Image src={m3} alt="Market Update Screenshot 3"  m={2} />
        <Image src={m4} alt="Market Update Screenshot 4" m={2} />
        <Image src={m5} alt="Market Update Screenshot 5" m={2} />
        <Image src={m6} alt="Market Update Screenshot 6"  m={2} />
        <Image src={m7} alt="Market Update Screenshot 7" m={2} />
        <Image src={m8} alt="Market Update Screenshot 8" m={2} />
        <Image src={m9} alt="Market Update Screenshot 9"  m={2} />
      </Box>
    </Box>
  );
};

export default dmu25feb;
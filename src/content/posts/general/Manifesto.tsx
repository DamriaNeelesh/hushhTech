import React from 'react';
import { Box, Text, Heading,Image, List, ListItem, Divider, Badge, VStack, UnorderedList } from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/1_Manifesto.jpg'

export const frontmatter = {
  title: "Hushh Technologies Manifesto",
  publishedAt: "2025-01-28",
  description: "Hushh Technologies Manifesto: The Future of Systematic AI-Driven Income Investing.",
  category: "general"
};

const Manifesto: React.FC = () => {
  return (
    <Box  color="black" borderRadius="md" >
                    <Image src={MarketUpdate} alt="Funds Update" mb={4} borderRadius="md" />

      <Heading as="h2" fontSize="2xl" mb={4} color="black.300">
        Hushh Technologies Manifesto
      </Heading>
      <Text fontSize="lg" mb={4}>
        The Future of Systematic AI-Driven Income Investing
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={2}>1. Introduction: Why We Exist</Heading>
      <Text mb={4}>
        The financial markets are filled with inefficiencies, and the traditional asset management industry is plagued by outdated models, excessive fees, and risk-laden strategies that fail to protect investors. Hushh Technologies was founded to rewrite the rules of investing.
      </Text>
      <UnorderedList spacing={2}>
        <ListItem>We are not here to speculate.</ListItem>
        <ListItem>We are not here to chase returns.</ListItem>
        <ListItem>We systematically extract alpha while controlling risk—every second, every day, every year.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>2. Our North Star: A New Era of Wealth Creation</Heading>
      <List spacing={2}>
        <ListItem><strong>Our Vision:</strong> A financial system where investors generate sustainable, perpetual income while remaining long the greatest businesses in the world.</ListItem>
        <ListItem><strong>Our Mission:</strong> To create an AI-powered, risk-first investment platform that continuously monetizes volatility, capitalizes on human behavior, and maximizes free cash flow yield.</ListItem>
        <ListItem><strong>Our Strategy:</strong> Own the best of the best – AI-first, high-FCF, dividend-growing businesses. Sell the Wall – Monetize volatility in liquid, high-premium stocks. Maximize income while controlling risk – A hedge fund that prioritizes alpha and capital preservation. Risk-adjusted alpha – Not just absolute returns, but superior returns per unit of risk.</ListItem>
      </List>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>3. The Engine: AI, Systematic Trading, and Free Cash Flow</Heading>
      <Text mb={4}>Our strategy is powered by AI-driven execution and deep quantitative modeling.</Text>

      <Heading as="h4" fontSize="md" color="gray.900" mb={2}>3.1 The Foundation: Free Cash Flow and AI-First Businesses</Heading>
      <List spacing={2}>
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
      </List>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h4" fontSize="md" color="gray.900" mb={2}>3.2 Monetizing Volatility: Sell the Wall 23/7/365</Heading>
      <Text mb={4}>We don’t just hold assets—we make them work. We systematically harvest premium through options strategies while maintaining long exposure to the best businesses.</Text>

      <UnorderedList spacing={2}>
        <ListItem>Sell Covered Calls – When volatility spikes, we sell rich premiums.</ListItem>
        <ListItem>Sell Cash-Secured Puts – Get paid to buy great stocks at better prices.</ListItem>
        <ListItem>Roll, Hedge, and Adapt – AI-driven execution adjusts dynamically to optimize profits.</ListItem>
        <ListItem>Risk-Managed Execution – Ensure capital preservation, prevent margin blow-ups, and maintain absolute downside control.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>4. The Ultimate Risk-First Strategy</Heading>
      <UnorderedList spacing={2}>
        <ListItem>Capital preservation in the worst market environments.</ListItem>
        <ListItem>AI-driven risk overlays that dynamically hedge against downside shocks.</ListItem>
        <ListItem>Adaptive exposure management that shifts risk dynamically based on market conditions.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>5. Scaling to $2.5B AUM: The Institutional Roadmap</Heading>
      <UnorderedList spacing={2}>
        <ListItem>Phase 1: Prove Sell the Wall as a sustainable income engine.</ListItem>
        <ListItem>Phase 2: Expand AI-first risk modeling and tactical overlays.</ListItem>
        <ListItem>Phase 3: Fully AI-driven execution and automated risk optimization at scale.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>6. The Hushh Technologies Investment Philosophy</Heading>
      <UnorderedList spacing={2}>
        <ListItem>Sustainable alpha generation.</ListItem>
        <ListItem>Perpetual income strategies.</ListItem>
        <ListItem>AI-driven risk-adjusted returns.</ListItem>
      </UnorderedList>

      <Divider my={4} borderColor="gray.900" />

      <Heading as="h3" fontSize="lg" color="black" mb={2}>7. Conclusion: The Future of Alpha & Aloha</Heading>
      <UnorderedList mb={4}>
      <ListItem>AI-driven, systematic, and risk-first.</ListItem>
      <ListItem>Engineered to harvest premium while preserving capital.</ListItem>
      <ListItem>Focused on the best FCF businesses, ensuring durability across all markets.</ListItem>
      </UnorderedList>

      <Heading as="h4" fontSize="md" color="#E7131A" mt={4}>📢 Invest Today.</Heading>
    </Box>
  );
};

export default Manifesto;

import React from 'react';
import { Box, Text, Heading, List, ListItem, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ConfidentialFCFAnalysis = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Confidential
      </Heading>
      <Text mb={4}>
        Below is a deep-dive quantitative approach for analyzing and ranking the 27 free cash flow (FCF) aces. We’ll consider five key dimensions to gauge each company’s FCF strength and sustainability over the next 7–10 years, especially in an AI/data-driven landscape:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>1. Absolute FCF: How large the company’s free cash flow is (TTM or last fiscal year).</ListItem>
        <ListItem>2. FCF Growth: The 3- to 5-year annualized growth rate of free cash flow.</ListItem>
        <ListItem>3. FCF Efficiency: FCF margin (free cash flow as a percentage of revenue), reflecting how effectively each dollar of revenue becomes FCF.</ListItem>
        <ListItem>4. CapEx & Scalability: Is the company capital-light or heavy? A lower CapEx burden generally signals better scalability with less risk of “blowing up” fixed costs.</ListItem>
        <ListItem>5. Moat/Monopoly Score: A subjective but vital measure of how entrenched and “un-disruptable” the business is—critical for ensuring that strong free cash flow endures.</ListItem>
      </List>
      <Text mb={4}>
        At the end, we’ll create a “Composite FCF Alpha Score” (a weighted sum) to rank these 27 companies. All data are approximate or based on publicly available sources from the last 1–2 years. Actual figures will vary with new filings. This exercise is for illustrative portfolio thinking rather than absolute valuations.
      </Text>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        1. Overview of the 27 FCF Aces
      </Heading>
      <Text mb={4}>
        Recall the 27 from the user’s list, grouped into categories:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>1. The Tech & AI Titans: Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta</ListItem>
        <ListItem>2. Financial Fortresses: Berkshire Hathaway, Visa, Mastercard, JP Morgan, Goldman Sachs</ListItem>
        <ListItem>3. Industrial & Energy Giants: Tesla, ExxonMobil, Chevron, Linde, UnitedHealth Group</ListItem>
        <ListItem>4. Ultimate Consumer Staples: Procter & Gamble, Coca-Cola, PepsiCo, McDonald’s</ListItem>
        <ListItem>5. Data & Infrastructure Giants: Broadcom, Texas Instruments, Oracle, ASML, T-Mobile, Equinix, Crown Castle</ListItem>
      </List>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        2. Key Metrics & Approximate Figures
      </Heading>
      <Text mb={4}>
        Here’s a simplified illustrative table summarizing the five dimensions for each company. Numbers are approximate (for demonstration). Some companies might have higher/lower actual values. For “FCF Growth,” we consider a mix of historical 3–5-year data and forward estimates. “Moat Score” is a 1–5 subjective scale, with 5 meaning near-monopolistic stability.
      </Text>
      <Table variant="simple" mb={4}>
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Est. Annual FCF (USD B)</Th>
            <Th>FCF Growth (3-5yr %)</Th>
            <Th>FCF Margin (%)</Th>
            <Th>CapEx % of Rev.</Th>
            <Th>Moat Score (1-5)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Apple (AAPL)</Td>
            <Td>~$100B</Td>
            <Td>~10%</Td>
            <Td>~27%</Td>
            <Td>~4%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Microsoft (MSFT)</Td>
            <Td>~$65B</Td>
            <Td>~12%</Td>
            <Td>~33%</Td>
            <Td>~5%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Nvidia (NVDA)</Td>
            <Td>~$9B</Td>
            <Td>~25%</Td>
            <Td>~35%</Td>
            <Td>~6%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Alphabet (GOOGL)</Td>
            <Td>~$65B</Td>
            <Td>~15%</Td>
            <Td>~25%</Td>
            <Td>~6%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Amazon (AMZN)</Td>
            <Td>~$35B</Td>
            <Td>~15%</Td>
            <Td>~10%</Td>
            <Td>~8%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Meta (META)</Td>
            <Td>~$40B</Td>
            <Td>~18%</Td>
            <Td>~28%</Td>
            <Td>~7%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Berkshire Hathaway (BRK.B)</Td>
            <Td>~$28B</Td>
            <Td>~8%</Td>
            <Td>~10%</Td>
            <Td>~3%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Visa (V)</Td>
            <Td>~$16B</Td>
            <Td>~13%</Td>
            <Td>~50%+</Td>
            <Td>~3%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Mastercard (MA)</Td>
            <Td>~$10B</Td>
            <Td>~14%</Td>
            <Td>~48%</Td>
            <Td>~3%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>JP Morgan (JPM)</Td>
            <Td>~$45B*</Td>
            <Td>~5%</Td>
            <Td>NA (Bank CFO)</Td>
            <Td>NA (bank)**</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Goldman Sachs (GS)</Td>
            <Td>~$12B*</Td>
            <Td>~4%</Td>
            <Td>NA (Bank CFO)</Td>
            <Td>NA</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Tesla (TSLA)</Td>
            <Td>~$9B</Td>
            <Td>~35%</Td>
            <Td>~12%</Td>
            <Td>~10%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>ExxonMobil (XOM)</Td>
            <Td>~$62B</Td>
            <Td>~11%</Td>
            <Td>~15%</Td>
            <Td>~8%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Chevron (CVX)</Td>
            <Td>~$35B</Td>
            <Td>~7%</Td>
            <Td>~14%</Td>
            <Td>~7%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Linde (LIN)</Td>
            <Td>~$6B</Td>
            <Td>~8%</Td>
            <Td>~20%</Td>
            <Td>~9%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>UnitedHealth (UNH)</Td>
            <Td>~$20B</Td>
            <Td>~10%</Td>
            <Td>~8%</Td>
            <Td>~2%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Procter & Gamble (PG)</Td>
            <Td>~$16B</Td>
            <Td>~5%</Td>
            <Td>~17%</Td>
            <Td>~5%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Coca-Cola (KO)</Td>
            <Td>~$9B</Td>
            <Td>~6%</Td>
            <Td>~21%</Td>
            <Td>~4%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>PepsiCo (PEP)</Td>
            <Td>~$8B</Td>
            <Td>~7%</Td>
            <Td>~12%</Td>
            <Td>~5%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>McDonald’s (MCD)</Td>
            <Td>~$6.5B</Td>
            <Td>~6%</Td>
            <Td>~28%+ (franchise)</Td>
            <Td>~3%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Broadcom (AVGO)</Td>
            <Td>~$15B</Td>
            <Td>~10%</Td>
            <Td>~42%</Td>
            <Td>~4%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Texas Instruments (TXN)</Td>
            <Td>~$6B</Td>
            <Td>~8%</Td>
            <Td>~32%</Td>
            <Td>~5%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>Oracle (ORCL)</Td>
            <Td>~$8B</Td>
            <Td>~6%</Td>
            <Td>~29%</Td>
            <Td>~3%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>ASML (ASML)</Td>
            <Td>~$7B</Td>
            <Td>~15%</Td>
            <Td>~25%</Td>
            <Td>~11%</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>T-Mobile (TMUS)</Td>
            <Td>~$13B</Td>
            <Td>~9%</Td>
            <Td>~15%</Td>
            <Td>~18%</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Equinix (EQIX)</Td>
            <Td>~$2.5B</Td>
            <Td>~12%</Td>
            <Td>~20%</Td>
            <Td>~25%+ (REIT infra)</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>Crown Castle (CCI)</Td>
            <Td>~$2B</Td>
            <Td>~5%</Td>
            <Td>~50% (tower model)</Td>
            <Td>~23%</Td>
            <Td>4</Td>
          </Tr>
        </Tbody>
      </Table>
      <Text mb={4}>
        <strong>Notes:</strong>
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>• *Banks (JPM, GS) typically measure “cash flow” differently due to their capital structure. “FCF” is replaced by CFO or net cash from bank ops.</ListItem>
        <ListItem>• Moat Score is approximate, from 1 (low moat) to 5 (extreme moat).</ListItem>
        <ListItem>• Figures for FCF margin, CapEx, etc. are rough, pulled from typical TTM or annual data.</ListItem>
        <ListItem>• Some energy & industrial names have cyclical FCF that can vary widely with commodity prices and economic conditions.</ListItem>
      </List>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        3. Ranking Method
      </Heading>
      <Text mb={4}>
        We can create a Composite FCF Alpha Score by weighting each dimension:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>1. 50% Weighted on FCF Growth + Absolute FCF</ListItem>
        <ListItem>• We sum each company’s percentile rank in FCF growth and absolute FCF.</ListItem>
        <ListItem>2. 30% Weighted on FCF Efficiency + Moat</ListItem>
        <ListItem>• FCF margin plus Moat Score.</ListItem>
        <ListItem>3. 20% Weighted on CapEx Intensity (lower is better)</ListItem>
        <ListItem>• 1 minus the percentile rank of CapEx ratio, so companies with lower CapEx ratio get higher scores.</ListItem>
      </List>
      <Text mb={4}>
        Let’s show a simplified final rank (approximate). For brevity, we’ll list a “High / Mid / Low” tier based on the combined score:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>• High Tier: Apple (AAPL), Microsoft (MSFT), Nvidia (NVDA), Alphabet (GOOGL), Visa (V), Mastercard (MA), ASML (ASML), Broadcom (AVGO)</ListItem>
        <ListItem>• Reason: They have enormous or fast-growing FCF, high moats, and typically moderate CapEx.</ListItem>
        <ListItem>• Mid Tier: Amazon (AMZN), Meta (META), Berkshire Hathaway (BRK.B), JP Morgan (JPM) & Goldman Sachs (GS) [banks if you adjust for their model], ExxonMobil (XOM), Procter & Gamble (PG), McDonald’s (MCD), TXN, Oracle (ORCL)</ListItem>
        <ListItem>• Reason: Solid FCF, though growth or margin might be less consistent, or capital usage can be higher. Moat remains strong.</ListItem>
        <ListItem>• Low Tier: Tesla (TSLA), Chevron (CVX), Linde (LIN), UnitedHealth (UNH), Coke (KO), Pepsi (PEP), T-Mobile (TMUS), Equinix (EQIX), Crown Castle (CCI)</ListItem>
        <ListItem>• Reason: Some cyclical FCF, higher CapEx demands, or slower growth. They’re still “best of the best,” but relative to the top-tier, the metrics are less impressive.</ListItem>
      </List>
      <Text mb={4}>
        But keep in mind, these are all outstanding FCF machines in absolute terms. The “Low Tier” in this set is still a top-tier global business compared to 99% of other companies. This relative ranking just helps differentiate which ones might have the highest “FCF Alpha Score.”
      </Text>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        4. Key Observations & 7- to 10-Year Outlook
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>1. Tech & Payment Monopolies Dominate: Apple, Microsoft, Nvidia, Alphabet, Visa, and Mastercard consistently top the charts. They combine massive absolute FCF with strong growth, high margins, and moderate CapEx, plus near-unassailable moats in their respective domains. Over the next decade, as AI/data computing expands, these companies are best-positioned to exploit scale effects, continuing to compound their cash flows.</ListItem>
        <ListItem>2. ASML & Broadcom: Although they aren’t as large as the biggest FAANG names, they have unique “choke points” in the semiconductor supply chain. ASML’s extreme UV lithography monopoly, and Broadcom’s broad line of connectivity/ infrastructure chips, put them in prime position for the AI/hardware cycle. They might see big expansions if AI/data center growth accelerates.</ListItem>
        <ListItem>3. Energy & Industrial: ExxonMobil, Chevron, Linde have strong FCF currently, but are more sensitive to economic and commodity cycles. Over a 7- to 10-year horizon, if energy transitions continue, demand patterns might shift, but major integrated players often remain profitable. Meanwhile, industrial leaders like Caterpillar (omitted above but often high FCF), Tesla, etc. can produce large cyclical FCF, but require heavier capital reinvestment.</ListItem>
        <ListItem>4. Consumer Staples: P&G, Coke, Pepsi, McDonald’s are “never-ending moats” in everyday consumer goods, generating stable free cash flow even in recessions. Growth is slower than tech, but margins and brand moats keep them resilient. Over a decade, their returns might be overshadowed by faster-growing tech, but they remain extremely stable.</ListItem>
        <ListItem>5. Financials: Berkshire, JP Morgan, Goldman, Visa, Mastercard. If rates remain favorable, banks can benefit, though they face cyclical or regulatory shifts. Berkshire stands out for its capital allocation approach, often acquiring new FCF businesses to feed the compound engine. Payment networks (V, MA) are less cyclical, have strong moats, and should keep printing high margins as digital payments expand worldwide.</ListItem>
        <ListItem>6. Healthcare: UnitedHealth’s large-scale health network, Johnson & Johnson, or other big players typically have robust moats. They produce consistent cash flows across economic cycles, though growth might be more modest.</ListItem>
      </List>
      <Heading as="h3" fontSize="lg" mb={3} color="black">
        5. Conclusion: Constructing an Evergreen 🌲 Portfolio
      </Heading>
      <Text mb={4}>
        Selecting any from the 27 is likely wise for a long-term hold. However, if the goal is to rank them based on FCF strength + growth + moat in the coming AI/data decade, the top rung might revolve around:
      </Text>
      <List spacing={3} mb={4}>
        <ListItem>• Apple, Microsoft, Nvidia, Alphabet: Outstanding synergy with AI, global scale, sticky ecosystems.</ListItem>
        <ListItem>• Visa, Mastercard: “Tollbooths” on global transactions, extremely high margin and moderate CapEx.</ListItem>
        <ListItem>• ASML, Broadcom: Key positions in the hardware supply chain for AI, uniquely stable moats.</ListItem>
      </List>
      <Text mb={4}>
        Defensive and consistent earners like Coke, P&G, and McDonald’s remain excellent for FCF stability. Banks and energy can deliver large FCF but may experience sharper cycles.
      </Text>
      <Text mb={4}>
        No single metric is foolproof—diversification across these moats ensures resilience if one sector stumbles. Over 7–10 years, the best approach might be tilting heavily toward the AI/computing/payment oligopolies while still anchoring the portfolio with stable consumer and financial fortresses. The result is a portfolio likely to weather market disruptions, continue compounding cash flows, and generate alpha beyond typical indexes—the true essence of an evergreen 🌲 investment strategy.
      </Text>
      <Text fontSize="sm" color="gray.500">
        (Disclaimer: The metrics and final ranking approach above are illustrative. Actual due diligence and updated financial statements are essential before investing. No guarantee of future performance—use this as a conceptual framework for analyzing FCF growth and moat viability.)
      </Text>
    </Box>
  );
};

export default ConfidentialFCFAnalysis;
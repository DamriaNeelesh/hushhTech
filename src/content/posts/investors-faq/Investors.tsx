import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, VStack } from '@chakra-ui/react';

export const frontmatter = {
  title: "🤫 Fund Investor FAQ (Charlie Munger Caliber Edition)",
  publishedAt: "2025-02-05",
  description: "Comprehensive FAQ for 🤫 Fund investors, focusing on risk-adjusted returns and systematic investing.",
  category: "investor relations"
};

const InvestorFAQ: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        🤫 Fund Investor FAQ
      </Heading>

      <Text fontSize="lg" mb={4}>
        "If you’re not thinking about risk, you’re not thinking." – Charlie Munger
      </Text>
      <Text mb={4}>
        Welcome to the 🤫 Fund, where we turn market inefficiencies into systematic alpha while always prioritizing risk-adjusted returns, free cash flow excellence, and absolute long-term compounding.
      </Text>

      <VStack spacing={4} align="stretch">
        {[
          {
            question: "What is the 🤫 Fund’s Core Strategy?",
            answer: [
              "The 🤫 Fund executes a disciplined 'Sell The Wall' strategy—an AI-powered options premium harvesting model.",
              "We sell calls at peak exuberance and puts at deep value levels to capture premium without excessive risk.",
              "Our portfolio focuses on SPX10-level companies, ensuring deep liquidity and sustainable earnings power."
            ]
          },
          {
            question: "What’s the Fund’s Investment Philosophy?",
            answer: [
              "Cash Flow Dominance: Invest in businesses with self-funding, compounding earnings power.",
              "Capital Efficiency: Avoid over-capitalized, low-return plays; prefer disciplined operators.",
              "Risk-Adjusted Alpha: Positive alpha or no play.",
              "The Munger-Buffett Rule: We don’t chase; we let the best businesses come to us."
            ]
          },
          {
            question: "How Does the Fund Generate Returns?",
            answer: [
              "Selling Volatility: Capitalize on investor fear & greed, selling options at peak volatility.",
              "Owning Free Cash Flow Machines: Acquire assets at a discount via systematic put selling.",
              "Leveraging AI: Improve risk management models and capital allocation using real-time AI analytics."
            ]
          }
        ].map((faq, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.800">
            <Heading as="h4" size="md" color="teal.100" mb={2}>{faq.question}</Heading>
            <List spacing={1} pl={4}>
              {faq.answer.map((ans, idx) => (
                <ListItem key={idx}>{ans}</ListItem>
              ))}
            </List>
          </Box>
        ))}
      </VStack>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>Final Thoughts</Heading>
      <Text mb={4}>
        "The big money is not in the buying and selling, but in the waiting." – Charlie Munger
      </Text>
      <Text>Let’s compound intelligently and turn volatility into opportunity.</Text>
    </Box>
  );
};

export default InvestorFAQ;

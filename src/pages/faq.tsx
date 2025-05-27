import React from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What makes Hushh Technologies different from traditional investment firms?",
    answer: "Hushh Technologies leverages advanced AI and machine learning algorithms to identify investment opportunities that traditional methods might miss. Our quantitative approach removes emotional bias and provides consistent, data-driven results."
  },
  {
    question: "How does your AI-driven investment strategy work?",
    answer: "Our proprietary AI algorithms analyze vast amounts of market data to identify patterns and opportunities. This data-driven approach helps us make objective investment decisions, optimize asset allocation, and manage risk more effectively than traditional methods. We continuously refine our models based on performance and new market conditions."
  },
  {
    question: "What are the minimum investment requirements?",
    answer: "We offer investment options starting at $100,000 for accredited investors. For institutional clients, our minimum investment is typically $1 million. We also offer specialized programs for ultra-high net worth individuals with custom minimums. Please contact our investor relations team for specific details about our investment vehicles."
  },
  {
    question: "How transparent is your investment process?",
    answer: "Transparency is a core principle at Hushh Technologies. We provide regular detailed reports on portfolio performance, risk metrics, and allocation strategies. Clients have access to our dedicated portal with real-time reporting and insights. Additionally, our team is available to answer questions and provide explanations about our investment approach and decision-making processes."
  },
  {
    question: "What types of assets do you invest in?",
    answer: "We maintain a diversified approach across multiple asset classes including equities, fixed income, alternatives, and derivatives. Our AI models are designed to identify opportunities across global markets and various sectors. The specific allocation depends on market conditions, risk parameters, and individual client objectives."
  },
  {
    question: "How do you manage risk?",
    answer: "Risk management is built into every level of our investment process. Our AI systems continuously monitor market conditions and portfolio exposure, implementing dynamic hedging strategies when necessary. We employ sophisticated stress testing, scenario analysis, and maintain strict diversification requirements. Our risk management team provides independent oversight to ensure compliance with risk parameters."
  },
  {
    question: "What fees do you charge?",
    answer: "Our fee structure typically includes a management fee of 1-2% annually and a performance fee of 20% above a specified hurdle rate. We operate with a high-water mark provision to ensure we only charge performance fees on new gains. For larger investments or institutional clients, we offer customized fee arrangements. All fees are transparent and fully disclosed prior to investment."
  },
  {
    question: "How often can I access my investment?",
    answer: "Liquidity terms vary by investment vehicle. Our flagship fund offers quarterly liquidity with 45 days' notice, while some specialized strategies may have longer lock-up periods. We also maintain certain vehicles with monthly liquidity options for clients who prioritize access to capital. Each product's specific liquidity terms are detailed in its offering documents."
  },
  {
    question: "What is your track record?",
    answer: "Since inception, our strategies have consistently outperformed relevant benchmarks. Our flagship fund has delivered annualized returns of approximately 15% with lower volatility than major market indices. While past performance is not indicative of future results, our disciplined approach has proven resilient across various market conditions. Detailed performance information is available upon request for qualified investors."
  },
  {
    question: "How is my data protected?",
    answer: "We implement bank-level security measures to protect all client data. This includes end-to-end encryption, multi-factor authentication, and regular security audits. Our systems comply with financial industry regulatory requirements for data protection. Additionally, we maintain strict internal access controls and conduct regular training on data security protocols for all staff members."
  }
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container maxW="container.xl" py={12} px={{ base: 4, md: 6 }}>
      {/* Main Header */}
      <Box textAlign="center" mb={16}>
        <Heading 
          as="h1" 
          size={{ base: "2xl", md: "3xl" }} 
          mb={4}
          letterSpacing="tight"
          fontWeight="bold"
        >
          <Text as="span" color="black">Frequently Asked </Text>
          <Text as="span" color="cyan.400">Questions</Text>
        </Heading>
        
        <Text 
          fontSize={{ base: "lg", md: "xl" }} 
          maxW="3xl" 
          mx="auto" 
          color="gray.600"
          mt={4}
        >
          Find answers to common questions about our investment strategies, processes, and
          services.
        </Text>
      </Box>

      {/* FAQ Items */}
      <VStack spacing={6} align="stretch" maxW="container.lg" mx="auto">
        {faqs.map((faq, index: number) => (
          <Box 
            key={index}
            bg="white" 
            borderRadius="lg" 
            boxShadow={openIndex === index ? "lg" : "md"}
            transition="all 0.2s"
            overflow="hidden"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Flex 
              p={6}
              cursor="pointer"
              onClick={() => toggleAccordion(index)}
              justify="space-between"
              align="center"
            >
              <Heading 
                as="h3" 
                size={{ base: "sm", md: "md" }} 
                fontWeight="semibold"
                color="gray.800"
              >
                {faq.question}
              </Heading>
              <Icon
                as={openIndex === index ? ChevronUpIcon : ChevronDownIcon}
                w={6}
                h={6}
                color="gray.500"
                transition="transform 0.2s"
              />
            </Flex>
            
            {openIndex === index && (
              <Box 
                px={6} 
                pb={6} 
                pt={0}
                color="gray.600"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="tall"
              >
                {faq.answer}
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default FaqPage;
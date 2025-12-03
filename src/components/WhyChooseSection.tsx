import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Icon,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaRocket, FaChartBar, FaBrain, FaSearch } from "react-icons/fa";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const tokens = {
  label: "#000000",
  secondary: "#6E6E73",
  tertiary: "#8E8E93",
  separator: "#E5E5EA",
  blue: "#0A84FF",
  teal: "#30B0C7",
  indigo: "#5856D6",
  mint: "#00C7BE",
};

const advantages = [
  {
    title: "AI-Driven Alpha",
    body: "Proprietary AI algorithms systematically extract alpha and adapt to market changes.",
    icon: FaRocket,
    color: tokens.blue,
  },
  {
    title: "Systematic Risk Management",
    body: "Rigorous quantitative analysis and AI meticulously control risk every day.",
    icon: FaChartBar,
    color: tokens.teal,
  },
  {
    title: "Hushh Enterprise x AI Synergy",
    body: "AI provides speed and scale; human insight delivers deep understanding and strategic oversight.",
    icon: FaBrain,
    color: tokens.indigo,
  },
  {
    title: "Transparency You Trust",
    body: "Clear reporting and ethical practices you can depend on.",
    icon: FaSearch,
    color: tokens.mint,
  },
];

const WhyChooseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box pt={{ base: 8, md: 10 }} pb={{ base: 10, md: 14 }} px={4} bg="white">
      <Container maxW="container.xl">
        <VStack spacing={2} textAlign="center" mb={{ base: 6, md: 8 }} animation={`${fadeUp} 0.2s ease-out`}>
          <Heading
            as="h2"
            fontSize={{ base: "26px", md: "30px" }}
            fontWeight="700"
            color={tokens.label}
            lineHeight="1.2"
          >
            The Hushh Advantage
          </Heading>
          <Text fontSize={{ base: "16px", md: "17px" }} color={tokens.secondary} lineHeight="1.35">
            What you reliably get with every Hushh investor profile.
          </Text>
        </VStack>

        <Box borderTop={`1px solid ${tokens.separator}`} mt={3} />

        <VStack align="stretch" spacing={0} mt={4}>
          {advantages.map((item, idx) => {
            const isActive = idx === activeIndex;
            const railColor = isActive ? tokens.blue : tokens.separator;
            const textColor = tokens.label;
            const bodyColor = isActive ? tokens.secondary : tokens.tertiary;
            return (
              <Box
                key={item.title}
                data-idx={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                py={5}
                animation={`${fadeUp} 0.25s ease-out ${idx * 0.05}s`}
              >
                <HStack align="flex-start" spacing={4}>
                  <Flex align="stretch">
                    <Box
                      w="4px"
                      borderRadius="full"
                      bg={railColor}
                      mt={1}
                      mb={1}
                    />
                    <Flex
                      ml={3}
                      w="28px"
                      h="28px"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      bg={`${item.color}1A`}
                      color={item.color}
                      transition="transform 0.18s ease, opacity 0.18s ease"
                      transform={isActive ? "scale(1)" : "scale(0.96)"}
                      opacity={isActive ? 1 : 0.7}
                    >
                      <Icon as={item.icon} boxSize={4} />
                    </Flex>
                  </Flex>

                  <VStack align="start" spacing={1} flex="1">
                    <Text fontSize="17px" fontWeight="600" color={textColor} lineHeight="1.3">
                      {item.title}
                    </Text>
                    <Text fontSize="15px" color={bodyColor} lineHeight="1.6">
                      {item.body}
                    </Text>
                  </VStack>
                </HStack>
                <Box mt={4} borderBottom={`1px solid ${tokens.separator}`} />
              </Box>
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
};

export default WhyChooseSection;

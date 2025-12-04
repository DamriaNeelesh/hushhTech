import React from "react";
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
import { FiChevronRight } from "react-icons/fi";

const tokens = {
  label: "#0B1120",
  body: "#111827",
  secondary: "#475569",
  muted: "#6B7280",
  separator: "#E5E7EB",
  navy: "#0B1120",
  iconBg: "#F5F5F7",
  gradientStart: "#00A9E0",
  gradientEnd: "#6DD3EF",
};

const advantages = [
  {
    title: "AI-Driven Alpha",
    body: "Proprietary AI algorithms systematically extract alpha and adapt to market changes.",
    icon: FaRocket,
  },
  {
    title: "Systematic Risk Management",
    body: "Rigorous quantitative analysis and AI meticulously control risk every day.",
    icon: FaChartBar,
  },
  {
    title: "Hushh Enterprise x AI Synergy",
    body: "AI provides speed and scale; human insight delivers deep understanding and strategic oversight.",
    icon: FaBrain,
  },
  {
    title: "Transparency You Trust",
    body: "Clear reporting and ethical practices you can depend on.",
    icon: FaSearch,
  },
];

const WhyChooseSection = () => {
  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  return (
    <Box
      bg="#FFFFFF"
      pt={{ base: 16, md: 16 }}
      pb={{ base: 16, md: 16 }}
      px={{ base: 6, sm: 8 }}
    >
      <Container maxW="760px">
        <Box animation={`${fadeUp} 0.26s ease-out`}>
          <Heading
            as="h2"
            fontSize={{ base: "34px", md: "36px" }}
            fontWeight="700"
            color={tokens.label}
            lineHeight="1.10"
            textAlign="left"
            letterSpacing="-0.01em"
            fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
          >
            The Hushh Advantage
          </Heading>
          <Text
            fontSize={{ base: "18px", md: "18px" }}
            color={tokens.secondary}
            lineHeight="1.65"
            fontWeight="400"
            textAlign="left"
            mt={3}
            mb={7}
            maxW="640px"
            fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
          >
            What you reliably get with every Hushh investor profile.
          </Text>
          <Box position="relative" w="100%" h="1px" bg={tokens.separator}>
            <Box
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              w="16px"
              h="2px"
              bg={tokens.gradientStart}
            />
          </Box>
        </Box>

        <Box mt={6}>
          <Box
            border="1px solid"
            borderColor={tokens.separator}
            borderRadius="20px"
            bg="#FFFFFF"
            overflow="hidden"
            animation={`${fadeUp} 0.28s ease-out 0.08s`}
          >
            {advantages.map((item, idx) => (
              <HStack
                key={item.title}
                align="flex-start"
                spacing={4}
                px={4}
                py="18px"
                minH="76px"
                borderBottom={idx !== advantages.length - 1 ? "1px solid" : "none"}
                borderColor={tokens.separator}
                role="group"
                transition="background 140ms ease"
                _active={{ bg: "#F9FAFB" }}
              >
                <Flex
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg={tokens.iconBg}
                  border="1px solid"
                  borderColor={tokens.separator}
                  color={tokens.navy}
                  flexShrink={0}
                  transition="box-shadow 140ms ease, border-color 140ms ease"
                  _groupActive={{
                    boxShadow: `0 0 0 1px ${tokens.gradientStart}`,
                    borderColor: tokens.gradientStart,
                  }}
                >
                  <Icon as={item.icon} boxSize={4} />
                </Flex>
                <VStack align="start" spacing={1.5} flex="1">
                  <Text
                    fontSize="18px"
                    fontWeight="650"
                    color={tokens.label}
                    lineHeight="1.25"
                    fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
                  >
                    {item.title}
                  </Text>
                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    color={tokens.secondary}
                    lineHeight="1.55"
                    fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                  >
                    {item.body}
                  </Text>
                </VStack>
                <Icon
                  as={FiChevronRight}
                  boxSize={4.5}
                  color="#9CA3AF"
                  mt="4px"
                  flexShrink={0}
                />
              </HStack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseSection;

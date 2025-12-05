import React from 'react'
import { Box, Container, Heading, Text, Flex, SimpleGrid, Stack, Grid, GridItem, Table, Tbody, Tr, Td, VStack, HStack, Button } from "@chakra-ui/react"

const FundA = () => {
  return (
    <Box bg="white">
      {/* Hero Section */}
      <Box pt={{ base: 16, md: 8 }} px={4} textAlign="center">
        <Container maxW="container.lg" mt={{md:16, base:8}}>
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "6xl" }} 
            fontWeight="400" 
            mb={{md:2, base:1}}
            lineHeight="1.2"
            color="#1D1D1F"
          >
            Hushh Fund A:
          </Heading>
          
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "7xl" }}
            fontWeight="500"
            mb={{md:10, base:6}}
            lineHeight="1.1"
            bgGradient="linear(to-r, #00A9E0, #4BC0C8)"
            bgClip="text"
          >
            AI-Powered Multi-Strategy Alpha.
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "2xl" }} 
            color="#6E6E73" 
            maxW="4xl" 
            mx="auto" 
            mb={16}
            fontWeight="light"
            lineHeight="tall"
          >
            Our inaugural fund, demonstrating an AI-driven value investing strategy designed to 
            deliver consistent, market-beating returns and sustainable, risk-adjusted alpha.
          </Text>
          
          {/* Stats Card */}
          <Box 
            maxW="md" 
            mx="auto" 
            bgGradient="linear(to-r, #00A9E0, #4BC0C8)"
            borderRadius="xl"
            p={8}
            color="white"
            mb={16}
          >
            <Text
              fontSize="xl"
              fontWeight="500"
              mb={4}
            >
              Target Net IRR
            </Text>
            
            <Heading
              as="h3"
              fontSize="7xl"
              fontWeight="500"
              mb={2}
            >
              69%
            </Heading>
            
            <Text
              fontSize="lg"
              mb={4}
            >
              Annually*
            </Text>
            
            <Text
              fontSize="xs"
              fontStyle="italic"
              maxW="xs"
              mx="auto"
            >
              *Inspired by natural equilibrium and proven quantitative strategies. Refer to
              PPM for full details.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Investment Philosophy Section */}
      <Box py={{ base: 12, md: 16 }} px={0} background="rgb(249 250 251 / var(--tw-bg-opacity, 1))">
        <Container maxW="container.lg">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={{md:16, base:10}}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Investment Philosophy: Data. Volatility. Alpha.
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6} maxW="container.lg" mx="auto">
            <Box 
              bg="white" 
              p={8} 
              borderRadius="xl" 
              border="1px"
              borderColor="gray.100"
              transition="all 0.3s"
              _hover={{
                boxShadow: "sm"
              }}
            >
              <Flex alignItems="flex-start" gap={6}>
                <Box flex="1">
                  <Heading 
                    as="h3" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="500"
                    color="#1D1D1F"
                    mb={4}
                  >
                    Data as an Asset
                  </Heading>
                  <Text 
                    color="#6E6E73" 
                    fontWeight="light"
                    lineHeight="tall"
                    fontSize={{ base: "md", md: "lg" }}
                  >
                    We monetize volatility and information asymmetry through advanced behavioral modeling, macro awareness, and systematic execution.
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box 
              bg="white" 
              p={8} 
              borderRadius="xl" 
              border="1px"
              borderColor="gray.100"
              transition="all 0.3s"
              _hover={{
                boxShadow: "sm"
              }}
            >
              <Flex alignItems="flex-start" gap={6}>
                <Box flex="1">
                  <Heading 
                    as="h3" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="500"
                    color="#1D1D1F"
                    mb={4}
                  >
                    AI-Enhanced Decisions
                  </Heading>
                  <Text 
                    color="#6E6E73" 
                    fontWeight="light"
                    lineHeight="tall"
                    fontSize={{ base: "md", md: "lg" }}
                  >
                    Proprietary AI tools optimize every stage, from asset selection to trade execution and risk management, amplifying our ability to capture market-independent returns.
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box 
              bg="white" 
              p={8} 
              borderRadius="xl" 
              border="1px"
              borderColor="gray.100"
              transition="all 0.3s"
              _hover={{
                boxShadow: "sm"
              }}
            >
              <Flex alignItems="flex-start" gap={6}>
                <Box flex="1">
                  <Heading 
                    as="h3" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="500"
                    color="#1D1D1F"
                    mb={4}
                  >
                    Targeting Equilibrium
                  </Heading>
                  <Text 
                    color="#6E6E73" 
                    fontWeight="light"
                    lineHeight="tall"
                    fontSize={{ base: "md", md: "lg" }}
                  >
                    Aiming for a 69% net IRR annually, reflecting a balance of aggressive alpha generation with disciplined risk control.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Sell the Wall Options Framework Section */}
      <Box py={{ base: 12, md: 20 }} px={0} bg="white">
        <Container maxW="container.lg">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={{md:16, base:10}}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Our Edge: The "Sell the Wall" Options Framework
          </Heading>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Systematically Sell Premium
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Write puts and calls typically 5 strikes above and below the current 
                  market price on each of our 27 core holdings.
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Maximize Decay
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Employ a weekly-to-annual laddering of short options to capture 
                  theta (time decay) and vega (volatility) decay.
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Maintain Delta-Neutrality
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Utilize automated rebalancing to keep net delta near zero, 
                  ensuring profits primarily from volatility harvesting and time decay, 
                  not market direction.
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Strategic Accumulation & Income
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Enable accumulation of shares in elite companies at discounted 
                  prices (via put assignment) and generate consistent cash flow from 
                  market fluctuations.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Asset Focus Section */}
      <Box py={{ base: 12, md: 20 }} px={0} bg="rgb(249 250 251 / var(--tw-bg-opacity, 1))">
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={6}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Asset Focus: Three Pillars of Global Enterprises
          </Heading>
          
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="#6E6E73"
            fontWeight="light"
            lineHeight="tall"
            textAlign="center"
            maxW="4xl"
            mx="auto"
            mb={16}
          >
            Fund A applies its multi-strategy approach across three distinct, yet complementary, selections of 27 large-cap, highly liquid global enterprises:
          </Text>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                  textAlign="center"
                >
                  Alpha 27: Core Compounders
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                  textAlign="center"
                >
                  Focus on FCF "machines" with wide moats and proven AI integration (e.g., AAPL, MSFT, BRK.B, NVDA).
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                  textAlign="center"
                >
                  Aloha 27: ESG & Humanity-Driven Growth
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                  textAlign="center"
                >
                  Companies addressing critical global needs (energy, health, inclusion) with strong ESG credentials and AI-enabled impact (e.g., NEE, VTRS, DHR, MA).
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                  textAlign="center"
                >
                  Ultra 27: High-Velocity, Quant-Backed Growth
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                  textAlign="center"
                >
                  AI disruptors, cutting-edge biotech, emerging market leaders, and digital finance innovators (e.g., SNOW, PLTR, MRNA, MELI).
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Targeted Alpha Stack Section */}
      <Box py={{ base: 12, md: 20 }} px={0} bg="white">
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={2}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Targeted Alpha Stack & Returns
          </Heading>
          
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="#6E6E73"
            fontWeight="light"
            fontStyle="italic"
            textAlign="center"
            mb={16}
          >
            (Illustrative Annual Contribution to Gross Returns)
          </Text>
          
          <Box 
            maxW="4xl" 
            mx="auto" 
            p={{ base: 0, md: 8 }}
            borderRadius="xl"
            border="1px"
            borderColor="gray.100"
          >
            <Table variant="simple">
              <Tbody>
                <Tr borderBottom="1px solid" borderColor="gray.100">
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#1D1D1F" py={6}>
                    Options Premium (Sell the Wall - Theta/Vega)
                  </Td>
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#00A9E0" textAlign="right" py={6} whiteSpace="nowrap">
                    30-45%
                  </Td>
                </Tr>
                <Tr borderBottom="1px solid" borderColor="gray.100">
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#1D1D1F" py={6}>
                    Equity Appreciation (Core Holdings CAGR)
                  </Td>
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#00A9E0" textAlign="right" py={6} whiteSpace="nowrap">
                    20-30%
                  </Td>
                </Tr>
                <Tr borderBottom="1px solid" borderColor="gray.100">
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#1D1D1F" py={6}>
                    AI / Execution Efficiency Alpha
                  </Td>
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#00A9E0" textAlign="right" py={6} whiteSpace="nowrap">
                    5-10%
                  </Td>
                </Tr>
                <Tr borderBottom="1px solid" borderColor="gray.100">
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#1D1D1F" py={6}>
                    Total Expected Gross Return
                  </Td>
                  <Td fontSize={{ base: "md", md: "lg" }} fontWeight="500" color="#00A9E0" textAlign="right" py={6} whiteSpace="nowrap">
                    55-85%
                  </Td>
                </Tr>
                <Tr>
                  <Td fontSize={{ base: "xl", md: "2xl" }} fontWeight="500" color="#1D1D1F" py={6}>
                    Target Net IRR (Post-Fees & Expenses)
                  </Td>
                  <Td fontSize={{ base: "xl", md: "2xl" }} fontWeight="500" color="#00A9E0" textAlign="right" py={6} whiteSpace="nowrap">
                    69%
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Risk Management Section */}
      <Box py={{ base: 12, md: 20 }} px={0} bg="rgb(249 250 251 / var(--tw-bg-opacity, 1))">
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={16}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Disciplined Risk Management. Assured Liquidity.
          </Heading>
          
          <Grid mx="2em" templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Robust Framework
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Multi-leg hedges, AI-driven volatility forecasting, stringent exposure caps (sector, country, correlation), and tight controls on leverage, position sizing, and portfolio VaR. Core equities serve as high-quality collateral for risk-managed leverage.
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                border="1px"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "sm"
                }}
              >
                <Heading 
                  as="h3" 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Market Position
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  lineHeight="tall"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Targeting high-liquidity, large-cap equities with deep options chains, ensuring positions are tradable within 90 days under normal market scenarios. Quarterly redemptions after initial 12-month lock-up (soft).
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Key Terms Section */}
      <Box py={{ base: 12, md: 20 }} px={0} bg="white">
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "5xl" }} 
            fontWeight="300" 
            mb={2}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Key Terms
          </Heading>
          
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="#6E6E73"
            fontWeight="light"
            fontStyle="italic"
            textAlign="center"
            mb={16}
          >
            (Illustrative - Refer to Private Placement Memorandum (PPM) for Full Details)
          </Text>
          
          <Box 
            maxW="4xl" 
            mx="auto" 
            p={{ base: 4, md: 8 }}
            borderRadius="xl"
            border="1px"
            borderColor="gray.100"
          >
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={2}
                >
                  Fund Vehicle
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Hushh Technologies Renaissance AI Fund A (Master-Feeder Structure)
                </Text>
              </Box>
              
              <Box>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={2}
                >
                  Investor Eligibility
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Accredited Investors & Qualified Purchasers (per SEC Reg D 506(c) & ICA 3(c)(7))
                </Text>
              </Box>
              
              <Box>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={4}
                >
                  Share Classes (Min. Investment / Fees - Mgmt/Perf./Hurdle)
                </Heading>
                
                <Box 
                  borderWidth="1px" 
                  borderColor="gray.200" 
                  borderRadius="md" 
                  overflow="hidden"
                  bg="#111"
                >
                  <Table variant="unstyled" size="md">
                    <thead>
                      <Tr borderBottomWidth="1px" borderColor="gray.700">
                        <Td fontWeight="500" color="white" py={4}>Share Class</Td>
                        <Td fontWeight="500" color="white" py={4}>Min. Investment</Td>
                        <Td fontWeight="500" color="white" py={4}>Management Fee</Td>
                        <Td fontWeight="500" color="white" py={4}>Performance Fee</Td>
                        <Td fontWeight="500" color="white" py={4}>Hurdle Rate</Td>
                      </Tr>
                    </thead>
                    <Tbody>
                      <Tr borderBottomWidth="1px" borderColor="gray.700">
                        <Td color="white" py={4}>Class A</Td>
                        <Td color="white" py={4}>$25M</Td>
                        <Td color="white" py={4}>1%</Td>
                        <Td color="white" py={4}>15%</Td>
                        <Td color="white" py={4}>12%</Td>
                      </Tr>
                      <Tr borderBottomWidth="1px" borderColor="gray.700">
                        <Td color="white" py={4}>Class B</Td>
                        <Td color="white" py={4}>$5M</Td>
                        <Td color="white" py={4}>1.5%</Td>
                        <Td color="white" py={4}>15%</Td>
                        <Td color="white" py={4}>10%</Td>
                      </Tr>
                      <Tr>
                        <Td color="white" py={4}>Class C</Td>
                        <Td color="white" py={4}>$1M</Td>
                        <Td color="white" py={4}>1.5%</Td>
                        <Td color="white" py={4}>25%</Td>
                        <Td color="white" py={4}>8%</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
              
              <Box>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={2}
                >
                  Liquidity
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Quarterly redemptions after initial 12-month lock-up (soft)
                </Text>
              </Box>
              
              <Box>
                <Heading 
                  as="h3" 
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="500"
                  color="#1D1D1F"
                  mb={2}
                >
                  Compliance
                </Heading>
                <Text 
                  color="#6E6E73" 
                  fontWeight="light"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Fully SEC compliant (Reg D, ICA exemptions, anticipated RIA registration), audited, U.S. tax optimized, CFTC Rule 4.13(a)(3) de minimis exemption.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Box py={{ base: 16, md: 24 }} px={0} bg="gray.50">
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }} 
            fontWeight="400" 
            mb={6}
            lineHeight="1.2"
            textAlign="center"
            color="#1D1D1F"
          >
            Investing in the Future..
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            color="#6E6E73"
            fontWeight="light"
            lineHeight="tall"
            textAlign="center"
            maxW="4xl"
            mx="auto"
            mb={12}
          >
            The AI-Powered Berkshire Hathaway.

We combine AI and human expertise to build exceptional businesses for long-term value creation.
          </Text>
          
          <Flex justify="center" mb={8}>
            <Button
              size="lg"
              px={12}
              py={7}
              borderRadius="full"
              background="linear-gradient(to right, #00A9E0, #4BC0C8)"
              color="white"
              _hover={{ background: "linear-gradient(to right, #00A9E0, #4BC0C8)" }}
              fontWeight="500"
              onClick={() => window.location.href = "/investor-profile"}
            >
              Create your hushh profile
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default FundA

import React from 'react';
import { Box, Container, Flex, Heading, Text, Grid, GridItem, Button, Image, VStack, HStack, Divider, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const SolutionsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box 
        bg="#2A3B47" 
        color="white" 
        minH="100vh" 
        py={32} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Container maxW="container.xl">
          <Box maxW="800px" mx="auto" textAlign="center" px={4}>
            <Heading as="h1" size="2xl" mb={3} fontWeight="bold">
              Enterprise-Grade Solutions<br />
              for a <Text as="span" color="#4FD1C5">Connected Future</Text>
            </Heading>
            <Text fontSize="lg" lineHeight="1.7">
              At Hushh Technologies, we specialize in delivering refined IT services and supplying enterprise 
              hardware that meets the rigorous demands of modern business across the GCC. From 
              infrastructure design to performance computing and display solutions—we make your 
              digital transformation journey smoother.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* IT Services Section */}
      <Box py={16} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Flex direction="column" align="center">
              <HStack spacing={2} mb={2}>
                <Box w="6px" h="6px" borderRadius="full" bg="cyan.400"></Box>
                <Heading as="h2" size="xl" textAlign="center" fontWeight="700">
                  IT Services Built for Scale
                </Heading>
              </HStack>
              <Text textAlign="center" color="gray.600" maxW="650px">
                We support your business at every stage of growth with secure, agile, and scalable 
                technology solutions.
              </Text>
            </Flex>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              {/* Server Architecture */}
              <GridItem p={6} borderWidth="1px" borderRadius="md" shadow="sm">
                <Heading as="h3" size="md" mb={3} color="#2A3B47">
                  Server Architecture & Virtualization
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Design and deploy high-performance, cost-optimized server infrastructure 
                  that supports your workload, scaled for your specific needs.
                </Text>
              </GridItem>

              {/* Cloud Computing */}
              <GridItem p={6} borderWidth="1px" borderRadius="md" shadow="sm">
                <Heading as="h3" size="md" mb={3} color="#2A3B47">
                  Cloud Computing & Migration
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Transitions to AWS, Microsoft Azure, or hybrid cloud with supported 
                  data and security at the core.
                </Text>
              </GridItem>

              {/* Enterprise IT Support */}
              <GridItem p={6} borderWidth="1px" borderRadius="md" shadow="sm">
                <Heading as="h3" size="md" mb={3} color="#2A3B47">
                  Enterprise IT Support & Maintenance
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  On-demand remote and onsite support covering server uptime, compute 
                  performance, and display systems.
                </Text>
              </GridItem>

              {/* Data Centre */}
              <GridItem p={6} borderWidth="1px" borderRadius="md" shadow="sm">
                <Heading as="h3" size="md" mb={3} color="#2A3B47">
                  Data Centre Setup & Consulting
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Structured design and implementation of server rooms, cooling to 
                  power distribution tailored to your business.
                </Text>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Hardware Solutions Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Box textAlign="center" maxW="800px" mx="auto">
              <Heading as="h2" size="xl" fontWeight="700" mb={4}>
                Hardware Solutions That Perform
              </Heading>
              <Text color="gray.600">
                We retail and supply high-class computing and display items from leading brands. All 
                solutions include warranty, expert installation, and post-sale support.
              </Text>
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              {/* Servers */}
              <GridItem>
                <VStack align="flex-start" spacing={6}>
                  <Heading as="h3" size="md" color="#2A3B47">
                    Servers
                  </Heading>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Rack Servers / Tower Servers
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Enterprise-grade high-volume servers designed for scalability, 
                      power efficiency, and resilience.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Blade Servers
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      High density, space-saving solutions for data centers.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Edge Servers
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Designed for remote or industrial deployments with compact 
                      power efficiency.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>

              {/* Computing Products */}
              <GridItem>
                <VStack align="flex-start" spacing={6}>
                  <Heading as="h3" size="md" color="#2A3B47">
                    Computing Products
                  </Heading>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Workstations
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      High-performance desktop computers for data processing, CAD, editing studios.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Laptops & Portable Tablets
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Business-grade mobile computers with the latest "on-the-go" performance.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      GPU powered Hardware
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      AI-ready, ML-Processing computation systems with NVIDIA 
                      certified components.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>

              {/* Screens & Displays */}
              <GridItem>
                <VStack align="flex-start" spacing={6}>
                  <Heading as="h3" size="md" color="#2A3B47">
                    Screens & Displays
                  </Heading>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Commercial & Industrial Displays
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Digital signage and high-brightness displays for retail, 
                      hospitality, and education.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Large Format Displays
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Premium video walls for command centers and briefing rooms.
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading as="h4" size="sm" mb={2} color="#2A3B47">
                      Interactive Touch Displays
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Premium touch and meeting focused unified communications displays.
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Why Hushh Technologies */}
      <Box py={16} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Flex direction="column" align="center">
              <HStack spacing={2} mb={2}>
                <Box w="6px" h="6px" borderRadius="full" bg="cyan.400"></Box>
                <Heading as="h2" size="xl" textAlign="center" fontWeight="700">
                  Why Hushh Technologies?
                </Heading>
              </HStack>
            </Flex>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8} maxW="800px" mx="auto">
              <GridItem>
                <VStack align="flex-start" spacing={4}>
                  <HStack>
                    <Box w="18px" h="18px" borderRadius="full" bg="cyan.400" />
                    <Text fontWeight="medium">Trusted partner for Fortune 500 clients in the GCC</Text>
                  </HStack>
                  
                  <HStack>
                    <Box w="18px" h="18px" borderRadius="full" bg="cyan.400" />
                    <Text fontWeight="medium">Certified technical team with deep deployment experience</Text>
                  </HStack>
                  
                  <HStack>
                    <Box w="18px" h="18px" borderRadius="full" bg="cyan.400" />
                    <Text fontWeight="medium">Authorized reseller of HP, Dell, Apple, Lenovo, Aruba, and NVIDIA</Text>
                  </HStack>
                </VStack>
              </GridItem>
              
              <GridItem>
                <VStack align="flex-start" spacing={4}>
                  <HStack>
                    <Box w="18px" h="18px" borderRadius="full" bg="cyan.400" />
                    <Text fontWeight="medium">Fast regional delivery and local installation</Text>
                  </HStack>
                  
                  <HStack>
                    <Box w="18px" h="18px" borderRadius="full" bg="cyan.400" />
                    <Text fontWeight="medium">End-to-end lifecycle support from consultation to maintenance</Text>
                  </HStack>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Let's Build the Future Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={10} align="center">
            <HStack spacing={2}>
              <Box w="6px" h="6px" borderRadius="full" bg="cyan.400"></Box>
              <Heading as="h2" size="xl" textAlign="center" fontWeight="700">
                Let's Build the Future of Your Infrastructure
              </Heading>
            </HStack>
            
            <Text textAlign="center" maxW="650px">
              Need help selecting the right server or computing solution? We're just a call or message away.
            </Text>
            
            <Button 
              colorScheme="cyan" 
              size="md" 
              borderRadius="md"
              px={6}
              as={Link}
              href="/contact"
            >
              Contact Our IT Consultants
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default SolutionsPage;
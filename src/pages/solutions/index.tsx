import React from 'react';
import { Box, Container, Flex, Heading, Text, Grid, GridItem, Button, Image, VStack, HStack, Divider, Link, SimpleGrid } from '@chakra-ui/react';
import { CheckCircle, Monitor, Server, Mail } from 'lucide-react';
import './Solutions.css';

const SolutionsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box 
        className="solutions-hero"
        bg="white" 
        color="black" 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Container maxW="container.xl">
          <Box maxW="900px" mx="auto" textAlign="center" px={4}>
            <Heading 
              as="h1" 
              fontSize={{ base: "4xl", md: "7xl" }}
              mb={10}
              fontWeight="300"
              className="solutions-heading"
              lineHeight="1.1"
            >
              Enterprise-Grade Solutions
              <br />
              for a <Text as="span" className="solutions-gradient-text">Connected Future</Text>
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "xl" }}
              lineHeight="1.7"
              className="solutions-subheading"
              fontWeight="400"
              color="#6E6E73"
            >
              At Hushh Technologies, we specialise in delivering tailored IT services and supplying 
              enterprise hardware that meets the rigorous demands of modern business across the 
              GCC. From infrastructure setup to performance computing and display solutions — we 
              make your operations smarter, faster, and more secure.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* IT Services Section */}
      <Box py={20} className="bg-light-section">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={12}>
            <Flex justifyContent="center" alignItems="center" mb={4}>
              {/* <Box as="span" color="#00A9E0" fontSize="2xl" mr={3}>⚙️</Box> */}
              <Heading as="h2" fontSize="3xl" fontWeight="600" color="#333">
                IT Services Built for Scale
              </Heading>
            </Flex>
            <Text 
              maxW="800px" 
              mx="auto" 
              fontSize="xl" 
              color="#6E6E73" 
              lineHeight="1.7"
              mt={4}
            >
              We support your business at every stage of growth with secure, agile, and scalable services:
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="container.lg" mx="auto">
            {/* Server Architecture & Virtualisation */}
            <Box className="solution-card">
              <Heading as="h3" className="card-title">
                Server Architecture & Virtualisation
              </Heading>
              <Text className="card-description">
                Design and deploy high-performance, multi-environment server 
                infrastructure that supports your workloads, whether on-premises or 
                hybrid.
              </Text>
            </Box>

            {/* Cloud Computing & Migration */}
            <Box className="solution-card">
              <Heading as="h3" className="card-title">
                Cloud Computing & Migration
              </Heading>
              <Text className="card-description">
                Transition to AWS, Microsoft Azure, or hybrid cloud with expert-led 
                planning and data security at the core.
              </Text>
            </Box>

            {/* Enterprise IT Support & Maintenance */}
            <Box className="solution-card">
              <Heading as="h3" className="card-title">
                Enterprise IT Support & Maintenance
              </Heading>
              <Text className="card-description">
                SLA-driven on-site and remote support covering server upkeep, compute 
                operations, and display systems.
              </Text>
            </Box>

            {/* Data Centre Setup & Consulting */}
            <Box className="solution-card">
              <Heading as="h3" className="card-title">
                Data Centre Setup & Consulting
              </Heading>
              <Text className="card-description">
                End-to-end design and implementation of server rooms, cooling systems, 
                and power distribution tailored to your business.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Hardware Solutions Section */}
      <Box py={20} className=" bg-white-section">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={12}>
            <Flex justifyContent="center" alignItems="center" mb={4}>
              {/* <Box as="span" color="#00A9E0" fontSize="2xl" mr={3}>🖥️</Box> */}
              <Heading as="h2" fontSize="3xl" fontWeight="600" color="#333">
                Hardware Solutions That Perform
              </Heading>
            </Flex>
            <Text 
              maxW="800px" 
              mx="auto" 
              fontSize="xl" 
              color="#6E6E73" 
              lineHeight="1.7"
              mt={4}
            >
              We retail and support best-in-class computing and display products from leading global brands. All 
              solutions include warranty, expert installation, and post-sale support.
            </Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10} maxW="container.lg" mx="auto">
            {/* Servers */}
            <GridItem>
              <Heading as="h3" className="category-heading">
                Servers
              </Heading>
              
              <VStack align="start" spacing={8} mt={6}>
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Rack Servers / Tower Servers
                  </Heading>
                  <Text className="subcategory-description">
                    From entry-level to high-density servers designed 
                    for scalability and uptime.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Blade Servers
                  </Heading>
                  <Text className="subcategory-description">
                    Space-saving, high-compute solutions for data-
                    intensive applications.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Edge Servers
                  </Heading>
                  <Text className="subcategory-description">
                    Designed for remote or industrial deployments with 
                    compact power efficiency.
                  </Text>
                </Box>
              </VStack>
            </GridItem>

            {/* Computing Products */}
            <GridItem>
              <Heading as="h3" className="category-heading">
                Computing Products
              </Heading>
              
              <VStack align="start" spacing={8} mt={6}>
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Workstations
                  </Heading>
                  <Text className="subcategory-description">
                    High-performance systems built for engineering, 
                    video editing, 3D rendering, and data modelling.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Mini PCs & Compute Nodes
                  </Heading>
                  <Text className="subcategory-description">
                    Compact solutions for specific use cases like kiosks, 
                    IoT, or point-of-sale environments.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    GPU-powered Machines
                  </Heading>
                  <Text className="subcategory-description">
                    AI-ready, ML/Deep Learning compatible systems 
                    with NVIDIA-certified configurations.
                  </Text>
                </Box>
              </VStack>
            </GridItem>

            {/* Screens & Displays */}
            <GridItem>
              <Heading as="h3" className="category-heading">
                Screens & Displays
              </Heading>
              
              <VStack align="start" spacing={8} mt={6}>
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Professional Monitors
                  </Heading>
                  <Text className="subcategory-description">
                    Colour-calibrated displays for design, broadcast, and 
                    financial sectors.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Large Format Displays
                  </Heading>
                  <Text className="subcategory-description">
                    Commercial-grade screens for command centres, 
                    boardrooms, and collaboration spaces.
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h4" className="subcategory-heading">
                    Interactive Touch Displays
                  </Heading>
                  <Text className="subcategory-description">
                    Education, retail, and training-focused solutions with 
                    robust interactivity and clarity.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Why Hushh Technologies */}
      <Box py={20} className="bg-light-section">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={16}>
            <Flex justifyContent="center" alignItems="center" mb={4}>
              {/* <Box as="span" color="#00A9E0" fontSize="2xl" mr={3}>✓</Box> */}
              <Heading as="h2" fontSize="3xl" fontWeight="600" color="#333">
                Why Hushh Technologies?
              </Heading>
            </Flex>
          </Box>

          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(300px, 1fr))" }} 
            gap={8} 
            maxW="container.lg" 
            mx="auto"
          >
            <VStack align="flex-start" spacing={6}>
              <HStack align="flex-start" spacing={4}>
                <Box color="#00A9E0" mt={1}>
                  <CheckCircle size={20} />
                </Box>
                <Text fontSize="lg" color="#333" fontWeight="400">
                  Trusted partner for Fortune 500 clients in the GCC
                </Text>
              </HStack>
              
              <HStack align="flex-start" spacing={4}>
                <Box color="#00A9E0" mt={1}>
                  <CheckCircle size={20} />
                </Box>
                <Text fontSize="lg" color="#333" fontWeight="400">
                  Certified technical team with deep deployment experience
                </Text>
              </HStack>
              
              <HStack align="flex-start" spacing={4}>
                <Box color="#00A9E0" mt={1}>
                  <CheckCircle size={20} />
                </Box>
                <Text fontSize="lg" color="#333" fontWeight="400">
                  Authorised reseller of HP, Dell, Apple, Lenovo, Acer, and NVIDIA
                </Text>
              </HStack>
            </VStack>
            
            <VStack align="flex-start" spacing={6}>
              <HStack align="flex-start" spacing={4}>
                <Box color="#00A9E0" mt={1}>
                  <CheckCircle size={20} />
                </Box>
                <Text fontSize="lg" color="#333" fontWeight="400">
                  Fast regional delivery and local installation
                </Text>
              </HStack>
              
              <HStack align="flex-start" spacing={4}>
                <Box color="#00A9E0" mt={1}>
                  <CheckCircle size={20} />
                </Box>
                <Text fontSize="lg" color="#333" fontWeight="400">
                  End-to-end lifecycle support from consultation to maintenance
                </Text>
              </HStack>
            </VStack>
          </Grid>
        </Container>
      </Box>

      {/* Let's Build the Future Section */}
      <Box py={20} className="bg-white-section">
        <Container maxW="container.xl">
          <Box textAlign="center" maxW="container.lg" mx="auto">
            <Flex justifyContent="center" alignItems="center" mb={4}>
              {/* <Box as="span" color="#00A9E0" fontSize="2xl" mr={3}>📧</Box> */}
              <Heading as="h2" fontSize="3xl" fontWeight="600" color="#333">
                Let's Build the Future of Your Infrastructure
              </Heading>
            </Flex>
            
            <Text 
              textAlign="center" 
              maxW="700px" 
              mx="auto" 
              fontSize="xl" 
              color="#6E6E73" 
              mt={6}
              mb={10}
            >
              Need help selecting the right server or computing solution? We're just a call or message away.
            </Text>
            
            <Button 
              // className="cta-button"
background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
              as={Link}
              borderRadius={'full'}
              href="/contact"
              color={'white'}
              size="lg"
              _hover={{}}
            >
              Contact Us for a Consultation
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SolutionsPage;
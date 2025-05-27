import React from "react";
import img from "../../files/img.png";
import img2 from "../../files/img (1).png";
import { Box, Container, Heading, Text, SimpleGrid, Flex, Image, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function Leadership() {
  return (
    <Box bg="white">
      {/* Hero Section */}
      <Box pt={{ base: 12, md: 20 }} px={4} textAlign="center">
        <Container maxW="container.lg">
          <Heading 
            as="h1" 
            fontSize={{ base: "3xl", md: "5xl" }} 
            fontWeight="bold" 
            mb={6}
            lineHeight="1.2"
          >
            Empowering Wealth Creation with{" "}
            <Text as="span" color="#0891B2" display="inline">
              Integrity and Innovation
            </Text>
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="3xl" 
            mx="auto" 
            mb={12}
          >
            We blend quantitative expertise with ethical investment practices to deliver personalized financial solutions.
          </Text>
        </Container>
      </Box>

      {/* Our Mission Section */}
      <Box pb={{ base: 12, md: 16 }} px={4}>
        <Container maxW="container.lg">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "4xl" }} 
            fontWeight="bold" 
            mb={8}
          >
            Our Mission
          </Heading>
          
          <Box 
            bg="white" 
            p={{ base: 6, md: 10 }} 
            borderRadius="lg" 
            boxShadow="sm"
            mb={12}
            style={{ backgroundColor: 'rgb(249 250 251 / var(--tw-bg-opacity, 1))' }}
          >
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" mb={6} lineHeight="tall" >
              At Hushh Technologies LLC, our mission is to democratize access to sophisticated investment strategies by leveraging cutting-edge 
              artificial intelligence and advanced mathematical models. We are committed to generating consistent, risk-adjusted returns while 
              maintaining the highest standards of transparency and ethical conduct.
            </Text>
            
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" lineHeight="tall">
              We believe that through the power of data science and machine learning, we can unlock investment opportunities that were previously 
              available only to institutional investors, making them accessible to individual investors and smaller institutions alike.
            </Text>
          </Box>
          
          {/* Unique Approach Section */}
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "4xl" }} 
            fontWeight="bold" 
            mb={8}
          >
            Unique Approach to Investment Management
          </Heading>
          
          <Text fontSize={{ base: "md", md: "lg" }} mb={8} color="gray.700">
            At <Text as="span" fontWeight="semibold">Hushh Technologies</Text>, we combine the art of investment with the science of technology:
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={16}>
            <Box 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              borderTop="4px solid #0891B2"
            >
              <Heading as="h3" fontSize="xl" mb={4} fontWeight="600">
                Differentiation in Investment Approach
              </Heading>
              <Text color="gray.700" fontSize="md">
                Unlike traditional funds that rely on speculative returns, Hushh combines high-frequency options income with disciplined, 
                data-driven long-term growth. We prioritize stability, focusing on high-FCF SPX10 companies that represent the backbone of global markets.
              </Text>
            </Box>
            
            <Box 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              borderTop="4px solid #0891B2"
            >
              <Heading as="h3" fontSize="xl" mb={4} fontWeight="600">
                Math-Driven Decision Making
              </Heading>
              <Text color="gray.700" fontSize="md">
                Every strategy is informed by rigorous quantitative analysis, ensuring precision and accuracy in our investment decisions.
              </Text>
            </Box>
            
            <Box 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              borderTop="4px solid #0891B2"
            >
              <Heading as="h3" fontSize="xl" mb={4} fontWeight="600">
                AI-Powered Insights
              </Heading>
              <Text color="gray.700" fontSize="md">
                Leveraging the latest advancements in machine learning, we identify market inefficiencies and capitalize on opportunities in real-time.
              </Text>
            </Box>
            
            <Box 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              borderTop="4px solid #0891B2"
            >
              <Heading as="h3" fontSize="xl" mb={4} fontWeight="600">
                Transparency You Can Trust
              </Heading>
              <Text color="gray.700" fontSize="md">
                Clear communication and a human-centric approach to wealth creation ensures you always understand our strategies and performance.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Leadership Team Section */}
      <Box py={{ base: 12, md: 16 }} px={4}>
        <Container maxW="container.lg">
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "4xl" }} 
            fontWeight="bold" 
            mb={4} 
            textAlign="center"
          >
            Our Leadership Team
          </Heading>
          
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="gray.600" 
            maxW="3xl" 
            mx="auto" 
            mb={12} 
            textAlign="center"
          >
            At Hushh Technologies LLC, our leadership team combines expertise in technology, finance, and strategy to redefine wealth creation.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Manish Sainani */}
            <Box 
              bg="white" 
              p={8} 
              borderRadius="lg" 
              boxShadow="md"
              textAlign="center"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Box 
                w="150px" 
                h="150px" 
                borderRadius="full" 
                overflow="hidden" 
                mx="auto" 
                mb={6}
                border="3px solid #0891B2"
              >
                <Image src={img} alt="Manish Sainani" w="full" h="full" objectFit="cover" />
              </Box>
              
              <Heading as="h3" fontSize="2xl" mb={2}>
                Manish <Text as="span" color="#0891B2">Sainani</Text>
              </Heading>
              
              <Text color="gray.500" fontWeight="medium" mb={4}>
                Founder & CEO
              </Text>
              
              <Text color="gray.700">
                With over a decade of leadership at Google, Microsoft, and Splunk, Manish brings unmatched expertise in AI, 
                machine learning, and data-driven innovation. His vision drives Hushh's mission to empower investors with 
                sustainable, technology-powered wealth strategies.
              </Text>
            </Box>

            {/* Justin Donaldson */}
            <Box 
              bg="white" 
              p={8} 
              borderRadius="lg" 
              boxShadow="md"
              textAlign="center"
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Box 
                w="150px" 
                h="150px" 
                borderRadius="full" 
                overflow="hidden" 
                mx="auto" 
                mb={6}
                border="3px solid #0891B2"
              >
                <Image src={img2} alt="Justin Donaldson" w="full" h="full" objectFit="cover" />
              </Box>
              
              <Heading as="h3" fontSize="2xl" mb={2}>
                Justin <Text as="span" color="#0891B2">Donaldson</Text>
              </Heading>
              
              <Text color="gray.500" fontWeight="medium" mb={4}>
                Chief Scientist & Investment Strategist
              </Text>
              
              <Text color="gray.700">
                Justin leads Hushh's scientific and strategic investment approaches. As the architect behind proprietary 
                options strategies like "Sell the Wall," he uses advanced quantitative models to deliver consistent, 
                risk-optimized returns.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Box bg="#1D293D" py={16} px={4} textAlign="center" color="white">
        <Container maxW="container.md">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} mb={6}>
            Join <Text as="span" color="#0891B2" display="inline">Us</Text>
          </Heading>
          
          <Text fontSize={{ base: "md", md: "lg" }} mb={8} color="gray.300">
            Whether you're an individual or an institution, Hushh Technologies LLC invites you to join us on our journey 
            to transform investment strategies through innovative technology and ethical practices.
          </Text>
          
          <Flex 
            justifyContent="center" 
            gap={4} 
            flexDirection={{ base: "column", sm: "row" }}
            maxW="md"
            mx="auto"
          >
            <Box 
              as="button"
              bg="#0891B2"
              color="#1D293D"
              py={3}
              px={6}
              borderRadius="md"
              onClick={() => window.location.href = "/contact"}
              fontWeight="medium"
              _hover={{ bg: "#4BC0C8" }}
              w={{ base: "full", sm: "auto" }}
            >
              Contact Us
            </Box>
            
            <Box 
              as="button"
              bg="transparent"
              color="white"
              py={3}
              onClick={() => window.location.href = "/signUp"}
              px={6}
              borderRadius="md"
              fontWeight="medium"
              border="1px solid white"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
              w={{ base: "full", sm: "auto" }}
            >
              Sign Up Now
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

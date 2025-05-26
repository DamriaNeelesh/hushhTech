import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Icon, Flex, Image, Button } from '@chakra-ui/react';
import { FaRocket, FaChartBar, FaBrain, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WhyChooseSection = () => {
  const navigate = useNavigate();
  
  return (
    <Box 
      py={16} 
      px={4} 
      bg="rgb(249, 250, 251)"
      style={{ '--tw-bg-opacity': 1 } as React.CSSProperties}
    >
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" mb={4} color="gray.800">
            Why Choose Hushh Technologies?
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="3xl" mx="auto">
            Our unique approach combines cutting-edge technology with proven investment strategies
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {/* Feature 1 */}
          <Box 
            p={6} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.200"
            bg="white"
            // boxShadow="sm"
            transition="all 0.3s"
            _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
          >
            <Flex 
              w={12} 
              h={12} 
              bg="red.50" 
              borderRadius="full" 
              justify="center" 
              align="center" 
              mb={4}
            >
              <Icon as={FaRocket} color="red.400" boxSize={6} />
            </Flex>
            <Heading as="h3" fontSize="xl" mb={3} fontWeight="500" color="gray.800">
              Innovative Strategies
            </Heading>
            <Text color="gray.600">
              AI-powered algorithms that adapt to market changes in real-time
            </Text>
          </Box>

          {/* Feature 2 */}
          <Box 
            p={6} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.200"
            bg="white"
            // boxShadow="sm"
            transition="all 0.3s"
            _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
          >
            <Flex 
              w={12} 
              h={12} 
              bg="blue.50" 
              borderRadius="full" 
              justify="center" 
              align="center" 
              mb={4}
            >
              <Icon as={FaChartBar} color="blue.400" boxSize={6} />
            </Flex>
            <Heading as="h3" fontSize="xl" mb={3} fontWeight="500" color="gray.800">
              Math-Driven Decisions
            </Heading>
            <Text color="gray.600">
              Every investment backed by rigorous quantitative analysis
            </Text>
          </Box>

          {/* Feature 3 */}
          <Box 
            p={6} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.200"
            bg="white"
            // boxShadow="sm"
            transition="all 0.3s"
            _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
          >
            <Flex 
              w={12} 
              h={12} 
              bg="pink.50" 
              borderRadius="full" 
              justify="center" 
              align="center" 
              mb={4}
            >   
              <Icon as={FaBrain} color="pink.400" boxSize={6} />
            </Flex>
            <Heading as="h3" fontSize="xl" mb={3} fontWeight="500" color="gray.800">
              AI-Powered Insights
            </Heading>
            <Text color="gray.600">
              Machine learning models that identify hidden opportunities
            </Text>
          </Box>

          {/* Feature 4 */}
          <Box 
            p={6} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.200"
            bg="white"
            transition="all 0.3s"
            _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
          >
            <Flex 
              w={12} 
              h={12} 
              bg="cyan.50" 
              borderRadius="full" 
              justify="center" 
              align="center" 
              mb={4}
            >
              <Icon as={FaSearch} color="cyan.400" boxSize={6} />
            </Flex>
            <Heading as="h3" fontSize="xl" mb={3} fontWeight="500" color="gray.800">
              Transparency You Trust
            </Heading>
            <Text color="gray.600">
              Clear reporting and ethical practices you can depend on
            </Text>
          </Box>
        </SimpleGrid>
        
        {/* Call to Action Section */}
        <Box mt={24} textAlign="center">
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }} 
            fontWeight="bold" 
            mb={4} 
            color="gray.800"
          >
            Ready to Transform Your Investment Strategy?
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color="gray.600" 
            maxW="3xl" 
            mx="auto" 
            mb={10}
          >
            Join forward-thinking investors who are already benefiting from our advanced approach to wealth creation.
          </Text>
          
          <Flex 
            justifyContent="center" 
            gap={4}
            flexDirection={{ base: 'column', sm: 'row' }}
            alignItems="center"
          >
            <Button
              onClick={() => navigate("/about")}
              bg="#0891B2"
              color="#1D293D"
              size="lg"
              minW={{ base: "full", sm: "200px" }}
            //   height="56px"
              fontSize="md"
              fontWeight="medium"
              _hover={{ bg: "#4BC0C8" }}
              borderRadius="md"
            >
              Learn About Our Mission
            </Button>
            
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              size="lg"
              minW={{ base: "full", sm: "200px" }}
            //   height="56px"
              fontSize="md"
              fontWeight="medium"
              borderColor="gray.300"
              color="gray.700"
              _hover={{ bg: "gray.50" }}
              borderRadius="md"
            >
              Contact Us Today
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseSection;
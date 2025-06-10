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
          <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }}  fontWeight="300" mb={4} color="gray.800">
          The Hushh Advantage
          </Heading>
          {/* <Text fontSize={{ base: "lg", md: "xl" }} color="rgb(110 110 115)" className='text-xl text-[#6E6E73] max-w-3xl mx-auto font-light'  mx="auto">
            Our unique approach combines cutting-edge technology with proven investment strategies
          </Text> */}
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {/* Feature 1 */}
          <Box 
            p={9} 
            borderRadius="2xl" 
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
              AI-Driven {window.innerWidth >= 768 ? <br /> : ' '}Alpha
            </Heading>
            <Text className='text-[#6E6E73] leading-relaxed font-light'>
            Proprietary AI algorithms systematically extract alpha and adapt to market changes
            </Text>
          </Box>

          {/* Feature 2 */}
          <Box 
            p={9} 
            borderRadius="lg" 
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
             Systematic Risk {window.innerWidth >= 768 ? <br /> : ' '} Management
            </Heading>
            <Text className='text-[#6E6E73] leading-relaxed font-light'>
            Rigorous quantitative analysis and AI meticulously control risk, every second, every day
            </Text>
          </Box>

          {/* Feature 3 */}
          <Box 
            p={9} 
            borderRadius="lg" 
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
              Hushh Enterprise {window.innerWidth >= 768 ? <br /> : ' '} x AI Synergy
            </Heading>
            <Text className='text-[#6E6E73] leading-relaxed font-light'>
            AI provides speed and scale; human insight delivers deep understanding and strategic oversight            </Text>
          </Box>

          {/* Feature 4 */}
          <Box 
            p={9} 
            borderRadius="lg" 
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
              <Icon as={FaSearch} color="#0AADBC" boxSize={6} />
            </Flex>
            <Heading as="h3" fontSize="xl" mb={3} fontWeight="500" color="gray.800">
              Transparency You {window.innerWidth >= 768 ? <br /> : ' '}Trust
            </Heading>
            <Text className='text-[#6E6E73] leading-relaxed font-light'>
            Clear reporting and ethical practices you can depend on
            </Text>
          </Box>
        </SimpleGrid>
        
       
      </Container>
    </Box>
  );
};

export default WhyChooseSection;
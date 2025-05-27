import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  DollarSign,
  Heart,
  LifeBuoy,
  Gift,
  Clock,
  Zap,
  Briefcase,
  CreditCard,
  Award,
  Coffee,
  Users,
  BookOpen,
  Target,
  Monitor,
  Star,
  Headphones,
  Home,
  MapPin,
  Calendar,
  Smile,
  Check,
} from "lucide-react";
import "./benefits.css";

const BenefitsPage: React.FC = () => {
  return (
    <Container maxW="100%" bg={'white'} py={10} >
      {/* Main Header */}
      <Box textAlign="center" mb={12} minH={'60vh'} px={{ base: 4, md: 8 }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "3xl" }} 
          mb={4}
          bgGradient="linear(to-r, #111111, #111111, #54E5FF)"
          bgClip="text"
        >
          {/* <Text as="span" color="black">Hushh Technologies LLC – </Text> */}
          <Text as="span" className="blue-gradient-text" fontWeight="500">World-Class Benefits</Text><br/>
          <Text as="span" color="black" fontWeight="300"> for World-Class Talent</Text>
        </Heading>
        
        <Text fontSize={{ base: "md", md: "lg" }} maxW="4xl" mx="auto" color="gray.600">
          We believe that exceptional people deserve exceptional benefits. Our comprehensive package is
          designed to support your professional growth, personal wellbeing, and financial future.
        </Text>
      </Box>

      {/* Benefits Sections */}
      <VStack spacing={24} align="stretch" mb={20} sx={{
        "--tw-bg-opacity": "1",
        backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity,1))"
      }}>
        
        {/* Compensation & Investment Opportunities */}
        <Box bg={'white'} mx={20} p={10} borderRadius={'lg'}>
          <Flex 
            align="center" 
            justify="center" 
            mb={8}
          >
            <Box as="span" fontSize="3xl" color="#F6B353" mr={3}>💰</Box>
            <Heading as="h2" fontSize="4xl" color="rgb(29,29,31)" fontWeight="300">
              Compensation & Investment Opportunities
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" >Competitive base salaries benchmarked to top-tier firms</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="#1D1D1F">Access to proprietary investment strategies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Performance-based bonuses tied to individual and company success</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">401(k) with generous company matching</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Equity participation in company growth</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Financial planning and investment advisory services</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Health, Wellness & Family Support */}
        <Box bg={'white'} mx={20} p={10} borderRadius={'lg'}>
          <Flex 
            align="center" 
            justify="center" 
            mb={8}
          >
            <Box as="span" fontSize="3xl" color="#C084FC" mr={3}>🏥</Box>
            <Heading as="h2" fontSize="4xl" color="rgb(29,29,31)" fontWeight="300">
              Health, Wellness & Family Support
            </Heading>
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} spacing={{ base: 6, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Premium health, dental, and vision insurance (100% company paid)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Generous parental leave policies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Mental health and wellness programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Childcare assistance and family support services</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">On-site fitness facilities and wellness stipend</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Comprehensive life and disability insurance</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Work-Life, Growth & Giving Back */}
        <Box bg={'white'} mx={20} p={10} borderRadius={'lg'}>
          <Flex 
            align="center" 
            justify="center" 
            mb={8}
          >
            <Box as="span" fontSize="3xl" color="#6CB288" mr={3}>🌱</Box>
            <Heading as="h2" fontSize="4xl" color="rgb(29,29,31)" fontWeight="300">
              Work-Life, Growth & Giving Back
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Flexible work arrangements and remote work options</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Conference attendance and continuing education support</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Unlimited PTO policy with minimum usage requirements</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Internal mentorship and leadership development programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Sabbatical opportunities for long-term employees</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Charitable giving matching program</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Professional development budget ($10,000+ annually)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Volunteer time off for community service</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Perks, Culture & Quality of Life */}
        <Box bg={'white'} mx={20} p={10} borderRadius={'lg'}>
          <Flex 
            align="center" 
            justify="center" 
            mb={8}
          >
            <Box as="span" fontSize="3xl" color="#FC8181" mr={3}>🎯</Box>
            <Heading as="h2" fontSize="4xl" color="rgb(29,29,31)" fontWeight="300">
              Perks, Culture & Quality of Life
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">State-of-the-art office spaces with premium amenities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Team events, retreats, and cultural activities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Catered meals and premium coffee/snacks</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check}  boxSize={5} mt={1} />
              <Text fontSize="lg" color="gray.700">Innovation time for personal projects</Text>
            </HStack>
          </SimpleGrid>
        </Box>
      </VStack>
      
      {/* Why Join Hushh Technologies? */}
      <Box
        bg="white"
        borderRadius="lg"
        p={{ base: 8, md: 12 }}
        color="white"
        textAlign="center"
        maxW="container.lg"
        mx="auto"
        my={20} 
      >
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} color="hsl(29 29 31)" mb={6} fontWeight="400">
          Why Join Hushh Technologies?
        </Heading>
        
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="300" mb={10} lineHeight="tall" maxW="4xl" mx="auto" color={'#6E6E73'}>
          At Hushh Technologies, you'll be part of a team that's revolutionizing the investment industry 
          through cutting-edge AI and quantitative methods. You'll work alongside brilliant minds, solve 
          complex challenges, and directly impact the future of finance while enjoying unparalleled benefits 
          and growth opportunities.
        </Text>
        
        <Button
          as="a"
          href="/career"
          bg={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
          color="white"
          size="lg"
          px={6}
          py={4}
          fontWeight="300"
          borderRadius="full"
          _hover={{ bg: "#0098cc", transform: "translateY(-2px)" }}
          boxShadow="md"
          transition="all 0.3s ease"
          height="auto"
        >
          View Open Positions
        </Button>
      </Box>
    </Container>
  );
};

export default BenefitsPage;

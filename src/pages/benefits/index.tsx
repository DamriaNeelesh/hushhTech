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
  useBreakpointValue,
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
  // Use responsive values based on breakpoint
  const sectionMargin = useBreakpointValue({ base: "0", sm: "4", md: "10", lg: "20" });
  const sectionPadding = useBreakpointValue({ base: "6", sm: "8", md: "10" });
  const sectionSpacing = useBreakpointValue({ base: "12", sm: "16", md: "24" });
  const headingSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "4xl" });
  const iconSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  
  return (
    <Container maxW="100%" bg={'white'} py={10} px={{ base: 4, md: 8 }}>
      {/* Main Header */}
      <Box textAlign="center" mb={{ base: 8, md: 12 }} minH={{ base: "40vh", md: "60vh" }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "3xl" }} 
          mb={4}
          bgGradient="linear(to-r, #111111, #111111, #54E5FF)"
          bgClip="text"
          lineHeight={{ base: "1.2", md: "1.4" }}
          px={{ base: 2, md: 0 }}
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
      <VStack spacing={sectionSpacing} align="stretch" mb={20} sx={{
        "--tw-bg-opacity": "1",
        backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity,1))"
      }}>
        
        {/* Compensation & Investment Opportunities */}
        <Box bg={'white'} mx={{ base: 0, sm: 4, md: 10, lg: 20 }} p={sectionPadding} borderRadius={'lg'} shadow={{ base: "sm", md: "md" }}>
          <Flex 
            align="center" 
            justify="center" 
            mb={{ base: 6, md: 8 }}
            flexDirection={{ base: "column", sm: "row" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box as="span" fontSize={iconSize} color="#F6B353" mr={{ base: 0, sm: 3 }} mb={{ base: 2, sm: 0 }}>💰</Box>
            <Heading as="h2" fontSize={headingSize} color="rgb(29,29,31)" fontWeight="300">
              Compensation & Investment Opportunities
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }}>Competitive base salaries benchmarked to top-tier firms</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="#1D1D1F">Access to proprietary investment strategies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Performance-based bonuses tied to individual and company success</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">401(k) with generous company matching</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Equity participation in company growth</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Financial planning and investment advisory services</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Health, Wellness & Family Support */}
        <Box bg={'white'} mx={{ base: 0, sm: 4, md: 10, lg: 20 }} p={sectionPadding} borderRadius={'lg'} shadow={{ base: "sm", md: "md" }}>
          <Flex 
            align="center" 
            justify="center" 
            mb={{ base: 6, md: 8 }}
            flexDirection={{ base: "column", sm: "row" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box as="span" fontSize={iconSize} color="#C084FC" mr={{ base: 0, sm: 3 }} mb={{ base: 2, sm: 0 }}>🏥</Box>
            <Heading as="h2" fontSize={headingSize} color="rgb(29,29,31)" fontWeight="300">
              Health, Wellness & Family Support
            </Heading>
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} spacing={{ base: 4, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Premium health, dental, and vision insurance (100% company paid)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Generous parental leave policies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Mental health and wellness programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Childcare assistance and family support services</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">On-site fitness facilities and wellness stipend</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Comprehensive life and disability insurance</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Work-Life, Growth & Giving Back */}
        <Box bg={'white'} mx={{ base: 0, sm: 4, md: 10, lg: 20 }} p={sectionPadding} borderRadius={'lg'} shadow={{ base: "sm", md: "md" }}>
          <Flex 
            align="center" 
            justify="center" 
            mb={{ base: 6, md: 8 }}
            flexDirection={{ base: "column", sm: "row" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box as="span" fontSize={iconSize} color="#6CB288" mr={{ base: 0, sm: 3 }} mb={{ base: 2, sm: 0 }}>🌱</Box>
            <Heading as="h2" fontSize={headingSize} color="rgb(29,29,31)" fontWeight="300" textAlign={{ base: "center", sm: "left" }}>
              Work-Life, Growth & Giving Back
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Flexible work arrangements and remote work options</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Conference attendance and continuing education support</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Unlimited PTO policy with minimum usage requirements</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Internal mentorship and leadership development programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Sabbatical opportunities for long-term employees</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Charitable giving matching program</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Professional development budget ($10,000+ annually)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Volunteer time off for community service</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Perks, Culture & Quality of Life */}
        <Box bg={'white'} mx={{ base: 0, sm: 4, md: 10, lg: 20 }} p={sectionPadding} borderRadius={'lg'} shadow={{ base: "sm", md: "md" }}>
          <Flex 
            align="center" 
            justify="center" 
            mb={{ base: 6, md: 8 }}
            flexDirection={{ base: "column", sm: "row" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box as="span" fontSize={iconSize} color="#FC8181" mr={{ base: 0, sm: 3 }} mb={{ base: 2, sm: 0 }}>🎯</Box>
            <Heading as="h2" fontSize={headingSize} color="rgb(29,29,31)" fontWeight="300">
              Perks, Culture & Quality of Life
            </Heading>
          </Flex>
          
          <SimpleGrid color="hsl(29 29 31)" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'} columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 10 }} maxW="container.lg" mx="auto" fontWeight="300">
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">State-of-the-art office spaces with premium amenities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Team events, retreats, and cultural activities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Catered meals and premium coffee/snacks</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Check} boxSize={5} mt={1} flexShrink={0} />
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">Innovation time for personal projects</Text>
            </HStack>
          </SimpleGrid>
        </Box>
      </VStack>
      
      {/* Why Join Hushh Technologies? */}
      <Box
        bg="white"
        borderRadius="lg"
        p={{ base: 6, md: 12 }}
        color="white"
        textAlign="center"
        maxW="container.lg"
        mx="auto"
        my={{ base: 10, md: 20 }}
        shadow={{ base: "sm", md: "md" }}
      >
        <Heading as="h2" fontSize={{ base: "xl", md: "4xl" }} color="hsl(29 29 31)" mb={{ base: 4, md: 6 }} fontWeight="400">
          Why Join Hushh Technologies?
        </Heading>
        
        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="300" mb={{ base: 6, md: 10 }} lineHeight="tall" maxW="4xl" mx="auto" color={'#6E6E73'}>
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
          size={{ base: "md", md: "lg" }}
          px={{ base: 4, md: 6 }}
          py={{ base: 3, md: 4 }}
          fontWeight="300"
          borderRadius="full"
          _hover={{ bg: "#0098cc", transform: "translateY(-2px)" }}
          boxShadow="md"
          transition="all 0.3s ease"
          height="auto"
          width={{ base: "100%", sm: "auto" }}
        >
          View Open Positions
        </Button>
      </Box>
    </Container>
  );
};

export default BenefitsPage;

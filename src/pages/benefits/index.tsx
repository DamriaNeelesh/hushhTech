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
} from "lucide-react";

const BenefitsPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={10} px={{ base: 4, md: 8 }}>
      {/* Main Header */}
      <Box textAlign="center" mb={12}>
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }} 
          mb={4}
          bgGradient="linear(to-r, #111111, #111111, #54E5FF)"
          bgClip="text"
        >
          <Text as="span" color="black">Hushh Technologies LLC – </Text>
          <Text as="span" color="cyan.400">World-Class Benefits</Text>
          <Text as="span" color="black"> for World-Class Talent</Text>
        </Heading>
        
        <Text fontSize={{ base: "md", md: "lg" }} maxW="4xl" mx="auto" color="gray.600">
          We believe that exceptional people deserve exceptional benefits. Our comprehensive package is
          designed to support your professional growth, personal wellbeing, and financial future.
        </Text>
      </Box>

      {/* Benefits Sections */}
      <VStack spacing={8} align="stretch">
        
        {/* Compensation & Investment Opportunities */}
        <Box 
          bg="orange.50" 
          borderRadius="xl" 
          p={6} 
          boxShadow="md"
          border="1px solid"
          borderColor="orange.100"
        >
          <HStack mb={4} spacing={3}>
            <Icon as={DollarSign} color="orange.400" boxSize={6} />
            <Heading as="h2" size="lg" color="gray.800">Compensation & Investment Opportunities</Heading>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <HStack align="flex-start" spacing={3}>
              <Icon as={CreditCard} color="orange.400" />
              <Text>Competitive base salaries benchmarked to top tier firms</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Target} color="orange.400" />
              <Text>Access to proprietary investment strategies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Award} color="orange.400" />
              <Text>Performance based bonuses tied to individual and company success</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Zap} color="orange.400" />
              <Text>401(k) with generous company matching</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Users} color="orange.400" />
              <Text>Equity participation in company growth</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Briefcase} color="orange.400" />
              <Text>Financial planning and retirement advisory services</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Health, Wellness & Family Support */}
        <Box 
          bg="purple.50" 
          borderRadius="xl" 
          p={6} 
          boxShadow="md"
          border="1px solid"
          borderColor="purple.100"
        >
          <HStack mb={4} spacing={3}>
            <Icon as={Heart} color="purple.400" boxSize={6} />
            <Heading as="h2" size="lg" color="gray.800">Health, Wellness & Family Support</Heading>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <HStack align="flex-start" spacing={3}>
              <Icon as={LifeBuoy} color="purple.400" />
              <Text>Premium health, dental, and vision insurance (100% company paid)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Calendar} color="purple.400" />
              <Text>Generous parental leave policies</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Headphones} color="purple.400" />
              <Text>Mental health and wellness programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Home} color="purple.400" />
              <Text>Childcare assistance and family support services</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Monitor} color="purple.400" />
              <Text>On-site fitness facilities and wellness stipend</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Smile} color="purple.400" />
              <Text>Elder care support and resources</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Star} color="purple.400" />
              <Text>Comprehensive life and disability insurance</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Heart} color="purple.400" />
              <Text>Employee assistance programs</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Work-Life, Growth & Giving Back */}
        <Box 
          bg="green.50" 
          borderRadius="xl" 
          p={6} 
          boxShadow="md"
          border="1px solid"
          borderColor="green.100"
        >
          <HStack mb={4} spacing={3}>
            <Icon as={Clock} color="green.400" boxSize={6} />
            <Heading as="h2" size="lg" color="gray.800">Work-Life, Growth & Giving Back</Heading>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <HStack align="flex-start" spacing={3}>
              <Icon as={Clock} color="green.400" />
              <Text>Flexible work arrangements and remote work options</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={BookOpen} color="green.400" />
              <Text>Conference attendance and continuing education support</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Calendar} color="green.400" />
              <Text>Unlimited PTO policy with minimum usage requirements</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Users} color="green.400" />
              <Text>Internal mentorship and leadership development programs</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Clock} color="green.400" />
              <Text>Sabbatical opportunities for long-term employees</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Gift} color="green.400" />
              <Text>Charitable giving matching program</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={BookOpen} color="green.400" />
              <Text>Professional development budget ($15,000+ annually)</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Heart} color="green.400" />
              <Text>Volunteer time off for community service</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Perks, Culture & Quality of Life */}
        <Box 
          bg="blue.50" 
          borderRadius="xl" 
          p={6} 
          boxShadow="md"
          border="1px solid"
          borderColor="blue.100"
        >
          <HStack mb={4} spacing={3}>
            <Icon as={Gift} color="blue.400" boxSize={6} />
            <Heading as="h2" size="lg" color="gray.800">Perks, Culture & Quality of Life</Heading>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <HStack align="flex-start" spacing={3}>
              <Icon as={MapPin} color="blue.400" />
              <Text>State-of-the-art office spaces with premium amenities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Users} color="blue.400" />
              <Text>Team events, retreats, and cultural activities</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Coffee} color="blue.400" />
              <Text>Catered meals and premium coffee breaks</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Star} color="blue.400" />
              <Text>Innovation time for personal projects</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={MapPin} color="blue.400" />
              <Text>Transportation benefits and parking</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Users} color="blue.400" />
              <Text>Employee resource groups and diversity initiatives</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Zap} color="blue.400" />
              <Text>Latest technology and equipment</Text>
            </HStack>
            
            <HStack align="flex-start" spacing={3}>
              <Icon as={Award} color="blue.400" />
              <Text>Recognition and award programs</Text>
            </HStack>
          </SimpleGrid>
        </Box>
        
        {/* Why Join Hushh Technologies? */}
        <Box 
          bgGradient="linear(to-r, #2A3B47, #1D2D35)"
          borderRadius="xl" 
          p={8} 
          color="white"
          boxShadow="lg"
        >
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Why Join Hushh Technologies?
          </Heading>
          
          <Text fontSize="md" textAlign="center" mb={6} maxW="4xl" mx="auto">
            At Hushh Technologies, you'll be part of a team that's revolutionizing the investment industry 
            through cutting-edge AI and quantitative methods. You'll work alongside brilliant minds, solve 
            complex challenges, and directly impact the future of finance while enjoying unparalleled benefits 
            and growth opportunities.
          </Text>
          
          <Flex justify="center">
            <Button 
              colorScheme="cyan" 
              size="md" 
              px={10}
              _hover={{ bg: "cyan.500" }}
            >
              View Open Positions
            </Button>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};

export default BenefitsPage;

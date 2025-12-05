import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { careers } from '../../data/career';
import JobDetails from './JobDetails';
import './Career.css';
import { 
  Container, 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Icon, 
  Flex, 
  Divider, 
  SimpleGrid,
  Button
} from "@chakra-ui/react";
import { MapPin, Clock, ChevronRight, Rocket, DollarSign, Star } from "lucide-react";

const CareerList = () => {
  return (
    <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
      {/* Main Header */}
      <Box 
        textAlign="center" 
        display="flex"
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="90vh"
        my={0}
        bg="rgb(255 255 255 / var(--tw-bg-opacity, 1))"
      >
        <Heading 
          as="h1" 
          lineHeight="1.1"
          fontWeight="500"
          mb={{base: 8, md: 0}}
          display={'flex'}
          flexDirection={'column'}
          data-career-heading="true"
        >
          <Text 
            as="span" 
            className="gradient-text"
            fontSize={{ base: "4xl", md: "7xl" }}
            letterSpacing="-0.02em"
            fontWeight="500"
          >
            Hushh Jobs
          </Text>
          <Text 
            as="span" 
            color="black"
            fontSize={{ base: "4xl", md: "7xl" }}
            letterSpacing="-0.02em"
            fontWeight="300"
            mt={{base: 2, md: 0}}
          >  Join Our Team</Text>
        </Heading>
        
        <Text 
          fontSize={{ base: "md", md: "xl" }} 
          maxW="3xl" 
          mx="auto" 
          
          color="#6E6E73"
          lineHeight="1.7"
          fontWeight="400"
          fontFamily={'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,sans-serif'}
          className='text-xl md:text-2xl text-[#6E6E73] max-w-4xl mx-auto leading-relaxed font-light'
        >
          Help us revolutionize the investment industry through cutting-edge AI and quantitative 
          research. We're looking for brilliant minds who share our passion for innovation and 
          excellence.
        </Text>
      </Box>

      {/* Career Departments */}
      <VStack spacing={14} align="stretch" maxW="container.lg" mx="auto" bg={'rgb(255 255 255 / var(--tw-bg-opacity, 1))'} opacity={1}>
        {Object.entries(careers).map(([department, jobs]) => (
          <Box key={department} bg={'white'} borderRadius={'2xl'} p={8}  >
            <Heading 
              as="h2" 
              fontSize="2xl"
              color="gray.800" 
              mb={6} 
              fontWeight="medium"
            >
              {department}
            </Heading>
            <Divider mb={8} borderColor="gray.200" />
            
            <VStack spacing={5} align="stretch" >
              {jobs.map((job) => (
                <Box 
                  key={job.id} 
                  as={Link} 
                  to={`/career/${job.id}`}
                  p={6}
                  bg={'rgb(250 250 250 / var(--tw-bg-opacity, 1))'}
                  // borderRadius="lg"
                  // borderWidth="1px"
                  borderColor="gray.200"
                  boxShadow="sm"
                  _hover={{ 
                    boxShadow: "md",
                    borderColor: "gray.300",
                    textDecoration: "none"
                  }}
                  transition="all 0.2s"
                  className="job-card"
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Heading as="h3" fontSize="xl" fontWeight="500" color="gray.800" mb={3}>
                        {job.title}
                      </Heading>
                      <HStack gap={0} p={0}  alignItems={{base: "flex-start", md: "center"}} textAlign={{base: "left"}} spacing={8} mt={1} display={{base: "flex", md: "none"}} flexDirection={{base: "column", md: "row"}}> 
                        <HStack spacing={2} >
                          <Icon as={MapPin} color="gray.500" boxSize={4} />
                          <Text color="gray.600" fontSize="sm">{job.location}</Text>
                        </HStack>
                        <HStack spacing={2} mt={1}>
                          <Icon as={Clock} color="gray.500" boxSize={4} />
                          <Text color="gray.600" fontSize="sm">Full-time</Text>
                        </HStack>
                      </HStack>
                    </Box>
                    <Icon as={ChevronRight} color="gray.400" boxSize={6} />
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>

      {/* Why Work at Hushh Technologies? Section */}
      <Box mt={24} mb={16}>
        <Heading 
          as="h2" 
          fontSize="3xl"
          color="gray.800" 
          mb={16} 
          textAlign="center"
          fontWeight="500"
          letterSpacing="-0.01em"
        >
          Why Work at Hushh Technologies?
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} maxW="container.lg" mx="auto">
          {/* Benefit 1 */}
          <Box textAlign="center">
            <Flex 
              justifyContent="center" 
              alignItems="center" 
              mb={5}
            >
              <Icon as={Rocket} boxSize={12} color="#FF7171" />
            </Flex>
            <Heading 
              as="h3" 
              fontSize="xl"
              color="gray.800" 
              mb={3}
              fontWeight="500"
            >
              Cutting-Edge Technology
            </Heading>
            <Text 
              color="gray.600"
              fontSize="md"
              lineHeight="tall"
            >
              Work with the latest AI and machine learning technologies
            </Text>
          </Box>

          {/* Benefit 2 */}
          <Box textAlign="center">
            <Flex 
              justifyContent="center" 
              alignItems="center" 
              mb={5}
            >
              <Icon as={DollarSign} boxSize={12} color="#F8B76B" />
            </Flex>
            <Heading 
              as="h3" 
              fontSize="xl"
              color="gray.800" 
              mb={3}
              fontWeight="500"
            >
              Competitive Compensation
            </Heading>
            <Text 
              color="gray.600"
              fontSize="md"
              lineHeight="tall"
            >
              Top-tier salaries, equity, and comprehensive benefits
            </Text>
          </Box>

          {/* Benefit 3 */}
          <Box textAlign="center">
            <Flex 
              justifyContent="center" 
              alignItems="center" 
              mb={5}
            >
              <Icon as={Star} boxSize={12} color="#F8ED62" />
            </Flex>
            <Heading 
              as="h3" 
              fontSize="xl"
              color="gray.800" 
              mb={3}
              fontWeight="500"
            >
              Growth Opportunities
            </Heading>
            <Text 
              color="gray.600"
              fontSize="md"
              lineHeight="tall"
            >
              Learn from industry experts and advance your career
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Benefits Button */}
      <Flex justifyContent="center" mt={16} mb={10}>
        <Button
          as={Link}
          to="/benefits"
          bgGradient="linear-gradient(to right, #00A9E0, #6DD3EF)"
          color="white"
          px={8}
          py={5}
          fontSize="md"
          fontWeight="500"
          borderRadius="full"
          _hover={{ bgGradient: "linear-gradient(to right, #0098cc, #5BC0DC)" }}
          boxShadow="md"
          height="auto"
          className="benefits-button"
        >
          View Full Benefits Package
        </Button>
      </Flex>
    </Container>
  );
};

const Career = () => {
  const location = useLocation();
  
  // Only show the career list on the main career page
  if (location.pathname === '/career') {
    return <CareerList />;
  }

  return (
    <Routes>
      <Route path="/:jobId" element={<JobDetails />} />
    </Routes>
  );
};

export default Career;
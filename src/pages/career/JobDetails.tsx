import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { careers } from "../../data/career";
import ApplicationForm from "./ApplicationForm";
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Flex,
  Divider,
  UnorderedList,
  ListItem,
  Badge
} from "@chakra-ui/react";
import { MapPin, Clock, ChevronLeft, DollarSign } from "lucide-react";

const JobDetails = () => {
  const { jobId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };
  const job = Object.values(careers)
    .flat()
    .find((j) => j.id === jobId);

  if (!job) return (
    <Container maxW="container.xl" py={12}>
      <Box textAlign="center">
        <Heading>Position not found</Heading>
        <Button as={Link} to="/career" mt={6} colorScheme="cyan">
          Back to Careers
        </Button>
      </Box>
    </Container>
  );

  return (
    <Container maxW="container.lg" py={8} px={{ base: 4, md: 6 }}>
      {/* Back to Careers button */}
      <Button 
        as={Link}
        to="/career"
        leftIcon={<ChevronLeft size={18} />}
        variant="ghost"
        color="gray.600"
        _hover={{ color: "gray.800", bg: "gray.100" }}
        mb={6}
        pl={0}
      >
        Back to Careers
      </Button>

      {/* Job Details Card */}
      <Box 
        bg="white" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
        boxShadow="sm"
        p={8} 
        mb={6}
      >
        <Heading as="h1" size="xl" color="gray.800" mb={3}>{job.title}</Heading>
        
        <Flex 
          flexWrap="wrap" 
          alignItems="center" 
          gap={{ base: 2, md: 6 }}
          mt={3} 
          mb={6}
        >
          {job.location && (
            <HStack spacing={2}>
              <Icon as={MapPin} color="gray.500" boxSize={4} />
              <Text color="gray.600">{job.location}</Text>
            </HStack>
          )}
          
          {job.salary && (
            <HStack spacing={2}>
              <Icon as={DollarSign} color="gray.500" boxSize={4} />
              <Text color="gray.600">{job.salary}</Text>
            </HStack>
          )}
          
          <HStack spacing={2}>
            <Icon as={Clock} color="gray.500" boxSize={4} />
            <Text color="gray.600">Full-time</Text>
          </HStack>
        </Flex>

        <Button 
          colorScheme="cyan"
          size="lg"
          color="white"
          onClick={() => setShowForm(true)}
          mt={4}
        >
          Apply Now
        </Button>
      </Box>

      {/* About Section */}
      <Box 
        bg="white" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
        boxShadow="sm"
        p={8} 
        mb={6}
      >
        <Heading as="h2" size="md" color="gray.800" mb={4}>About HushhTech</Heading>
        <Text color="gray.700" lineHeight="tall">
          Hushh Technologies LLC is a cutting-edge investment technology firm that leverages artificial intelligence and 
          advanced mathematical models to generate superior risk-adjusted returns. We combine the precision of quantitative 
          analysis with the power of machine learning to identify and capitalize on market opportunities that traditional 
          investment approaches miss.
        </Text>
        <Text color="gray.700" lineHeight="tall" mt={4}>
          Our team consists of world-class researchers, engineers, and investment professionals who are passionate about 
          pushing the boundaries of what's possible in finance. We offer a collaborative environment where innovation thrives 
          and exceptional talent is recognized and rewarded.
        </Text>
      </Box>

      {/* Responsibilities Section */}
      <Box 
        bg="white" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
        boxShadow="sm"
        p={8} 
        mb={6}
      >
        <Heading as="h2" size="md" color="gray.800" mb={4}>Responsibilities</Heading>
        <UnorderedList spacing={2} pl={4}>
          {job.responsibilities.map((resp, index) => (
            <ListItem key={index} color="gray.700" lineHeight="tall">{resp}</ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Qualifications Section */}
      <Box 
        bg="white" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200"
        boxShadow="sm"
        p={8} 
        mb={6}
      >
        <Heading as="h2" size="md" color="gray.800" mb={4}>Skills, Qualifications, and Experience</Heading>
        <UnorderedList spacing={2} pl={4}>
          {job.qualifications.map((qual, index) => (
            <ListItem key={index} color="gray.700" lineHeight="tall">{qual}</ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Leadership Principles Section */}
      {job.leadershipPrinciples && job.leadershipPrinciples.length > 0 && (
        <Box 
          bg="white" 
          borderRadius="lg" 
          borderWidth="1px" 
          borderColor="gray.200"
          boxShadow="sm"
          p={8} 
          mb={6}
        >
          <Heading as="h2" size="md" color="gray.800" mb={4}>Leadership Principles</Heading>
          <UnorderedList spacing={2} pl={4}>
            {job.leadershipPrinciples.map((principle, index) => (
              <ListItem key={index} color="gray.700" lineHeight="tall">{principle}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}

      {/* Hiring Procedure Section */}
      {job?.hiringProcedure && job?.hiringProcedure.length > 0 && (
        <Box 
          bg="white" 
          borderRadius="lg" 
          borderWidth="1px" 
          borderColor="gray.200"
          boxShadow="sm"
          p={8} 
          mb={6}
        >
          <Heading as="h2" size="md" color="gray.800" mb={4}>Hiring Procedure</Heading>
          <UnorderedList spacing={2} pl={4}>
            {job.hiringProcedure.map((procedure, index) => (
              <ListItem key={index} color="gray.700" lineHeight="tall">{procedure}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}

      {/* Compensation Procedure Section */}
      {job?.compensationProcedure && job?.compensationProcedure.length > 0 && (
        <Box 
          bg="white" 
          borderRadius="lg" 
          borderWidth="1px" 
          borderColor="gray.200"
          boxShadow="sm"
          p={8} 
          mb={6}
        >
          <Heading as="h2" size="md" color="gray.800" mb={4}>Compensation Procedure</Heading>
          <UnorderedList spacing={2} pl={4}>
            {job.compensationProcedure.map((procedure, index) => (
              <ListItem key={index} color="gray.700" lineHeight="tall">{procedure}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}

      {/* Salary Details Section */}
      {job?.salaryDetails && (
        <Box 
          bg="white" 
          borderRadius="lg" 
          borderWidth="1px" 
          borderColor="gray.200"
          boxShadow="sm"
          p={8} 
          mb={6}
        >
          <Heading as="h2" size="md" color="gray.800" mb={4}>Salary Details</Heading>
          <VStack spacing={4} align="stretch" divider={<Divider />}>
            {Object.entries(job.salaryDetails).map(([role, details], index) => (
              <Box key={index}>
                <Text fontWeight="500" color="gray.800" mb={2}>
                  {toTitleCase(role.replace(/([A-Z])/g, ' $1').trim())}
                </Text>
                <VStack spacing={1} align="start" pl={2}>
                  {details.averageSalary && <Text color="gray.700">Average Salary: {details.averageSalary}</Text>}
                  {details.range && <Text color="gray.700">Range: {details.range}</Text>}
                  {details.competitiveSalaryRange && (
                    <Box w="100%">
                      <Text color="gray.700" mb={1}>Competitive Salary Range:</Text>
                      <VStack spacing={1} align="start" pl={4}>
                        {Object.entries(details.competitiveSalaryRange).map(([level, range], idx) => (
                          <Text key={idx} color="gray.700">
                            <Badge colorScheme="cyan" mr={2}>
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </Badge>
                            {range}
                          </Text>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      {showForm && (
        <ApplicationForm
          jobTitle={job.title}
          jobLocation={job.location}
          onClose={() => setShowForm(false)}
        />
      )}
    </Container>
  );
};

export default JobDetails;

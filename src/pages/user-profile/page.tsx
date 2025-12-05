'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiFileText, FiEdit3 } from "react-icons/fi"; // Using FiEdit3 for a slightly different edit icon

const UserProfilePage = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="container.xl" py={{ base: 8, md: 12 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={4} align="center" mb={{ base: 8, md: 10 }}>
        <Heading as="h1" size="2xl" fontWeight="light" color={headingColor}>
          Your{" "}
          <Text as="span" fontWeight="500" className="blue-gradient-text" bgClip="text">
            Profile
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={subTextColor} textAlign="center">
          Manage your personal information and account settings.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }} mb={{ base: 6, md: 8 }}>
        {/* Profile Information Card */}
        <Box
          p={{ base: 5, md: 7 }}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          bg={cardBg}
          boxShadow="md"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h2" size="lg" fontWeight="medium" color={headingColor}>
              Profile Information
            </Heading>
            <Button
              size="sm"
              bg="black"
              color="white"
              _hover={{ bg: "yellow.500" }}
              leftIcon={<Icon as={FiEdit3} />}
            >
              Edit
            </Button>
          </Flex>
          <VStack spacing={5} align="stretch">
            <FormControl id="fullName">
              <FormLabel color={textColor} fontWeight="medium">Full Name</FormLabel>
              <Input type="text" placeholder="Your full name" isReadOnly value="John Doe" borderColor={borderColor} _readOnly={{ bg: "gray.50", cursor: "default" }}/>
            </FormControl>
            <FormControl id="emailAddress">
              <FormLabel color={textColor} fontWeight="medium">Email Address</FormLabel>
              <Input type="email" placeholder="Your email address" isReadOnly value="john.doe@example.com" borderColor={borderColor} _readOnly={{ bg: "gray.50", cursor: "default" }} />
            </FormControl>
          </VStack>
        </Box>

        {/* Change Password Card */}
        <Box
          p={{ base: 5, md: 7 }}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          bg={cardBg}
          boxShadow="md"
        >
          <Heading as="h2" size="lg" fontWeight="medium" color={headingColor} mb={6}>
            Change Password
          </Heading>
          <VStack spacing={5} align="stretch">
            <FormControl id="currentPassword">
              <FormLabel color={textColor} fontWeight="medium">Current Password</FormLabel>
              <Input type="password" placeholder="Enter current password" borderColor={borderColor} />
            </FormControl>
            <FormControl id="newPassword">
              <FormLabel color={textColor} fontWeight="medium">New Password</FormLabel>
              <Input type="password" placeholder="Enter new password" borderColor={borderColor} />
            </FormControl>
            <FormControl id="confirmNewPassword">
              <FormLabel color={textColor} fontWeight="medium">Confirm New Password</FormLabel>
              <Input type="password" placeholder="Confirm new password" borderColor={borderColor} />
            </FormControl>
            <Button
              color="white"
              background="linear-gradient(to right, #00A9E0, #6DD3EF)"
              _hover={{ background: "linear-gradient(to right, #0AADBC, #1CADBC)" }}
              size="lg"
              width="full"
              mt={3}
            >
              Change Password
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* NDA Information Card */}
      <Box
        p={{ base: 5, md: 7 }}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="xl"
        bg={cardBg}
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h2" size="lg" fontWeight="medium" color={headingColor} mb={6}>
          NDA Information
        </Heading>
        <VStack spacing={4}>
          <Icon as={FiFileText} w={16} h={16} color="cyan.500" />
          <Text color={subTextColor} fontSize="md">
            You haven't submitted an NDA application yet.
          </Text>
          {/* Optionally, add a button to navigate to the NDA form */}
          {/* <Button colorScheme="cyan" variant="outline" mt={2}>Submit NDA</Button> */}
        </VStack>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
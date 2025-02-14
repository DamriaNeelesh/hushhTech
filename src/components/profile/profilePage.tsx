import React from 'react';
import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaFileAlt, FaUserShield, FaCheckCircle } from 'react-icons/fa';
import HushhLogo from '../images/Hushhogo.png'
const ProfilePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box  minH="100vh" width={'100%'} py={1} color="white">
      <Container minW={'100%'} >
        <VStack bg="gray.900" spacing={6}  alignItems={'center'}>
          <Image src={HushhLogo} alt='hushh tech logo' boxSize={{md:'14rem',base:'xs'}}/>
          <Box w={'100%'} display={'flex'} flexDirection={'column'} textAlign={'left'} alignItems={'flex-start'}>
          <Heading fontSize="2xl">Hello Manish Sainani,</Heading>
          <Text fontSize="md" color="gray.400">
            Please complete the required processes below to access investment information
          </Text>
          </Box>
        </VStack>

        <VStack
        //   mt={8}
          spacing={6}
          p={5}
          bg={'black'}
          alignItems={isMobile ? 'stretch' : 'center'}
          justifyContent="center"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          {/* Documents Section */}
          <Box
            bg="gray.800"
            p={6}
            borderRadius="lg"
            shadow="lg"
            flex="1"
            textAlign="center"
            minW={{ base: 'full', md: '300px' }}
          >
            <Icon as={FaFileAlt} w={8} h={8} color="teal.300" />
            <Heading size="md" mt={3} mb={2}>
              Documents
            </Heading>
            <Text fontSize="sm" color="gray.400">
              Access private investment documents and reports
            </Text>
            <VStack mt={4} spacing={3}>
              <Button w="full" colorScheme="teal" variant="solid">
                View Public Documents
              </Button>
              <Button w="full" colorScheme="gray" variant="solid" isDisabled>
                View Private Documents
              </Button>
            </VStack>
            <Text mt={2} fontSize="xs" color="yellow.400">
              ⚠ NDA completion required for access
            </Text>
          </Box>

          {/* NDA Process Section */}
          <Box
            bg="gray.800"
            p={6}
            borderRadius="lg"
            shadow="lg"
            flex="1"
            textAlign="center"
            minW={{ base: 'full', md: '300px' }}
          >
            <Icon as={FaUserShield} w={8} h={8} color="orange.400" />
            <Heading size="md" mt={3} mb={2}>
              NDA Process
            </Heading>
            <Badge colorScheme="orange" mb={2} px={4} py={1} borderRadius="full">
              Not Started
            </Badge>
            <Text fontSize="sm" color="gray.400">
              Complete NDA to access sensitive documents
            </Text>
            <Button mt={4} w="full" colorScheme="gray" isDisabled>
              Start NDA Process
            </Button>
          </Box>

          {/* KYC Verification Section */}
          <Box
            bg="gray.800"
            p={6}
            borderRadius="lg"
            shadow="lg"
            flex="1"
            textAlign="center"
            minW={{ base: 'full', md: '300px' }}
          >
            <Icon as={FaCheckCircle} w={8} h={8} color="blue.400" />
            <Heading size="md" mt={3} mb={2}>
              KYC Verification
            </Heading>
            <Badge colorScheme="blue" mb={2} px={4} py={1} borderRadius="full">
              Coming Soon
            </Badge>
            <Text fontSize="sm" color="gray.400">
              Know Your Customer verification process
            </Text>
            <Button mt={4} w="full" colorScheme="gray" isDisabled>
              Coming Soon
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfilePage;

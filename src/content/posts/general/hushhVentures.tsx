import React from 'react';
import { Box, Container, Text, VStack, HStack, SimpleGrid, List, ListItem, Heading, Divider } from '@chakra-ui/react';

const HushhVentures = () => {
  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={12} align="stretch">
        
        {/* Header Section */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4} fontWeight="bold" color="gray.800">
            🤫 Ventures
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={2}>
            The Future, Early.
          </Text>
          <Text fontSize="lg" color="gray.500">
            Where the boldest ideas meet the most disciplined capital.
          </Text>
        </Box>

        <Divider />

        {/* Mission Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Designed to Discover the Next Alpha.
          </Heading>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
            🤫 Ventures is the dedicated innovation arm of Fund A's Ultra27 portfolio, allocating 10% of assets 
            to back the world's most valuable emerging technologies, teams, and trends — before they become essential.
          </Text>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
            From AI and data sovereignty to climate-resilient computing and sovereign tech infrastructure, 
            🤫 Ventures goes beyond venture capital.
          </Text>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center" fontWeight="semibold">
            We build, back, and bring alpha home.
          </Text>
        </VStack>

        <Divider />

        {/* Global Presence Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Headquarters of Global Conviction
          </Heading>
          
          <VStack spacing={4}>
            <HStack spacing={2} justify="center">
              <Text fontSize="lg" fontWeight="semibold">📍 San Francisco.</Text>
              <Text fontSize="lg" color="gray.600">The engine of frontier innovation.</Text>
            </HStack>
            <HStack spacing={2} justify="center">
              <Text fontSize="lg" fontWeight="semibold">📍 Abu Dhabi.</Text>
              <Text fontSize="lg" color="gray.600">The bridge to emerging global capital.</Text>
            </HStack>
          </VStack>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
            Every investment is grounded in a global ambition. That's why 🤫 Ventures operates 
            satellite presence in 12+ cities where humans dream bigger and live better.
          </Text>
          
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4} maxW="4xl" mx="auto">
            {[
              'Singapore', 'Zurich', 'Tel Aviv', 'Tokyo',
              'London', 'Austin', 'Nairobi', 'São Paulo',
              'Vancouver', 'Bangalore', 'New York', 'Dubai'
            ].map((city) => (
              <Box key={city} p={3} bg="gray.50" borderRadius="md" textAlign="center">
                <Text fontSize="md" fontWeight="medium" color="gray.700">
                  {city}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center" fontStyle="italic">
            Work from anywhere. Build from everywhere. Own what matters.
          </Text>
        </VStack>

        <Divider />

        {/* Investment Philosophy Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            A New Standard in Venture Investing
          </Heading>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center" fontWeight="semibold">
            Alpha. Aloha. Asymmetric upside.
          </Text>
          
          <VStack spacing={4}>
            <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
              We're not chasing unicorns.
            </Text>
            <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center" fontWeight="semibold">
              We're owning the next Berkshire before the world sees it.
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="4xl" mx="auto">
            <Box p={6} bg="blue.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="blue.500">
              <Text fontSize="md" color="gray.700">🔹 27 investments or fewer</Text>
            </Box>
            <Box p={6} bg="green.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="green.500">
              <Text fontSize="md" color="gray.700">🔹 High conviction, low drag</Text>
            </Box>
            <Box p={6} bg="purple.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="purple.500">
              <Text fontSize="md" color="gray.700">🔹 Deep integration with Fund A's portfolio and data infra</Text>
            </Box>
            <Box p={6} bg="orange.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="orange.500">
              <Text fontSize="md" color="gray.700">🔹 Optionality for acquisition or spin-off IPO</Text>
            </Box>
          </SimpleGrid>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center" fontWeight="semibold">
            🤫 Ventures isn't spray and pray. It's search and steward.
          </Text>
        </VStack>

        <Divider />

        {/* Value Loop Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Fuel for a Smarter Future
          </Heading>
          
          <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
            Every 🤫 Ventures investment is designed to loop back into our system:
          </Text>
          
          <List spacing={3} maxW="3xl" mx="auto">
            <ListItem>
              <HStack spacing={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize="md" color="gray.700">Powering Hushh Personal Data Infrastructure</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={3}>
                <Box w={2} h={2} bg="green.500" borderRadius="full" />
                <Text fontSize="md" color="gray.700">Feeding alpha back to Fund A</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={3}>
                <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                <Text fontSize="md" color="gray.700">Seeding the best global founders and operator teams</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={3}>
                <Box w={2} h={2} bg="orange.500" borderRadius="full" />
                <Text fontSize="md" color="gray.700">Unlocking new product frontiers for human-AI collaboration</Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>

        <Divider />

        {/* Call to Action Section */}
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Be Part of the Alpha Equation
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="4xl" mx="auto">
            <Box p={6} bg="gray.50" borderRadius="lg">
              <Heading as="h3" size="lg" mb={4} color="gray.800">
                For Founders:
              </Heading>
              <Text fontSize="md" color="gray.700" lineHeight="tall">
                We invest where others hesitate. No cold forms. Just bold conviction.
              </Text>
            </Box>
            
            <Box p={6} bg="gray.50" borderRadius="lg">
              <Heading as="h3" size="lg" mb={4} color="gray.800">
                For Partners & LPs:
              </Heading>
              <Text fontSize="md" color="gray.700" lineHeight="tall">
                You get front-row access to the world's next great innovations, wrapped in the 
                risk-managed rigor of Fund A.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>

        <Divider />

        {/* Footer Section */}
        <VStack spacing={4} textAlign="center">
          <Heading as="h2" size="xl" color="gray.800">
            🤫 Ventures
          </Heading>
          <Text fontSize="lg" color="gray.600" fontWeight="semibold">
            Built Quietly. Backed Boldly.
          </Text>
          <Text fontSize="md" color="gray.500">
            A division of Hushh Technologies Fund A.
          </Text>
        </VStack>

      </VStack>
    </Container>
  );
};

export default HushhVentures; 
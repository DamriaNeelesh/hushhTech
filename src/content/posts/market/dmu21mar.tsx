import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Image, SimpleGrid } from '@chakra-ui/react';
import Image1 from '../../../components/images/market-updates/dmu21mar/1.jpg'
import Image2 from '../../../components/images/market-updates/dmu21mar/2.jpg'
import Image3 from '../../../components/images/market-updates/dmu21mar/3.jpg'
import Image4 from '../../../components/images/market-updates/dmu21mar/4.jpg'
import Image5 from '../../../components/images/market-updates/dmu21mar/5.jpg'
import Image6 from '../../../components/images/market-updates/dmu21mar/6.jpg'
import Image7 from '../../../components/images/market-updates/dmu21mar/7.jpg'
import Image8 from '../../../components/images/market-updates/dmu21mar/8.jpg'

const dmu21mar = () => {
  return (
    <Box color="black" borderRadius="md">
      {/* <Image src={MarketUpdate} alt='Market Update 21 March 2025'/> */}
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        🤫 Daily Market Snapshot - March 21, 2025
      </Heading>
      <Text fontSize="lg" mb={4}>
        📅 Reporting Period: March 21, 2025
      </Text>
      <Text fontSize="lg" mb={4}>
        Prepared for: Internal Review & Investor Communication
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Trading Summary
      </Heading>
      <Text mb={4}>
        The 🤫 fund experienced a positive trading day. Favorable market conditions towards the close enabled the realization of $15,000 in income through the rollover of over 120 option walls, with an average gain of 8.93%.
      </Text>

      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        Areas for Improvement
      </Heading>
      <Text mb={4}>
        While the day's performance was satisfactory, improvements in trade execution efficiency and increased automation are necessary.
      </Text>

      <Divider my={4} />

      <Text fontSize="sm" textAlign="center">
        🤫 Confidential 🤐
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={8}>
        <Image
src={Image1}
alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image2}
alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image3}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image 
src={Image4}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image5}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image6}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image7}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
         <Image
src={Image8}
          alt="Market Analysis Chart 1"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          loading="lazy"
        />
       
        {/* Add more images here following the same pattern */}
      </SimpleGrid>
    </Box>
  );
};

export default dmu21mar;
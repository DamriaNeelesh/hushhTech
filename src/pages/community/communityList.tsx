import React, { useState } from 'react';
import {
  Container,
  Heading,
  Box,
  Text,
  SimpleGrid,
  Button,
  Select,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getPosts, PostData } from '../../data/posts';

// Helper function to convert string to Title Case
const toTitleCase = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const CommunityList: React.FC = () => {
  const allPosts: PostData[] = getPosts();

  // Extract unique categories from posts data
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  // Include an "All" option
  const allCategories = ['All', ...categories];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8} textAlign="center" color="gray.800">
        Latest Updates from Hushh Technologies
      </Heading>
      <Box mb={8} textAlign="center">
        <Select
          maxW="300px"
          mx="auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Select Category"
        >
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? category : toTitleCase(category)}
            </option>
          ))}
        </Select>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredPosts.map((post) => (
          <Box
            key={post.slug}
            p={6}
            bg="white"
            borderRadius="md"
            shadow="md"
            _hover={{ shadow: 'lg' }}
          >
            <Heading as="h2" size="md" mb={2} color="gray.700">
              {post.title}
            </Heading>
            <Text mb={2} color="gray.500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </Text>
            <Text mb={4} color="gray.600">
              {post.description}
            </Text>
            <Link to={`/community/${post.slug}`}>
              <Button colorScheme="teal" variant="outline">
                Read More
              </Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CommunityList;

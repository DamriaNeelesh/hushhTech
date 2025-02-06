import React from 'react';
import { Container, Heading, Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getPosts, PostData } from '../../data/posts';

const CommunityList: React.FC = () => {
  const posts: PostData[] = getPosts();
  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8} textAlign="center" color="gray.800">
        Latest from Hushh Technologies
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {posts.map((post) => (
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

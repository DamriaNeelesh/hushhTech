import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Box, Text } from '@chakra-ui/react';
import { getPostBySlug, PostData } from '../../data/posts';

const CommunityPost: React.FC = () => {

  const { '*': slug } = useParams();
  const post: PostData | undefined = getPostBySlug(slug || '');

  if (!post) {
    return (
      <Container maxW="container.md" py={8}>
        <Text color="red.400">Post not found: {slug}</Text>
      </Container>
    );
  }

  const PostComponent = post.Component;

  return (
    <Box bg="gray.900" minH="100vh" py={12} px={4}>
      <Container maxW="container.md">
        <Heading as="h1" mb={4} color="white">
          {post.title}
        </Heading>
        <Text fontSize="sm" color="gray.400" mb={8}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </Text>
        <Box color="white" lineHeight="tall" fontSize="lg">
          <PostComponent />
        </Box>
      </Container>
    </Box>
  );
};

export default CommunityPost;

// src/pages/community/CommunityPost.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Box, Text, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getPostBySlug } from '../../lib/posts';

function CommunityPost({ posts }) {
  // The route should be defined so that the full slug is captured in one parameter.
  // For example, we can set up the route as "/community/*" in App.jsx,
  // and then use useParams() to get the wildcard parameter.
  const { '*': slug } = useParams();
  // Look up the post by its slug (which is "category/filename")
  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <Container maxW="container.lg" py={8}>
        <Text>Post not found.</Text>
      </Container>
    );
  }

  const PostContent = post.Content; // The MDX component

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={4}>
        {post.title}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Divider my={4} />
      <Box>
        {/* Render the MDX content component */}
        <PostContent />
      </Box>
    </Container>
  );
}

CommunityPost.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default CommunityPost;

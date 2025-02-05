import React from 'react';
import { Container, Heading, Box, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import posts from '../../data/posts';

function CommunityList() {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Community Updates
      </Heading>
      {posts.map((post:any) => (
        <Box key={post.slug} p={4} borderWidth="1px" borderRadius="lg" shadow="md" mb={4}>
          <Flex justify="space-between" align="center">
            <Heading as="h2" size="md">
              {post.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </Flex>
          <Text mt={2}>{post.description}</Text>
          <Link to={`/community/${post.slug}`}>
            <Text mt={2} color="blue.500" cursor="pointer">
              Read More &rarr;
            </Text>
          </Link>
        </Box>
      ))}
    </Container>
  );
}

CommunityList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default CommunityList;

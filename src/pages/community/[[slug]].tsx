import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, Box } from '@chakra-ui/react';
import MDXRenderer from './MDXRenderer';

const mdxFiles = import.meta.glob('../../content/posts/**/*.mdx', { eager: true });

const CommunityPost = () => {
  const { '*': slug } = useParams();
  const postKey = Object.keys(mdxFiles).find((key) => key.includes(`${slug}.mdx`));
  const post = mdxFiles[postKey];

  console.log('Post:', post); // Confirm frontmatter exists

  if (!post) {
    return (
      <Container>
        <Text color="red.400">Post not found for: {slug}</Text>
      </Container>
    );
  }

  const frontmatter = post.frontmatter || {};

  if (!frontmatter.title) {
    return (
      <Container>
        <Text color="red.400">Frontmatter missing in: {slug}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={4} color="teal.300">
        {frontmatter.title}
      </Heading>
      <Text fontSize="sm" color="gray.400">
        {new Date(frontmatter.date).toLocaleDateString()}
      </Text>
      <Box mt={4} color="gray.300">
        <MDXRenderer>{React.createElement(post.default)}</MDXRenderer>
      </Box>
    </Container>
  );
};

export default CommunityPost;

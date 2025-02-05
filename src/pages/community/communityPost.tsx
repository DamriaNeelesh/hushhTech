import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, Box } from '@chakra-ui/react';
import matter from 'gray-matter';
import MDXRenderer from './MDXRenderer';

// Import compiled MDX modules (as React components)
const mdxModules = import.meta.glob('../../content/posts/**/*.mdx', { eager: true });
// Import raw MDX content as strings for frontmatter parsing
const rawModules = import.meta.glob('../../content/posts/**/*.mdx', { eager: true, as: 'raw' });

const CommunityPost = () => {
  // Using a catch-all parameter so that URL like /community/market/daily-market-update works
  const { '*': slug } = useParams();

  // Find the matching file key that includes the slug followed by ".mdx"
  const postKey = Object.keys(mdxModules).find((key) =>
    key.includes(`${slug}.mdx`)
  );

  // Retrieve the compiled module and raw content for that key
  const postModule = mdxModules[postKey];
  const rawContent = rawModules[postKey];

  console.log('Post Module:', postModule); // Check that the module exists

  if (!postModule || !rawContent) {
    return (
      <Container>
        <Text color="red.400">Post not found for: {slug}</Text>
      </Container>
    );
  }

  // Parse the raw MDX content to get frontmatter
  let frontmatter = {};
  try {
    const parsed = matter(rawContent);
    frontmatter = parsed.data;
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
  }

  if (!frontmatter.title) {
    return (
      <Container>
        <Text color="red.400">Frontmatter missing in: {slug}</Text>
      </Container>
    );
  }

  // Retrieve the MDX component from the module
  const PostContent = postModule.default;

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={4} color="teal.300">
        {frontmatter.title}
      </Heading>
      <Text fontSize="sm" color="gray.400">
        {new Date(frontmatter.date).toLocaleDateString()}
      </Text>
      <Box mt={4} color="gray.300">
        {/* Render the MDX component via MDXRenderer */}
        <MDXRenderer>{<PostContent />}</MDXRenderer>
      </Box>
    </Container>
  );
};

export default CommunityPost;

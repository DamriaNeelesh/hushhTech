import { Container, Heading, Box, Text, Link, Flex } from '@chakra-ui/react';

// Import all MDX files from all subfolders
const mdxFiles = import.meta.glob('../../content/posts/**/*.mdx', { eager: true });

const posts = Object.entries(mdxFiles).map(([path, module]) => ({
  slug: path.split('/posts/')[1].replace('.mdx', ''),
  ...module.frontmatter,
}));

export default function CommunityList() {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="teal.300">
        Community Updates
      </Heading>
      {posts.map((post) => (
        <Box key={post.slug} p={6} bg="gray.800" borderRadius="lg" mb={4}>
          <Flex justify="space-between">
            <Heading as="h2" size="md" color="teal.400">
              {post.title}
            </Heading>
            <Text fontSize="sm" color="gray.400">
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </Flex>
          <Text mt={2} color="gray.300">
            {post.description}
          </Text>
          <Link href={`/community/${post.slug}`} color="teal.400" mt={2} display="block">
            Read More →
          </Link>
        </Box>
      ))}
    </Container>
  );
}

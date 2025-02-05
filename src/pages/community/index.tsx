// pages/community/index.tsx
import { GetStaticProps } from 'next';
import React from 'react';
import { Link } from '@chakra-ui/react';
// import Head from 'next/head';
import { Container, Heading, Box, Text, Flex } from '@chakra-ui/react';
import { getPosts, PostData } from '../../lib/posts';

interface CommunityProps {
  posts: PostData[];
}

export default function Community({ posts }: CommunityProps) {
  return (
    <>
      {/* <Head>
        <title>Community Updates | Hushh Technologies</title>
        <meta
          name="description"
          content="Explore the latest updates from Hushh Technologies including market updates, fund performance, product updates, and our manifesto."
        />
        <meta
          name="keywords"
          content="community updates, market updates, fund performance, product updates, manifesto, Hushh Technologies, investing, AI"
        />
        <link rel="canonical" href="https://yourdomain.com/community" />
      </Head> */}
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" mb={6} textAlign="center">
          Community Updates
        </Heading>
        {posts.map((post) => (
          <Box
            key={post.slug}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            mb={4}
          >
            <Flex justify="space-between" align="center">
              <Heading as="h2" size="md">
                {post.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {new Date(post.date).toLocaleDateString()}
              </Text>
            </Flex>
            <Text mt={2}>{post.description}</Text>
            {/* Build URL using the full slug (e.g. "market/2025-01-28-daily-market-update") */}
            <Link href={`/community/${post.slug}`}>
              <Text mt={2} color="blue.500" cursor="pointer">
                Read More &rarr;
              </Text>
            </Link>
          </Box>
        ))}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts(); // Loads posts from the /posts folder
  return {
    props: {
      posts,
    },
  };
};

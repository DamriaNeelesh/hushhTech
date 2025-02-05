// pages/community/[[...slug]].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
// import Head from 'next/head';
import { Container, Heading, Box, Text, Divider } from '@chakra-ui/react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getPosts, getPostBySlug, PostData } from '../../lib/posts';

interface PostPageProps {
  source: MDXRemoteSerializeResult;
  post: PostData;
}

export default function PostPage({ source, post }: PostPageProps) {
  return (
    <>
      {/* <Head>
        <title>{post.title} | Community Updates | Hushh Technologies</title>
        <meta name="description" content={post.description} />
        <link
          rel="canonical"
          href={`https://yourdomain.com/community/${post.slug}`}
        />
      </Head> */}
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" mb={4}>
          {post.title}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {new Date(post.date).toLocaleDateString()}
        </Text>
        <Divider my={4} />
        <Box>
          <MDXRemote {...source} />
        </Box>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  // For each post, split the slug by '/' to form an array.
  const paths = posts.map((post) => ({
    params: { slug: post.slug.split('/') },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // `params.slug` is an array (e.g. ["market", "2025-01-28-daily-market-update"])
  const slugArray = params?.slug as string[];
  // Join the array to recreate the full slug.
  const fullSlug = slugArray.join('/');
  const post = getPostBySlug(fullSlug);
  if (!post) {
    return { notFound: true };
  }
  // Serialize the MDX content.
  const mdxSource = await serialize(post.content, { scope: post });
  return {
    props: {
      source: mdxSource,
      post,
    },
  };
};

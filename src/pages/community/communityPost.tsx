// src/pages/community/CommunityPost.tsx
import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Text, Spinner, useToast } from '@chakra-ui/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { posts } from '../../data/posts'
import config from '../../resources/config/config'
import axios from 'axios'

// Optional: Define MDX component mappings using Chakra UI
const mdxComponents = {
  h1: (props: any) => <Text as="h1" fontSize="2xl" my={4} {...props} />,
  h2: (props: any) => <Text as="h2" fontSize="xl" my={4} {...props} />,
  p: (props: any) => <Text my={2} {...props} />,
  a: (props: any) => <Text as="a" color="teal.500" {...props} />,
  // Add additional custom components as needed
}

const CommunityPost: React.FC = () => {
  // Extract the slug from the route
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  // Find the post by slug in the posts array (using frontmatter slug)
  const post = posts.find((p) => p.slug === slug)

  // If no matching post, display an error and redirect
  if (!post) {
    toast({
      title: 'Post Not Found',
      description: `No post found with slug "${slug}"`,
      status: 'error',
      duration: 4000,
      isClosable: true,
    })
    navigate('/community')
    return null
  }

  // NDA access check logic (if needed)
  // [Keep your NDA checking logic here, as in your original code.]

  // Use getMDXComponent to compile the MDX code into a React component
  // post.body.code should be available from Contentlayer's build
  const MDXContent = useMemo(() => {
    if (!post.body?.code) return null
    try {
      return getMDXComponent(post.body.code)
    } catch (err) {
      console.error('Error compiling MDX:', err)
      return null
    }
  }, [post.body.code])

  if (!MDXContent) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
        <Text mt={4}>Error rendering content.</Text>
      </Box>
    )
  }

  return (
    <Box bg="white" minH="100vh" py={12} px={4}>
      <Container maxW="container.md">
        <Text as="h2" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" color="#e7131a">
          {post.category}
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="gray.900" mb={2}>
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={8}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </Text>
        <Box lineHeight="tall" fontSize="md" color="gray.800">
          <MDXContent components={mdxComponents} />
        </Box>
        <Text fontSize="sm" my={{ md: '3rem', base: '1.5rem' }}>
          © 2025 Hushh Technologies LLC. All Rights Reserved.
        </Text>
      </Container>
    </Box>
  )
}

export default CommunityPost

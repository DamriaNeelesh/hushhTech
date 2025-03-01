// src/pages/community/CommunityPost.tsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { getAllPosts } from "../../data/allPosts";
import axios from "axios";
import config from "../../resources/config/config";
const mdxModules = import.meta.glob('../posts/*.mdx');  // for dynamic MDX import
const reactModules = import.meta.glob('../posts/*.tsx');  // for dynamic React import

const CommunityPost: React.FC = () => {
  // const { "*": slug } = useParams();
  // const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const toastShownRef = useRef<{ [key: string]: boolean }>({});
  const { slug } = useParams<{ slug: string }>();
  const [PostContent, setPostContent] = useState<React.FC | null>(null);
  const post = getAllPosts().find(p => p.slug === slug);

  const showToastOnce = (id: string, options: any) => {
    if (!toastShownRef.current[id]) {
      toast(options);
      toastShownRef.current[id] = true;
    }
  };

  useEffect(() => {
    if (!slug || !post) return;
    if (post.contentType === 'mdx') {
      // Dynamically import the MDX component by file path
      mdxModules[`../posts/${slug}.mdx`]().then(mod => {
        setPostContent(() => mod.default);
      });
    } else if (post.contentType === 'react') {
      // Dynamically import the React component (if not already in bundle)
      reactModules[`../posts/${slug}.tsx`]().then(mod => {
        setPostContent(() => mod.default);
      });
    }
  }, [slug, post]);
  

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!PostContent) {
    return <div>Loading post...</div>;
  }

  // const PostComponent = post.Component;
  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <Box bg="white" minH="100vh" py={12} px={4}>
      <Container maxW="container.md">
        <Text as={'h2'} fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" color="#e7131a">
          {toTitleCase(post.category)}
        </Text>
        <Text fontSize="sm" color="gray.900" mb={8}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </Text>
        <Box color="black" lineHeight="tall" fontSize="lg">
          <PostContent />
        </Box>
      </Container>
    </Box>
  );
};

export default CommunityPost;

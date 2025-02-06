import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Box,
  Text,
  SimpleGrid,
  Button,
  Select,
  Image,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, PostData } from '../../data/posts';
import config from '../../resources/config/config';

// Helper function to convert string to Title Case
const toTitleCase = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const CommunityList: React.FC = () => {
  let allPosts: PostData[] = getPosts();

  // Sort posts by date in descending order (latest first)
  allPosts = allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Get all categories from posts and add an "All" option.
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const allCategories = ['All', ...categories];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [session, setSession] = useState<any>(null);
  const toast = useToast();
  const navigate = useNavigate();

  // Define the restricted categories (in lowercase for comparison)
  const restrictedCategories = ['fund updates', 'investor relations & strategies'];

  // Fetch the session and listen to auth state changes.
  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  // When the selected category is restricted and no user is logged in,
  // show a toast notification.
  useEffect(() => {
    if (
      !session &&
      selectedCategory !== 'All' &&
      restrictedCategories.includes(selectedCategory.toLowerCase())
    ) {
      toast({
        title: 'Access Restricted',
        description: 'Please sign in to get access to these posts.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [selectedCategory, session, toast, restrictedCategories]);

  // Filter posts: if "All" is selected, show all posts that are not restricted (unless signed in)
  // If a specific category is selected, only show posts in that category if they are unrestricted or if the user is signed in.
  const filteredPosts =
    selectedCategory === 'All'
      ? allPosts.filter(
          (post) =>
            !restrictedCategories.includes(post.category.toLowerCase()) || session
        )
      : allPosts.filter(
          (post) =>
            post.category === selectedCategory &&
            (session || !restrictedCategories.includes(post.category.toLowerCase()))
        );

  // In case someone clicks on a restricted post's "Read More" button,
  // show a toast instead of navigating.
  const handleRestrictedClick = () => {
    toast({
      title: 'Access Restricted',
      description: 'Please sign in to get access to these posts.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  // Preload images
  useEffect(() => {
    allPosts.forEach((post) => {
      const img = new window.Image();
      img.src = post.image;
    });
  }, [allPosts]);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8} textAlign="center" color="gray.800">
        Latest Updates from Hushh Technologies
      </Heading>
      <Box mb={8} textAlign="center">
        <Select
          maxW="300px"
          mx="auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Select Category"
        >
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? category : toTitleCase(category)}
            </option>
          ))}
        </Select>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredPosts.map((post) => {
          // Check if this post is restricted.
          const isRestricted = restrictedCategories.includes(
            post.category.toLowerCase()
          );

          return (
            <Box
              key={post.slug}
              p={6}
              bg="white"
              borderRadius="md"
              shadow="md"
              _hover={{ shadow: 'lg' }}
            >
              <Image
                src={post.image}
                alt={post.title}
                borderRadius="md"
                mb={4}
                objectFit="cover"
                w="100%"
                h="200px"
                loading="eager"
              />
              <Heading as="h2" size="md" mb={2} color="gray.700">
                {post.title}
              </Heading>
              <Text mb={2} color="gray.500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </Text>
              <Text mb={4} color="gray.600">
                {post.description}
              </Text>
              {isRestricted && !session ? (
                <Button
                  onClick={handleRestrictedClick}
                  colorScheme="teal"
                  variant="outline"
                >
                  Read More
                </Button>
              ) : (
                <Link to={`/community/${post.slug}`}>
                  <Button colorScheme="teal" variant="outline">
                    Read More
                  </Button>
                </Link>
              )}
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default CommunityList;

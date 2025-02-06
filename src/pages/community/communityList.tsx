import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import NDARequestModal from "../../components/NdaForm";
import config from "../../resources/config/config";
import { getPosts, PostData } from "../../data/posts";

const CommunityList: React.FC = () => {
  const allPosts: PostData[] = getPosts();
  
  // Get unique categories from posts.
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  
  // Define restricted categories (case-insensitive).
  const restrictedCategories = [
    "fund updates",
    "investor relations & strategies",
  ];
  
  // Dropdown displays all categories.
  const allCategories = ["All", ...categories];
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Initially, only non-restricted categories are approved.
  const [approvedCategories, setApprovedCategories] = useState(
    categories.filter((c) => !restrictedCategories.includes(c.toLowerCase()))
  );
  
  const [session, setSession] = useState<any>(null);
  const [showNdaModal, setShowNdaModal] = useState(false);
  const toast = useToast();

  // Fetch the session and listen for auth state changes.
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
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Function to check access status via your API endpoint.
  const checkAccessStatus = async (): Promise<boolean> => {
    if (!session) {
      toast({
        title: "Access Denied",
        description: "Please sign in to continue.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }

    try {
      const response = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/check_access_status",
        {},
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const status = response.data;
      console.log("Access Status:", status);

      if (status === "Approved") {
        // Grant access to restricted categories.
        setApprovedCategories([...categories]);
        return true;
      } else if (status === "Rejected") {
        toast({
          title: "Access Denied",
          description: "Your access request was rejected.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return false;
      } else if (status === "Pending") {
        toast({
          title: "Request Pending",
          description: "Your access request is still under review.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        return false;
      } else if (status === "Pending: Waiting for NDA Process") {
        toast({
          title: "NDA Required",
          description: "Please complete the NDA process to proceed.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        return false;
      } else if (status === "Not Applied") {
        setShowNdaModal(true);
        return false;
      } else {
        toast({
          title: "Error",
          description: "Unexpected response received.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return false;
      }
    } catch (error) {
      console.error("Error checking access status:", error);
      toast({
        title: "API Error",
        description: "Failed to check access status.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
  };

  // When a category is selected from the dropdown.
  const handleCategoryChange = async (category: string) => {
    // Check if the selected category is restricted (case-insensitive).
    if (restrictedCategories.includes(category.toLowerCase())) {
      const accessGranted = await checkAccessStatus();
      if (!accessGranted) {
        // Do not change category if access is denied.
        return;
      }
    }
    setSelectedCategory(category);
  };

  // Filter posts based on selectedCategory and approvedCategories.
  const filteredPosts =
    selectedCategory === "All"
      ? allPosts.filter((post) =>
          approvedCategories.includes(post.category)
        )
      : allPosts.filter(
          (post) =>
            post.category === selectedCategory &&
            approvedCategories.includes(post.category)
        );

  // When a user clicks a restricted post (if somehow rendered while access not granted).
  const handleRestrictedClick = () => {
    toast({
      title: "Access Restricted",
      description: "Please sign in to get access to these posts.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  // Preload images.
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
          onChange={(e) => handleCategoryChange(e.target.value)}
          placeholder="Select Category"
        >
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredPosts.map((post) => {
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
              _hover={{ shadow: "lg" }}
            >
              <Image
                src={post.image}
                alt={post.title}
                borderRadius="md"
                mb={4}
              />
              <Heading as="h3" size="md" mb={2}>
                {post.title}
              </Heading>
              <Text mb={2}>{post.excerpt}</Text>
              {isRestricted && !session ? (
                <Button onClick={handleRestrictedClick} mt={4} colorScheme="blue">
                  Read More
                </Button>
              ) : (
                <Link to={`/post/${post.slug}`}>
                  <Button mt={4} colorScheme="blue">
                    Read More
                  </Button>
                </Link>
              )}
            </Box>
          );
        })}
      </SimpleGrid>

      {showNdaModal && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
        />
      )}
    </Container>
  );
};

export default CommunityList;

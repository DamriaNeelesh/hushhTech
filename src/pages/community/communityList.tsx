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
  Spinner
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import NDARequestModal from "../../components/NDARequestModal";
import NDADocumentModal from "../../components/NDADocumentModal";
import config from "../../resources/config/config";
import { getPosts, PostData } from "../../data/posts";

const CommunityList: React.FC = () => {
  const allPosts: PostData[] = getPosts();

  // Separate posts by access level.
  const publicPosts = allPosts.filter((post) => post.accessLevel === "Public");
  const ndaPosts = allPosts.filter((post) => post.accessLevel === "NDA");

  // Get unique categories from public posts only.
  const publicCategories = Array.from(new Set(publicPosts.map((post) => post.category)));
  // Add a special "NDA" option to the dropdown.
  const dropdownOptions = ["All", ...publicCategories, "NDA"];
  const [loading, setLoading] = useState(false);

  // State for selected dropdown option.
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Flag to indicate if NDA access is approved.
  const [ndaApproved, setNdaApproved] = useState(false);
  // Session state.
  const [session, setSession] = useState<any>(null);
  // Controls showing the NDA request modal.
  const [showNdaModal, setShowNdaModal] = useState(false);
  // Controls showing the NDA document modal.
  const [showNdaDocModal, setShowNdaDocModal] = useState(false);
  // To store NDA metadata returned from the API.
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const toast = useToast();

  // Fetch session and subscribe to auth changes.
  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Function to check NDA access status via API.
  // This call is made only when "NDA" is selected.
  const checkNdaAccessStatus = async (): Promise<boolean> => {
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
    setLoading(true);
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
      console.log("NDA Access Status:", status);

      if (status === "Approved") {
        setNdaApproved(true);
        return true;
      } else if (status === "Rejected") {
        toast({
          title: "Access Denied",
          description: "Your NDA access request was rejected.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return false;
      } else if (status === "Pending") {
        toast({
          title: "Request Pending",
          description: "Your NDA access request is still under review.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        return false;
      } else if (status === "Pending: Waiting for NDA Process") {
        // In this case, fetch NDA metadata and show the document modal.
        try {
          const ndaResponse = await axios.post(
            "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/get_nda_metadata",
            {},
            {
              headers: {
                apikey: config.SUPABASE_ANON_KEY,
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (ndaResponse.data.status === "success") {
            setNdaMetadata(ndaResponse.data.metadata);
            setShowNdaDocModal(true);
          } else {
            toast({
              title: "Error",
              description: ndaResponse.data.message || "Error fetching NDA metadata.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching NDA metadata:", error);
          toast({
            title: "Error",
            description: "Failed to fetch NDA metadata.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
        return false;
      } else if (status === "Not Applied") {
        // Show the NDA request modal so the user can apply.
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
      console.error("Error checking NDA access status:", error);
      toast({
        title: "API Error",
        description: "Failed to check NDA access status.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const renderLoader = () => (
    <Box textAlign="center" py={8}>
      <Spinner size="xl" />
    </Box>
  );
  // Handler for dropdown category change.
  const handleCategoryChange = async (category: string) => {
    if (category === "NDA") {
      // If user selects "NDA", perform the NDA access check.
      const accessGranted = await checkNdaAccessStatus();
      if (!accessGranted) return;
    }
    setSelectedCategory(category);
  };

  // Filter posts based on the selected category.
  // - If "NDA" is selected, show only NDA posts (only if ndaApproved is true).
  // - Otherwise, show only public posts filtered by category.
  let filteredPosts;
  if (selectedCategory === "NDA") {
    filteredPosts = ndaApproved ? ndaPosts : [];
  } else if (selectedCategory === "All") {
    filteredPosts = publicPosts;
  } else {
    filteredPosts = publicPosts.filter((post) => post.category === selectedCategory);
  }

  // When a restricted (NDA) post is clicked and the user isn’t approved.
  const handleRestrictedClick = () => {
    toast({
      title: "Access Restricted",
      description: "Please sign in and complete NDA process to access these posts.",
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

  const handleNdaRequestSubmit = async (result: string) => {
    if (result === "Pending: Waiting for NDA Process") {
      try {
        const ndaResponse = await axios.post(
          "https://hushhtech-nda-generation-53407187172.us-central1.run.app/generate-nda",
          {},
          {
            headers: {
              apikey: config.SUPABASE_ANON_KEY,
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (ndaResponse.data.status === "success") {
          setNdaMetadata(ndaResponse.data.metadata);
          setShowNdaDocModal(true);
        } else {
          toast({
            title: "Error",
            description: ndaResponse.data.message || "Error fetching NDA metadata.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching NDA metadata:", error);
        toast({
          title: "Error",
          description: "Failed to fetch NDA metadata.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

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
          {dropdownOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Box>

      {loading ? (
        renderLoader()
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredPosts.map((post) => (
            <Box
              key={post.slug}
              p={2}
              bg="white"
              borderRadius="md"
              shadow="md"
              _hover={{ shadow: "lg" }}
              height="350px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Image
                src={post.image}
                alt={post.title}
                borderRadius="md"
                mb={4}
                height="180px"
                objectFit="cover"
              />
              <Box flex="1" overflow="hidden">
                <Heading as="h3" size="md" mb={2} noOfLines={2}>
                  {post.title}
                </Heading>
                <Text mb={2} noOfLines={3}>
                  {post.excerpt}
                </Text>
              </Box>
              {selectedCategory === "NDA" && !ndaApproved ? (
                <Button onClick={handleRestrictedClick} 
                _hover={{
                  color:'white',
                  bg:'black'
                }}
                color={'white'}
                mt={4} bg={'linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)'}>
                  Read More
                </Button>
              ) : (
                <Link to={`/post/${post.slug}`}>
                  <Button
                  color={'white'}
                  _hover={{
                    color:'white',
                    bg:'black'
                  }}
                  mt={4} bg={'linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)'}>
                    Read More
                  </Button>
                </Link>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* NDA Request Modal: Shown when user has not applied for NDA access */}
      {showNdaModal && session && (
        <NDARequestModal
          onSubmit={handleNdaRequestSubmit}
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
        />
      )}

      {/* NDA Document Modal: Shown when NDA access status is "Pending: Waiting for NDA Process" */}
      {showNdaDocModal && ndaMetadata && (
        <NDADocumentModal
        session={session}
          isOpen={showNdaDocModal}
          onClose={() => setShowNdaDocModal(false)}
          ndaMetadata={ndaMetadata}
          onAccept={() => {
            // When NDA is accepted, grant NDA access.
            setNdaApproved(true);
            setShowNdaDocModal(false);
            toast({
              title: "NDA Accepted",
              description: "Your NDA has been accepted. NDA posts are now accessible.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }}
        />
      )}
    </Container>
  );
};

export default CommunityList;

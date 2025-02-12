import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  Select,
  Spinner,
  useToast,
  Skeleton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import NDARequestModal from "../../components/NDARequestModal";
import NDADocumentModal from "../../components/NDADocumentModal";
import config from "../../resources/config/config";
import { getPosts, PostData } from "../../data/posts";

// Update the NDA dropdown option text.
const NDA_OPTION = "Sensitive Documents (NDA approval Req.)";

// Utility to convert a string to Title Case.
const toTitleCase = (str: string): string =>
  str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

// Helper function to format dates as "2nd Feb '25"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  // Determine the ordinal suffix
  const dayOrdinal =
    day +
    (day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${dayOrdinal} ${month} '${year}`;
};

// Define PostImage component once.
const PostImage: React.FC<{ src: string; alt: string; height?: string }> = ({
  src,
  alt,
  height = "180px",
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Skeleton isLoaded={loaded} height={height} borderRadius="md" mb={4}>
      <Image
        src={src}
        alt={alt}
        height={height}
        width="100%"
        objectFit="cover"
        borderRadius="md"
        onLoad={() => setLoaded(true)}
      />
    </Skeleton>
  );
};

const CommunityList: React.FC = () => {
  const allPosts: PostData[] = getPosts();

  // Separate posts by access level.
  const publicPosts = allPosts.filter(
    (post) => post.accessLevel === "Public"
  );
  const ndaPosts = allPosts.filter((post) => post.accessLevel === "NDA");

  // Get unique categories from public posts only.
  const publicCategories = Array.from(
    new Set(publicPosts.map((post) => post.category))
  );
  // Dropdown options: "All", then public categories, then the NDA option.
  const dropdownOptions = ["All", ...publicCategories, NDA_OPTION];

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
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Fetch session and subscribe to auth state changes.
  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } =
      config.supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Function to check NDA access status via API.
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
              description:
                ndaResponse.data.message || "Error fetching NDA metadata.",
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

  // When a category is selected from the dropdown.
  const handleCategoryChange = async (category: string) => {
    if (category === NDA_OPTION) {
      const accessGranted = await checkNdaAccessStatus();
      if (!accessGranted) return;
    }
    setSelectedCategory(category);
  };

  // Filter posts based on the selected dropdown option.
  let filteredPosts;
  if (selectedCategory === NDA_OPTION) {
    filteredPosts = ndaApproved ? ndaPosts : [];
  } else if (selectedCategory === "All") {
    filteredPosts = publicPosts;
  } else {
    filteredPosts = publicPosts.filter(
      (post) => post.category === selectedCategory
    );
  }

  // Sort posts so that the latest post is on top.
  filteredPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Render a loader if API calls are in progress.
  const renderLoader = () => (
    <Box textAlign="center" py={8}>
      <Spinner size="xl" />
    </Box>
  );

  // If a restricted (NDA) post is clicked when access is not approved.
  const handleRestrictedClick = () => {
    toast({
      title: "Access Restricted",
      description:
        "Please sign in and complete NDA process to access these posts.",
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

  // Dummy handler to pass to NDARequestModal.
  const handleNdaRequestSubmit = async (result: string) => {
    if (result === "Pending: Waiting for NDA Process") {
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
            description:
              ndaResponse.data.message || "Error fetching NDA metadata.",
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
              {category === NDA_OPTION ? category : toTitleCase(category)}
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
              <PostImage src={post.image} alt={post.title} />
              <Box flex="1" overflow="hidden">
                <Heading as="h3" size="md" mb={2} noOfLines={2}>
                  {post.title}
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  <span style={{ fontWeight: "700" }}>Published At:</span>{" "}
                  {formatDate(post.publishedAt)}
                </Text>
                <Box as="p" mb={2} noOfLines={3}>
                  {post.excerpt}
                </Box>
              </Box>
              {selectedCategory === NDA_OPTION && !ndaApproved ? (
                <Link to={`/community/${post.slug}`}>
                  <Button
                    _hover={{ bg: "black" }}
                    onClick={handleRestrictedClick}
                    color="white"
                    background="linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)"
                    mt={4}
                    colorScheme="blue"
                  >
                    Read More
                  </Button>
                </Link>
              ) : (
                <Link to={`/community/${post.slug}`}>
                  <Button
                    _hover={{ bg: "black" }}
                    mt={4}
                    color="white"
                    background="linear-gradient(265.3deg, #e54d60 8.81%, #a342ff 94.26%)"
                  >
                    Read More
                  </Button>
                </Link>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* NDA Request Modal: Shown when user hasn't applied for NDA access */}
      {showNdaModal && session && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
          onSubmit={handleNdaRequestSubmit}
        />
      )}

      {/* NDA Document Modal: Shown when access status is "Pending: Waiting for NDA Process" */}
      {showNdaDocModal && ndaMetadata && session && (
        <NDADocumentModal
          session={session}
          isOpen={showNdaDocModal}
          onClose={() => setShowNdaDocModal(false)}
          ndaMetadata={ndaMetadata}
          onAccept={async () => {
            try {
              const response = await axios.post(
                "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/accept_nda_v2",
                {},
                {
                  headers: {
                    apikey: config.SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${session.access_token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("Accept NDA Response:", response.data);
              if (response.data === "Approved") {
                toast({
                  title: "NDA Accepted",
                  description:
                    "Your NDA has been accepted. Confidential docs are now accessible.",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });
                setNdaApproved(true);
                setShowNdaDocModal(false);
              } else {
                console.log("NDA already approved or other status received");
              }
            } catch (error: any) {
              console.error("Error accepting NDA:", error);
              toast({
                title: "Error",
                description:
                  error.response?.data || "Could not accept NDA.",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            }
          }}
        />
      )}
    </Container>
  );
};

export default CommunityList;

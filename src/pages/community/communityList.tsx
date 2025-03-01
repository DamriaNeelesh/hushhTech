// src/pages/community/CommunityList.tsx
import { useState, useEffect } from "react"; 
import {
  Container,
  Heading,
  Box,
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
import { getAllPosts } from "../../data/allPosts";
// Dropdown option text for NDA documents.
const NDA_OPTION = "Sensitive Documents (NDA approval Req.)";

// Utility to convert a string to Title Case.
const toTitleCase = (str: string): string =>
  str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  console.log('Get All Posts:',getAllPosts());
// Helper function to format dates as "2nd Feb '25"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
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
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${dayOrdinal} ${month} '${year}`;
};

// Define PostImage component.
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
  const toast = useToast();
  const allPosts = getAllPosts();

  // Separate posts by access level.
  const publicPosts = allPosts.filter((post) => post.accessLevel === "Public");
  const ndaPosts = allPosts.filter((post) => post.accessLevel === "NDA");

  // Get unique categories from public posts.
  const publicCategories = Array.from(new Set(publicPosts.map((post) => post.category)));
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

  // --- Fetch Session & Subscribe to Auth Changes ---
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

  // --- Set Default Dropdown from localStorage ---
  useEffect(() => {
    const storedFilter = localStorage.getItem("communityFilter");
    if (storedFilter === "nda") {
      setSelectedCategory(NDA_OPTION);
    } else {
      setSelectedCategory("All");
    }
  }, []);

  // --- If dropdown is NDA, run access check if not already approved ---
  useEffect(() => {
    const checkOnMount = async () => {
      if (selectedCategory === NDA_OPTION && session && !ndaApproved) {
        const access = await checkNdaAccessStatus();
        if (!access) {
          setSelectedCategory("All");
          localStorage.setItem("communityFilter", "all");
        }
      }
    };
    checkOnMount();
  }, [selectedCategory, session, ndaApproved]);

  // --- Function to Check NDA Access Status ---
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
      } else if (
        status === "Pending" ||
        status === "Requested permission for the sensitive file."
      ) {
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
        toast({
          title: "NDA Not Applied",
          description: "Please complete your NDA application on your profile.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        window.location.href = "/profile";
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

  // --- When Dropdown Category is Selected ---
  const handleCategoryChange = async (category: string) => {
    if (category === NDA_OPTION) {
      const accessGranted = await checkNdaAccessStatus();
      if (!accessGranted) return;
    }
    setSelectedCategory(category);
    localStorage.setItem("communityFilter", category === NDA_OPTION ? "nda" : "all");
  };
  console.log('Get All Posts:',getAllPosts());

  // --- Filter Posts Based on Selected Category ---
  let filteredPosts;
  if (selectedCategory === NDA_OPTION) {
    filteredPosts = ndaApproved ? ndaPosts : [];
  } else if (selectedCategory === "All") {
    filteredPosts = publicPosts;
  } else {
    filteredPosts = publicPosts.filter((post) => post.category === selectedCategory);
  }

  filteredPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const renderLoader = () => (
    <Box textAlign="center" py={8}>
      <Spinner size="xl" />
    </Box>
  );

  const handleRestrictedClick = () => {
    toast({
      title: "Access Restricted",
      description: "Please sign in and complete NDA process to access these posts.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

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
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6} textAlign="left" fontSize={{ md: "2xl", base: "xl" }}>
        Latest Updates from Hushh Technologies
      </Heading>
      <Box mb={8} textAlign="left">
        <Select
          maxW="300px"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {dropdownOptions.map((category) => (
            <option key={category} value={category}>
              {category === NDA_OPTION ? category : toTitleCase(category)}
            </option>
          ))}
        </Select>
      </Box>
      <Text
        my={"8"}
        fontWeight={"400"}
        fontSize={{ md: "3rem", base: "1.7rem" }}
        lineHeight={{ md: "65px", base: "32px" }}
      >
        {toTitleCase(selectedCategory)}
      </Text>
      {loading ? (
        renderLoader()
      ) : (
        <Box>
          {filteredPosts.map((post) => {
            const dateString = formatDate(post.publishedAt);
            const handleClick = () => {
              if (selectedCategory === NDA_OPTION && !ndaApproved) {
                handleRestrictedClick();
              }
            };
            return (
              <Box key={post.slug} mb={6}>
                <Text
                  color="red.600"
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md" }}
                  mb={1}
                >
                  {dateString}
                </Text>
                <Link to={`/community/${post.slug}`} onClick={handleClick}>
                  <Text
                    color="gray.900"
                    fontSize={{ base: "md", md: "lg" }}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {post.title}
                  </Text>
                </Link>
              </Box>
            );
          })}
        </Box>
      )}
      {showNdaModal && session && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
          onSubmit={(result: string) => {
            handleNdaRequestSubmit(result);
            setShowNdaModal(false);
          }}
        />
      )}
      {showNdaDocModal && ndaMetadata && session && (
        <NDADocumentModal
          isOpen={showNdaDocModal}
          onClose={() => setShowNdaDocModal(false)}
          session={session}
          ndaMetadata={ndaMetadata}
          onAccept={() => {
            toast({
              title: "NDA Accepted",
              description:
                "Your NDA has been accepted. Confidential documents are now accessible.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            setNdaApproved(true);
            setShowNdaDocModal(false);
            localStorage.setItem("communityFilter", "nda");
            setSelectedCategory(NDA_OPTION);
          }}
        />
      )}
    </Container>
  );
};

export default CommunityList;

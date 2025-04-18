// Path: /pages/community/communityList.tsx

import { useState, useEffect, useMemo, useCallback } from "react"; 
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
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import NDARequestModal from "../../components/NDARequestModal";
import NDADocumentModal from "../../components/NDADocumentModal";
import ReportCard from "../../components/ReportCard";
import config from "../../resources/config/config";
import { getPosts, PostData } from "../../data/posts";
import { getAllReports, Report } from "../../services/reportService";
import { Session } from "@supabase/supabase-js";
import { formatShortDate, parseDate } from "../../utils/dateFormatter";

// Dropdown option text for NDA documents.
const NDA_OPTION = "Sensitive Documents (NDA approval Req.)";
const MARKET_UPDATES_OPTION = "Market Updates";

// Aloha Funds Report API constants
const ALOHA_FUNDS_API_BASE_URL = 'https://spmxyqxjqxcyywkapong.supabase.co/rest/v1';
const ALOHA_FUNDS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbXh5cXhqcXhjeXl3a2Fwb25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTYwNDIsImV4cCI6MjA2MDI5MjA0Mn0._C6lZcTubk2VuwDKC2uDOsiFFPaKRiEJSqBjtGpm99E';

// Utility to convert a string to Title Case.
const toTitleCase = (str: string): string =>
  str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

// Interface for unified post type that can handle both sources
interface UnifiedPost {
  id: string;
  title: string;
  date: string;
  slug?: string; // For posts.ts posts only
  isApiReport?: boolean; // To identify the source
}

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
  const allPosts: PostData[] = getPosts();

  // Separate posts by access level.
  const publicPosts = useMemo(() => allPosts.filter((post) => post.accessLevel === "Public"), [allPosts]);
  const ndaPosts = useMemo(() => allPosts.filter((post) => post.accessLevel === "NDA"), [allPosts]);

  // Separate out the market update posts from posts.ts - use useMemo to prevent recalculation on every render
  const marketUpdatePosts = useMemo(() => publicPosts.filter(post => 
    post.category.toLowerCase() === 'market updates' || 
    post.category.toLowerCase() === 'market' ||
    post.slug.toLowerCase().includes('market')
  ), [publicPosts]);

  // Get unique categories from public posts, excluding market updates
  const publicCategories = useMemo(() => {
    const allCategories = Array.from(new Set(publicPosts.map((post) => post.category)));
    return allCategories.filter(cat => 
      cat.toLowerCase() !== 'market updates' && 
      cat.toLowerCase() !== 'market'
    );
  }, [publicPosts]);
  
  // Create dropdown options, ensuring no duplicate categories
  const dropdownOptions = useMemo(() => 
    ["All", ...publicCategories, MARKET_UPDATES_OPTION, NDA_OPTION], 
    [publicCategories]
  );

  // State for selected dropdown option.
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Flag to indicate if NDA access is approved.
  const [ndaApproved, setNdaApproved] = useState(false);
  // Session state.
  const [session, setSession] = useState<Session | null>(null);
  // Controls showing the NDA request modal.
  const [showNdaModal, setShowNdaModal] = useState(false);
  // Controls showing the NDA document modal.
  const [showNdaDocModal, setShowNdaDocModal] = useState(false);
  // To store NDA metadata returned from the API.
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // State for API reports
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState<string | null>(null);

  // Combined market updates from both sources
  const [combinedMarketUpdates, setCombinedMarketUpdates] = useState<UnifiedPost[]>([]);

  // --- Fetch API Reports ---
  useEffect(() => {
    // Always fetch reports when market updates are selected or when the component mounts
    // This ensures we have the data ready when needed
    const fetchReports = async () => {
      if (reportsLoading) return; // Prevent duplicate fetches
      
      setReportsLoading(true);
      setReportsError(null);
      
      try {
        console.log('Fetching market reports from Aloha Funds Report API...');
        
        // Use the exact API endpoint format from the documentation
        // API Key must be sent as a query parameter per documentation
        const response = await fetch(
          `${ALOHA_FUNDS_API_BASE_URL}/reports?select=*&order=date.desc,time.desc&apikey=${ALOHA_FUNDS_API_KEY}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }
        
        const fetchedReports = await response.json();
        console.log('Fetched reports:', fetchedReports);
        setReports(fetchedReports);
        
        // If we got an empty array when we shouldn't have, show a message
        if (fetchedReports.length === 0 && selectedCategory === MARKET_UPDATES_OPTION && marketUpdatePosts.length === 0) {
          setReportsError('No market updates available. Please check back later.');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReportsError('Failed to load market updates. Please try again later.');
      } finally {
        setReportsLoading(false);
      }
    };

    fetchReports();
  }, [selectedCategory, marketUpdatePosts.length]);

  // Transform market update posts from posts.ts to unified format
  const postsFormatted = useMemo(() => 
    marketUpdatePosts.map(post => ({
      id: post.slug, 
      title: post.title,
      date: post.publishedAt, 
      slug: post.slug,
      isApiReport: false
    })),
    [marketUpdatePosts]
  );

  // Transform API reports to unified format
  const reportsFormatted = useMemo(() => 
    reports.map(report => ({
      id: report.id,
      title: report.title || 'Untitled Report',
      date: report.date,
      isApiReport: true
    })),
    [reports]
  );

  // Combined and sorted market updates 
  const sortedCombinedUpdates = useMemo(() => {
    // Combine both sources
    const combined = [...postsFormatted, ...reportsFormatted];
    
    // Sort by date, latest first
    return combined.sort((a, b) => {
      // Use parseDate to handle both date formats correctly
      const dateA = parseDate(a.date) || new Date(0);
      const dateB = parseDate(b.date) || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [postsFormatted, reportsFormatted]);

  // Update combined market updates when sorted data changes
  useEffect(() => {
    setCombinedMarketUpdates(sortedCombinedUpdates);
  }, [sortedCombinedUpdates]);

  // --- Filter Posts Based on Selected Category ---
  const filteredPosts = useMemo(() => {
    let result: PostData[] = [];
    
    if (selectedCategory === NDA_OPTION) {
      result = ndaApproved ? ndaPosts : [];
    } else if (selectedCategory === "All") {
      // For "All" category, include all public posts (including market updates)
      result = publicPosts;
    } else if (selectedCategory === MARKET_UPDATES_OPTION) {
      // This will be handled by the combinedMarketUpdates state
      result = [];
    } else {
      result = publicPosts.filter((post) => post.category === selectedCategory);
    }

    // Sort posts (latest on top)
    return [...result].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory, ndaApproved, ndaPosts, publicPosts]);

  // --- Combined list for "All" category with all posts and all market updates ---
  const allContentSorted = useMemo(() => {
    // Get non-market update posts directly from publicPosts
    const regularPostsFormatted = publicPosts
      .filter(post => 
        post.category.toLowerCase() !== 'market updates' && 
        post.category.toLowerCase() !== 'market' &&
        !post.slug.toLowerCase().includes('market')
      )
      .map(post => ({
        id: post.slug,
        title: post.title,
        date: post.publishedAt,
        slug: post.slug,
        isApiReport: false
      }));
    
    // Combine regular posts with all market updates (from both sources)
    const allContent = [...regularPostsFormatted, ...sortedCombinedUpdates];
    
    // Sort everything by date
    return allContent.sort((a, b) => {
      const dateA = parseDate(a.date) || new Date(0);
      const dateB = parseDate(b.date) || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [publicPosts, sortedCombinedUpdates]);

  // --- Fetch Session & Subscribe to Auth Changes ---
  useEffect(() => {
    config.supabaseClient?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    
    const { data: { subscription } } =
      config.supabaseClient?.auth.onAuthStateChange((_event: string, session: Session | null) => {
        setSession(session);
      }) || { data: { subscription: undefined } };
      
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
    } else if (storedFilter === "market-updates") {
      setSelectedCategory(MARKET_UPDATES_OPTION);
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
          // If access not granted, reset dropdown to All.
          setSelectedCategory("All");
          localStorage.setItem("communityFilter", "all");
        }
      }
    };
    checkOnMount();
  }, [selectedCategory, session, ndaApproved]);

  // --- Function to Check NDA Access Status ---
  const checkNdaAccessStatus = useCallback(async (): Promise<boolean> => {
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
      } else if (status === "Pending" || status === "Requested permission for the sensitive file.") {
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
        toast({
          title: "NDA Not Applied",
          description: "Please complete your NDA application on your profile.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        // Redirect to profile page.
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
  }, [session, toast]);

  // --- When Dropdown Category is Selected ---
  const handleCategoryChange = async (category: string) => {
    if (category === NDA_OPTION) {
      const accessGranted = await checkNdaAccessStatus();
      if (!accessGranted) return;
    }
    
    setSelectedCategory(category);
    
    // Store the user's preference
    if (category === NDA_OPTION) {
      localStorage.setItem("communityFilter", "nda");
    } else if (category === MARKET_UPDATES_OPTION) {
      localStorage.setItem("communityFilter", "market-updates");
    } else {
      localStorage.setItem("communityFilter", "all");
    }
  };

  // --- Render Loader if API Calls Are In Progress ---
  const renderLoader = useCallback(() => (
    <Box textAlign="center" py={8}>
      <Spinner size="xl" />
    </Box>
  ), []);

  // --- Render Error Message --- 
  const renderError = useCallback((message: string) => (
    <Alert status="error" borderRadius="md" mb={4}>
      <AlertIcon />
      {message}
    </Alert>
  ), []);

  // --- Handle Restricted Post Clicks ---
  const handleRestrictedClick = useCallback(() => {
    toast({
      title: "Access Restricted",
      description: "Please sign in and complete NDA process to access these posts.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }, [toast]);

  // --- Preload Images ---
  useEffect(() => {
    allPosts.forEach((post) => {
      const img = new window.Image();
      img.src = post.image;
    });
  }, [allPosts]);

  // --- Handler for NDA Request Modal Submission ---
  const handleNdaRequestSubmit = useCallback(async (result: string) => {
    if (result === "Pending: Waiting for NDA Process") {
      try {
        const ndaResponse = await axios.post(
          "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/get_nda_metadata",
          {},
          {
            headers: {
              apikey: config.SUPABASE_ANON_KEY,
              Authorization: `Bearer ${session?.access_token || ''}`,
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
  }, [session, toast]);

  // Render a market update post/report item
  const renderMarketUpdateItem = useCallback((post: UnifiedPost) => {
    // Format date using formatShortDate from dateFormatter
    // This handles both YYYY-MM-DD and DD/MM/YYYY formats
    const formattedDate = formatShortDate(post.date);
    
    return (
      <Box
        key={post.id}
        mb={6}
        _hover={{
          "& > p:last-of-type": {
            textDecoration: "underline"
          }
        }}
      >
        {/* Date in red, bold */}
        <Text
          color="red.600"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "md" }}
          mb={1}
        >
          {formattedDate}
        </Text>
        
        {/* Title as a link */}
        {post.isApiReport ? (
          <Link to={`/reports/${post.id}`}>
            <Text
              color="gray.900"
              fontSize={{ base: "md", md: "lg" }}
              _hover={{ textDecoration: "underline" }}
            >
              {post.title}
            </Text>
          </Link>
        ) : (
          <Link to={`/community/${post.slug}`}>
            <Text
              color="gray.900"
              fontSize={{ base: "md", md: "lg" }}
              _hover={{ textDecoration: "underline" }}
            >
              {post.title}
            </Text>
          </Link>
        )}
      </Box>
    );
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      {/* Page Heading */}
      <Heading as="h1" mb={6} textAlign="left" fontSize={{md:"2xl",base:'xl'}}>
      Latest Updates from Hushh Technologies
      </Heading>

      {/* Dropdown Filter */}
      <Box mb={8} textAlign="left">
        <Select
          maxW="300px"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {dropdownOptions.map((category) => (
            <option key={category} value={category}>
              {category === NDA_OPTION 
                ? category 
                : category === MARKET_UPDATES_OPTION 
                  ? category 
                  : toTitleCase(category)
              }
            </option>
          ))}
        </Select>
      </Box>

      <Text my={'8'} fontWeight={'400'} fontSize={{md:'3rem',base:'1.7rem'}} lineHeight={{md:'65px',base:'32px'}}>
        {selectedCategory === MARKET_UPDATES_OPTION ? "Market Updates" : toTitleCase(selectedCategory)}
      </Text>

      {/* Loader or List */}
      {loading || (reportsLoading && (selectedCategory === MARKET_UPDATES_OPTION || selectedCategory === "All")) ? (
        renderLoader()
      ) : (
        <Box>
          {/* Show error message if needed */}
          {reportsError && selectedCategory === MARKET_UPDATES_OPTION && combinedMarketUpdates.length === 0 && (
            renderError(reportsError)
          )}
          
          {selectedCategory === MARKET_UPDATES_OPTION ? (
            /* Display combined market updates from both sources */
            combinedMarketUpdates.length > 0 ? (
              combinedMarketUpdates.map(renderMarketUpdateItem)
            ) : !reportsError ? (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No market updates available at this time.</Text>
              </Box>
            ) : null
          ) : selectedCategory === "All" ? (
            /* For All category: Display all content sorted by date */
            allContentSorted.length > 0 ? (
              allContentSorted.map(renderMarketUpdateItem)
            ) : (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No posts available at this time.</Text>
              </Box>
            )
          ) : (
            /* Display regular posts for all other categories */
            filteredPosts.map((post) => {
              const dateString = formatShortDate(post.publishedAt);
              const handleClick = () => {
                if (selectedCategory === NDA_OPTION && !ndaApproved) {
                  handleRestrictedClick();
                }
              };
              return (
                <Box key={post.slug} mb={6}>
                  {/* Date in red, bold */}
                  <Text
                    color="red.600"
                    fontWeight="bold"
                    fontSize={{ base: "sm", md: "md" }}
                    mb={1}
                  >
                    {dateString}
                  </Text>
                  {/* Title as a link */}
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
            })
          )}
        </Box>
      )}

      {/* NDA Request Modal */}
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

      {/* NDA Document Modal */}
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
            // Update default filter to NDA.
            localStorage.setItem("communityFilter", "nda");
            setSelectedCategory(NDA_OPTION);
          }}
        />
      )}
    </Container>
  );
};

export default CommunityList;

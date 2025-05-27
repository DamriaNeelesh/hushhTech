// Path: /pages/community/communityList.tsx

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  Alert,
  AlertIcon,
  Badge,
  Flex,
  SimpleGrid,
  Card,
  CardBody,
  Link as ChakraLink,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NDARequestModal from "../../components/NDARequestModal";
import NDADocumentModal from "../../components/NDADocumentModal";
import config from "../../resources/config/config";
import { getPosts, PostData } from "../../data/posts";
import { formatShortDate, parseDate } from "../../utils/dateFormatter";

// Dropdown labels
const NDA_OPTION = "Sensitive Documents (NDA approval Req.)";
const MARKET_UPDATES_OPTION = "Market Updates";

// Supabase REST API settings
const ALOHA_FUNDS_API_BASE = "https://spmxyqxjqxcyywkapong.supabase.co";
const ALOHA_FUNDS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbXh5cXhqcXhjeXl3a2Fwb25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTYwNDIsImV4cCI6MjA2MDI5MjA0Mn0._C6lZcTubk2VuwDKC2uDOsiFFPaKRiEJSqBjtGpm99E";

interface UnifiedPost {
  id: string;
  title: string;
  date: string;
  slug?: string;
  isApiReport?: boolean;
  description?: string;
}

const toTitleCase = (s: string) =>
  s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.substr(1).toLowerCase());

// Lazy-loaded image with skeleton
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
  const mountRef = useRef(true);

  // 1) Local posts
  const localPosts = useMemo<PostData[]>(() => getPosts(), []);

  // 2) API reports
  const [apiReports, setApiReports] = useState<UnifiedPost[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setApiLoading(true);
      setApiError(null);
      try {
        const url = `${ALOHA_FUNDS_API_BASE}/rest/v1/reports?select=*`;
        const resp = await axios.get<UnifiedPost[]>(url, {
          headers: {
            apikey: ALOHA_FUNDS_API_KEY,
            Authorization: `Bearer ${ALOHA_FUNDS_API_KEY}`,
            "Content-Type": "application/json",
          },
        });
        // Only keep those with id & date
        setApiReports(
          resp.data
            .filter((r) => r.id && r.date)
            .map((r) => ({ ...r, isApiReport: true }))
        );
      } catch (err: any) {
        console.error(err);
        setApiError(err.message || "Failed to fetch reports");
      } finally {
        setApiLoading(false);
        mountRef.current = false;
      }
    };

    if (mountRef.current) fetchReports();
  }, []);

  // 3) Combine localPosts + apiReports into a single date-sorted list
  const combinedMarketUpdates = useMemo<UnifiedPost[]>(() => {
    // Local "market" posts
    const localMarket = localPosts
      .filter(
        (p) =>
          p.accessLevel === "Public" &&
          (p.category.toLowerCase().includes("market") ||
            p.slug.toLowerCase().includes("market"))
      )
      .map((p) => ({
        id: p.slug,
        title: p.title,
        date: p.publishedAt,
        slug: p.slug,
        isApiReport: false,
        description: p.description || "Our latest analysis of market trends and investment opportunities in the current economic climate.",
      }));

    const all = [...localMarket, ...apiReports];
    return all.sort((a, b) => {
      const da = parseDate(a.date)?.getTime() || 0;
      const db = parseDate(b.date)?.getTime() || 0;
      return db - da;
    });
  }, [localPosts, apiReports]);

  // 4) Build category lists
  const publicPosts = useMemo(
    () => localPosts.filter((p) => p.accessLevel === "Public"),
    [localPosts]
  );
  const ndaPosts = useMemo(
    () => localPosts.filter((p) => p.accessLevel === "NDA"),
    [localPosts]
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(publicPosts.map((p) => p.category)));
    return cats.filter(
      (c) =>
        !["market", "market updates"].includes(c.trim().toLowerCase())
    );
  }, [publicPosts]);

  const dropdownOptions = useMemo(
    () => ["All", ...categories, MARKET_UPDATES_OPTION, NDA_OPTION],
    [categories]
  );

  // 5) UI state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ndaApproved, setNdaApproved] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [showNdaDocModal, setShowNdaDocModal] = useState(false);
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [ndaLoading, setNdaLoading] = useState(false);

  // 6) Filtering logic
  const filteredPosts = useMemo(() => {
    if (selectedCategory === NDA_OPTION) {
      return ndaApproved ? ndaPosts : [];
    }
    if (selectedCategory === "All") {
      return publicPosts;
    }
    if (selectedCategory === MARKET_UPDATES_OPTION) {
      return [];
    }
    return publicPosts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, publicPosts, ndaPosts, ndaApproved]);

  const allContentSorted = useMemo<UnifiedPost[]>(() => {
    // Regular posts
    const regs = publicPosts
      .filter(
        (p) =>
          !p.slug.toLowerCase().includes("market") &&
          !["market", "market updates"].includes(p.category.toLowerCase())
      )
      .map((p) => ({
        id: p.slug,
        title: p.title,
        date: p.publishedAt,
        slug: p.slug,
        isApiReport: false,
        description: p.description || "Comprehensive review of our first quarter performance and strategic adjustments.",
      }));
    const merged = [...regs, ...combinedMarketUpdates];
    return merged.sort((a, b) => {
      const da = parseDate(a.date)?.getTime() || 0;
      const db = parseDate(b.date)?.getTime() || 0;
      return db - da;
    });
  }, [publicPosts, combinedMarketUpdates]);

  // 7) NDA / session setup (as you had it)
  useEffect(() => {
    config.supabaseClient?.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const sub =
      config.supabaseClient?.auth.onAuthStateChange((_e, s) => {
        setSession(s);
      })?.data.subscription;
    return () => sub && sub.unsubscribe();
  }, []);

  const checkNda = useCallback(async () => {
    if (!session) {
      toast({ title: "Please sign in to view the files", status: "error" });
      return false;
    }
    setNdaLoading(true);
    try {
      const { data: status } = await axios.post(
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
      if (status === "Approved") {
        setNdaApproved(true);
        return true;
      }
      if (status === "Pending: Waiting for NDA Process") {
        const { data: meta } = await axios.post(
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
        setNdaMetadata(meta.metadata);
        setShowNdaDocModal(true);
        return false;
      }
      toast({ title: status, status: "error" });
      return false;
    } catch (e: any) {
      toast({ title: e.message || "NDA check failed", status: "error" });
      return false;
    } finally {
      setNdaLoading(false);
    }
  }, [session, toast]);

  const onCategoryChange = async (cat: string) => {
    if (cat === NDA_OPTION) {
      const ok = await checkNda();
      if (!ok) return;
    }
    setSelectedCategory(cat);
    localStorage.setItem(
      "communityFilter",
      cat === NDA_OPTION
        ? "nda"
        : cat === MARKET_UPDATES_OPTION
        ? "market"
        : "all"
    );
  };

  // 8) Render helpers
  const renderLoader = () => (
    <Flex justify="center" py={8}>
      <Spinner size="xl" />
    </Flex>
  );
  const renderError = (msg: string) => (
    <Alert status="error" borderRadius="md" my={4}>
      <AlertIcon />
      {msg}
    </Alert>
  );

  // Helper function to get sample description based on title
  const getPostDescription = (post: UnifiedPost) => {
    if (post.description) return post.description;
    
    if (post.title.toLowerCase().includes("ai") || post.title.toLowerCase().includes("artificial intelligence")) {
      return "Exploring how artificial intelligence is revolutionizing portfolio management and risk assessment.";
    } else if (post.title.toLowerCase().includes("market")) {
      return "Our latest analysis of market trends and investment opportunities in the current economic climate.";
    } else if (post.title.toLowerCase().includes("review") || post.title.toLowerCase().includes("performance")) {
      return "Comprehensive review of our first quarter performance and strategic adjustments for Q2.";
    } else {
      return "Stay informed with our latest market insights, research findings, and company updates.";
    }
  };

  const renderMarketItem = useCallback((p: UnifiedPost, index: number) => {
    const dateFmt = formatShortDate(p.date);
    const dateLabel = dateFmt.split(' ').join(' ');
    let postDescription = getPostDescription(p);
    
    return (
      <Card 
        key={p.id} 
        variant="outline" 
        borderRadius="md" 
        boxShadow="sm"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{ boxShadow: "md" }}
      >
        <CardBody p={6}>
          <VStack align="flex-start" spacing={3}>
            <Text color="#0AADBC" fontSize="sm" fontWeight="bold">
              {dateLabel} Post
            </Text>
            <Heading as="h3" size="md" fontWeight="bold">
              {p.title}
            </Heading>
            <Text 
              color="gray.600" 
              fontSize="md"
              noOfLines={3}
              height="4.5rem"
              overflow="hidden"
            >
              {postDescription}
            </Text>
            <ChakraLink 
              as={Link} 
              to={p.isApiReport ? `/reports/${p.id}` : `/community/${p.slug}`}
              color="#0AADBC"
              fontWeight="medium"
              display="flex"
              alignItems="center"
            >
              Read More <Icon as={ChevronRightIcon} ml={1} />
            </ChakraLink>
          </VStack>
        </CardBody>
      </Card>
    );
  }, []);

  // 9) Main JSX
  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={4} textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
        Latest Updates from{" "}
        <Text as="span" color="#0AADBC" display="inline">
          Hushh Technologies
        </Text>
      </Heading>

      <Text 
        textAlign="center" 
        fontSize={{ base: "md", md: "lg" }} 
        color="gray.600" 
        maxW="container.md" 
        mx="auto" 
        mb={10}
      >
        Stay informed with our latest market insights, research findings, and company updates.
      </Text>

      <Box mb={8} display={{ md: "none" }}>
        <Select
          maxW="full"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          bg="white"
          borderColor="gray.300"
        >
          {dropdownOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === NDA_OPTION || opt === MARKET_UPDATES_OPTION
                ? opt
                : toTitleCase(opt)}
            </option>
          ))}
        </Select>
      </Box>

      <Box display={{ base: "none", md: "block" }} mb={8}>
        <Flex justify="center">
          <HStack spacing={4} wrap="wrap" justify="center">
            {dropdownOptions.map((opt) => (
              <Box 
                key={opt}
                px={4}
                py={2}
                borderRadius="md"
                cursor="pointer"
                bg={selectedCategory === opt ? "#0AADBC" : "transparent"}
                color={selectedCategory === opt ? "white" : "gray.700"}
                fontWeight={selectedCategory === opt ? "bold" : "normal"}
                _hover={{ bg: selectedCategory === opt ? "#0AADBC" : "gray.100" }}
                onClick={() => onCategoryChange(opt)}
              >
                {opt === NDA_OPTION || opt === MARKET_UPDATES_OPTION
                  ? opt
                  : toTitleCase(opt)}
              </Box>
            ))}
          </HStack>
        </Flex>
      </Box>

      {/* Loading or Error */}
      {apiLoading && selectedCategory === MARKET_UPDATES_OPTION
        ? renderLoader()
        : apiError && selectedCategory === MARKET_UPDATES_OPTION
        ? renderError(apiError)
        : (
            <Box>
              {selectedCategory === MARKET_UPDATES_OPTION ? (
                combinedMarketUpdates.length ? (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {combinedMarketUpdates.map((p, index) => renderMarketItem(p, index))}
                  </SimpleGrid>
                ) : (
                  <Text textAlign="center">No market updates available.</Text>
                )
              ) : selectedCategory === "All" ? (
                allContentSorted.length ? (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {allContentSorted.map((p, index) => renderMarketItem(p, index))}
                  </SimpleGrid>
                ) : (
                  <Text textAlign="center">No content available.</Text>
                )
              ) : (
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {filteredPosts.map((p, index) => renderMarketItem({
                    id: p.slug,
                    title: p.title,
                    date: p.publishedAt,
                    slug: p.slug,
                    isApiReport: false,
                    description: p.description || getPostDescription({id: p.slug, title: p.title, date: p.publishedAt})
                  }, index))}
                </SimpleGrid>
              )}
            </Box>
          )}

      {/* NDA Modals */}
      <NDARequestModal
        isOpen={showNdaModal}
        onClose={() => setShowNdaModal(false)}
        session={session}
        onSubmit={() => {}}
      />
      <NDADocumentModal
        isOpen={showNdaDocModal}
        onClose={() => setShowNdaDocModal(false)}
        session={session}
        ndaMetadata={ndaMetadata}
        onAccept={() => {
          setNdaApproved(true);
          setShowNdaDocModal(false);
        }}
      />
    </Container>
  );
};

export default CommunityList;

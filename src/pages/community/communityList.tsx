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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    // Local “market” posts
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
      toast({ title: "Sign in first", status: "error" });
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

  const renderMarketItem = useCallback((p: UnifiedPost) => {
    const dateFmt = formatShortDate(p.date);
    return (
      <Box key={p.id} mb={6}>
        <Text color="red.600" fontWeight="bold" mb={1}>
          {dateFmt}{" "}
          <Badge colorScheme={"blue"} fontSize="xs">
            Post
          </Badge>
        </Text>
        <Link to={p.isApiReport ? `/reports/${p.id}` : `/community/${p.slug}`}>
          <Text fontSize="lg" _hover={{ textDecoration: "underline" }}>
            {p.title}
          </Text>
        </Link>
      </Box>
    );
  }, []);

  // 9) Main JSX
  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6}>Latest Updates from Hushh Technologies</Heading>

      <Select
        maxW="300px"
        mb={6}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {dropdownOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt === NDA_OPTION || opt === MARKET_UPDATES_OPTION
              ? opt
              : toTitleCase(opt)}
          </option>
        ))}
      </Select>

      <Text fontSize="2xl" my={4}>
        {selectedCategory === MARKET_UPDATES_OPTION
          ? "Market Updates"
          : toTitleCase(selectedCategory)}
      </Text>

      {/* Loading or Error */}
      {apiLoading && selectedCategory === MARKET_UPDATES_OPTION
        ? renderLoader()
        : apiError && selectedCategory === MARKET_UPDATES_OPTION
        ? renderError(apiError)
        : (
            <Box>
              {selectedCategory === MARKET_UPDATES_OPTION
                ? combinedMarketUpdates.length
                  ? combinedMarketUpdates.map(renderMarketItem)
                  : <Text>No market updates available.</Text>
                : selectedCategory === "All"
                ? allContentSorted.length
                  ? allContentSorted.map(renderMarketItem)
                  : <Text>No content available.</Text>
                : filteredPosts.map((p) => (
                    <Box key={p.slug} mb={6}>
                      <Text color="red.600" fontWeight="bold" mb={1}>
                        {formatShortDate(p.publishedAt)}
                      </Text>
                      <Link to={`/community/${p.slug}`}>
                        <Text fontSize="lg" _hover={{ textDecoration: "underline" }}>
                          {p.title}
                        </Text>
                      </Link>
                    </Box>
                  ))}
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

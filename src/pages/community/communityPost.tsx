// src/pages/community/CommunityPost.tsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  Box,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { getPostBySlug, PostData } from "../../data/posts";
import axios from "axios";
import config from "../../resources/config/config";
import CommentSection from "../../components/CommentSection"; // Adjust the path as needed

const CommunityPost: React.FC = () => {
  // Extract the slug (using wildcard parameter for nested routes)
  const { "*": slug } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  // Use a ref to ensure that the same toast is not shown twice.
  const toastShownRef = useRef<{ [key: string]: boolean }>({});

  const showToastOnce = (id: string, options: any) => {
    if (!toastShownRef.current[id]) {
      toast(options);
      toastShownRef.current[id] = true;
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      // Retrieve the post using the slug.
      const foundPost = getPostBySlug(slug || "");
      if (!foundPost) {
        showToastOnce(`post-not-found-${slug}`, {
          title: "Post Not Found",
          description: `The post with slug "${slug}" was not found.`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        navigate("/community");
        return;
      }

      // If the post is confidential (accessLevel "NDA"), then check NDA access via API.
      if (foundPost.accessLevel === "NDA") {
        const { data: { session } } = await config.supabaseClient.auth.getSession();
        if (!session) {
          showToastOnce("access-restricted-no-session", {
            title: "Access Restricted",
            description:
              "You must be logged in and complete the NDA process to view confidential posts.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          navigate("/community");
          return;
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
          const ndaStatus = response.data;
          console.log("NDA Access Status:", ndaStatus);
          if (ndaStatus !== "Approved") {
            showToastOnce("access-restricted-nda", {
              title: "Access Restricted",
              description:
                "You are not approved to view this confidential post. Please complete the NDA process.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
            navigate("/community");
            return;
          }
        } catch (error) {
          console.error("Error checking NDA status:", error);
          showToastOnce("access-error-nda", {
            title: "Error",
            description:
              "Error checking NDA access status. Please try again later.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          navigate("/community");
          return;
        }
      }

      setPost(foundPost);
      setLoading(false);
    };

    loadPost();
  }, [slug, navigate, toast]);

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!post) return null;

  const PostComponent = post.Component;
  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <Box bg="white" minH="100vh" py={12} px={4}>
      <Container maxW="container.md">
        <Text as="h2" fontSize={{ base: "sm", md: "md" }} fontWeight="600" color="#e7131a">
          {toTitleCase(post.category)}
        </Text>
        <Text fontSize="sm" color="gray.900" mb={8}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </Text>
        <Box color="white" lineHeight="tall" fontSize="lg">
          <PostComponent />
        </Box>
        {/* Render the Comment Section */}
        <CommentSection postSlug={post.slug} postTitle={post.title} />

        <Text fontSize="sm" my={{ md: "3rem", base: "1.5rem" }}>
          © 2025 Hushh Technologies LLC. All Rights Reserved. The materials on this website are for illustration and discussion purposes only and do not constitute an offering. An offering may be made only by delivery of a confidential offering memorandum to appropriate investors. PAST PERFORMANCE IS NO GUARANTEE OF FUTURE RESULTS.
        </Text>
      </Container>
    </Box>
  );
};

export default CommunityPost;

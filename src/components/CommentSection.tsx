// src/components/CommentSection.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";

interface CommentSectionProps {
  postSlug: string;
  postTitle: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postSlug, postTitle }) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Retrieve current user session from Supabase
  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await config.supabaseClient.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    }
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comment cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    // Create the payload object
    const payload = {
      postSlug,
      postTitle,
      userEmail: user?.email,
      commentText: comment,
      timestamp: new Date().toISOString(),
    };
    try {
      // Adjust the API endpoint URL to your backend endpoint for comments
      const response = await axios.post(`${config.API_BASE_URL}/comments`, payload);
      toast({
        title: "Comment submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setComment(""); // clear the input on success
      // Optionally, you could also refresh the comments list here.
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Error submitting comment.",
        description: error.response?.data || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box mt={8} borderTop="1px" borderColor="gray.200" pt={4}>
      <FormControl>
        <FormLabel fontWeight="bold">Leave a Comment</FormLabel>
        {user ? (
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here..."
            rows={4}
            resize="vertical"
          />
        ) : (
          <Text>Please log in to leave a comment.</Text>
        )}
      </FormControl>
      {user && (
        <Button mt={4} colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
          Submit Comment
        </Button>
      )}
    </Box>
  );
};

export default CommentSection;

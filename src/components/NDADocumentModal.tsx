import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Spinner,
  useToast,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";

interface NDADocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ndaMetadata: any;
  session: any;
  onAccept: () => void;
}

const NDADocumentModal: React.FC<NDADocumentModalProps> = ({
  isOpen,
  onClose,
  ndaMetadata,
  session,
  onAccept,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // Use a ref to track if the PDF generation API has been called
  const apiCalledRef = useRef<boolean>(false);

  // Generate NDA PDF and create a blob URL.
  const generateNdaPDF = async () => {
    // If API has already been called or if we're already loading, don't call again
    if (apiCalledRef.current || loading) return;
    
    // Mark that we've called the API
    apiCalledRef.current = true;
    setLoading(true);
    
    try {
      console.log("Generating NDA PDF with metadata:", ndaMetadata);
      
      const response = await axios.post(
        "https://hushhtech-nda-generation-53407187172.us-central1.run.app/generate-nda",
        { metadata: ndaMetadata },
        {
          headers: {
            "Content-Type": "application/json",
            "jwt-token": session.access_token,
          },
          responseType: "blob",
        }
      );
      
      // Create a Blob URL from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
      console.log("NDA PDF generated successfully");
    } catch (error: any) {
      console.error("Error generating NDA PDF:", error);
      
      // More detailed error handling
      let errorMessage = "Failed to generate NDA PDF.";
      
      if (error.response) {
        // Server responded with an error
        if (error.response.data instanceof Blob) {
          // Try to read the error message from the Blob
          try {
            const text = await error.response.data.text();
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            console.error("Error parsing error blob:", e);
          }
        } else {
          errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      
      // Reset the apiCalledRef in case we need to retry
      apiCalledRef.current = false;
    }
    setLoading(false);
  };

  useEffect(() => {
    // Only generate PDF when modal is open and we have metadata
    if (isOpen && ndaMetadata && !pdfUrl) {
      generateNdaPDF();
    }
    
    // Reset the apiCalledRef when the modal closes
    if (!isOpen) {
      apiCalledRef.current = false;
    }
    
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    };
  }, [isOpen, ndaMetadata]);

  const downloadPDF = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "NDA.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleAcceptNda = async () => {
    if (!confirmed) {
      toast({
        title: "Confirm NDA Acceptance",
        description: "Please check the box to confirm your NDA acceptance.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (isSubmitting) return; // Prevent multiple clicks
    setIsSubmitting(true);
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
      const resData = response.data;
      console.log("Accept NDA Response:", resData);
      if (resData === "Approved" || resData === "Already Approved") {
        toast({
          title: "NDA Accepted",
          description: "Your NDA has been accepted. Access granted.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onAccept(); // Callback from parent (make sure parent's setNdaApproved is defined)
        // Small delay to ensure parent state updates before closing.
        setTimeout(() => {
          onClose();
        }, 100);
      }
    } catch (error: any) {
      console.error("Error accepting NDA:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Could not accept NDA.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a manual retry button in case the API call fails
  const handleRetryGeneratePDF = () => {
    apiCalledRef.current = false; // Reset the flag
    setPdfUrl(null); // Clear any existing URL
    generateNdaPDF(); // Try again
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>NDA Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="70vh">
          {loading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" />
              <Text mt={4}>Generating NDA document, please wait...</Text>
            </Box>
          ) : pdfUrl ? (
            <Box width="100%" height="500px" overflow="hidden">
              <iframe
                src={pdfUrl}
                title="NDA Document"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            </Box>
          ) : (
            <Box textAlign="center" py={8}>
              <Text mb={4}>No document available.</Text>
              <Button onClick={handleRetryGeneratePDF} colorScheme="blue">
                Retry PDF Generation
              </Button>
            </Box>
          )}
          <Box mt={4}>
            <Checkbox
              isChecked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            >
              I confirm that I have read and accept the terms of the NDA.
            </Checkbox>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={downloadPDF} colorScheme="blue" mr={4} isDisabled={!pdfUrl}>
            Download PDF
          </Button>
          <Button isLoading={isSubmitting} onClick={handleAcceptNda} colorScheme="blue" isDisabled={!pdfUrl || !confirmed}>
            Accept NDA
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDADocumentModal;

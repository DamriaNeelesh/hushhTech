import React, { useState, useEffect } from "react";
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

  // Call the NDA generation API and create a blob URL for the PDF.
  const generateNdaPDF = async () => {
    setLoading(true);
    try {
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
      const url = URL.createObjectURL(response.data);
      setPdfUrl(url);
    } catch (error: any) {
      console.error("Error generating NDA PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate NDA PDF.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateNdaPDF();
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    };
  }, [isOpen]);

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
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/accept_nda",
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
      if (resData === "Approved") {
        toast({
          title: "NDA Accepted",
          description: "Your NDA has been accepted. Access granted.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onAccept();
        onClose();
      } else if (resData === "Already Approved") {
        // Only show success toast, avoid duplicate error toast
        toast({
          title: "NDA Already Accepted",
          description: "You have already accepted the NDA.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: resData,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
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
      setIsSubmitting(false); // Reset state after request completes
    }
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
              <Text>No document available.</Text>
            </Box>
          )}
          {/* Move the confirmation checkbox just above the footer */}
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
          <Button  onClick={downloadPDF} colorScheme="blue" mr={4}>
            Download PDF
          </Button>
          <Button isLoading={isSubmitting} onClick={handleAcceptNda} colorScheme="blue">
            Accept NDA
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDADocumentModal;

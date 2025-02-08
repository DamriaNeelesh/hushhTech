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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";

interface NDADocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ndaMetadata: any; // The NDA metadata (JSON) to be sent to the API
  session: any; // User session; must include access_token
  onAccept: () => void; // Callback when NDA is accepted
}

const NDADocumentModal: React.FC<NDADocumentModalProps> = ({
  isOpen,
  onClose,
  ndaMetadata,
  session,
  onAccept,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const toast = useToast();

  // Function to call the NDA generation API and obtain a PDF blob,
  // then create a blob URL to display inside an iframe.
  const generateNdaPDF = async () => {
    try {
      const response = await axios.post(
        "https://hushhtech-nda-generation-53407187172.us-central1.run.app/generate-nda",
        { metadata: ndaMetadata },
        {
          headers: {
            "Content-Type": "application/json",
            "jwt-token": session.access_token,
          },
          responseType: "blob", // Expect a PDF blob in response
        }
      );
      // Create a blob URL from the PDF blob
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
  };

  // When the modal opens, call the API to generate the NDA PDF.
  useEffect(() => {
    if (isOpen) {
      generateNdaPDF();
    }
    // Cleanup: revoke the blob URL when modal closes.
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    };
  }, [isOpen]);

  // Function to trigger PDF download.
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>NDA Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="70vh">
          {pdfUrl ? (
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
            <Box textAlign="center">Loading NDA...</Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={downloadPDF} colorScheme="blue" mr={4}>
            Download PDF
          </Button>
          <Button onClick={onAccept} colorScheme="blue">
            Accept NDA
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDADocumentModal;

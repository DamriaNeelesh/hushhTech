// src/components/NDADocumentModal.tsx
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";

interface NDADocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ndaMetadata: any; // The NDA document metadata (JSON)
  onAccept: () => void;
}

const NDADocumentModal: React.FC<NDADocumentModalProps> = ({
  isOpen,
  onClose,
  ndaMetadata,
  onAccept,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const toast = useToast();

  const handleAccept = () => {
    if (!isChecked) {
      toast({
        title: "Accept NDA",
        description: "Please check the box to accept the NDA.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    onAccept();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>NDA Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            border="1px solid"
            borderColor="gray.200"
            p={4}
            maxH="400px"
            overflowY="auto"
            mb={4}
          >
            {/* Pretty-print the NDA metadata */}
            <Text whiteSpace="pre-wrap">
              {JSON.stringify(ndaMetadata, null, 2)}
            </Text>
          </Box>
          <Checkbox
            isChecked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          >
            I accept the terms of the NDA.
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAccept}>
            Accept NDA
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDADocumentModal;

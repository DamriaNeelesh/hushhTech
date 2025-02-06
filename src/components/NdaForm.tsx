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
  Input,
  Select,
  FormControl,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";

interface NDARequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any; // The logged-in user's session; must include access_token.
}

const NDARequestModal: React.FC<NDARequestModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const [investorType, setInvestorType] = useState("Individual");
  const [metadata, setMetadata] = useState<any>({});
  const toast = useToast();

  // Handler to update the metadata with form field values.
  const handleInputChange = (field: string, value: string) => {
    setMetadata((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/request_file_access",
        {
          investor_type: investorType,
          metadata: JSON.stringify(metadata),
        },
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY, // Your public Supabase key.
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("NDA Request Response:", response.data);

      const resData = response.data;
      if (
        resData === "Approved" ||
        (typeof resData === "string" &&
          resData.startsWith("Requested permission"))
      ) {
        toast({
          title: "Request Submitted",
          description: "Your NDA request has been sent and is pending approval.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
      } else if (resData === "Rejected") {
        toast({
          title: "Request Rejected",
          description: "Your NDA request was rejected.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (resData === "Pending") {
        toast({
          title: "Request Pending",
          description: "Your NDA request is under review.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      } else if (resData === "Pending: Waiting for NDA Process") {
        toast({
          title: "NDA Process Required",
          description: "Please complete the NDA process to proceed.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        // In case of any unexpected response.
        toast({
          title: "Unexpected Response",
          description: `Received: ${resData}`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error submitting NDA request:", error);
      toast({
        title: "Submission Failed",
        description:
          error.response?.data || "Could not submit your NDA request.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit NDA Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Investor Type</FormLabel>
            <Select
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
            >
              <option value="Individual">Individual</option>
              <option value="Organisation">Organisation</option>
            </Select>
          </FormControl>
          {investorType === "Individual" ? (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Enter your full name"
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Enter your phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </FormControl>
            </VStack>
          ) : (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Organisation Name</FormLabel>
                <Input
                  placeholder="Enter organisation name"
                  onChange={(e) => handleInputChange("organisationName", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contact Person</FormLabel>
                <Input
                  placeholder="Enter contact person's name"
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Enter phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Additional Details</FormLabel>
                <Input
                  placeholder="Enter additional details"
                  onChange={(e) =>
                    handleInputChange("additionalDetails", e.target.value)
                  }
                />
              </FormControl>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDARequestModal;

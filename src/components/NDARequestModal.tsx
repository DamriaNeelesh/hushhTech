// src/components/NDARequestModal.tsx
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
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";

interface NDARequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any; // The logged-in user's session; must include access_token.
  onSubmit: (result: string) => void;
}

const NDARequestModal: React.FC<NDARequestModalProps> = ({
  isOpen,
  onClose,
  session,
  onSubmit,
}) => {
  // investorType is either "Individual" or "Organisation"
  const [investorType, setInvestorType] = useState("Individual");
  const [metadata, setMetadata] = useState<any>({});
  const toast = useToast();

  // Update the metadata (NDA information) for each field.
  const handleInputChange = (field: string, value: string) => {
    setMetadata((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Call the request_file_access endpoint
      const response = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/request_file_access",
        {
          investor_type: investorType,
          metadata: JSON.stringify(metadata),
        },
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Request Access Response:", response.data);
      const resData = response.data;
      onSubmit(resData); // Let the parent know the result
      
      if (
        resData === "Approved" ||
        (typeof resData === "string" && resData.startsWith("Requested permission"))
      ) {
        toast({
          title: "Request Submitted",
          description: "Your access request has been sent and is pending approval.",
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
          description: "Your request is under review.",
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
        description: error.response?.data || "Could not submit your NDA request.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
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
            // Form fields for IndividualNDA
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Enter your full name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  placeholder="Enter your state"
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  placeholder="Enter your city"
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  placeholder="Enter your country"
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Residential Address</FormLabel>
                <Input
                  placeholder="Enter your address"
                  onChange={(e) =>
                    handleInputChange("individual_address", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Legal Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your legal email"
                  onChange={(e) =>
                    handleInputChange("legal_email", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mobile Telephone</FormLabel>
                <Input
                  placeholder="Enter your mobile telephone"
                  onChange={(e) =>
                    handleInputChange("mobile_telephone", e.target.value)
                  }
                />
              </FormControl>
            </VStack>
          ) : (
            // Form fields for OrganisationNDA
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  placeholder="Enter company name"
                  onChange={(e) =>
                    handleInputChange("company_name", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>State of Incorporation</FormLabel>
                <Input
                  placeholder="Enter state of incorporation"
                  onChange={(e) =>
                    handleInputChange("state_of_incorporation", e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Company Address</FormLabel>
                <Input
                  placeholder="Enter company address"
                  onChange={(e) =>
                    handleInputChange("company_address", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Company Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter company email"
                  onChange={(e) =>
                    handleInputChange("company_email", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contact Person Name</FormLabel>
                <Input
                  placeholder="Enter contact person name"
                  onChange={(e) =>
                    handleInputChange("contact_person_name", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contact Person Title</FormLabel>
                <Input
                  placeholder="Enter contact person title"
                  onChange={(e) =>
                    handleInputChange("contact_person_title", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contact Person Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter contact person email"
                  onChange={(e) =>
                    handleInputChange("contact_person_email", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contact Person Telephone</FormLabel>
                <Input
                  placeholder="Enter contact person telephone"
                  onChange={(e) =>
                    handleInputChange("contact_person_telephone", e.target.value)
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

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
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Box,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface NDARequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any; // Contains the logged-in user's session (including access_token)
  onSubmit: (result: string) => void;
}

// Format a given phone number string into international format with a space between the country code and the rest.
// If the number does not start with a '+', one is added. Then, using libphonenumber-js, we format it.
const formatPhoneNumber = (phone: string): string => {
  // Ensure the number starts with a plus sign.
  if (!phone.startsWith("+")) {
    phone = `+${phone}`;
  }
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    // formatInternational() returns a string like "+91 9876543210"
    return phoneNumber.formatInternational();
  }
  return phone;
};

const NDARequestModal: React.FC<NDARequestModalProps> = ({
  isOpen,
  onClose,
  session,
  onSubmit,
}) => {
  const [investorType, setInvestorType] = useState("Individual");
  const [metadata, setMetadata] = useState<any>({});
  const toast = useToast();

  const handleInputChange = (field: string, value: string) => {
    setMetadata((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting NDA Request with metadata:", metadata);
    // Create a copy of metadata and update telephone fields with formatted numbers.
    const formattedMetadata = { ...metadata };
    if (formattedMetadata.mobile_telephone) {
      formattedMetadata.mobile_telephone = formatPhoneNumber(
        formattedMetadata.mobile_telephone
      );
    }
    if (formattedMetadata.contact_person_telephone) {
      formattedMetadata.contact_person_telephone = formatPhoneNumber(
        formattedMetadata.contact_person_telephone
      );
    }
    try {
      const response = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/request_file_access",
        {
          investor_type: investorType,
          metadata: JSON.stringify(formattedMetadata),
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
      onSubmit(resData);

      if (
        resData === "Approved" ||
        (typeof resData === "string" &&
          resData.startsWith("Requested permission")) ||
        resData === "Pending: Waiting for NDA Process"
      ) {
        toast({
          title: "Request Submitted",
          description:
            "Your access request has been sent and is pending approval.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
      } else if (resData === "Rejected") {
        toast({
          title: "Request Rejected",
          description:
            "Your request was rejected. Please re-apply after 2-3 days.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (resData === "Pending") {
        toast({
          title: "Request Pending",
          description: "Your request is still under review.",
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
      console.error("Error submitting request:", error);
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent maxW={{ md: "500px", base: "90%" }} borderRadius="md">
        <ModalHeader fontSize="lg" fontWeight="bold" textAlign="center">
          Submit NDA Request Access
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="60vh" px={4}>
          <FormControl mb={4}>
            <FormLabel fontSize="sm">Investor Type</FormLabel>
            <Select
              size="sm"
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
            >
              <option value="Individual">Individual</option>
              <option value="Organisation">Organisation</option>
            </Select>
          </FormControl>
          <Box>
            {investorType === "Individual" ? (
              <VStack spacing={3} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Full Name</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter your full name"
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">
                    State Registered for Taxation
                  </FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter your state for taxation"
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">
                    City Registered for Taxation
                  </FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter your city for taxation"
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">
                    Country Registered for Taxation
                  </FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter your country for taxation"
                    onChange={(e) => handleInputChange("country", e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Residential Address</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter your address"
                    onChange={(e) =>
                      handleInputChange("individual_address", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Legal Email</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    type="email"
                    placeholder="Enter your legal email"
                    onChange={(e) =>
                      handleInputChange("legal_email", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Mobile Telephone</FormLabel>
                  <PhoneInput
                    country={"in"}
                    value={metadata.mobile_telephone || ""}
                    onChange={(phone) =>
                      handleInputChange("mobile_telephone", phone)
                    }
                    inputStyle={{
                      width: "100%",
                      fontSize: "0.875rem",
                      height: "32px",
                    }}
                  />
                </FormControl>
              </VStack>
            ) : (
              <VStack spacing={3} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Company Name</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter company name"
                    onChange={(e) =>
                      handleInputChange("company_name", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">State of Incorporation</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter state of incorporation"
                    onChange={(e) =>
                      handleInputChange("state_of_incorporation", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Company Address</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter company address"
                    onChange={(e) =>
                      handleInputChange("company_address", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Company Email</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    type="email"
                    placeholder="Enter company email"
                    onChange={(e) =>
                      handleInputChange("company_email", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Contact Person Name</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter contact person name"
                    onChange={(e) =>
                      handleInputChange("contact_person_name", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Contact Person Title</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    placeholder="Enter contact person title"
                    onChange={(e) =>
                      handleInputChange("contact_person_title", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Contact Person Email</FormLabel>
                  <input
                    style={{
                      padding: "8px",
                      fontSize: "0.875rem",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    type="email"
                    placeholder="Enter contact person email"
                    onChange={(e) =>
                      handleInputChange("contact_person_email", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Contact Person Telephone</FormLabel>
                  <PhoneInput
                    country={"in"}
                    value={metadata.contact_person_telephone || ""}
                    onChange={(phone) =>
                      handleInputChange("contact_person_telephone", phone)
                    }
                    inputStyle={{
                      width: "100%",
                      fontSize: "0.875rem",
                      height: "32px",
  
                    }}
                  />
                </FormControl>
              </VStack>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue" width="full">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NDARequestModal;

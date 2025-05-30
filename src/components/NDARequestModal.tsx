'use client'

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  useToast,
  Radio,
  RadioGroup,
  Input,
  Flex,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface NDARequestModalProps {
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

// Basic email validation regex
const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const InvestorProfilePage: React.FC<NDARequestModalProps> = ({
  session,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [investorType, setInvestorType] = useState("Individual");
  const [metadata, setMetadata] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [ndaConfirmed, setNdaConfirmed] = useState(false);
  const [ndaTermsAccepted, setNdaTermsAccepted] = useState(false);
  const toast = useToast();

  const handleInputChange = (field: string, value: string) => {
    setMetadata((prev: any) => ({ ...prev, [field]: value }));
    // Clear error for the field being changed
    if (formErrors[field]) {
      setFormErrors((prevErrors: any) => ({ ...prevErrors, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const errors: any = {};
    if (investorType === "Individual") {
      if (!metadata.name?.trim()) errors.name = "Full Name is required.";
      if (!metadata.state?.trim()) errors.state = "State for taxation is required.";
      if (!metadata.city?.trim()) errors.city = "City for taxation is required.";
      if (!metadata.country?.trim()) errors.country = "Country for taxation is required.";
      if (!metadata.individual_address?.trim()) errors.individual_address = "Residential Address is required.";
      if (!metadata.legal_email?.trim()) {
        errors.legal_email = "Legal Email is required.";
      } else if (!validateEmail(metadata.legal_email)) {
        errors.legal_email = "Invalid email format.";
      }
      // For PhoneInput, check if the value (which includes country code) is more than just the country code or empty
      if (!metadata.mobile_telephone || metadata.mobile_telephone.length <= 3) { // Basic check, adjust length as needed for country codes
        errors.mobile_telephone = "Mobile Telephone is required.";
      }
    } else if (investorType === "Organisation") {
      if (!metadata.company_name?.trim()) errors.company_name = "Company Name is required.";
      if (!metadata.state_of_incorporation?.trim()) errors.state_of_incorporation = "State of Incorporation is required.";
      // company_address is optional
      if (!metadata.company_email?.trim()) {
        errors.company_email = "Company Email is required.";
      } else if (!validateEmail(metadata.company_email)) {
        errors.company_email = "Invalid company email format.";
      }
      if (!metadata.contact_person_name?.trim()) errors.contact_person_name = "Contact Person Name is required.";
      if (!metadata.contact_person_title?.trim()) errors.contact_person_title = "Contact Person Title is required.";
      if (!metadata.contact_person_email?.trim()) {
        errors.contact_person_email = "Contact Person Email is required.";
      } else if (!validateEmail(metadata.contact_person_email)) {
        errors.contact_person_email = "Invalid contact person email format.";
      }
      if (!metadata.contact_person_telephone || metadata.contact_person_telephone.length <= 3) {
        errors.contact_person_telephone = "Contact Person Telephone is required.";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step: number) => {
    if (step === 2) {
      if (!validateStep1()) {
        toast({
          title: "Validation Error",
          description: "Please correct the errors in the form before proceeding.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
    }
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    // Ensure Step 1 was valid (though goToStep should have caught this)
    if (!validateStep1() && currentStep === 1) { // Should not happen if goToStep(2) was used
        toast({ title: "Error", description: "Please complete investor profile first.", status: "error" });
        setCurrentStep(1); // Force back to step 1
        return;
    }
    if (!ndaConfirmed || !ndaTermsAccepted) {
        toast({ title: "NDA Acceptance Required", description: "Please confirm and accept NDA terms.", status: "warning" });
        return;
    }

    console.log("Submitting NDA Request with metadata:", metadata);
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

      // Toast messages based on response (existing logic)
      if (resData === "Approved" || (typeof resData === "string" && resData.startsWith("Requested permission")) || resData === "Pending: Waiting for NDA Process") {
        toast({ title: "Request Submitted", description: "Your access request has been sent and is pending approval.", status: "success", duration: 4000, isClosable: true });
      } else if (resData === "Rejected") {
        toast({ title: "Request Rejected", description: "Your request was rejected. Please re-apply after 2-3 days.", status: "error", duration: 4000, isClosable: true });
      } else if (resData === "Pending") {
        toast({ title: "Request Pending", description: "Your request is still under review.", status: "info", duration: 4000, isClosable: true });
      } else if (resData === "Pending: Waiting for NDA Process") {
        toast({ title: "NDA Process Required", description: "Please complete the NDA process to proceed.", status: "warning", duration: 4000, isClosable: true });
      } else {
        toast({ title: "Unexpected Response", description: `Received: ${resData}`, status: "error", duration: 4000, isClosable: true });
      }
      // Consider redirecting only on successful/meaningful states
      if (resData === "Approved" || (typeof resData === "string" && resData.startsWith("Requested permission"))) {
          window.location.href = "/"; // Or a more appropriate page
      }

    } catch (error: any) {
      console.error("Error submitting request:", error);
      const errorMessage = error.response?.data?.message || error.response?.data || "Could not submit your NDA request.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    // Removed the unconditional window.location.href = "/"; It should be conditional based on response.
  };

  const renderStepIndicator = () => {
    return (
      <Flex justify="center" align="center" my={8}>
        <Box 
          w="40px" 
          h="40px" 
          borderRadius="full" 
          background={currentStep >= 1 ? "linear-gradient(to right, #00A9E0, #6DD3EF)" : "gray.200"}
          color="white" 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          fontWeight="bold"
        >
          1
        </Box>
        <Box w="60px" h="1px" bg={currentStep >= 2 ? "#1CADBC" : "gray.200"} />
        <Box 
          w="40px" 
          h="40px" 
          borderRadius="full" 
          background={currentStep >= 2 ? "linear-gradient(to right, #00A9E0, #6DD3EF)" : "gray.200"} 
          color="white" 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          fontWeight="bold"
        >
          2
        </Box>
      </Flex>
    );
  };

  const renderFormStep1 = () => {
    return (
      <VStack spacing={6} align="stretch" w="100%" maxW="600px" mx="auto">
        <FormControl isRequired>
          <FormLabel fontWeight="medium" fontSize={'xl'} color="gray.700">Investor Type</FormLabel>
          <RadioGroup onChange={(value) => { setInvestorType(value); setMetadata({}); setFormErrors({}); }} value={investorType} mt={2}>
            <HStack spacing={6}>
              <Radio value="Individual" colorScheme="cyan" size="md"><Text ml={1}>Individual</Text></Radio>
              <Radio value="Organisation" colorScheme="cyan" size="md"><Text ml={1}>Organisation</Text></Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        {investorType === "Individual" ? (
          <Box>
            <Heading as="h3" size="md" fontWeight="medium" color="gray.800" mt={6} mb={4}>Individual Information</Heading>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.name}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Full Name</FormLabel>
                  <Input size="md" placeholder="Enter your full name" value={metadata.name || ''} onChange={(e) => handleInputChange("name", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.state}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">State Registered for Taxation</FormLabel>
                  <Input size="md" placeholder="Enter your state for taxation" value={metadata.state || ''} onChange={(e) => handleInputChange("state", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.state}</FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.city}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">City Registered for Taxation</FormLabel>
                  <Input size="md" placeholder="Enter your city for taxation" value={metadata.city || ''} onChange={(e) => handleInputChange("city", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.city}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.country}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Country Registered for Taxation</FormLabel>
                  <Input size="md" placeholder="Enter your country for taxation" value={metadata.country || ''} onChange={(e) => handleInputChange("country", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.country}</FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl isRequired isInvalid={!!formErrors.individual_address}>
                <FormLabel className="text-lg font-medium text-[#1D1D1F]">Residential Address</FormLabel>
                <Input size="md" placeholder="Enter your address" value={metadata.individual_address || ''} onChange={(e) => handleInputChange("individual_address", e.target.value)} borderColor="gray.300" bg="white" />
                <FormErrorMessage>{formErrors.individual_address}</FormErrorMessage>
              </FormControl>
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.legal_email}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Legal Email</FormLabel>
                  <Input size="md" type="email" placeholder="Enter your legal email" value={metadata.legal_email || ''} onChange={(e) => handleInputChange("legal_email", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.legal_email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.mobile_telephone}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Mobile Telephone</FormLabel>
                  <PhoneInput country={"in"} value={metadata.mobile_telephone || ""} onChange={(phone) => handleInputChange("mobile_telephone", phone)} inputStyle={{ width: "100%", height: "40px", fontSize: "1rem", borderColor: "#E2E8F0", backgroundColor: "white" }} containerStyle={{ width: "100%" }} />
                  <FormErrorMessage>{formErrors.mobile_telephone}</FormErrorMessage>
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        ) : (
          <Box>
            <Heading as="h3" size="md" fontWeight="medium" color="gray.800" mt={6} mb={4}>Organisation Information</Heading>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.company_name}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Company Name</FormLabel>
                  <Input size="md" placeholder="Enter company name" value={metadata.company_name || ''} onChange={(e) => handleInputChange("company_name", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.company_name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.state_of_incorporation}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">State of Incorporation</FormLabel>
                  <Input size="md" placeholder="Enter state of incorporation" value={metadata.state_of_incorporation || ''} onChange={(e) => handleInputChange("state_of_incorporation", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.state_of_incorporation}</FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl isInvalid={!!formErrors.company_address}> {/* Not required, but can still have other validation if needed */}
                <FormLabel className="text-lg font-medium text-[#1D1D1F]">Company Address</FormLabel>
                <Input size="md" placeholder="Enter company address" value={metadata.company_address || ''} onChange={(e) => handleInputChange("company_address", e.target.value)} borderColor="gray.300" bg="white" />
                <FormErrorMessage>{formErrors.company_address}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!formErrors.company_email}>
                <FormLabel className="text-lg font-medium text-[#1D1D1F]">Company Email</FormLabel>
                <Input size="md" type="email" placeholder="Enter company email" value={metadata.company_email || ''} onChange={(e) => handleInputChange("company_email", e.target.value)} borderColor="gray.300" bg="white" />
                <FormErrorMessage>{formErrors.company_email}</FormErrorMessage>
              </FormControl>

              <Heading as="h3" size="md" fontWeight="medium" color="gray.800" mt={4} mb={2}>Contact Person Information</Heading>
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.contact_person_name}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Contact Person Name</FormLabel>
                  <Input size="md" placeholder="Enter contact person name" value={metadata.contact_person_name || ''} onChange={(e) => handleInputChange("contact_person_name", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.contact_person_name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.contact_person_title}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Contact Person Title</FormLabel>
                  <Input size="md" placeholder="Enter contact person title" value={metadata.contact_person_title || ''} onChange={(e) => handleInputChange("contact_person_title", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.contact_person_title}</FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!formErrors.contact_person_email}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Contact Person Email</FormLabel>
                  <Input size="md" type="email" placeholder="Enter contact person email" value={metadata.contact_person_email || ''} onChange={(e) => handleInputChange("contact_person_email", e.target.value)} borderColor="gray.300" bg="white" />
                  <FormErrorMessage>{formErrors.contact_person_email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!formErrors.contact_person_telephone}>
                  <FormLabel className="text-lg font-medium text-[#1D1D1F]">Contact Person Telephone</FormLabel>
                  <PhoneInput country={"in"} value={metadata.contact_person_telephone || ""} onChange={(phone) => handleInputChange("contact_person_telephone", phone)} inputStyle={{ width: "100%", height: "40px", fontSize: "1rem", borderColor: "#E2E8F0", backgroundColor: "white" }} containerStyle={{ width: "100%" }} />
                  <FormErrorMessage>{formErrors.contact_person_telephone}</FormErrorMessage>
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        )}

        <Button onClick={() => goToStep(2)} background="linear-gradient(to right, #00A9E0, #6DD3EF)" size="md" width="full" _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }} mt={6} py={6} color="white" borderRadius="md">
          Continue to NDA Review
        </Button>
      </VStack>
    );
  };

  const renderFormStep2 = () => {
    return (
      <VStack spacing={6} align="stretch" w="100%" maxW="600px" mx="auto">
        <Heading as="h3" fontSize={'2xl'} className="font-medium text-[#1D1D1F] mb-12 text-center" mb={2}>
          Review and Sign Non-Disclosure Agreement
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Please review the Non-Disclosure Agreement below:
        </Text>
        
        <Box 
          border="1px solid" 
          borderColor="gray.300"
          borderRadius="md"
          p={4}
          height="300px"
          overflowY="scroll"
          bg="white"
          className="whitespace-pre-wrap text-sm text-[#1D1D1F] font-mono leading-relaxed"
        >
          <Text fontWeight="bold" mb={2}>NON-DISCLOSURE AGREEMENT</Text>
          <Text fontSize="sm">
            This Non-Disclosure Agreement ("Agreement") is entered into by and between Hushh Technology LLC ("Company") and the undersigned ("Recipient").
          </Text>
          <Text fontSize="sm" fontWeight="bold" mt={4}>1. CONFIDENTIAL INFORMATION</Text>
          <Text fontSize="sm" mt={2}>
            For purposes of this Agreement, "Confidential Information" includes all proprietary and confidential information, including but not limited to:
          </Text>
          <VStack align="start" spacing={1} pl={4} mt={2}>
            <Text fontSize="sm">- Investment strategies, algorithms, and methodologies</Text>
            <Text fontSize="sm">- Financial data, performance metrics, and projections</Text>
            <Text fontSize="sm">- Client information and investment allocations</Text>
            <Text fontSize="sm">- Technology platforms and software systems</Text>
            <Text fontSize="sm">- Business plans and strategic information</Text>
          </VStack>
          
          <Text fontSize="sm" fontWeight="bold" mt={4}>2. OBLIGATIONS OF RECIPIENT</Text>
          <Text fontSize="sm" mt={2}>
            Recipient agrees to maintain all Confidential Information in strict confidence and not to disclose such information to any third party without prior written consent from Company. Recipient shall use Confidential Information solely for the purpose of evaluating potential investment opportunities with Company.
          </Text>

          <Text fontSize="sm" fontWeight="bold" mt={4}>3. TERM AND TERMINATION</Text>
          <Text fontSize="sm" mt={2}>
            This Agreement shall remain in effect for a period of five (5) years from the date of execution. The obligations of confidentiality shall survive termination of this Agreement.
          </Text>

          <Text fontSize="sm" fontWeight="bold" mt={4}>4. GOVERNING LAW</Text>
          <Text fontSize="sm" mt={2}>
            This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any choice of law or conflict of law provisions.
          </Text>
          <Text fontSize="sm" fontWeight="bold" mt={4}>By signing below, Recipient acknowledges having read, understood, and agreed to be bound by the terms of this Agreement.</Text>
          
         
        </Box>
 {/* Digital Signature Section */}
 <Box mt={6} pt={4} borderTop="1px solid" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="bold" mb={4}>Digital Signature</Text>
            
            <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mb={4}>
              <Box width={{ base: '100%', md: '48%' }} mb={{ base: 4, md: 0 }}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                  Full Legal Name
                </Text>
                <Box 
                  p={2} 
                  bg="gray.50" 
                  borderRadius="md" 
                  border="1px solid" 
                  borderColor="gray.200"
                >
                  <Text fontSize="sm">
                    {investorType === "Individual" 
                      ? metadata.name || "Not provided" 
                      : metadata.contact_person_name || "Not provided"}
                  </Text>
                </Box>
              </Box>
              
              <Box width={{ base: '100%', md: '48%' }}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                  Date
                </Text>
                <Box 
                  p={2} 
                  bg="gray.50" 
                  borderRadius="md" 
                  border="1px solid" 
                  borderColor="gray.200"
                >
                  <Text fontSize="sm">
                    {new Date().toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
          
        <FormControl mt={4} isInvalid={!!formErrors.ndaConfirmed}>
          <HStack spacing={2} align="flex-start">
            <Checkbox 
              colorScheme="cyan"
              size="md"
              isChecked={ndaConfirmed}
              onChange={(e) => {
                setNdaConfirmed(e.target.checked);
                if (formErrors.ndaConfirmed) setFormErrors((prev: any) => ({...prev, ndaConfirmed: null}));
              }}
              mt={1}
            />
            <Text fontSize="sm" className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg text-[#1D1D1F] leading-relaxed">
              I confirm that I have read and reviewed the entire Non-Disclosure Agreement above.
            </Text>
          </HStack>
          <FormErrorMessage>{formErrors.ndaConfirmed}</FormErrorMessage>
        </FormControl>

        <FormControl mt={2} isInvalid={!!formErrors.ndaTermsAccepted}>
          <HStack spacing={2} align="flex-start">
            <Checkbox 
              colorScheme="cyan"
              size="md"
              isChecked={ndaTermsAccepted}
              onChange={(e) => {
                setNdaTermsAccepted(e.target.checked);
                if (formErrors.ndaTermsAccepted) setFormErrors((prev: any) => ({...prev, ndaTermsAccepted: null}));
              }}
              mt={1}
            />
            <Text fontSize="sm" className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg text-[#1D1D1F] leading-relaxed">
              By checking this box and clicking "Submit NDA & Investor Profile", I acknowledge that 
              I have read, understood, and agree to be bound by the terms and conditions of the 
              Non-Disclosure Agreement presented above. I confirm that the investor profile 
              information provided is true and accurate.
            </Text>
          </HStack>
          <FormErrorMessage>{formErrors.ndaTermsAccepted}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} mt={6}>
          <Button onClick={() => goToStep(1)} size="md" width="40%" py={6} borderRadius="md" bg="transparent" color="black" border="1px solid">
            Back to Profile
          </Button>
          <Button onClick={handleSubmit} background="linear-gradient(to right, #00A9E0, #6DD3EF)" _hover={{ background: "linear-gradient(to right, #0AADBC, #1CADBC)" }} color={'white'} size="md" width="60%" py={6} borderRadius="md" isDisabled={!ndaConfirmed || !ndaTermsAccepted}>
            Submit NDA & Investor Profile
          </Button>
        </HStack>
      </VStack>
    );
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center" mb={4} minH="60vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading as="h1" size="lg" fontWeight="bold">
          <Text as="span" fontSize={{md:'6xl', base:'2xl'}} className="font-light text-[#1D1D1F] mb-8 leading-tight tracking-tight">Confidentiality Agreement & </Text> <br/>
          <Text as="span" fontSize={{md:'6xl', base:'2xl'}} className="font-medium text-[#1D1D1F] mb-8 leading-tight tracking-tight blue-gradient-text">Investor Profile</Text>
        </Heading>
        <Text mt={1} className="text-xl md:text-2xl text-[#6E6E73] max-w-3xl mx-auto font-light leading-relaxed">
          Complete this form to access our investment documents and detailed information.
        </Text>
      </Box>

      {renderStepIndicator()}

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor="gray.200" p={6} bg="white">
        {currentStep === 1 && renderFormStep1()}
        {currentStep === 2 && renderFormStep2()}
      </Box>
    </Container>
  );
};

export default InvestorProfilePage;

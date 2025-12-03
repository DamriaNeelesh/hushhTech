import { useState } from "react";
import { InvestorProfileInput } from "../../types/investorProfile";
import { Box, FormControl, FormLabel, Input, VStack, Heading, Text, useToast, Spinner, Divider } from "@chakra-ui/react";
import { PrimaryCtaButton } from "../PrimaryCtaButton";

interface InvestorProfileFormProps {
  onSubmit: (data: InvestorProfileInput) => Promise<void>;
  isLoading?: boolean;
  initialData?: { name: string; email: string } | null;
}

export function InvestorProfileForm({ onSubmit, isLoading = false, initialData }: InvestorProfileFormProps) {
  const [formData, setFormData] = useState<InvestorProfileInput>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    age: 25,
    phone_country_code: "+1",
    phone_number: "",
    organisation: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof InvestorProfileInput, string>>>({});
  const toast = useToast();
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InvestorProfileInput, string>> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    // Age validation
    if (formData.age < 18) {
      newErrors.age = "Must be 18 or older";
    } else if (formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }
    
    // Phone country code validation
    if (!formData.phone_country_code.trim()) {
      newErrors.phone_country_code = "Country code is required";
    } else if (!formData.phone_country_code.startsWith("+")) {
      newErrors.phone_country_code = "Country code must start with +";
    }
    
    // Phone number validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (formData.phone_number.trim().length < 6) {
      newErrors.phone_number = "Phone number must be at least 6 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  const handleChange = (field: keyof InvestorProfileInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  return (
    <Box bg="white" minH="100vh" px={{ base: 4, md: 6 }} py={{ base: 10, md: 12 }}>
      <VStack spacing={6} align="stretch" maxW="720px" mx="auto">
        <Box textAlign="left">
          <Heading 
            fontSize={{ base: "30px", md: "32px" }}
            fontWeight="700"
            mb={2}
            color="#1D1D1F"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
          >
            Create Your Investor Hushh ID
          </Heading>
          <Text 
            color="#6E6E73"
            fontSize="17px"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
            lineHeight="1.4"
            maxW="640px"
            mt={1}
          >
            Just 5 simple inputs, and we'll create your personalized investor profile using AI.
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {/* Name */}
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel 
                fontSize="15px" 
                fontWeight="600" 
                color="#1D1D1F"
                mb="6px"
              >
                Full Name
              </FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                disabled={isLoading}
                height="52px"
                fontSize="17px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor={errors.name ? "#FF3B30" : "#D1D1D6"}
                bg="white"
                color="#1D1D1F"
                px="16px"
                py="14px"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                transition="border-color 0.2s ease"
                _hover={{ borderColor: errors.name ? "#FF3B30" : "#B0B0B5" }}
                _focus={{ 
                  borderColor: errors.name ? "#FF3B30" : "#007AFF",
                  boxShadow: "none"
                }}
                _placeholder={{ color: "#86868B" }}
                _disabled={{
                  borderColor: "#E5E5EA",
                  bg: "#F5F5F7",
                  color: "#86868B",
                  cursor: "not-allowed",
                  opacity: 0.6
                }}
              />
              {errors.name && (
                <Text color="#FF3B30" fontSize="13px" mt="6px">
                  {errors.name}
                </Text>
              )}
            </FormControl>
            <Divider borderColor="#E5E5EA" />
            
            {/* Email */}
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel 
                fontSize="15px" 
                fontWeight="600" 
                color="#1D1D1F"
                mb="6px"
              >
                Email Address
              </FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                disabled={isLoading}
                height="52px"
                fontSize="17px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor={errors.email ? "#FF3B30" : "#D1D1D6"}
                bg="white"
                color="#1D1D1F"
                px="16px"
                py="14px"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                transition="border-color 0.2s ease"
                _hover={{ borderColor: errors.email ? "#FF3B30" : "#B0B0B5" }}
                _focus={{ 
                  borderColor: errors.email ? "#FF3B30" : "#007AFF",
                  boxShadow: "none"
                }}
                _placeholder={{ color: "#86868B" }}
                _disabled={{
                  borderColor: "#E5E5EA",
                  bg: "#F5F5F7",
                  color: "#86868B",
                  cursor: "not-allowed",
                  opacity: 0.6
                }}
              />
              {errors.email && (
                <Text color="#FF3B30" fontSize="13px" mt="6px">
                  {errors.email}
                </Text>
              )}
            </FormControl>
            <Divider borderColor="#E5E5EA" />
            
            {/* Age */}
            <FormControl isRequired isInvalid={!!errors.age}>
              <FormLabel 
                fontSize="15px" 
                fontWeight="600" 
                color="#1D1D1F"
                mb="6px"
              >
                Age
              </FormLabel>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                placeholder="25"
                min={18}
                max={120}
                disabled={isLoading}
                height="52px"
                fontSize="17px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor={errors.age ? "#FF3B30" : "#D1D1D6"}
                bg="white"
                color="#1D1D1F"
                px="16px"
                py="14px"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                transition="border-color 0.2s ease"
                _hover={{ borderColor: errors.age ? "#FF3B30" : "#B0B0B5" }}
                _focus={{ 
                  borderColor: errors.age ? "#FF3B30" : "#007AFF",
                  boxShadow: "none"
                }}
                _placeholder={{ color: "#86868B" }}
                _disabled={{
                  borderColor: "#E5E5EA",
                  bg: "#F5F5F7",
                  color: "#86868B",
                  cursor: "not-allowed",
                  opacity: 0.6
                }}
                sx={{
                  // Remove number input spinners
                  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                    display: 'none',
                  },
                  MozAppearance: 'textfield',
                }}
              />
              {errors.age && (
                <Text color="#FF3B30" fontSize="13px" mt="6px">
                  {errors.age}
                </Text>
              )}
            </FormControl>
            <Divider borderColor="#E5E5EA" />
            
            {/* Phone */}
            <Box>
              <FormLabel 
                fontSize="15px" 
                fontWeight="600" 
                color="#1D1D1F"
                mb="6px"
              >
                Phone Number
              </FormLabel>
              <Box display="flex" gap={2}>
                <FormControl isRequired isInvalid={!!errors.phone_country_code} flex="0 0 120px">
                  <Input
                    type="text"
                    value={formData.phone_country_code}
                    onChange={(e) => handleChange("phone_country_code", e.target.value)}
                    placeholder="+1"
                    disabled={isLoading}
                    height="52px"
                    fontSize="17px"
                    borderWidth="1px"
                    borderRadius="12px"
                    borderColor={errors.phone_country_code ? "#FF3B30" : "#D1D1D6"}
                    bg="white"
                    color="#1D1D1F"
                    px="12px"
                    py="14px"
                    textAlign="center"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                    transition="border-color 0.2s ease"
                    _hover={{ borderColor: errors.phone_country_code ? "#FF3B30" : "#B0B0B5" }}
                    _focus={{ 
                      borderColor: errors.phone_country_code ? "#FF3B30" : "#007AFF",
                      boxShadow: "none"
                    }}
                    _placeholder={{ color: "#86868B" }}
                    _disabled={{
                      borderColor: "#E5E5EA",
                      bg: "#F5F5F7",
                      color: "#86868B",
                      cursor: "not-allowed",
                      opacity: 0.6
                    }}
                  />
                  {errors.phone_country_code && (
                    <Text color="#FF3B30" fontSize="13px" mt="6px">
                      {errors.phone_country_code}
                    </Text>
                  )}
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.phone_number} flex="1">
                  <Input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleChange("phone_number", e.target.value)}
                    placeholder="1234567890"
                    disabled={isLoading}
                    height="52px"
                    fontSize="17px"
                    borderWidth="1px"
                    borderRadius="12px"
                    borderColor={errors.phone_number ? "#FF3B30" : "#D1D1D6"}
                    bg="white"
                    color="#1D1D1F"
                    px="16px"
                    py="14px"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                    transition="border-color 0.2s ease"
                    _hover={{ borderColor: errors.phone_number ? "#FF3B30" : "#B0B0B5" }}
                    _focus={{ 
                      borderColor: errors.phone_number ? "#FF3B30" : "#007AFF",
                      boxShadow: "none"
                    }}
                    _placeholder={{ color: "#86868B" }}
                    _disabled={{
                      borderColor: "#E5E5EA",
                      bg: "#F5F5F7",
                      color: "#86868B",
                      cursor: "not-allowed",
                      opacity: 0.6
                    }}
                  />
                  {errors.phone_number && (
                    <Text color="#FF3B30" fontSize="13px" mt="6px">
                      {errors.phone_number}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </Box>
            <Divider borderColor="#E5E5EA" />
            
            {/* Organisation (Optional) */}
            <FormControl>
              <FormLabel 
                fontSize="15px" 
                fontWeight="600" 
                color="#1D1D1F"
                mb="6px"
              >
                Organisation <Text as="span" color="#86868B" fontSize="13px" fontWeight="400">(Optional)</Text>
              </FormLabel>
              <Input
                type="text"
                value={formData.organisation}
                onChange={(e) => handleChange("organisation", e.target.value)}
                placeholder="Company or University"
                disabled={isLoading}
                height="52px"
                fontSize="17px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor="#D1D1D6"
                bg="white"
                color="#1D1D1F"
                px="16px"
                py="14px"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                transition="border-color 0.2s ease"
                _hover={{ borderColor: "#B0B0B5" }}
                _focus={{ 
                  borderColor: "#007AFF",
                  boxShadow: "none"
                }}
                _placeholder={{ color: "#86868B" }}
                _disabled={{
                  borderColor: "#E5E5EA",
                  bg: "#F5F5F7",
                  color: "#86868B",
                  cursor: "not-allowed",
                  opacity: 0.6
                }}
              />
            </FormControl>
            <Divider borderColor="#E5E5EA" />
            
            {/* Submit Button - uses shared PrimaryCtaButton for consistent CTA styling */}
            <PrimaryCtaButton
              type="submit"
              width="100%"
              mt={2}
              isLoading={isLoading}
              loadingText="Creating your profile..."
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" mr={2} />
                  Generating AI Profile...
                </>
              ) : (
                "Create Your Hushh ID →"
              )}
            </PrimaryCtaButton>
            
            <Text 
              fontSize="13px" 
              color="#6E6E73" 
              textAlign="center"
              mt={2}
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
            >
              We'll use AI to intelligently prefill your investor profile based on your information
            </Text>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

import { useState } from "react";
import { InvestorProfileInput } from "../../types/investorProfile";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Spinner,
  Button,
} from "@chakra-ui/react";

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
    <Box
      bg="white"
      minH="100vh"
      px={{ base: 6, md: 6 }}
      py={{ base: 12, md: 12 }}
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <VStack spacing={8} align="stretch" maxW="640px" mx="auto">
        <Box textAlign="left">
          <Heading
            fontSize={{ base: "36px", md: "38px" }}
            fontWeight="500"
            lineHeight="1.1"
            color="#0B1120"
            mb={3}
          >
            Create Your Investor Hushh ID
          </Heading>
          <Text
            color="#475569"
            fontSize="18px"
            lineHeight="1.65"
            maxW="90%"
            mb={6}
          >
            Just 5 simple inputs, and we'll create your personalized investor profile using AI.
          </Text>
          <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mb={6}>
            <Box
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              w="16px"
              h="2px"
              bg="#00A9E0"
            />
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5} align="stretch">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel fontSize="14px" fontWeight="500" color="#111827" mb="8px">
                Full Name <Text as="span" color="#EF4444">*</Text>
              </FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                disabled={isLoading}
                height="52px"
                fontSize="16px"
                borderRadius="14px"
                borderColor={errors.name ? "#EF4444" : "#D1D5DB"}
                bg="white"
                color="#0B1120"
                px="16px"
                _focus={{
                  borderColor: errors.name ? "#EF4444" : "#00A9E0",
                  boxShadow: errors.name ? "none" : "0 0 0 2px rgba(0,169,224,0.18)",
                }}
                _placeholder={{ color: "#9CA3AF" }}
              />
              {errors.name && (
                <Text color="#B91C1C" fontSize="13px" mt="6px">
                  {errors.name}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel fontSize="14px" fontWeight="500" color="#111827" mb="8px">
                Email Address <Text as="span" color="#EF4444">*</Text>
              </FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                disabled={isLoading}
                height="52px"
                fontSize="16px"
                borderRadius="14px"
                borderColor={errors.email ? "#EF4444" : "#D1D5DB"}
                bg="white"
                color="#0B1120"
                px="16px"
                _focus={{
                  borderColor: errors.email ? "#EF4444" : "#00A9E0",
                  boxShadow: errors.email ? "none" : "0 0 0 2px rgba(0,169,224,0.18)",
                }}
                _placeholder={{ color: "#9CA3AF" }}
              />
              {errors.email && (
                <Text color="#B91C1C" fontSize="13px" mt="6px">
                  {errors.email}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.age}>
              <FormLabel fontSize="14px" fontWeight="500" color="#111827" mb="8px">
                Age <Text as="span" color="#EF4444">*</Text>
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
                fontSize="16px"
                borderRadius="14px"
                borderColor={errors.age ? "#EF4444" : "#D1D5DB"}
                bg="white"
                color="#0B1120"
                px="16px"
                _focus={{
                  borderColor: errors.age ? "#EF4444" : "#00A9E0",
                  boxShadow: errors.age ? "none" : "0 0 0 2px rgba(0,169,224,0.18)",
                }}
                _placeholder={{ color: "#9CA3AF" }}
                sx={{
                  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                    display: 'none',
                  },
                  MozAppearance: 'textfield',
                }}
              />
              {errors.age && (
                <Text color="#B91C1C" fontSize="13px" mt="6px">
                  {errors.age}
                </Text>
              )}
            </FormControl>

            <Box>
              <FormLabel fontSize="14px" fontWeight="500" color="#111827" mb="8px">
                Phone Number <Text as="span" color="#EF4444">*</Text>
              </FormLabel>
              <Box display="flex" gap={3}>
                <FormControl isRequired isInvalid={!!errors.phone_country_code} flex="0 0 96px">
                  <Input
                    type="text"
                    value={formData.phone_country_code}
                    onChange={(e) => handleChange("phone_country_code", e.target.value)}
                    placeholder="+1"
                    disabled={isLoading}
                    height="52px"
                    fontSize="16px"
                    borderRadius="14px"
                    borderColor={errors.phone_country_code ? "#EF4444" : "#D1D5DB"}
                    bg="white"
                    color="#0B1120"
                    px="12px"
                    textAlign="center"
                    _focus={{
                      borderColor: errors.phone_country_code ? "#EF4444" : "#00A9E0",
                      boxShadow: errors.phone_country_code ? "none" : "0 0 0 2px rgba(0,169,224,0.18)",
                    }}
                    _placeholder={{ color: "#9CA3AF" }}
                  />
                  {errors.phone_country_code && (
                    <Text color="#B91C1C" fontSize="13px" mt="6px">
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
                    fontSize="16px"
                    borderRadius="14px"
                    borderColor={errors.phone_number ? "#EF4444" : "#D1D5DB"}
                    bg="white"
                    color="#0B1120"
                    px="16px"
                    _focus={{
                      borderColor: errors.phone_number ? "#EF4444" : "#00A9E0",
                      boxShadow: errors.phone_number ? "none" : "0 0 0 2px rgba(0,169,224,0.18)",
                    }}
                    _placeholder={{ color: "#9CA3AF" }}
                  />
                  {errors.phone_number && (
                    <Text color="#B91C1C" fontSize="13px" mt="6px">
                      {errors.phone_number}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </Box>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="500" color="#111827" mb="8px">
                Organisation <Text as="span" color="#6B7280" fontSize="13px" fontWeight="500">(Optional)</Text>
              </FormLabel>
              <Input
                type="text"
                value={formData.organisation}
                onChange={(e) => handleChange("organisation", e.target.value)}
                placeholder="Company or University"
                disabled={isLoading}
                height="52px"
                fontSize="16px"
                borderRadius="14px"
                borderColor="#D1D5DB"
                bg="white"
                color="#0B1120"
                px="16px"
                _focus={{
                  borderColor: "#00A9E0",
                  boxShadow: "0 0 0 2px rgba(0,169,224,0.18)",
                }}
                _placeholder={{ color: "#9CA3AF" }}
              />
            </FormControl>

            <Box pt={2}>
              <Button
                type="submit"
                w="100%"
                h="54px"
                borderRadius="16px"
                fontSize="17px"
                fontWeight="500"
                color="#0B1120"
                bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
                transition="transform 120ms ease-out, filter 120ms ease-out"
                _active={{ transform: "scale(0.985)", filter: "brightness(0.94)" }}
                _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
                isDisabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" mr={2} />
                    Generating AI Profile...
                  </>
                ) : (
                  "Create Your Hushh ID →"
                )}
              </Button>
              <Text fontSize="14px" color="#6B7280" textAlign="left" mt={3} lineHeight="1.45">
                We'll use AI to intelligently prefill your investor profile based on your information
              </Text>
            </Box>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

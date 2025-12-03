import { useState } from "react";
import { InvestorProfileInput } from "../../types/investorProfile";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast, Spinner } from "@chakra-ui/react";

interface InvestorProfileFormProps {
  onSubmit: (data: InvestorProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function InvestorProfileForm({ onSubmit, isLoading = false }: InvestorProfileFormProps) {
  const [formData, setFormData] = useState<InvestorProfileInput>({
    name: "",
    email: "",
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
    <Box maxW="600px" mx="auto" p={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            Create Your Investor Hushh ID
          </Heading>
          <Text color="gray.600">
            Just 5 simple inputs, and we'll create your personalized investor profile using AI
          </Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* Name */}
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                disabled={isLoading}
              />
              {errors.name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.name}
                </Text>
              )}
            </FormControl>
            
            {/* Email */}
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.email}
                </Text>
              )}
            </FormControl>
            
            {/* Age */}
            <FormControl isRequired isInvalid={!!errors.age}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                placeholder="25"
                min={18}
                max={120}
                disabled={isLoading}
              />
              {errors.age && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.age}
                </Text>
              )}
            </FormControl>
            
            {/* Phone */}
            <Box>
              <FormLabel>Phone Number</FormLabel>
              <Box display="flex" gap={2}>
                <FormControl isRequired isInvalid={!!errors.phone_country_code} flex="0 0 120px">
                  <Input
                    type="text"
                    value={formData.phone_country_code}
                    onChange={(e) => handleChange("phone_country_code", e.target.value)}
                    placeholder="+1"
                    disabled={isLoading}
                  />
                  {errors.phone_country_code && (
                    <Text color="red.500" fontSize="sm" mt={1}>
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
                  />
                  {errors.phone_number && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.phone_number}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </Box>
            
            {/* Organisation (Optional) */}
            <FormControl>
              <FormLabel>
                Organisation <Text as="span" color="gray.500" fontSize="sm">(Optional)</Text>
              </FormLabel>
              <Input
                type="text"
                value={formData.organisation}
                onChange={(e) => handleChange("organisation", e.target.value)}
                placeholder="Company or University"
                disabled={isLoading}
              />
            </FormControl>
            
            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
              mt={4}
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
                "Create My Investor Hushh ID"
              )}
            </Button>
            
            <Text fontSize="sm" color="gray.500" textAlign="center">
              We'll use AI to intelligently prefill your investor profile based on your information
            </Text>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

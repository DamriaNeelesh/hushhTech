import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import resources from "../../resources/resources";
import { generateInvestorProfile } from "../../services/investorProfile/apiClient";
import { InvestorProfile, FIELD_LABELS, VALUE_LABELS } from "../../types/investorProfile";

interface FormState {
  name: string;
  email: string;
  age: number | "";
  phoneCountryCode: string;
  phoneNumber: string;
  organisation: string;
}

const defaultFormState: FormState = {
  name: "",
  email: "",
  age: "",
  phoneCountryCode: "+1",
  phoneNumber: "",
  organisation: "",
};

const HushhUserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [userId, setUserId] = useState<string | null>(null);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = resources.config.supabaseClient;
        if (!supabase) {
          toast({
            title: "Error",
            description: "Supabase client not available",
            status: "error",
            duration: 5000,
          });
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }

        setUserId(user.id);

        // Prefill form with user metadata
        const fullName =
          (user.user_metadata?.full_name as string) ||
          [user.user_metadata?.first_name, user.user_metadata?.last_name]
            .filter(Boolean)
            .join(" ") ||
          "";

        setForm((prev) => ({
          ...prev,
          name: fullName || prev.name,
          email: user.email || prev.email,
          organisation: (user.user_metadata?.company as string) || prev.organisation,
        }));

        // Check if investor profile already exists
        const { data: existingProfile } = await supabase
          .from("investor_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (existingProfile && existingProfile.investor_profile) {
          setInvestorProfile(existingProfile.investor_profile);
          setForm({
            name: existingProfile.name || fullName,
            email: existingProfile.email || user.email || "",
            age: existingProfile.age || "",
            phoneCountryCode: existingProfile.phone_country_code || "+1",
            phoneNumber: existingProfile.phone_number || "",
            organisation: existingProfile.organisation || "",
          });
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        toast({
          title: "Error",
          description: "Could not verify authentication",
          status: "error",
          duration: 5000,
        });
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: key === "age" ? Number(value) || "" : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phoneCountryCode || !form.phoneNumber || form.age === "") {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        status: "warning",
        duration: 4000,
      });
      return;
    }

    setLoading(true);

    try {
      // Generate investor profile using AI
      const result = await generateInvestorProfile({
        name: form.name,
        email: form.email,
        age: typeof form.age === "number" ? form.age : Number(form.age),
        phone_country_code: form.phoneCountryCode,
        phone_number: form.phoneNumber,
        organisation: form.organisation || undefined,
      });

      if (!result.success || !result.profile) {
        throw new Error(result.error || "Failed to generate investor profile");
      }

      setInvestorProfile(result.profile);

      // Save to Supabase
      if (userId) {
        const supabase = resources.config.supabaseClient;
        if (supabase) {
          const { error: saveError } = await supabase
            .from("investor_profiles")
            .upsert({
              user_id: userId,
              name: form.name,
              email: form.email,
              age: typeof form.age === "number" ? form.age : Number(form.age),
              phone_country_code: form.phoneCountryCode,
              phone_number: form.phoneNumber,
              organisation: form.organisation || null,
              investor_profile: result.profile,
              confirmed_at: new Date().toISOString(),
            });

          if (saveError) {
            console.error("Error saving to Supabase:", saveError);
          }
        }
      }

      toast({
        title: "Success",
        description: "Investor profile generated successfully",
        status: "success",
        duration: 4000,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate profile",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldUpdate = async (fieldName: string, newValue: any) => {
    if (!investorProfile || !userId) return;

    const updatedProfile = {
      ...investorProfile,
      [fieldName]: {
        ...investorProfile[fieldName as keyof InvestorProfile],
        value: newValue,
      },
    };

    setInvestorProfile(updatedProfile);
    setEditingField(null);

    // Save to Supabase
    const supabase = resources.config.supabaseClient;
    if (supabase) {
      await supabase
        .from("investor_profiles")
        .update({ investor_profile: updatedProfile })
        .eq("user_id", userId);
    }

    toast({
      title: "Updated",
      description: "Field updated successfully",
      status: "success",
      duration: 2000,
    });
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.7) return <Badge colorScheme="green">High</Badge>;
    if (confidence >= 0.4) return <Badge colorScheme="yellow">Medium</Badge>;
    return <Badge colorScheme="red">Low</Badge>;
  };

  const renderFieldEditor = (fieldName: string, field: any) => {
    const schema = {
      primary_goal: ["capital_preservation", "steady_income", "long_term_growth", "aggressive_growth", "speculation"],
      investment_horizon_years: ["<3_years", "3_5_years", "5_10_years", ">10_years"],
      risk_tolerance: ["very_low", "low", "moderate", "high", "very_high"],
      liquidity_need: ["low", "medium", "high"],
      experience_level: ["beginner", "intermediate", "advanced"],
      typical_ticket_size: ["micro_<1k", "small_1k_10k", "medium_10k_50k", "large_>50k"],
      annual_investing_capacity: ["<5k", "5k_20k", "20k_100k", ">100k"],
      asset_class_preference: ["public_equities", "mutual_funds_etfs", "fixed_income", "real_estate", "startups_private_equity", "crypto_digital_assets", "cash_equivalents"],
      sector_preferences: ["technology", "consumer_internet", "fintech", "healthcare", "real_estate", "energy_climate", "industrial", "other"],
      volatility_reaction: ["sell_to_avoid_more_loss", "hold_and_wait", "buy_more_at_lower_prices"],
      sustainability_preference: ["not_important", "nice_to_have", "important", "very_important"],
      engagement_style: ["very_passive_just_updates", "collaborative_discuss_key_decisions", "hands_on_active_trader"],
    };

    const options = schema[fieldName as keyof typeof schema] || [];
    const isMultiSelect = fieldName === "asset_class_preference" || fieldName === "sector_preferences";

    if (isMultiSelect) {
      return (
        <CheckboxGroup
          value={Array.isArray(field.value) ? field.value : [field.value]}
          onChange={(values) => handleFieldUpdate(fieldName, values)}
        >
          <Stack spacing={2}>
            {options.map((option) => (
              <Checkbox key={option} value={option}>
                {VALUE_LABELS[option as keyof typeof VALUE_LABELS] || option}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      );
    }

    return (
      <Select
        value={field.value}
        onChange={(e) => handleFieldUpdate(fieldName, e.target.value)}
        size="sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {VALUE_LABELS[option as keyof typeof VALUE_LABELS] || option}
          </option>
        ))}
      </Select>
    );
  };

  return (
    <Box minH="100vh" bg="#F5F7F9" py={10}>
      <Box maxW="1400px" mx="auto" px={4}>
        {/* Header */}
        <VStack spacing={3} mb={8} textAlign="center">
          <Text fontSize="sm" fontWeight="700" color="rgba(61,61,145,1)" textTransform="uppercase">
            Investor Profile
          </Text>
          <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="700" color="#1c1c1c">
            Create Your Investor Hushh ID
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="#434343" maxW="2xl">
            Fill in your basic details below. Our AI will generate an intelligent investor profile tailored to you.
          </Text>
        </VStack>

        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={6}
        >
          {/* Left: Basic Info Form */}
          <Box bg="white" rounded="xl" shadow="sm" p={6}>
            <Heading as="h2" fontSize="xl" fontWeight="600" color="#1c1c1c" mb={4}>
              Basic Information
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="#434343">Full Name</FormLabel>
                  <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="#434343">Email</FormLabel>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" color="#434343">Age</FormLabel>
                  <Input
                    type="number"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="24"
                  />
                </FormControl>

                <HStack>
                  <FormControl isRequired flex={1}>
                    <FormLabel fontSize="sm" color="#434343">Country Code</FormLabel>
                    <Input
                      value={form.phoneCountryCode}
                      onChange={(e) => handleChange("phoneCountryCode", e.target.value)}
                      placeholder="+1"
                    />
                  </FormControl>

                  <FormControl isRequired flex={2}>
                    <FormLabel fontSize="sm" color="#434343">Phone Number</FormLabel>
                    <Input
                      value={form.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      placeholder="1234567890"
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel fontSize="sm" color="#434343">Organisation (Optional)</FormLabel>
                  <Input
                    value={form.organisation}
                    onChange={(e) => handleChange("organisation", e.target.value)}
                    placeholder="Company name"
                  />
                </FormControl>

                <Button
                  type="submit"
                  isLoading={loading}
                  loadingText="Generating..."
                  bg="rgba(153, 40, 112, 1)"
                  color="white"
                  size="lg"
                  w="full"
                  mt={4}
                  _hover={{ bg: "black" }}
                >
                  {investorProfile ? "Update Profile" : "Generate Investor Profile"}
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Right: Investor Profile Display */}
          <Box bg="white" rounded="xl" shadow="sm" p={6}>
            <Heading as="h2" fontSize="xl" fontWeight="600" color="#1c1c1c" mb={4}>
              AI-Generated Investor Profile
            </Heading>

            {!investorProfile ? (
              <Box bg="#E6F4FF" rounded="lg" p={6} textAlign="center">
                <Text color="#434343">
                  Submit the form to generate your personalized investor profile
                </Text>
              </Box>
            ) : (
              <Accordion allowMultiple>
                {Object.entries(investorProfile).map(([fieldName, fieldData]: [string, any]) => (
                  <AccordionItem key={fieldName} border="none" mb={2}>
                    <AccordionButton
                      bg="#E6F4FF"
                      _hover={{ bg: "#d0e7ff" }}
                      rounded="md"
                      px={4}
                      py={3}
                    >
                      <Box flex="1" textAlign="left">
                        <HStack justify="space-between" w="full">
                          <Text fontWeight="600" color="#1c1c1c" fontSize="sm">
                            {FIELD_LABELS[fieldName as keyof typeof FIELD_LABELS] || fieldName}
                          </Text>
                          {getConfidenceBadge(fieldData.confidence)}
                        </HStack>
                        <Text fontSize="xs" color="#434343" mt={1}>
                          {Array.isArray(fieldData.value)
                            ? fieldData.value.map((v: string) => VALUE_LABELS[v as keyof typeof VALUE_LABELS] || v).join(", ")
                            : VALUE_LABELS[fieldData.value as keyof typeof VALUE_LABELS] || fieldData.value}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} pt={3} px={4}>
                      <VStack align="stretch" spacing={3}>
                        <Box>
                          <Text fontSize="xs" fontWeight="600" color="#434343" mb={1}>
                            AI Rationale:
                          </Text>
                          <Text fontSize="xs" color="#434343">
                            {fieldData.rationale}
                          </Text>
                        </Box>

                        <Divider />

                        {editingField === fieldName ? (
                          <Box>
                            {renderFieldEditor(fieldName, fieldData)}
                            <Button
                              size="xs"
                              mt={2}
                              onClick={() => setEditingField(null)}
                            >
                              Cancel
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            size="xs"
                            colorScheme="purple"
                            onClick={() => setEditingField(fieldName)}
                          >
                            Edit Value
                          </Button>
                        )}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HushhUserProfilePage;

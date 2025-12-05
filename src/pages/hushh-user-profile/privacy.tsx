import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Heading, Text, VStack, HStack, Switch,
  useToast, Spinner, Button, Divider,
} from "@chakra-ui/react";
import { ArrowLeft, Save } from "lucide-react";
import resources from "../../resources/resources";
import { PrivacySettings, FIELD_LABELS, ONBOARDING_FIELD_LABELS } from "../../types/investorProfile";

const PrivacyControlsPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);

  const tokens = {
    label: "#000000",
    secondary: "#6E6E73",
    tertiary: "#8E8E93",
    separator: "#E5E5EA",
    blue: "#0A84FF",
    green: "#34C759",
    red: "#FF3B30",
  };

  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  const fetchPrivacySettings = async () => {
    try {
      const supabase = resources.config.supabaseClient;
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to manage privacy settings",
          status: "error",
          duration: 5000,
        });
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("investor_profiles")
        .select("privacy_settings")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setPrivacySettings(data.privacy_settings || getDefaultPrivacySettings());
    } catch (error: any) {
      console.error("Error fetching privacy settings:", error);
      toast({
        title: "Error",
        description: "Failed to load privacy settings",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPrivacySettings = (): PrivacySettings => {
    return {
      investor_profile: {
        primary_goal: { value: true } as any,
        investment_horizon_years: { value: true } as any,
        risk_tolerance: { value: true } as any,
        liquidity_need: { value: true } as any,
        experience_level: { value: true } as any,
        typical_ticket_size: { value: true } as any,
        annual_investing_capacity: { value: true } as any,
        asset_class_preference: { value: true } as any,
        sector_preferences: { value: true } as any,
        volatility_reaction: { value: true } as any,
        sustainability_preference: { value: true } as any,
        engagement_style: { value: true } as any,
      },
      onboarding_data: {
        account_type: true,
        selected_fund: true,
        referral_source: true,
        referral_source_other: true,
        citizenship_country: true,
        residence_country: true,
        account_structure: true,
        phone_number: true,
        phone_country_code: true,
        legal_first_name: true,
        legal_last_name: true,
        address_line_1: true,
        address_line_2: true,
        address_country: true,
        city: true,
        state: true,
        zip_code: true,
        address_phone_number: true,
        address_phone_country_code: true,
        date_of_birth: true,
        ssn_encrypted: false, // SSN default OFF
        initial_investment_amount: true,
        recurring_investment_enabled: true,
        recurring_frequency: true,
        recurring_amount: true,
        recurring_day_of_month: true,
      },
      basic_info: {
        name: true,
        email: true,
        age: true,
        organisation: true,
      },
    };
  };

  const handleToggle = (section: keyof PrivacySettings, field: string) => {
    if (!privacySettings) return;

    setPrivacySettings({
      ...privacySettings,
      [section]: {
        ...privacySettings[section],
        [field]: !privacySettings[section][field as keyof typeof privacySettings[typeof section]],
      },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = resources.config.supabaseClient;
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("investor_profiles")
        .update({ privacy_settings: privacySettings })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Privacy Settings Saved",
        description: "Your privacy preferences have been updated",
        status: "success",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error saving privacy settings:", error);
      toast({
        title: "Error",
        description: "Failed to save privacy settings",
        status: "error",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color={tokens.blue} thickness="4px" />
          <Text color={tokens.secondary}>Loading privacy settings...</Text>
        </VStack>
      </Box>
    );
  }

  if (!privacySettings) {
    return null;
  }

  return (
    <Box minH="100vh" bg="white" py={{ base: 8, md: 12 }}>
      <Box maxW="960px" mx="auto" px={{ base: 4, md: 6 }}>
        {/* Header */}
        <VStack align="stretch" spacing={4} mb={8}>
          <Button
            leftIcon={<ArrowLeft size={16} />}
            variant="ghost"
            alignSelf="flex-start"
            onClick={() => navigate("/hushh-user-profile")}
            color={tokens.blue}
            _hover={{ bg: "rgba(10,132,255,0.08)" }}
          >
            Back to Profile
          </Button>

          <Heading as="h1" fontSize={{ base: "24px", md: "28px" }} fontWeight="500" color={tokens.label}>
            Privacy Settings
          </Heading>

          <Text fontSize="14px" color={tokens.secondary}>
            Control which information is visible on your public investor profile. Toggle fields on or off to manage your privacy.
          </Text>
        </VStack>

        {/* Basic Info Section */}
        <Box mb={8}>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="17px" fontWeight="500" color={tokens.label}>Basic Information</Text>
            <Text fontSize="13px" color={tokens.secondary}>
              {Object.values(privacySettings.basic_info).filter(Boolean).length} / {Object.keys(privacySettings.basic_info).length} visible
            </Text>
          </HStack>

          <Box
            border={`1px solid ${tokens.separator}`}
            borderRadius="12px"
            overflow="hidden"
          >
            {Object.entries(privacySettings.basic_info).map(([field, isVisible], index) => (
              <HStack
                key={field}
                justify="space-between"
                px={4}
                py={3}
                borderBottom={index < Object.keys(privacySettings.basic_info).length - 1 ? `1px solid ${tokens.separator}` : "none"}
                bg={isVisible ? "white" : "rgba(120,120,128,0.06)"}
              >
                <VStack align="start" spacing={0}>
                  <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Text>
                  <Text fontSize="13px" color={isVisible ? tokens.green : tokens.secondary}>
                    {isVisible ? "Visible on public profile" : "Hidden from public profile"}
                  </Text>
                </VStack>
                <Switch
                  size="lg"
                  isChecked={isVisible}
                  onChange={() => handleToggle("basic_info", field)}
                  colorScheme="blue"
                />
              </HStack>
            ))}
          </Box>
        </Box>

        {/* Investment Profile Section */}
        <Box mb={8}>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="17px" fontWeight="500" color={tokens.label}>Investment Profile (AI-Generated)</Text>
            <Text fontSize="13px" color={tokens.secondary}>
              {Object.values(privacySettings.investor_profile).filter(Boolean).length} / {Object.keys(privacySettings.investor_profile).length} visible
            </Text>
          </HStack>

          <Box
            border={`1px solid ${tokens.separator}`}
            borderRadius="12px"
            overflow="hidden"
          >
            {Object.entries(privacySettings.investor_profile).map(([field, isVisible], index) => (
              <HStack
                key={field}
                justify="space-between"
                px={4}
                py={3}
                borderBottom={index < Object.keys(privacySettings.investor_profile).length - 1 ? `1px solid ${tokens.separator}` : "none"}
                bg={isVisible ? "white" : "rgba(120,120,128,0.06)"}
              >
                <VStack align="start" spacing={0}>
                  <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                    {FIELD_LABELS[field as keyof typeof FIELD_LABELS]}
                  </Text>
                  <Text fontSize="13px" color={isVisible ? tokens.green : tokens.secondary}>
                    {isVisible ? "Visible on public profile" : "Hidden from public profile"}
                  </Text>
                </VStack>
                <Switch
                  size="lg"
                  isChecked={isVisible}
                  onChange={() => handleToggle("investor_profile", field)}
                  colorScheme="blue"
                />
              </HStack>
            ))}
          </Box>
        </Box>

        {/* Onboarding Data Section */}
        <Box mb={8}>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="17px" fontWeight="500" color={tokens.label}>Personal Information (Onboarding Data)</Text>
            <Text fontSize="13px" color={tokens.secondary}>
              {Object.values(privacySettings.onboarding_data).filter(Boolean).length} / {Object.keys(privacySettings.onboarding_data).length} visible
            </Text>
          </HStack>

          {/* Account Details */}
          <Box mb={4}>
            <Text fontSize="13px" fontWeight="500" color={tokens.secondary} px={4} py={2} bg="rgba(120,120,128,0.06)" borderRadius="8px 8px 0 0">
              ACCOUNT DETAILS
            </Text>
            <Box border={`1px solid ${tokens.separator}`} borderRadius="0 0 8px 8px" overflow="hidden">
              {['account_type', 'selected_fund', 'account_structure'].map((field, index, arr) => (
                <HStack
                  key={field}
                  justify="space-between"
                  px={4}
                  py={3}
                  borderBottom={index < arr.length - 1 ? `1px solid ${tokens.separator}` : "none"}
                  bg={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "white" : "rgba(120,120,128,0.06)"}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                      {ONBOARDING_FIELD_LABELS[field]}
                    </Text>
                    <Text fontSize="13px" color={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? tokens.green : tokens.secondary}>
                      {privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "Visible" : "Hidden"}
                    </Text>
                  </VStack>
                  <Switch
                    size="lg"
                    isChecked={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data]}
                    onChange={() => handleToggle("onboarding_data", field)}
                    colorScheme="blue"
                  />
                </HStack>
              ))}
            </Box>
          </Box>

          {/* Identity */}
          <Box mb={4}>
            <Text fontSize="13px" fontWeight="500" color={tokens.secondary} px={4} py={2} bg="rgba(120,120,128,0.06)" borderRadius="8px 8px 0 0">
              IDENTITY
            </Text>
            <Box border={`1px solid ${tokens.separator}`} borderRadius="0 0 8px 8px" overflow="hidden">
              {['legal_first_name', 'legal_last_name', 'date_of_birth', 'ssn_encrypted', 'citizenship_country', 'residence_country'].map((field, index, arr) => (
                <HStack
                  key={field}
                  justify="space-between"
                  px={4}
                  py={3}
                  borderBottom={index < arr.length - 1 ? `1px solid ${tokens.separator}` : "none"}
                  bg={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "white" : "rgba(120,120,128,0.06)"}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                      {ONBOARDING_FIELD_LABELS[field]}
                      {field === 'ssn_encrypted' && (
                        <Text as="span" fontSize="11px" color={tokens.red} ml={2} fontWeight="500">
                          ⚠️ SENSITIVE
                        </Text>
                      )}
                    </Text>
                    <Text fontSize="13px" color={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? tokens.green : tokens.secondary}>
                      {privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "Visible" : "Hidden"}
                    </Text>
                  </VStack>
                  <Switch
                    size="lg"
                    isChecked={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data]}
                    onChange={() => handleToggle("onboarding_data", field)}
                    colorScheme="blue"
                  />
                </HStack>
              ))}
            </Box>
          </Box>

          {/* Contact & Address */}
          <Box mb={4}>
            <Text fontSize="13px" fontWeight="500" color={tokens.secondary} px={4} py={2} bg="rgba(120,120,128,0.06)" borderRadius="8px 8px 0 0">
              CONTACT & ADDRESS
            </Text>
            <Box border={`1px solid ${tokens.separator}`} borderRadius="0 0 8px 8px" overflow="hidden">
              {['phone_number', 'phone_country_code', 'address_line_1', 'address_line_2', 'city', 'state', 'zip_code', 'address_country'].map((field, index, arr) => (
                <HStack
                  key={field}
                  justify="space-between"
                  px={4}
                  py={3}
                  borderBottom={index < arr.length - 1 ? `1px solid ${tokens.separator}` : "none"}
                  bg={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "white" : "rgba(120,120,128,0.06)"}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                      {ONBOARDING_FIELD_LABELS[field]}
                    </Text>
                    <Text fontSize="13px" color={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? tokens.green : tokens.secondary}>
                      {privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "Visible" : "Hidden"}
                    </Text>
                  </VStack>
                  <Switch
                    size="lg"
                    isChecked={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data]}
                    onChange={() => handleToggle("onboarding_data", field)}
                    colorScheme="blue"
                  />
                </HStack>
              ))}
            </Box>
          </Box>

          {/* Investment Details */}
          <Box mb={4}>
            <Text fontSize="13px" fontWeight="500" color={tokens.secondary} px={4} py={2} bg="rgba(120,120,128,0.06)" borderRadius="8px 8px 0 0">
              INVESTMENT DETAILS
            </Text>
            <Box border={`1px solid ${tokens.separator}`} borderRadius="0 0 8px 8px" overflow="hidden">
              {['initial_investment_amount', 'recurring_investment_enabled', 'recurring_frequency', 'recurring_amount', 'recurring_day_of_month'].map((field, index, arr) => (
                <HStack
                  key={field}
                  justify="space-between"
                  px={4}
                  py={3}
                  borderBottom={index < arr.length - 1 ? `1px solid ${tokens.separator}` : "none"}
                  bg={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "white" : "rgba(120,120,128,0.06)"}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="15px" fontWeight="500" color={tokens.label}>
                      {ONBOARDING_FIELD_LABELS[field]}
                    </Text>
                    <Text fontSize="13px" color={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? tokens.green : tokens.secondary}>
                      {privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data] ? "Visible" : "Hidden"}
                    </Text>
                  </VStack>
                  <Switch
                    size="lg"
                    isChecked={privacySettings.onboarding_data[field as keyof typeof privacySettings.onboarding_data]}
                    onChange={() => handleToggle("onboarding_data", field)}
                    colorScheme="blue"
                  />
                </HStack>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Save Button */}
        <Box position="sticky" bottom={4} bg="white" py={4} borderTop={`1px solid ${tokens.separator}`}>
          <Button
            leftIcon={<Save size={16} />}
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSave}
            isLoading={saving}
            loadingText="Saving..."
          >
            Save Privacy Settings
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyControlsPage;

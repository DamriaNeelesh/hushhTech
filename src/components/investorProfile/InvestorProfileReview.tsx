import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Divider,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  InvestorProfile,
  InvestorProfileRecord,
  FIELD_LABELS,
  VALUE_LABELS,
  PrimaryGoal,
  InvestmentHorizon,
  RiskTolerance,
  LiquidityNeed,
  ExperienceLevel,
  TicketSize,
  AnnualCapacity,
  AssetClass,
  Sector,
  VolatilityReaction,
  SustainabilityPreference,
  EngagementStyle,
} from "../../types/investorProfile";

interface InvestorProfileReviewProps {
  profile: InvestorProfileRecord;
  onConfirm: (updates: Partial<InvestorProfile>) => Promise<void>;
  isLoading?: boolean;
}

export function InvestorProfileReview({
  profile,
  onConfirm,
  isLoading = false,
}: InvestorProfileReviewProps) {
  const [editedProfile, setEditedProfile] = useState<InvestorProfile>(
    profile.investor_profile
  );
  const toast = useToast();

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.7) return "green";
    if (confidence >= 0.4) return "yellow";
    return "red";
  };

  const getConfidenceLabel = (confidence: number): string => {
    if (confidence >= 0.7) return "High Confidence";
    if (confidence >= 0.4) return "Medium Confidence";
    return "Low Confidence";
  };

  const handleSingleFieldChange = (field: keyof InvestorProfile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        // Mark as user-edited by setting confidence to 1.0
        confidence: 1.0,
        rationale: "User manually selected",
      },
    }));
  };

  const handleMultiFieldChange = (field: keyof InvestorProfile, values: any[]) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: values,
        confidence: 1.0,
        rationale: "User manually selected",
      },
    }));
  };

  const handleConfirm = async () => {
    try {
      await onConfirm(editedProfile);
      toast({
        title: "Profile Confirmed",
        description: "Your investor profile has been saved successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderSingleSelectField = <T extends string>(
    field: keyof InvestorProfile,
    options: readonly T[]
  ) => {
    const fieldData = editedProfile[field] as { value: T; confidence: number; rationale: string };
    
    const chipStyles = (confidence: number) => {
      const isHigh = getConfidenceColor(confidence) === "green";
      return {
        color: isHigh ? "#2EBD6B" : "#B08900",
        bg: isHigh ? "rgba(52,199,89,0.15)" : "rgba(255,214,10,0.2)",
        border: isHigh ? "rgba(52,199,89,0.45)" : "rgba(255,214,10,0.5)",
      };
    };

    const chip = chipStyles(fieldData.confidence);
    
    return (
      <AccordionItem key={field} border="none">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                px={0}
                py={3}
                bg={isExpanded ? "rgba(120,120,128,0.06)" : "transparent"}
                _hover={{ bg: "rgba(120,120,128,0.04)" }}
                _expanded={{ bg: "rgba(120,120,128,0.08)" }}
                position="relative"
              >
                {isExpanded && (
                  <Box position="absolute" left={-2} top={2} bottom={2} w="2px" bg={chip.color} borderRadius="full" />
                )}
                <Box flex="1" textAlign="left">
                  <VStack align="start" spacing={1}>
                    <HStack spacing={3}>
                      <Text fontSize="16px" fontWeight="600" color="#111827">
                        {FIELD_LABELS[field]}
                      </Text>
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        fontSize="11px"
                        color={chip.color}
                        bg={chip.bg}
                        border={`1px solid ${chip.border}`}
                      >
                        {getConfidenceLabel(fieldData.confidence)}
                      </Badge>
                    </HStack>
                    {!isExpanded && (
                      <Text fontSize="14px" color="#6E6E73">
                        {VALUE_LABELS[fieldData.value] || fieldData.value}
                      </Text>
                    )}
                  </VStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={0} pb={4}>
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontSize="15px" fontWeight="600" color="#111827" mb={1}>
                    AI Rationale:
                  </Text>
                  <Text fontSize="14px" color="#6E6E73" lineHeight="1.6">
                    {fieldData.rationale}
                  </Text>
                </Box>
                
                <Select
                  value={fieldData.value}
                  onChange={(e) =>
                    handleSingleFieldChange(field, e.target.value as T)
                  }
                  height="44px"
                  borderRadius="12px"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {VALUE_LABELS[option] || option}
                    </option>
                  ))}
                </Select>
                
                <Text fontSize="13px" color="#6E6E73">
                  Current: <Text as="span" fontWeight="700">{VALUE_LABELS[fieldData.value] || fieldData.value}</Text>
                </Text>
              </VStack>
            </AccordionPanel>
            <Box borderBottom="1px solid #E5E5EA" />
          </>
        )}
      </AccordionItem>
    );
  };

  const renderMultiSelectField = <T extends string>(
    field: keyof InvestorProfile,
    options: readonly T[]
  ) => {
    const fieldData = editedProfile[field] as { value: T[]; confidence: number; rationale: string };
    const chipStyles = (confidence: number) => {
      const isHigh = getConfidenceColor(confidence) === "green";
      return {
        color: isHigh ? "#2EBD6B" : "#B08900",
        bg: isHigh ? "rgba(52,199,89,0.15)" : "rgba(255,214,10,0.2)",
        border: isHigh ? "rgba(52,199,89,0.45)" : "rgba(255,214,10,0.5)",
      };
    };
    const chip = chipStyles(fieldData.confidence);
    
    return (
      <AccordionItem key={field} border="none">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                px={0}
                py={3}
                bg={isExpanded ? "rgba(120,120,128,0.06)" : "transparent"}
                _hover={{ bg: "rgba(120,120,128,0.04)" }}
                _expanded={{ bg: "rgba(120,120,128,0.08)" }}
                position="relative"
              >
                {isExpanded && (
                  <Box position="absolute" left={-2} top={2} bottom={2} w="2px" bg={chip.color} borderRadius="full" />
                )}
                <Box flex="1" textAlign="left">
                  <VStack align="start" spacing={1}>
                    <HStack spacing={3}>
                      <Text fontSize="16px" fontWeight="600" color="#111827">
                        {FIELD_LABELS[field]}
                      </Text>
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        fontSize="11px"
                        color={chip.color}
                        bg={chip.bg}
                        border={`1px solid ${chip.border}`}
                      >
                        {getConfidenceLabel(fieldData.confidence)}
                      </Badge>
                    </HStack>
                    {!isExpanded && (
                      <Text fontSize="14px" color="#6E6E73">
                        {fieldData.value.map((v) => VALUE_LABELS[v] || v).join(", ")}
                      </Text>
                    )}
                  </VStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={0} pb={4}>
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontSize="15px" fontWeight="600" color="#111827" mb={1}>
                    AI Rationale:
                  </Text>
                  <Text fontSize="14px" color="#6E6E73" lineHeight="1.6">
                    {fieldData.rationale}
                  </Text>
                </Box>
                
                <CheckboxGroup
                  value={fieldData.value}
                  onChange={(values) =>
                    handleMultiFieldChange(field, values as string[])
                  }
                >
                  <Stack spacing={2}>
                    {options.map((option) => (
                      <Checkbox key={option} value={option}>
                        {VALUE_LABELS[option] || option}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
                
                <Text fontSize="13px" color="#6E6E73">
                  Selected: <Text as="span" fontWeight="700">{fieldData.value.length} items</Text>
                </Text>
              </VStack>
            </AccordionPanel>
            <Box borderBottom="1px solid #E5E5EA" />
          </>
        )}
      </AccordionItem>
    );
  };

  return (
    <Box bg="#F5F5F7" minH="100vh" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
      <VStack spacing={6} align="stretch" maxW="900px" mx="auto">
        {/* Header */}
        <Box textAlign="center">
          <Heading fontSize={{ base: "28px", md: "30px" }} fontWeight="700" mb={2} lineHeight="1.25" color="#0f172a">
            Review Your AI-Generated Investor Profile
          </Heading>
          <Text fontSize="17px" color="#6E6E73" lineHeight="1.4" maxW="720px" mx="auto">
            We've analyzed your information and created a personalized profile. Review and edit any
            fields before confirming.
          </Text>
        </Box>
        <Divider borderColor="#E5E5EA" />

        {/* Basic Info Summary */}
        <VStack align="stretch" spacing={3} px={{ base: 0, md: 1 }}>
          <Text fontSize="15px" fontWeight="600" color="#111827">
            Your Information
          </Text>
          <VStack align="stretch" spacing={3}>
            {[
              { label: "Name:", value: profile.name },
              { label: "Email:", value: profile.email },
              { label: "Age:", value: profile.age },
              { label: "Phone:", value: `${profile.phone_country_code} ${profile.phone_number}` },
              ...(profile.organisation ? [{ label: "Organisation:", value: profile.organisation }] : []),
            ].map((row, idx, arr) => (
              <Box key={row.label}>
                <HStack align="baseline" justify="space-between" spacing={4}>
                  <Text fontSize="15px" fontWeight="600" color="#6E6E73">
                    {row.label}
                  </Text>
                  <Text fontSize="17px" color="#111827" maxW="65%" textAlign="right">
                    {row.value}
                  </Text>
                </HStack>
                {idx < arr.length - 1 && <Box mt={2} borderBottom="1px solid #E5E5EA" />}
              </Box>
            ))}
          </VStack>
        </VStack>

        {/* Derived Context */}
        <VStack align="stretch" spacing={3} mt={4}>
          <Text fontSize="15px" fontWeight="600" color="#111827">
            Detected Context
          </Text>
          <Flex wrap="wrap" gap={2}>
            <Badge
              px={3}
              py={1.5}
              borderRadius="full"
              border="1px solid rgba(0,169,224,0.4)"
              bg="rgba(0,169,224,0.12)"
              color="#0A84FF"
              fontSize="13px"
              letterSpacing="0.04em"
            >
              {profile.derived_context.country} ({profile.derived_context.currency})
            </Badge>
            <Badge
              px={3}
              py={1.5}
              borderRadius="full"
              border="1px solid rgba(88,86,214,0.4)"
              bg="rgba(88,86,214,0.12)"
              color="#5856D6"
              fontSize="13px"
              letterSpacing="0.04em"
            >
              {profile.derived_context.region}
            </Badge>
            <Badge
              px={3}
              py={1.5}
              borderRadius="full"
              border="1px solid rgba(52,199,89,0.4)"
              bg="rgba(52,199,89,0.12)"
              color="#34C759"
              fontSize="13px"
              letterSpacing="0.04em"
            >
              {profile.derived_context.life_stage}
            </Badge>
            {profile.derived_context.email_type && (
              <Badge
                px={3}
                py={1.5}
                borderRadius="full"
                border="1px solid rgba(255,149,0,0.5)"
                bg="rgba(255,149,0,0.15)"
                color="#FF9500"
                fontSize="13px"
                letterSpacing="0.04em"
              >
                {profile.derived_context.email_type === "corporate" ? "Corporate Email" : "Personal Email"}
              </Badge>
            )}
            {profile.derived_context.org_type && (
              <Badge
                px={3}
                py={1.5}
                borderRadius="full"
                border="1px solid rgba(90,200,250,0.45)"
                bg="rgba(90,200,250,0.15)"
                color="#00C7BE"
                fontSize="13px"
                letterSpacing="0.04em"
              >
                {profile.derived_context.org_type}
              </Badge>
            )}
          </Flex>
        </VStack>

        <Divider />

        {/* Profile Fields */}
        <Box>
          <Heading size="md" mb={4}>
            Investor Profile (12 Fields)
          </Heading>
          <Accordion allowMultiple>
            {renderSingleSelectField<PrimaryGoal>("primary_goal", [
              "capital_preservation",
              "steady_income",
              "long_term_growth",
              "aggressive_growth",
              "speculation",
            ])}
            
            {renderSingleSelectField<InvestmentHorizon>("investment_horizon_years", [
              "<3_years",
              "3_5_years",
              "5_10_years",
              ">10_years",
            ])}
            
            {renderSingleSelectField<RiskTolerance>("risk_tolerance", [
              "very_low",
              "low",
              "moderate",
              "high",
              "very_high",
            ])}
            
            {renderSingleSelectField<LiquidityNeed>("liquidity_need", [
              "low",
              "medium",
              "high",
            ])}
            
            {renderSingleSelectField<ExperienceLevel>("experience_level", [
              "beginner",
              "intermediate",
              "advanced",
            ])}
            
            {renderSingleSelectField<TicketSize>("typical_ticket_size", [
              "micro_<1k",
              "small_1k_10k",
              "medium_10k_50k",
              "large_>50k",
            ])}
            
            {renderSingleSelectField<AnnualCapacity>("annual_investing_capacity", [
              "<5k",
              "5k_20k",
              "20k_100k",
              ">100k",
            ])}
            
            {renderMultiSelectField<AssetClass>("asset_class_preference", [
              "public_equities",
              "mutual_funds_etfs",
              "fixed_income",
              "real_estate",
              "startups_private_equity",
              "crypto_digital_assets",
              "cash_equivalents",
            ])}
            
            {renderMultiSelectField<Sector>("sector_preferences", [
              "technology",
              "consumer_internet",
              "fintech",
              "healthcare",
              "real_estate",
              "energy_climate",
              "industrial",
              "other",
            ])}
            
            {renderSingleSelectField<VolatilityReaction>("volatility_reaction", [
              "sell_to_avoid_more_loss",
              "hold_and_wait",
              "buy_more_at_lower_prices",
            ])}
            
            {renderSingleSelectField<SustainabilityPreference>("sustainability_preference", [
              "not_important",
              "nice_to_have",
              "important",
              "very_important",
            ])}
            
            {renderSingleSelectField<EngagementStyle>("engagement_style", [
              "very_passive_just_updates",
              "collaborative_discuss_key_decisions",
              "hands_on_active_trader",
            ])}
          </Accordion>
        </Box>

        {/* Confirm Button */}
        <Button
          colorScheme="green"
          size="lg"
          leftIcon={<CheckCircleIcon />}
          onClick={handleConfirm}
          isLoading={isLoading}
          loadingText="Saving..."
          disabled={isLoading}
        >
          Confirm & Save Profile
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          You can always edit your profile later from your dashboard
        </Text>
      </VStack>
    </Box>
  );
}

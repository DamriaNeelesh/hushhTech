import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box, Heading, Text, VStack, HStack,
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, useToast,
  Icon, IconButton, useClipboard, Spinner,
} from "@chakra-ui/react";
import { Share2, Copy, Check } from "lucide-react";
import { PrimaryCtaButton } from "../../components/PrimaryCtaButton";
import { InvestorChatWidget } from "../../components/InvestorChatWidget";
import DeveloperSettings from "../../components/DeveloperSettings";
import { fetchPublicInvestorProfileBySlug } from "../../services/investorProfile";
import { maskProfileData } from "../../utils/maskSensitiveData";
import { InvestorProfile, FIELD_LABELS, VALUE_LABELS, ONBOARDING_FIELD_LABELS } from "../../types/investorProfile";
import { OnboardingData } from "../../types/onboarding";

const PublicInvestorProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const profileUrl = `https://hushhtech.com/investor/${slug}`;
  const { hasCopied, onCopy } = useClipboard(profileUrl);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) {
        navigate('/');
        return;
      }

      try {
        const data = await fetchPublicInvestorProfileBySlug(slug);
        setProfileData(data);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Profile Not Found",
          description: "This investor profile doesn't exist or is private",
          status: "error",
          duration: 5000,
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug, navigate, toast]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${maskedData.name}'s Investor Profile`,
          text: `Check out ${maskedData.name}'s investor profile on Hushh`,
          url: profileUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      onCopy();
      toast({
        title: "Link Copied!",
        description: "Profile link copied to clipboard",
        status: "success",
        duration: 2000,
      });
    }
  };

  const tokens = {
    label: "#000000",
    secondary: "#6E6E73",
    tertiary: "#8E8E93",
    separator: "#E5E5EA",
    blue: "#0A84FF",
    green: "#34C759",
    yellow: "#FFD60A",
    gray: "#8E8E93",
  };

  const getConfidenceChip = (confidence: number) => {
    const label = confidence >= 0.7 ? "HIGH" : confidence >= 0.4 ? "MEDIUM" : "LOW";
    const tone = label === "HIGH" ? tokens.green : label === "MEDIUM" ? tokens.yellow : tokens.gray;
    const surface =
      label === "HIGH" ? "rgba(52,199,89,0.12)" : label === "MEDIUM" ? "rgba(255,214,10,0.16)" : "rgba(142,142,147,0.14)";
    const border =
      label === "HIGH" ? "rgba(52,199,89,0.5)" : label === "MEDIUM" ? "rgba(255,214,10,0.55)" : "rgba(142,142,147,0.6)";
    return (
      <Box
        px={3.5}
        py={1.5}
        borderRadius="full"
        border={`1px solid ${border}`}
        bg={surface}
        color={tone}
        fontSize="11px"
        fontWeight="700"
        letterSpacing="0.08em"
        minH="26px"
        display="inline-flex"
        alignItems="center"
      >
        {label}
      </Box>
    );
  };

  // Get OG image URL
  const ogImageUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/investor-og-image?slug=${slug}`;

  if (loading) {
    return (
      <Box minH="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color={tokens.blue} thickness="4px" />
          <Text color={tokens.secondary}>Loading investor profile...</Text>
        </VStack>
      </Box>
    );
  }

  if (!profileData) {
    return null;
  }

  const maskedData = maskProfileData(profileData);
  const investorProfile: InvestorProfile = profileData.investor_profile;
  const onboardingData: OnboardingData | null = profileData.onboarding_data;
  const privacySettings = profileData.privacy_settings || {};

  // Helper function to check if a field should be displayed
  const isFieldVisible = (section: 'investor_profile' | 'onboarding_data', fieldName: string): boolean => {
    if (!privacySettings[section]) return true; // Default to visible if no privacy settings
    return privacySettings[section][fieldName] !== false; // Show unless explicitly false
  };

  // Filter and format onboarding data for display
  const getVisibleOnboardingFields = () => {
    if (!onboardingData) return [];
    
    const fields: Array<{key: string, label: string, value: any, category: string}> = [];
    
    // Basic Information
    if (onboardingData.account_type && isFieldVisible('onboarding_data', 'account_type')) {
      fields.push({ key: 'account_type', label: ONBOARDING_FIELD_LABELS.account_type, value: VALUE_LABELS[onboardingData.account_type] || onboardingData.account_type, category: 'Basic Information' });
    }
    if (onboardingData.selected_fund && isFieldVisible('onboarding_data', 'selected_fund')) {
      fields.push({ key: 'selected_fund', label: ONBOARDING_FIELD_LABELS.selected_fund, value: onboardingData.selected_fund, category: 'Basic Information' });
    }
    if (onboardingData.referral_source && isFieldVisible('onboarding_data', 'referral_source')) {
      fields.push({ key: 'referral_source', label: ONBOARDING_FIELD_LABELS.referral_source, value: VALUE_LABELS[onboardingData.referral_source] || onboardingData.referral_source, category: 'Basic Information' });
    }
    
    // Citizenship & Residence
    if (onboardingData.citizenship_country && isFieldVisible('onboarding_data', 'citizenship_country')) {
      fields.push({ key: 'citizenship_country', label: ONBOARDING_FIELD_LABELS.citizenship_country, value: onboardingData.citizenship_country, category: 'Citizenship & Residence' });
    }
    if (onboardingData.residence_country && isFieldVisible('onboarding_data', 'residence_country')) {
      fields.push({ key: 'residence_country', label: ONBOARDING_FIELD_LABELS.residence_country, value: onboardingData.residence_country, category: 'Citizenship & Residence' });
    }
    if (onboardingData.account_structure && isFieldVisible('onboarding_data', 'account_structure')) {
      fields.push({ key: 'account_structure', label: ONBOARDING_FIELD_LABELS.account_structure, value: VALUE_LABELS[onboardingData.account_structure] || onboardingData.account_structure, category: 'Citizenship & Residence' });
    }
    
    // Legal Information
    if (onboardingData.legal_first_name && isFieldVisible('onboarding_data', 'legal_first_name')) {
      fields.push({ key: 'legal_first_name', label: ONBOARDING_FIELD_LABELS.legal_first_name, value: onboardingData.legal_first_name, category: 'Legal Information' });
    }
    if (onboardingData.legal_last_name && isFieldVisible('onboarding_data', 'legal_last_name')) {
      fields.push({ key: 'legal_last_name', label: ONBOARDING_FIELD_LABELS.legal_last_name, value: onboardingData.legal_last_name, category: 'Legal Information' });
    }
    if (onboardingData.date_of_birth && isFieldVisible('onboarding_data', 'date_of_birth')) {
      fields.push({ key: 'date_of_birth', label: ONBOARDING_FIELD_LABELS.date_of_birth, value: new Date(onboardingData.date_of_birth).toLocaleDateString(), category: 'Legal Information' });
    }
    if (onboardingData.ssn_encrypted && isFieldVisible('onboarding_data', 'ssn_encrypted')) {
      fields.push({ key: 'ssn_encrypted', label: ONBOARDING_FIELD_LABELS.ssn_encrypted, value: '***-**-****', category: 'Legal Information' });
    }
    
    // Address
    if (onboardingData.address_line_1 && isFieldVisible('onboarding_data', 'address_line_1')) {
      fields.push({ key: 'address_line_1', label: ONBOARDING_FIELD_LABELS.address_line_1, value: onboardingData.address_line_1, category: 'Address' });
    }
    if (onboardingData.city && isFieldVisible('onboarding_data', 'city')) {
      fields.push({ key: 'city', label: ONBOARDING_FIELD_LABELS.city, value: onboardingData.city, category: 'Address' });
    }
    if (onboardingData.state && isFieldVisible('onboarding_data', 'state')) {
      fields.push({ key: 'state', label: ONBOARDING_FIELD_LABELS.state, value: onboardingData.state, category: 'Address' });
    }
    if (onboardingData.zip_code && isFieldVisible('onboarding_data', 'zip_code')) {
      fields.push({ key: 'zip_code', label: ONBOARDING_FIELD_LABELS.zip_code, value: onboardingData.zip_code, category: 'Address' });
    }
    
    // Investment Details
    if (onboardingData.initial_investment_amount && isFieldVisible('onboarding_data', 'initial_investment_amount')) {
      fields.push({ key: 'initial_investment_amount', label: ONBOARDING_FIELD_LABELS.initial_investment_amount, value: `$${Number(onboardingData.initial_investment_amount).toLocaleString()}`, category: 'Investment Details' });
    }
    if (onboardingData.recurring_investment_enabled && isFieldVisible('onboarding_data', 'recurring_investment_enabled')) {
      fields.push({ key: 'recurring_investment_enabled', label: ONBOARDING_FIELD_LABELS.recurring_investment_enabled, value: onboardingData.recurring_investment_enabled ? 'Yes' : 'No', category: 'Investment Details' });
    }
    if (onboardingData.recurring_frequency && isFieldVisible('onboarding_data', 'recurring_frequency')) {
      fields.push({ key: 'recurring_frequency', label: ONBOARDING_FIELD_LABELS.recurring_frequency, value: VALUE_LABELS[onboardingData.recurring_frequency] || onboardingData.recurring_frequency, category: 'Investment Details' });
    }
    if (onboardingData.recurring_amount && isFieldVisible('onboarding_data', 'recurring_amount')) {
      fields.push({ key: 'recurring_amount', label: ONBOARDING_FIELD_LABELS.recurring_amount, value: `$${Number(onboardingData.recurring_amount).toLocaleString()}`, category: 'Investment Details' });
    }
    
    return fields;
  };

  const visibleOnboardingFields = getVisibleOnboardingFields();
  
  // Group fields by category
  const groupedFields = visibleOnboardingFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof visibleOnboardingFields>);

  return (
    <>
      <Helmet>
        <title>{`${maskedData.name}'s Investor Profile | Hushh`}</title>
        <meta name="description" content={`View ${maskedData.name}'s verified investor profile. ${maskedData.organisation ? `Works at ${maskedData.organisation}` : ''}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${maskedData.name} - Investor Profile`} />
        <meta property="og:description" content={`Verified investor on Hushh. Age ${maskedData.age}${maskedData.organisation ? ` • ${maskedData.organisation}` : ''}`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:type" content="profile" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${maskedData.name} - Investor Profile`} />
        <meta name="twitter:description" content={`Verified investor on Hushh`} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <Box minH="100vh" bg="white" py={{ base: 8, md: 12 }}>
        <Box maxW="960px" mx="auto" px={{ base: 4, md: 6 }}>
          {/* Header */}
          <VStack align="stretch" spacing={3} mb={8}>
            <HStack justify="space-between" align="center">
              <Box
                px={3}
                py={1.5}
                borderRadius="full"
                border={`1px solid ${tokens.blue}`}
                bg="rgba(10,132,255,0.08)"
                color={tokens.blue}
                fontSize="11px"
                letterSpacing="0.08em"
                fontWeight="700"
                display="inline-flex"
                alignItems="center"
                gap={1.5}
              >
                <span role="img" aria-label="trophy">🏆</span> VERIFIED INVESTOR
              </Box>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Share profile"
                  icon={<Icon as={Share2} />}
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  borderColor={tokens.separator}
                  color={tokens.blue}
                  _hover={{ bg: "rgba(10,132,255,0.08)" }}
                  _active={{ bg: "rgba(10,132,255,0.12)" }}
                />
                <IconButton
                  aria-label="Copy link"
                  icon={hasCopied ? <Icon as={Check} /> : <Icon as={Copy} />}
                  onClick={onCopy}
                  variant="outline"
                  size="sm"
                  borderColor={tokens.separator}
                  color={tokens.blue}
                  _hover={{ bg: "rgba(10,132,255,0.08)" }}
                  _active={{ bg: "rgba(10,132,255,0.12)" }}
                />
              </HStack>
            </HStack>

            <Heading as="h1" fontSize={{ base: "24px", md: "28px" }} fontWeight="700" color={tokens.label}>
              {maskedData.name}
            </Heading>

            <HStack spacing={3} flexWrap="wrap">
              <Box
                px={3}
                py={1.5}
                borderRadius="full"
                border={`1px solid ${tokens.separator}`}
                bg="rgba(118,118,128,0.12)"
                color={tokens.secondary}
                fontSize="13px"
                fontWeight="600"
              >
                {maskedData.email}
              </Box>
              <Box
                px={3}
                py={1.5}
                borderRadius="full"
                border={`1px solid ${tokens.separator}`}
                bg="rgba(118,118,128,0.12)"
                color={tokens.secondary}
                fontSize="13px"
                fontWeight="600"
              >
                Age {maskedData.age}
              </Box>
              <Box
                px={3}
                py={1.5}
                borderRadius="full"
                border={`1px solid ${tokens.separator}`}
                bg="rgba(118,118,128,0.12)"
                color={tokens.secondary}
                fontSize="13px"
                fontWeight="600"
              >
                {maskedData.phone}
              </Box>
              {maskedData.organisation && (
                <Box
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  border={`1px solid ${tokens.separator}`}
                  bg="rgba(118,118,128,0.12)"
                  color={tokens.secondary}
                  fontSize="13px"
                  fontWeight="600"
                >
                  {maskedData.organisation}
                </Box>
              )}
            </HStack>

            <Text fontSize="13px" color={tokens.secondary}>
              This is a public investor profile. Contact details are masked for privacy.
            </Text>
          </VStack>

          {/* Chat Widget - Moved to Top for Better Visibility */}
          <Box mb={8}>
            <InvestorChatWidget slug={slug!} investorName={maskedData.name} />
          </Box>

          {/* Investment Profile Details */}
          <Box mb={8}>
            <HStack spacing={2} align="center" mb={3}>
              <Text fontSize="15px" fontWeight="700" color={tokens.label}>Investment Profile</Text>
            </HStack>

            <Accordion allowToggle>
              {Object.entries(investorProfile).map(([fieldName, fieldData]: [string, any]) => (
                <AccordionItem
                  key={fieldName}
                  border="none"
                  borderBottom={`1px solid ${tokens.separator}`}
                  _last={{ borderBottom: "none" }}
                >
                  <AccordionButton
                    px={0}
                    py={3}
                    _hover={{ bg: "rgba(120,120,128,0.06)" }}
                    _expanded={{ bg: "rgba(120,120,128,0.06)" }}
                    transition="background-color 0.16s ease"
                  >
                    <HStack justify="space-between" w="full" align="center" spacing={3}>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="600" fontSize="15px" color={tokens.label}>
                          {FIELD_LABELS[fieldName as keyof typeof FIELD_LABELS] || fieldName}
                        </Text>
                        <Text fontSize="13px" color={tokens.secondary} noOfLines={1}>
                          {Array.isArray(fieldData.value)
                            ? fieldData.value.map((v: string) => VALUE_LABELS[v as keyof typeof VALUE_LABELS] || v).join(", ")
                            : VALUE_LABELS[fieldData.value as keyof typeof VALUE_LABELS] || fieldData.value}
                        </Text>
                      </VStack>
                      <HStack spacing={2} align="center">
                        {getConfidenceChip(fieldData.confidence)}
                        <AccordionIcon transition="transform 0.18s ease" color={tokens.secondary} />
                      </HStack>
                    </HStack>
                  </AccordionButton>

                  <AccordionPanel px={0} pb={4} pt={1}>
                    <Box pl={2} pr={1}>
                      <VStack align="stretch" spacing={2}>
                        <Text fontSize="13px" fontWeight="600" color={tokens.label}>
                          AI Rationale:
                        </Text>
                        <Text fontSize="13px" color={tokens.secondary} lineHeight="1.6">
                          {fieldData.rationale}
                        </Text>
                      </VStack>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          {/* Personal Information (Onboarding Data) */}
          {visibleOnboardingFields.length > 0 && (
            <Box mb={8}>
              <HStack spacing={2} align="center" mb={3}>
                <Text fontSize="15px" fontWeight="700" color={tokens.label}>Personal Information</Text>
              </HStack>

              <Accordion allowToggle>
                {Object.entries(groupedFields).map(([category, fields]) => (
                  <React.Fragment key={category}>
                    {/* Category Header */}
                    <Box py={2} px={0}>
                      <Text fontSize="13px" fontWeight="600" color={tokens.tertiary} textTransform="uppercase" letterSpacing="0.05em">
                        {category}
                      </Text>
                    </Box>
                    
                    {/* Fields in this category */}
                    {fields.map((field) => (
                      <AccordionItem
                        key={field.key}
                        border="none"
                        borderBottom={`1px solid ${tokens.separator}`}
                      >
                        <AccordionButton
                          px={0}
                          py={3}
                          _hover={{ bg: "rgba(120,120,128,0.06)" }}
                          transition="background-color 0.16s ease"
                        >
                          <HStack justify="space-between" w="full" align="center" spacing={3}>
                            <VStack align="start" spacing={0} flex={1}>
                              <Text fontWeight="600" fontSize="15px" color={tokens.label}>
                                {field.label}
                              </Text>
                              <Text fontSize="13px" color={tokens.secondary} noOfLines={1}>
                                {field.value}
                              </Text>
                            </VStack>
                          </HStack>
                        </AccordionButton>
                      </AccordionItem>
                    ))}
                  </React.Fragment>
                ))}
              </Accordion>
            </Box>
          )}

          {/* Developer Settings */}
          <Box mt={8}>
            <DeveloperSettings investorSlug={slug!} />
          </Box>

          {/* CTA to create own profile */}
          <Box
            mt={8}
            border={`1px solid ${tokens.separator}`}
            borderRadius="16px"
            p={{ base: 5, md: 6 }}
            bg="rgba(120,120,128,0.06)"
          >
            <VStack spacing={3} textAlign="center">
              <Heading as="h3" fontSize="18px" color={tokens.label} fontWeight="700">
                Want your own investor profile?
              </Heading>
              <Text fontSize="14px" color={tokens.secondary}>
                Create your AI-powered investor profile in minutes and share it anywhere.
              </Text>
              <PrimaryCtaButton onClick={() => navigate("/investor-profile")} width="100%">
                Create Your Hushh ID →
              </PrimaryCtaButton>
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PublicInvestorProfilePage;

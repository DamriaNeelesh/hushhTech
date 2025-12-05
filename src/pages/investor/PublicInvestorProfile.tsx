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
          <Box>
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
          {profileData.onboarding_data && (
            <Box mt={8}>
              <HStack spacing={2} align="center" mb={3}>
                <Text fontSize="15px" fontWeight="700" color={tokens.label}>Personal Information</Text>
              </HStack>

              <Box 
                border={`1px solid ${tokens.separator}`}
                borderRadius="12px"
                overflow="hidden"
              >
                {/* Basic Info Group */}
                <Box bg="rgba(120,120,128,0.06)" px={4} py={2} borderBottom={`1px solid ${tokens.separator}`}>
                  <Text fontSize="13px" fontWeight="600" color={tokens.secondary}>ACCOUNT DETAILS</Text>
                </Box>
                <VStack align="stretch" spacing={0} divider={<Box borderBottom={`1px solid ${tokens.separator}`} />}>
                  {profileData.onboarding_data.account_type && profileData.privacy_settings?.onboarding_data?.account_type !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.account_type}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label} textTransform="capitalize">
                        {profileData.onboarding_data.account_type.replace('_', ' ')}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.selected_fund && profileData.privacy_settings?.onboarding_data?.selected_fund !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.selected_fund}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.selected_fund.replace(/_/g, ' ').toUpperCase()}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.account_structure && profileData.privacy_settings?.onboarding_data?.account_structure !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.account_structure}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label} textTransform="capitalize">
                        {profileData.onboarding_data.account_structure}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                {/* Identity Group */}
                <Box bg="rgba(120,120,128,0.06)" px={4} py={2} borderBottom={`1px solid ${tokens.separator}`} mt={2}>
                  <Text fontSize="13px" fontWeight="600" color={tokens.secondary}>IDENTITY</Text>
                </Box>
                <VStack align="stretch" spacing={0} divider={<Box borderBottom={`1px solid ${tokens.separator}`} />}>
                  {profileData.onboarding_data.legal_first_name && profileData.onboarding_data.legal_last_name && 
                   profileData.privacy_settings?.onboarding_data?.legal_first_name !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>Legal Name</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.legal_first_name} {profileData.onboarding_data.legal_last_name}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.date_of_birth && profileData.privacy_settings?.onboarding_data?.date_of_birth !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.date_of_birth}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {new Date(profileData.onboarding_data.date_of_birth).toLocaleDateString()}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.citizenship_country && profileData.privacy_settings?.onboarding_data?.citizenship_country !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.citizenship_country}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.citizenship_country.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.residence_country && profileData.privacy_settings?.onboarding_data?.residence_country !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.residence_country}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.residence_country.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                {/* Contact Group */}
                <Box bg="rgba(120,120,128,0.06)" px={4} py={2} borderBottom={`1px solid ${tokens.separator}`} mt={2}>
                  <Text fontSize="13px" fontWeight="600" color={tokens.secondary}>CONTACT & ADDRESS</Text>
                </Box>
                <VStack align="stretch" spacing={0} divider={<Box borderBottom={`1px solid ${tokens.separator}`} />}>
                  {profileData.onboarding_data.address_line_1 && profileData.privacy_settings?.onboarding_data?.address_line_1 !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>Address</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label} textAlign="right">
                        {profileData.onboarding_data.address_line_1}
                        {profileData.onboarding_data.address_line_2 && `, ${profileData.onboarding_data.address_line_2}`}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.city && profileData.onboarding_data.state && 
                   profileData.privacy_settings?.onboarding_data?.city !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>City & State</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.city}, {profileData.onboarding_data.state}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.zip_code && profileData.privacy_settings?.onboarding_data?.zip_code !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.zip_code}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        {profileData.onboarding_data.zip_code}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                {/* Investment Details Group */}
                <Box bg="rgba(120,120,128,0.06)" px={4} py={2} borderBottom={`1px solid ${tokens.separator}`} mt={2}>
                  <Text fontSize="13px" fontWeight="600" color={tokens.secondary}>INVESTMENT DETAILS</Text>
                </Box>
                <VStack align="stretch" spacing={0} divider={<Box borderBottom={`1px solid ${tokens.separator}`} />}>
                  {profileData.onboarding_data.initial_investment_amount && 
                   profileData.privacy_settings?.onboarding_data?.initial_investment_amount !== false && (
                    <HStack justify="space-between" px={4} py={3}>
                      <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.initial_investment_amount}</Text>
                      <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                        ${Number(profileData.onboarding_data.initial_investment_amount).toLocaleString()}
                      </Text>
                    </HStack>
                  )}
                  {profileData.onboarding_data.recurring_investment_enabled && 
                   profileData.privacy_settings?.onboarding_data?.recurring_investment_enabled !== false && (
                    <>
                      <HStack justify="space-between" px={4} py={3}>
                        <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.recurring_investment_enabled}</Text>
                        <Text fontSize="14px" fontWeight="600" color={tokens.green}>
                          Enabled
                        </Text>
                      </HStack>
                      {profileData.onboarding_data.recurring_amount && profileData.privacy_settings?.onboarding_data?.recurring_amount !== false && (
                        <HStack justify="space-between" px={4} py={3}>
                          <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.recurring_amount}</Text>
                          <Text fontSize="14px" fontWeight="600" color={tokens.label}>
                            ${Number(profileData.onboarding_data.recurring_amount).toLocaleString()}
                          </Text>
                        </HStack>
                      )}
                      {profileData.onboarding_data.recurring_frequency && profileData.privacy_settings?.onboarding_data?.recurring_frequency !== false && (
                        <HStack justify="space-between" px={4} py={3}>
                          <Text fontSize="14px" color={tokens.secondary}>{ONBOARDING_FIELD_LABELS.recurring_frequency}</Text>
                          <Text fontSize="14px" fontWeight="600" color={tokens.label} textTransform="capitalize">
                            {profileData.onboarding_data.recurring_frequency.replace(/_/g, ' ')}
                          </Text>
                        </HStack>
                      )}
                    </>
                  )}
                </VStack>
              </Box>
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

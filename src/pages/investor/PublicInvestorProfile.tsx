import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box, Heading, Text, VStack, HStack, Badge,
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Button, useToast,
  Icon, IconButton, useClipboard, Spinner,
} from "@chakra-ui/react";
import { Share2, Copy, Check } from "lucide-react";
import { PrimaryCtaButton } from "../../components/PrimaryCtaButton";
import { fetchPublicInvestorProfileBySlug } from "../../services/investorProfile";
import { maskProfileData } from "../../utils/maskSensitiveData";
import { InvestorProfile, FIELD_LABELS, VALUE_LABELS } from "../../types/investorProfile";

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

  if (loading) {
    return (
      <Box minH="100vh" bg="#F5F7F9" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="#00A9E0" thickness="4px" />
          <Text color="#6b7280">Loading investor profile...</Text>
        </VStack>
      </Box>
    );
  }

  if (!profileData) {
    return null;
  }

  const maskedData = maskProfileData(profileData);
  const investorProfile: InvestorProfile = profileData.investor_profile;

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

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.7) return <Badge colorScheme="green">High Confidence</Badge>;
    if (confidence >= 0.4) return <Badge colorScheme="yellow">Medium Confidence</Badge>;
    return <Badge colorScheme="red">Low Confidence</Badge>;
  };

  // Get OG image URL
  const ogImageUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/investor-og-image?slug=${slug}`;

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

      <Box minH="100vh" bg="linear-gradient(to bottom, #F5F7F9, #E6F4FF)" py={10}>
        <Box maxW="1200px" mx="auto" px={4}>
          {/* Header Card with Share */}
          <Box bg="white" rounded="xl" shadow="lg" p={8} mb={6}>
            <VStack align="start" spacing={4}>
              <HStack justify="space-between" w="full" flexWrap="wrap">
                <VStack align="start" spacing={1}>
                  <Badge colorScheme="blue" px={3} py={1} fontSize="xs">
                    🏆 Verified Investor Profile
                  </Badge>
                  <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="#1c1c1c">
                    {maskedData.name}
                  </Heading>
                </VStack>
                
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Share profile"
                    icon={<Icon as={Share2} />}
                    onClick={handleShare}
                    colorScheme="blue"
                    variant="outline"
                    size="md"
                  />
                  <IconButton
                    aria-label="Copy link"
                    icon={hasCopied ? <Icon as={Check} /> : <Icon as={Copy} />}
                    onClick={onCopy}
                    colorScheme={hasCopied ? "green" : "gray"}
                    variant="outline"
                    size="md"
                  />
                </HStack>
              </HStack>

              <HStack spacing={4} flexWrap="wrap">
                <Badge px={3} py={1} colorScheme="purple">{maskedData.email}</Badge>
                <Badge px={3} py={1} colorScheme="orange">Age {maskedData.age}</Badge>
                <Badge px={3} py={1} colorScheme="green">{maskedData.phone}</Badge>
                {maskedData.organisation && (
                  <Badge px={3} py={1} colorScheme="cyan">{maskedData.organisation}</Badge>
                )}
              </HStack>

              <Text fontSize="sm" color="#6b7280">
                This is a public investor profile. Contact details are masked for privacy.
              </Text>
            </VStack>
          </Box>

          {/* Investment Profile Details */}
          <Box bg="white" rounded="xl" shadow="lg" p={6}>
            <Heading as="h2" fontSize="xl" fontWeight="600" color="#1c1c1c" mb={4}>
              📊 Investment Profile
            </Heading>

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
                      <HStack justify="space-between" w="full" flexWrap="wrap">
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

                  <AccordionPanel pb={4} pt={3} px={4} bg="white">
                    <VStack align="stretch" spacing={2}>
                      <Box>
                        <Text fontSize="xs" fontWeight="600" color="#434343" mb={1}>
                          AI Analysis:
                        </Text>
                        <Text fontSize="xs" color="#434343">
                          {fieldData.rationale}
                        </Text>
                      </Box>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          {/* Call to Action */}
          <Box 
            bgGradient="linear(to-r, cyan.50, blue.50)" 
            rounded="xl" 
            p={8} 
            mt={6} 
            textAlign="center"
            border="1px solid"
            borderColor="blue.100"
          >
            <VStack spacing={4}>
              <Heading as="h3" fontSize="xl" color="#1c1c1c">
                Want your own investor profile?
              </Heading>
              <Text color="#6b7280">
                Create your AI-powered investor profile in minutes and share it anywhere.
              </Text>
              <PrimaryCtaButton onClick={() => navigate('/investor-profile')}>
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

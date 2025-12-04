import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import resources from "../../resources/resources";
import { InvestorProfile, FIELD_LABELS, VALUE_LABELS } from "../../types/investorProfile";

interface InvestorProfileData {
  user_id: string;
  name: string;
  email: string;
  age: number;
  phone_country_code: string;
  phone_number: string;
  organisation: string | null;
  investor_profile: InvestorProfile;
  confirmed_at: string;
}

const ViewPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id: routeUserId } = useParams();
  const [profileData, setProfileData] = useState<InvestorProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = resources.config.supabaseClient;
        if (!supabase) {
          throw new Error("Supabase client not available");
        }

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        // Use routeUserId if provided, otherwise use current user's id
        const userIdToFetch = routeUserId || user?.id;
        
        if (!userIdToFetch) {
          navigate("/login");
          return;
        }

        // Fetch investor profile from Supabase
        const { data, error } = await supabase
          .from("investor_profiles")
          .select("*")
          .eq("user_id", userIdToFetch)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          toast({
            title: "No Profile Found",
            description: "Create your investor profile first",
            status: "info",
            duration: 4000,
          });
          navigate("/hushh-user-profile");
          return;
        }

        setProfileData(data);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load profile",
          status: "error",
          duration: 5000,
        });
        // Redirect to profile creation if no profile exists
        navigate("/hushh-user-profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [routeUserId, navigate, toast]);

  if (loading) {
    return (
      <Box minH="100vh" bg="#FFFFFF" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading profile...</Text>
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box minH="100vh" bg="#FFFFFF" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="xl" color="#434343">No profile found</Text>
          <Button
            size="md"
            h="54px"
            borderRadius="16px"
            fontSize="17px"
            fontWeight="650"
            color="#0B1120"
            bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
            transition="transform 120ms ease-out, filter 120ms ease-out"
            _active={{ transform: "scale(0.985)", filter: "brightness(0.94)" }}
            _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
            onClick={() => navigate("/hushh-user-profile")}
          >
            Create Profile
          </Button>
        </VStack>
      </Box>
    );
  }

  const investorProfile = profileData.investor_profile;
  const profileUrl = `https://hushhtech.com/investor/${profileData.user_id}`;

  return (
    <Box minH="100vh" bg="#FFFFFF" py={{ base: 6, md: 8 }} px={{ base: 6, md: 8 }}>
      <VStack spacing={8} align="stretch" maxW="760px" mx="auto">
        {/* Top row */}
        <HStack justify="space-between" align="center" spacing={3}>
          <Badge
            px={3}
            py={1.5}
            h="32px"
            borderRadius="999px"
            border="1px solid rgba(0,169,224,0.55)"
            bg="#FFFFFF"
            color="#00A9E0"
            fontSize="12px"
            fontWeight="700"
            letterSpacing="0.14em"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            <Trophy size={16} strokeWidth={1.5} color="#EAB308" />
            Verified Investor
          </Badge>
          <HStack spacing={2}>
            <IconButton
              aria-label="Share profile"
              icon={<ExternalLink size={18} color="#475569" />}
              borderRadius="12px"
              border="1px solid #E5E7EB"
              bg="#FFFFFF"
              minW="44px"
              h="44px"
              _hover={{ bg: "#F9FAFB" }}
              onClick={() => window.open(profileUrl, "_blank")}
            />
            <IconButton
              aria-label="Copy link"
              icon={<CopyIcon size={18} color="#475569" />}
              borderRadius="12px"
              border="1px solid #E5E7EB"
              bg="#FFFFFF"
              minW="44px"
              h="44px"
              _hover={{ bg: "#F9FAFB" }}
              onClick={() => {
                navigator.clipboard.writeText(profileUrl);
                toast({ title: "Copied", status: "success", duration: 1200, isClosable: false });
              }}
            />
          </HStack>
        </HStack>

        {/* Identity */}
        <VStack align="stretch" spacing={3}>
          <Heading fontSize="34px" fontWeight="700" lineHeight="1.1" color="#0B1120">
            {profileData.name}
          </Heading>
          <HStack spacing={2.5} flexWrap="wrap">
            {[
              maskEmail(profileData.email),
              `Age ${profileData.age}`,
              maskPhone(profileData.phone_country_code, profileData.phone_number),
            ].map((chip) => (
              <Box
                key={chip}
                h="34px"
                px={3}
                borderRadius="999px"
                border="1px solid #E5E7EB"
                bg="#F9FAFB"
                fontSize="14px"
                fontWeight="600"
                color="#475569"
                display="inline-flex"
                alignItems="center"
              >
                {chip}
              </Box>
            ))}
          </HStack>
          <Text fontSize="16px" lineHeight="1.6" color="#6B7280" mt={1}>
            This is a public investor profile. Contact details are masked for privacy.
          </Text>
          <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mt={3}>
            <Box
              position="absolute"
              left={0}
              top="50%"
              transform="translateY(-50%)"
              w="16px"
              h="2px"
              bg="#00A9E0"
            />
          </Box>
        </VStack>

        {/* Investment Profile */}
        <Box>
          <Text fontSize="20px" fontWeight="700" color="#0B1120" mb={3}>
            Investment Profile
          </Text>
          <Box border="1px solid #E5E7EB" borderRadius="18px" bg="#FFFFFF" overflow="hidden">
            <Accordion allowToggle>
              {Object.entries(investorProfile).map(([fieldName, fieldData]: [string, any], idx) => {
                const label = FIELD_LABELS[fieldName as keyof typeof FIELD_LABELS] || fieldName;
                const valueText = Array.isArray(fieldData.value)
                  ? fieldData.value.map((v: string) => VALUE_LABELS[v as keyof typeof VALUE_LABELS] || v).join(", ")
                  : VALUE_LABELS[fieldData.value as keyof typeof VALUE_LABELS] || fieldData.value;
                const pill = pillForConfidence(fieldData.confidence);
                return (
                  <AccordionItem
                    key={fieldName}
                    border="none"
                    borderBottom={idx < Object.keys(investorProfile).length - 1 ? "1px solid #E5E7EB" : "none"}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          px={4}
                          py={4}
                          minH="76px"
                          bg={isExpanded ? "#FAFAFB" : "transparent"}
                          _hover={{ bg: "rgba(0,0,0,0.02)" }}
                          position="relative"
                        >
                          {isExpanded && (
                            <Box
                              position="absolute"
                              left={0}
                              top="50%"
                              transform="translateY(-50%)"
                              h="28px"
                              w="2px"
                              bg="#00A9E0"
                              borderRadius="full"
                            />
                          )}
                          <HStack w="full" align="flex-start" spacing={3} justify="space-between">
                            <VStack align="start" spacing={1} flex="1" pr={3}>
                              <Text fontSize="18px" fontWeight="650" color="#0B1120" lineHeight="1.25">
                                {label}
                              </Text>
                              <Text fontSize="16px" fontWeight="500" color="#6B7280" noOfLines={2}>
                                {valueText}
                              </Text>
                            </VStack>
                            <HStack spacing={3} align="center">
                              <Badge
                                px={3}
                                py={1}
                                h="28px"
                                borderRadius="999px"
                                textTransform="uppercase"
                                letterSpacing="0.12em"
                                fontSize="12px"
                                fontWeight="800"
                                color={pill.color}
                                bg={pill.bg}
                                border={`1px solid ${pill.border}`}
                              >
                                {pill.label}
                              </Badge>
                              <AccordionIcon color="#6B7280" />
                            </HStack>
                          </HStack>
                        </AccordionButton>
                        <AccordionPanel px={4} pt={0} pb={4} bg="#FAFAFB">
                          <VStack align="stretch" spacing={3}>
                            <Text fontSize="14px" fontWeight="650" color="#0B1120">
                              AI Rationale:
                            </Text>
                            <Text fontSize="15px" color="#475569" lineHeight="1.6">
                              {fieldData.rationale}
                            </Text>
                          </VStack>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        </Box>

        {/* Action */}
        <Button
          w="full"
          h="54px"
          borderRadius="16px"
          fontSize="17px"
          fontWeight="650"
          color="#0B1120"
          bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
          transition="transform 120ms ease-out, filter 120ms ease-out"
          _active={{ transform: "scale(0.985)", filter: "brightness(0.94)" }}
          _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
          onClick={() => navigate("/hushh-user-profile")}
        >
          Update Profile
        </Button>
        <Text fontSize="14px" color="#6B7280" textAlign="center">
          These details personalise your investor profile.
        </Text>
      </VStack>
    </Box>
  );
};

export default ViewPreferencesPage;

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

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.7) return <Badge colorScheme="green">High</Badge>;
    if (confidence >= 0.4) return <Badge colorScheme="yellow">Medium</Badge>;
    return <Badge colorScheme="red">Low</Badge>;
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="#F5F7F9" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading profile...</Text>
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box minH="100vh" bg="#F5F7F9" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="xl" color="#434343">No profile found</Text>
          <Button
            bg="rgba(153, 40, 112, 1)"
            color="white"
            _hover={{ bg: "black" }}
            onClick={() => navigate("/hushh-user-profile")}
          >
            Create Profile
          </Button>
        </VStack>
      </Box>
    );
  }

  const investorProfile = profileData.investor_profile;

  return (
    <Box minH="100vh" bg="#F5F7F9" py={10}>
      <Box maxW="1200px" mx="auto" px={4}>
        {/* Header Card */}
        <Box bg="white" rounded="xl" shadow="sm" p={8} mb={6}>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="700" color="rgba(61,61,145,1)" textTransform="uppercase">
                  Investor Profile
                </Text>
                <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="#1c1c1c">
                  {profileData.name}
                </Heading>
              </VStack>
              <Button
                size="sm"
                bg="rgba(153, 40, 112, 1)"
                color="white"
                _hover={{ bg: "black" }}
                onClick={() => navigate("/hushh-user-profile")}
              >
                Edit Profile
              </Button>
            </HStack>

            <HStack spacing={4} flexWrap="wrap">
              <Badge px={3} py={1} colorScheme="blue">{profileData.email}</Badge>
              <Badge px={3} py={1} colorScheme="purple">Age {profileData.age}</Badge>
              <Badge px={3} py={1} colorScheme="green">
                {profileData.phone_country_code} {profileData.phone_number}
              </Badge>
              {profileData.organisation && (
                <Badge px={3} py={1} colorScheme="orange">{profileData.organisation}</Badge>
              )}
            </HStack>

            <Text fontSize="sm" color="#434343">
              Profile created on {new Date(profileData.confirmed_at).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>

        {/* Investor Profile Fields */}
        <Box bg="white" rounded="xl" shadow="sm" p={6}>
          <Heading as="h2" fontSize="xl" fontWeight="600" color="#1c1c1c" mb={4}>
            Investment Profile Details
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

                <AccordionPanel pb={4} pt={3} px={4} bg="white">
                  <VStack align="stretch" spacing={2}>
                    <Box>
                      <Text fontSize="xs" fontWeight="600" color="#434343" mb={1}>
                        AI Rationale:
                      </Text>
                      <Text fontSize="xs" color="#434343">
                        {fieldData.rationale}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" fontWeight="600" color="#434343">
                        Confidence: {Math.round(fieldData.confidence * 100)}%
                      </Text>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        {/* Action Buttons */}
        <HStack justify="center" mt={8} spacing={4}>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            colorScheme="gray"
          >
            Back to Home
          </Button>
          <Button
            bg="rgba(153, 40, 112, 1)"
            color="white"
            _hover={{ bg: "black" }}
            onClick={() => navigate("/hushh-user-profile")}
          >
            Update Profile
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ViewPreferencesPage;

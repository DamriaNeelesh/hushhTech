import { useState, useEffect } from "react";
import { Box, Container, Spinner, Center, Text, VStack, HStack, IconButton, useToast, Button, Icon, Badge, Image, VisuallyHidden } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, CopyIcon } from "@chakra-ui/icons";
import { Share2 } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { InvestorProfileForm } from "../../components/investorProfile/InvestorProfileForm";
import { InvestorProfileReview } from "../../components/investorProfile/InvestorProfileReview";
import { 
  createInvestorProfile, 
  updateInvestorProfile, 
  fetchInvestorProfile 
} from "../../services/investorProfile";
import { 
  InvestorProfileInput, 
  InvestorProfileRecord,
  InvestorProfile 
} from "../../types/investorProfile";
import resources from "../../resources/resources";
import { downloadHushhGoldPass } from "../../services/walletPass";

type FlowStep = "loading" | "form" | "review" | "complete";

function InvestorProfilePage() {
  const [step, setStep] = useState<FlowStep>("loading");
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<InvestorProfileRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [isApplePassLoading, setIsApplePassLoading] = useState(false);
  const [isGooglePassLoading, setIsGooglePassLoading] = useState(false);
  const [walletPassReady, setWalletPassReady] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const passReady = walletPassReady;

  // Check if user is authenticated and if profile already exists
  useEffect(() => {
    const checkExistingProfile = async () => {
      try {
        const supabase = resources.config.supabaseClient;
        if (!supabase) {
          throw new Error("Supabase client not initialized");
        }

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          // Redirect to login if not authenticated
          navigate("/login");
          return;
        }

        // Extract user data from OAuth (Google, etc.)
        const userName = user.user_metadata?.full_name || user.user_metadata?.name || "";
        const userEmail = user.email || "";
        
        setUserData({
          name: userName,
          email: userEmail,
        });

        // Check if profile exists
        const existingProfile = await fetchInvestorProfile();
        
        if (existingProfile) {
          if (existingProfile.user_confirmed) {
            // Profile already confirmed, redirect to dashboard or profile view
            navigate("/hushh-user-profile");
          } else {
            // Profile exists but not confirmed, show review
            setProfile(existingProfile);
            setStep("review");
          }
        } else {
          // No profile, show form
          setStep("form");
        }
      } catch (err) {
        console.error("Error checking profile:", err);
        setError(err instanceof Error ? err.message : "Failed to check profile");
        setStep("form"); // Fallback to form
      }
    };

    checkExistingProfile();
  }, [navigate]);

  const handleFormSubmit = async (input: InvestorProfileInput) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create profile with AI generation
      const newProfile = await createInvestorProfile(input);
      setProfile(newProfile);
      setStep("review");
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to create profile");
      throw err; // Re-throw to let form component handle it
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerWalletPassDownload = async (
    wallet: "apple" | "google",
    setLoading: (value: boolean) => void
  ) => {
    if (!profile) return;

    setLoading(true);
    try {
      await downloadHushhGoldPass({
        name: profile.name,
        email: profile.email,
        organisation: profile.organisation,
        slug: profile.slug,
        userId: profile.user_id,
      });

      setWalletPassReady(true);
      toast({
        title: `Hushh Gold card ready for ${wallet === "apple" ? "Apple Wallet" : "Google Wallet"}`,
        description:
          wallet === "apple"
            ? "Open the downloaded pass to add it to Apple Wallet."
            : "Open the downloaded pass to add it to Google Wallet.",
        status: "success",
        duration: 4000,
      });
    } catch (err) {
      toast({
        title: `${wallet === "apple" ? "Apple" : "Google"} Wallet card failed`,
        description: err instanceof Error ? err.message : "Could not generate your Hushh Gold pass.",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileConfirm = async (updates: Partial<InvestorProfile>) => {
    if (!profile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Update profile with user edits and mark as confirmed
      await updateInvestorProfile({
        investor_profile: updates,
        user_confirmed: true,
      });

      setStep("complete");
      await triggerWalletPassDownload("apple", setIsApplePassLoading);
    } catch (err) {
      console.error("Error confirming profile:", err);
      setError(err instanceof Error ? err.message : "Failed to confirm profile");
      throw err; // Re-throw to let review component handle it
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state
  if (step === "loading") {
    return (
      <Container maxW="container.xl" py={20}>
        <Center>
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text>Loading your profile...</Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  // Complete state
  if (step === "complete") {
    const profileUrl = `https://hushhtech.com/investor/${profile?.slug}`;
    
    const handleCopyURL = () => {
      navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Link copied!",
        description: "Share it with anyone",
        status: "success",
        duration: 2000,
      });
    };

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${profile?.name}'s Investor Profile`,
            text: "Check out my investor profile on Hushh",
            url: profileUrl,
          });
        } catch (err) {
          // User cancelled or share failed
          handleCopyURL();
        }
      } else {
        handleCopyURL();
      }
    };

    return (
      <Container maxW="container.md" py={12}>
        <Center>
          <VStack spacing={6} w="full">
            <CheckCircleIcon boxSize={16} color="green.500" />
            
            <Text fontSize="2xl" fontWeight="500" color="green.500" textAlign="center">
              ✓ Profile Created Successfully!
            </Text>
            
            <Text fontSize="md" color="gray.600" textAlign="center">
              Your public profile is now live and ready to share!
            </Text>

            {/* URL Display Box */}
            <Box
              w="full"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
            >
              <Text fontSize="sm" color="gray.600" mb={2} fontWeight="medium">
                📍 Your Public Profile URL:
              </Text>
              
              <HStack
                bg="white"
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.300"
                spacing={2}
              >
                <Text
                  fontSize="sm"
                  color="blue.600"
                  fontWeight="medium"
                  flex={1}
                  isTruncated
                >
                  {profileUrl}
                </Text>
                <IconButton
                  icon={<CopyIcon />}
                  onClick={handleCopyURL}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="Copy URL"
                />
              </HStack>

              <HStack mt={4} spacing={2}>
                <Button
                  leftIcon={<Icon as={Share2} />}
                  onClick={handleShare}
                  colorScheme="blue"
                  size="sm"
                  flex={1}
                >
                  Share Profile
                </Button>
                <Button
                  onClick={handleCopyURL}
                  variant="outline"
                  size="sm"
                  flex={1}
                >
                  Copy Link
                </Button>
              </HStack>
            </Box>

            <Box
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
              boxShadow="0 10px 30px rgba(15, 23, 42, 0.06)"
            >
              <HStack spacing={4} justify="center">
                <Button
                  aria-label="Add to Apple Wallet"
                  onClick={() => triggerWalletPassDownload("apple", setIsApplePassLoading)}
                  isLoading={isApplePassLoading}
                  loadingText=""
                  spinner={<Spinner size="sm" color="#0B1120" />}
                  bg="white"
                  color="#0B1120"
                  borderRadius="12px"
                  border="1px solid #0B1120"
                  h="44px"
                  minW="120px"
                  px={4}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  _hover={{ bg: "#F8FAFC" }}
                  _active={{ bg: "#F1F5F9", transform: "scale(0.98)" }}
                >
                  {/* <Icon as={FaApple} boxSize={6} /> */}
                  {/* <VisuallyHidden>Add to Apple Wallet</VisuallyHidden> */}
                </Button>
                <Button
                  aria-label="Add to Google Wallet"
                  onClick={() => triggerWalletPassDownload("google", setIsGooglePassLoading)}
                  isLoading={isGooglePassLoading}
                  loadingText=""
                  spinner={<Spinner size="sm" color="#0B1120" />}
                  bg="white"
                  color="#0B1120"
                  borderRadius="12px"
                  border="1px solid #0B1120"
                  h="44px"
                  minW="120px"
                  px={4}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  _hover={{ bg: "#F8FAFC" }}
                  _active={{ bg: "#F1F5F9", transform: "scale(0.98)" }}
                >
                  {/* <Icon as={FaGoogle} boxSize={6} /> */}
                  {/* <VisuallyHidden>Add to Google Wallet</VisuallyHidden> */}
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Center>
      </Container>
    );
  }

  // Error state
  if (error && step === "form") {
    return (
      <Container maxW="container.xl" py={20}>
        <Center>
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="500" color="red.500">
              Error
            </Text>
            <Text color="gray.600">{error}</Text>
            <Text fontSize="sm" color="gray.500">
              Please try again or contact support
            </Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.xl">
        {step === "form" && (
          <InvestorProfileForm
            onSubmit={handleFormSubmit}
            isLoading={isProcessing}
            initialData={userData}
          />
        )}

        {step === "review" && profile && (
          <InvestorProfileReview
            profile={profile}
            onConfirm={handleProfileConfirm}
            isLoading={isProcessing}
          />
        )}
      </Container>
    </Box>
  );
}

export default InvestorProfilePage;

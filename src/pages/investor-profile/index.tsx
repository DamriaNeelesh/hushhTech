import { useState, useEffect } from "react";
import { Box, Container, Spinner, Center, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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

type FlowStep = "loading" | "form" | "review" | "complete";

function InvestorProfilePage() {
  const [step, setStep] = useState<FlowStep>("loading");
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<InvestorProfileRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      
      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate("/hushh-user-profile");
      }, 2000);
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
    return (
      <Container maxW="container.xl" py={20}>
        <Center>
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              ✓ Profile Created Successfully!
            </Text>
            <Text color="gray.600">
              Redirecting to your dashboard...
            </Text>
            <Spinner size="lg" color="blue.500" />
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
            <Text fontSize="xl" fontWeight="bold" color="red.500">
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

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  Badge,
  Icon,
  useToast,
  SimpleGrid,
  Flex,
  Center,
  HStack,
  Container,
} from "@chakra-ui/react";
import { PrimaryCtaButton } from "../PrimaryCtaButton";
import { FaFileAlt, FaUserShield } from "react-icons/fa";
import { CheckCircleIcon, InfoIcon } from "lucide-react";
import HushhLogo from "../images/Hushhogo.png";
import NDARequestModal from "../NDARequestModal";
import NDADocumentModal from "../NDADocumentModal";
import axios from "axios";
import config from "../../resources/config/config";
import { useNavigate } from "react-router-dom";

const ApprovedGif = "/gif/nda_approved.gif";
const PendingGif = "/gif/nda_pending.gif";
const RejectedGif = "/gif/nda_rejected.gif";
const NotappliedGif = "/gif/nda_notApplied.gif";

const ProfilePage: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const navigate = useNavigate();

  const [session, setSession] = useState<any>(null);
  const [ndaStatus, setNdaStatus] = useState<string>("Not Applied");
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [showNdaDocModal, setShowNdaDocModal] = useState(false);
  const [ndaApproved, setNdaApproved] = useState(false);
  const [isMetadataLoading, setIsMetadataLoading] = useState(false);
  const metadataFetchedRef = useRef<boolean>(false);

  const [kycStatus, setKycStatus] = useState<string>('');
  const [kycStatusLoading, setKycStatusLoading] = useState<boolean>(false);
  const [kycStatusMessage, setKycStatusMessage] = useState<string>('');

  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } =
      config.supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const checkNdaStatus = useCallback(async () => {
    if (!session) return;
    try {
      const response = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/check_access_status",
        {},
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const newStatus = response.data;
      setNdaStatus(newStatus);
      
      if (newStatus === "Approved") {
        setNdaApproved(true);
      }
      
      if (newStatus === "Pending: Waiting for NDA Process" && !metadataFetchedRef.current) {
        fetchNdaMetadata();
      }
    } catch (error) {
      metadataFetchedRef.current = false;
      // Silently fail NDA status check to avoid noisy user-facing toasts
      // This can be logged for debugging if needed:
      console.warn("Failed to check NDA access status", error);
    }
  }, [session, toast]);

  useEffect(() => {
    if (session) {
      checkNdaStatus();
      const intervalId = setInterval(() => {
        checkNdaStatus();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [session, checkNdaStatus]);

  const fetchNdaMetadata = async () => {
    if (isMetadataLoading || (ndaMetadata && Object.keys(ndaMetadata).length > 0) || metadataFetchedRef.current) {
      return;
    }
    
    setIsMetadataLoading(true);
    try {
      console.log("Fetching NDA metadata...");
      const ndaResponse = await axios.post(
        "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/get_nda_metadata",
        {},
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (ndaResponse.data.status === "success") {
        const metadata = ndaResponse.data.metadata;
        setNdaMetadata(metadata);
        
        if (metadata && Object.keys(metadata).length > 0) {
          console.log("Metadata fetched successfully");
          metadataFetchedRef.current = true;
        }
        
        if (metadata && ndaStatus === "Pending: Waiting for NDA Process") {
          setShowNdaDocModal(true);
        }
      } else {
        if (ndaStatus === "Pending: Waiting for NDA Process") {
          toast({
            title: "Error",
            description: ndaResponse.data.message || "Error fetching NDA metadata.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      metadataFetchedRef.current = false;
      toast({
        title: "Error",
        description: "Failed to fetch NDA metadata.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsMetadataLoading(false);
    }
  };

  useEffect(() => {
    if (ndaStatus !== "Pending: Waiting for NDA Process") {
      metadataFetchedRef.current = false;
    }
  }, [ndaStatus]);

  const handleDownloadNda = async () => {
    const FETCH_NDA_URL =
      "https://hushhtech-nda-generation-53407187172.us-central1.run.app/fetch-nda";
    
    const loadingToastId = toast({
      title: "Preparing Download",
      description: "Generating your NDA document for download, please wait...",
      status: "loading",
      duration: null,
      isClosable: false,
    });
    
    try {
      console.log("Fetching NDA document for download...");
      const response = await axios.get(FETCH_NDA_URL, {
        headers: {
          "jwt-token": session.access_token,
        },
        responseType: "blob",
      });
      
      toast.close(loadingToastId);
      
      if (response.status === 200) {
        toast({
          title: "Download Ready",
          description: "Your NDA document is ready to download.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "NDA.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        
        window.URL.revokeObjectURL(url);
      } else {
        toast({
          title: "Download Error",
          description: "Unexpected response code: " + response.status,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.close(loadingToastId);
      
      console.error("Error downloading NDA:", error);
      toast({
        title: "Download Error",
        description: "Failed to download NDA. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const getNdaButtonProps = () => {
    if (ndaStatus === "Approved") {
      return { text: "Download Your NDA", disabled: false, bgClass: "blue-gradient-bg" };
    } else if (ndaStatus === "Not Applied") {
      return { text: "Start NDA Process", disabled: false, bgClass: "blue-gradient-bg" };
    } else if (ndaStatus === "Requested permission for the sensitive file." || ndaStatus === "Pending") {
      return { text: "Waiting for approval", disabled: true, bgClass: "" };
    } else if (ndaStatus === "Pending: Waiting for NDA Process") {
      return { text: "Sign NDA Document", disabled: false, bgClass: "blue-gradient-bg" };
    } else if (ndaStatus === "Rejected") {
      return { text: "Re-apply for NDA Process", disabled: false, bgClass: "blue-gradient-bg" };
    }
    return { text: "Start NDA Process", disabled: false, bgClass: "blue-gradient-bg" };
  };

  const { text: ndaButtonText, disabled: ndaButtonDisabled } = getNdaButtonProps();

  const handleNdaAccepted = () => {
    setNdaStatus("Approved");
    setNdaApproved(true);
  };

  const handleStartNdaProcess = () => {
    if (ndaStatus === "Approved") {
      handleDownloadNda();
      return;
    } else if (ndaStatus === "Not Applied" || ndaStatus === "Rejected") {
      navigate("/nda-form");
    } else if (ndaStatus === "Pending: Waiting for NDA Process") {
      if (ndaMetadata) {
        setShowNdaDocModal(true);
      } else {
        fetchNdaMetadata();
      }
    }
  };

  const handleViewPublicDocs = () => {
    localStorage.setItem("communityFilter", "all");
    navigate("/community");
  };

  const handleViewPrivateDocs = () => {
    if (ndaStatus === "Approved") {
      localStorage.setItem("communityFilter", "nda");
      navigate("/community");
    }
  };

  const getStatusIndicator = (status: string) => {
    if (status === "Not Started") {
      return (
        <Badge px={3} py={1} bg="gray.600" color="white" borderRadius="full" fontSize="xs">
          Not Started
        </Badge>
      );
    } else if (status === "Coming Soon") {
      return (
        <Badge px={3} py={1} bg="blue.900" color="blue.300" borderRadius="full" fontSize="xs">
          Coming Soon
        </Badge>
      );
    }
    return null;
  };

  useEffect(() => {
    async function fetchKycStatus() {
      if (!session?.user?.email) return;
      setKycStatusLoading(true);
      try {
        const response = await fetch(`https://hushh-techh.onrender.com/api/admin/kyc-verification-status/${session.user.email}`);
        const data = await response.json();
        setKycStatus(data.status || 'Not Applied');
        setKycStatusMessage(data.message || '');
      } catch (error) {
        setKycStatus('Not Applied');
        setKycStatusMessage('');
      } finally {
        setKycStatusLoading(false);
      }
    }
    fetchKycStatus();
    const intervalId = setInterval(() => {
      fetchKycStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [session?.user?.email]);

  return (
    <Box
      bg="#FFFFFF"
      px={{ base: 6, sm: 8 }}
      pt={{ base: "56px", md: "88px" }}
      pb={{ base: "48px", md: "96px" }}
      minH={{ base: "100vh", md: "auto" }}
      display={{ base: "flex", md: "block" }}
      alignItems={{ base: "center", md: "initial" }}
    >
      <Container maxW="640px">
        <Box>
          <Box maxW="520px" mx="auto">
            {/* Hushh Logo */}
            <Box display="flex" justifyContent="center" mb={{ base: "32px", md: "40px" }}>
              <Image 
                src={HushhLogo} 
                alt="Hushh Logo" 
                h={{ base: "50px", md: "60px" }}
                objectFit="contain"
              />
            </Box>

            {/* Main Heading */}
            <Text
              fontSize={{ base: "36px", md: "44px" }}
              fontWeight="500"
              color="#0B1120"
              lineHeight="1.1"
              textAlign="center"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
              mb="5"
              letterSpacing="-0.01em"
            >
              Invest in a better alternative
            </Text>

            {/* Subheading */}
            <Text
              fontSize={{ base: "18px", md: "19px" }}
              color="#475569"
              fontWeight="400"
              lineHeight="1.65"
              maxW="520px"
              mx="auto"
              textAlign="center"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
              mb="8"
            >
              Build a portfolio of private assets like real estate, private credit, and venture capital.
            </Text>

            {/* Blue Divider Line */}
            <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mb="7">
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                w="16px"
                h="2px"
                bg="#00A9E0"
              />
            </Box>

            {/* CTA Button */}
            <Button
              onClick={() => navigate("/onboarding/step-1")}
              w="100%"
              h="54px"
              borderRadius="16px"
              bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
              color="#0B1120"
              fontSize="17px"
              fontWeight="500"
              letterSpacing="0.01em"
              _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
              _active={{
                transform: "scale(0.985)",
                bgGradient: "linear(to-r, #0097CB, #5FC3E5)",
              }}
              transition="transform 120ms ease-out, background 120ms ease-out"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
            >
              Create your hushh profile
            </Button>
          </Box>
        </Box>
      </Container>

      {false && showNdaModal && session && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
          onSubmit={(result: string) => {
            setNdaStatus(result);
            setShowNdaModal(false);
            
            if (result === "Pending: Waiting for NDA Process") {
              fetchNdaMetadata();
            }
          }}
        />
      )}
      
      {false && showNdaDocModal && ndaMetadata && session && (
        <NDADocumentModal
          isOpen={showNdaDocModal}
          onClose={() => {
            setShowNdaDocModal(false);
          }}
          session={session}
          ndaMetadata={ndaMetadata}
          onAccept={() => {
            setNdaApproved(true);
            setShowNdaDocModal(false);
            setNdaStatus("Approved");
            localStorage.setItem("communityFilter", "nda");
          }}
        />
      )}
    </Box>
  );
};

export default ProfilePage;

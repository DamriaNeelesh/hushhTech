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
} from "@chakra-ui/react";
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
      toast({
        title: "API Error",
        description: "Failed to check NDA access status.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
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
    <Box bg="#FAFAFA" width="100%" minH="100vh">
      <Center pt={{ base: 10, md: 20 }} pb={10}>
        <VStack maxW="1200px" w="full" px={4} spacing={8}>
          <VStack spacing={2} mb={8} mt={{base: 10, md: 0}} w="full">
            <Text fontSize={{ base: "3xl", md: "4xl" }} className="text-5xl font-[300] text-[#1D1D1F] mb-3 tracking-tight" mt={8}>
              Hello {session?.user?.user_metadata?.full_name || "User"},
            </Text>
            <Text className="text-xl text-[#6E6E73] font-light">
              Please complete the required processes below to access investment information.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
            <Box className="bg-white p-10 rounded-2xl">
              <Text className="text-2xl font-medium text-[#1D1D1F] mb-6">
                Documents
              </Text>
              <Text className="text-[#6E6E73] mb-8 font-light leading-relaxed">
                Access private investment documents and reports
              </Text>
              
              <Button 
                w="full" 
                background={'linear-gradient(to right, #00A9E0, #6DD3EF)'}
                mb={4} 
                _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
                color={'white'}
                onClick={handleViewPublicDocs}
                className="mb-4"
              >
                View Public Documents
              </Button>
              
              <Button 
                w="full" 
                color={ndaStatus === "Approved" ? "white" : "gray.400"}
                background={ndaStatus === "Approved" ? "linear-gradient(to right, #00A9E0, #6DD3EF)" : "gray"}
                isDisabled={ndaStatus !== "Approved"}
                _hover={{ background: ndaStatus === "Approved" ? "linear-gradient(to right, #00A9E0, #6DD3EF)" : "gray" }}
                onClick={handleViewPrivateDocs}
                mb={4}
              >
                View Private Documents
              </Button>
              
              <Box className="w-full p-4 bg-gray-100 rounded-xl text-center text-[#6E6E73] font-light">
                {ndaStatus === "Approved" ? "NDA approved" : "NDA and KYC approval required for access"}
              </Box>
            </Box>

            <Box className="bg-white p-10 rounded-2xl">
              <Text className="text-2xl font-medium text-[#1D1D1F] mb-6 ">
                NDA Process
                <Box as="span" ml={2} mb={2} display="inline-block" verticalAlign="middle">
                  {ndaStatus === "Approved" && (
                    <Image src={ApprovedGif} alt="Approved" boxSize="14px" display="inline" />
                  )}
                  {(ndaStatus === "Pending: Waiting for NDA Process" ||
                    ndaStatus === "Pending" ||
                    ndaStatus === "Requested permission for the sensitive file.") && (
                    <Image src={PendingGif} alt="Pending" boxSize="14px" display="inline" />
                  )}
                  {ndaStatus === "Rejected" && (
                    <Image src={RejectedGif} alt="Rejected" boxSize="14px" display="inline" />
                  )}
                  {ndaStatus === "Not Applied" && (
                    <Image src={NotappliedGif} alt="Not Applied" boxSize="14px" display="inline" />
                  )}
                </Box>
                </Text>
              
              <Box mb={3}>
                <Badge 
                  colorScheme={ndaStatus === "Approved" ? "green" : "orange"}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {ndaStatus}
                </Badge>
              </Box>
              
              <Text className="text-[#6E6E73] mb-8 font-light leading-relaxed">
                {ndaStatus === "Pending: Waiting for NDA Process" 
                  ? "Please sign the NDA document to complete the process."
                  : "Complete NDA to access sensitive documents"
                }
              </Text>
              
              <Button
                w="full"
                background={ndaButtonDisabled ? "" : "linear-gradient(to right, #00A9E0, #6DD3EF)"}
                onClick={handleStartNdaProcess}
                color={ndaButtonDisabled ? "gray.400" : "white"}
                isDisabled={ndaButtonDisabled}
                _hover={{ background: "linear-gradient(to right, #0AADBC, #1CADBC)" }}
                mb={4}
              >
                {ndaButtonText}
              </Button>
              
              <Box className="w-full p-4 bg-gray-100 rounded-xl text-center text-[#6E6E73] font-light">
                {ndaStatus === "Approved" 
                  ? "Your NDA has been approved" 
                  : ndaStatus === "Pending: Waiting for NDA Process"
                    ? "NDA signing in progress"
                    : "NDA process required for document access"
                }
              </Box>
            </Box>

            <Box className="bg-white p-10 rounded-2xl">
              <Text className="text-2xl font-medium text-[#1D1D1F] mb-6">
                KYC Verification
                <Box as="span" ml={2} mb={2} display="inline-block" verticalAlign="middle">
                  {kycStatus === "Approved" && (
                    <Image src={ApprovedGif} alt="Approved" boxSize="14px" display="inline" />
                  )}
                  {(kycStatus === "Pending" || kycStatus === "In Review") && (
                    <Image src={PendingGif} alt="Pending" boxSize="14px" display="inline" />
                  )}
                  {kycStatus === "Rejected" && (
                    <Image src={RejectedGif} alt="Rejected" boxSize="14px" display="inline" />
                  )}
                  {kycStatus === "Not Applied" && (
                    <Image src={NotappliedGif} alt="Not Applied" boxSize="14px" display="inline" />
                  )}
                </Box>
              </Text>
              <Box mb={3}>
                <Badge 
                  colorScheme={kycStatus === "Approved" ? "green" : "orange"}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {kycStatus}
                </Badge>
              </Box>
              <Text className="text-[#6E6E73] mb-8 font-light leading-relaxed">
                {kycStatus === "Pending" || kycStatus === "In Review"
                  ? "Your KYC is under review. Please wait for approval."
                  : kycStatus === "Approved"
                    ? "Your KYC has been approved."
                    : kycStatus === "Rejected"
                      ? "Your KYC was rejected. Please re-apply."
                      : "Complete KYC to access investment opportunities."
                }
              </Text>
              <Button
                w="full"
                bg="linear-gradient(to right, #00A9E0, #6DD3EF)"
                color="white"
                onClick={() => navigate("/kyc-verification")}
                _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
                mb={4}
              >
                KYC Verification Requirements
              </Button>
              <Button
                w="full"
                bg="linear-gradient(to right, #00A9E0, #6DD3EF)"
                color="white"
                onClick={() => navigate("/kyc-form")}
                _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
              >
                Start KYC Verification
              </Button>

              <Box className="w-full p-4 bg-gray-100 mt-2 rounded-xl text-center text-[#6E6E73] font-light">
                {kycStatusMessage || "Complete KYC to access investment opportunities."}
              </Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Center>

      {showNdaModal && session && (
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
      
      {showNdaDocModal && ndaMetadata && session && (
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

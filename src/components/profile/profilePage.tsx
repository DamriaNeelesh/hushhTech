import React, { useState, useEffect, useCallback } from "react";
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
import ApprovedGif from "../../../public/gif/nda_approved.gif";
import PendingGif from "../../../public/gif/nda_pending.gif";
import RejectedGif from "../../../public/gif/nda_rejected.gif";
import NotappliedGif from "../../../public/gif/nda_notApplied.gif";
import { useNavigate } from "react-router-dom";

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

  // useEffect(() => {
  //   const checkNdaStatus = async () => {
  //     if (!session) return;
  //     try {
  //       const response = await axios.post(
  //         "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/check_access_status",
  //         {},
  //         {
  //           headers: {
  //             apikey: config.SUPABASE_ANON_KEY,
  //             Authorization: `Bearer ${session.access_token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       setNdaStatus(response.data);
  //       if (response.data === "Pending: Waiting for NDA Process") {
  //         fetchNdaMetadata();
  //       }
  //     } catch (error) {
  //       toast({
  //         title: "API Error",
  //         description: "Failed to check NDA access status.",
  //         status: "error",
  //         duration: 4000,
  //         isClosable: true,
  //       });
  //     }
  //   };
  //   if (session) {
  //     checkNdaStatus();
  //   }
  // }, [session, toast]);

   // Call checkNdaStatus on mount and then poll every 15 seconds.
   
     // Extracted function to check NDA status.
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
      setNdaStatus(response.data);
      if (response.data === "Approved") {
        setNdaApproved(true);
      }
      if (response.data === "Pending: Waiting for NDA Process") {
        fetchNdaMetadata();
      }
    } catch (error) {
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
      checkNdaStatus(); // initial check
      const intervalId = setInterval(() => {
        checkNdaStatus();
      }, 2000); 
      return () => clearInterval(intervalId);
    }
  }, [session, checkNdaStatus]);

  const fetchNdaMetadata = async () => {
    try {
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
        setNdaMetadata(ndaResponse.data.metadata);
      } else {
        // Removing now for smooth process of NDA completion (User not in NDA Stage)
        // toast({
        //   title: "Error",
        //   description: ndaResponse.data.message || "Error fetching NDA metadata.",
        //   status: "error",
        //   duration: 4000,
        //   isClosable: true,
        // });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch NDA metadata.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Download NDA if approved.
  const handleDownloadNda = async () => {
    const FETCH_NDA_URL =
      "https://hushhtech-nda-generation-53407187172.us-central1.run.app/v2/fetch-nda";
    try {
      const response = await axios.get(FETCH_NDA_URL, {
        headers: {
          "jwt-token": session.access_token,
        },
        responseType: "blob",
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "NDA.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
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
      return { text: "Please sign NDA sent to your email", disabled: true, bgClass: "" };
    } else if (ndaStatus === "Rejected") {
      return { text: "Re-apply for NDA Process", disabled: false, bgClass: "blue-gradient-bg" };
    }
    return { text: "Start NDA Process", disabled: false, bgClass: "blue-gradient-bg" };
  };

  const { text: ndaButtonText, disabled: ndaButtonDisabled } = getNdaButtonProps();

  const handleNdaAccepted = () => {
    setNdaStatus("Approved");
  };

  const handleStartNdaProcess = () => {
    if (ndaStatus === "Approved") {
      handleDownloadNda();
      return;
    } else if (ndaStatus === "Not Applied" || ndaStatus === "Rejected") {
      setShowNdaModal(true);
    } 
    // else if (ndaStatus === "Pending: Waiting for NDA Process") {
    //   setShowNdaDocModal(true);
    // }
  };

  // Navigation handlers using useNavigate.
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

  // Status indicator styles - matches exactly what's in the image
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

  return (
    <Box bg="#FAFAFA" width="100%" minH="100vh">
      <Center pt={{ base: 10, md: 20 }} pb={10}>
        <VStack maxW="1200px" w="full" px={4} spacing={8}>
          {/* Header */}
          <VStack spacing={2} mb={8} mt={{base: 10, md: 0}} w="full">
            {/* <Image src={HushhLogo} alt="Hushh Tech Logo" h="50px" /> */}
            <Text fontSize={{ base: "3xl", md: "4xl" }} className="text-5xl font-[300] text-[#1D1D1F] mb-3 tracking-tight" mt={8}>
              Hello {session?.user?.user_metadata?.full_name || "John Doe"},
            </Text>
            <Text className="text-xl text-[#6E6E73] font-light">
              Please complete the required processes below to access investment information.
            </Text>
          </VStack>

          {/* Three-column grid for the cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
            {/* Documents Card */}
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
                color={'white'}
                onClick={handleViewPublicDocs}
                className="mb-4"
              >
                View Public Documents
              </Button>
              
              <Button 
                w="full" 
                colorScheme={ndaStatus === "Approved" ? "teal" : "gray"}
                isDisabled={ndaStatus !== "Approved"}
                onClick={handleViewPrivateDocs}
                mb={4}
              >
                View Private Documents
              </Button>
              
              <Box className="w-full p-4 bg-gray-100 rounded-xl text-center text-[#6E6E73] font-light">
                {ndaStatus === "Approved" ? "NDA approved" : "NDA and KYC approval required for access"}
              </Box>
            </Box>

            {/* NDA Process Card */}
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
                  ? "The NDA signing is in process. Please sign the NDA sent to your email if you haven't signed it yet. Once the NDA is accepted by Hush1one Inc., you will be notified."
                  : "Complete NDA to access sensitive documents"
                }
              </Text>
              
              <Button
                w="full"
                background={ndaButtonDisabled ? "" : "linear-gradient(to right, #00A9E0, #6DD3EF)"}
                onClick={handleStartNdaProcess}
                color={ndaButtonDisabled ? "gray.400" : "white"}
                isDisabled={ndaButtonDisabled}
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

            {/* KYC Verification Card */}
            <Box className="bg-white p-10 rounded-2xl">
              <Text className="text-2xl font-medium text-[#1D1D1F] mb-6">
                KYC Verification
              </Text>
              <Text className="text-[#6E6E73] mb-8 font-light leading-relaxed">
                Know Your Customer verification process
              </Text>
              
              <Button
                w="full"
                colorScheme="gray"
                isDisabled={true}
                mb={4}
              >
                Coming Soon
              </Button>
              
              <Box className="w-full p-4 bg-gray-100 rounded-xl text-center text-[#6E6E73] font-light">
                KYC verification coming soon
              </Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Center>

      {/* NDA Request Modal */}
      {showNdaModal && session && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
          onSubmit={(result: string) => {
            setNdaStatus(result);
            setShowNdaModal(false);
          }}
        />
      )}
      
      {/* NDA Document Modal */}
      {showNdaDocModal && ndaMetadata && session && (
        <NDADocumentModal
          isOpen={showNdaDocModal}
          onClose={() => setShowNdaDocModal(false)}
          session={session}
          ndaMetadata={ndaMetadata}
          onAccept={() => {
            setNdaApproved(true);
            setShowNdaDocModal(false);
            localStorage.setItem("communityFilter", "nda");
          }}
        />
      )}
    </Box>
  );
};

export default ProfilePage;

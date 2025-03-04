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
      "https://hushhtech-nda-generation-53407187172.us-central1.run.app/fetch-nda";
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
      return { text: "Download Your NDA", disabled: false };
    } else if (ndaStatus === "Not Applied") {
      return { text: "Start NDA Process", disabled: false };
    } else if (ndaStatus === "Requested permission for the sensitive file." || ndaStatus === "Pending") {
      return { text: "Waiting for approval", disabled: true };
    } else if (ndaStatus === "Pending: Waiting for NDA Process") {
      return { text: "Verify and Accept the NDA", disabled: false };
    } else if (ndaStatus === "Rejected") {
      return { text: "Re-apply for NDA Process", disabled: false };
    }
    return { text: "Start NDA Process", disabled: false };
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
    } else if (ndaStatus === "Pending: Waiting for NDA Process") {
      setShowNdaDocModal(true);
    }
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

  return (
    <Box bg="black" width="100%" color="white" mt={-4}>
      <VStack bg="black" px={5} spacing={6} alignItems="center">
        <Image src={HushhLogo} alt="Hushh Tech Logo" boxSize={{ md: "14rem", base: "xs" }} />
        <Box w="100%" textAlign="left">
          <Heading fontSize="2xl">Hello {session?.user?.user_metadata?.full_name || "User"},</Heading>
          <Text fontSize="md" color="gray.400">
            Please complete the required processes below to access investment information.
          </Text>
        </Box>
      </VStack>
      <div className="py-8">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} my={8} px={5}>
        {/* Documents Section */}
       
        <Box bg="#1D1D1D" p={6} borderRadius="lg" shadow="lg" textAlign="left">
          <Heading fontSize="md" display="flex" flexDirection="row" gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center" justifyContent="center">
            <Icon as={FaFileAlt} w={8} h={8} color="grey" /> Documents
          </Heading>
          <Text fontSize="sm" color="gray.400">
            Access private investment documents and reports
          </Text>
          <Button
            w="full"
            colorScheme="teal"
            mt={4}
            onClick={handleViewPublicDocs}
          >
            View Public Documents
          </Button>
          <Button
            w="full"
            mt={2}
            colorScheme={ndaStatus !== "Approved" ? "gray" : "teal"}
            isDisabled={ndaStatus !== "Approved"}
            onClick={handleViewPrivateDocs}
          >
            View Private Documents
          </Button>
          <Text mt={2} fontSize="xs" color={ndaStatus !== "Approved" ? "yellow.400" : "green.400"}>
            <Icon as={ndaStatus !== "Approved" ? InfoIcon : CheckCircleIcon} />{" "}
            {ndaStatus !== "Approved" ? "NDA required for access" : "NDA approved."}
          </Text>
        </Box>

        {/* NDA Process Section */}
        <Box bg="#1D1D1D" p={6} display="flex" flexDirection="column" justifyContent="space-between"
          alignItems="center" borderRadius="lg" shadow="lg" textAlign="center">
          <Heading fontSize="md" display="flex" flexDirection="row" gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center" justifyContent="center">
            <Icon as={FaUserShield} w={8} h={8} color="grey" />
            NDA Process
            <Box mt={1}>
              {ndaStatus === "Approved" && (
                <Image src={ApprovedGif} alt="Approved" boxSize="14px" />
              )}
              {(ndaStatus === "Pending: Waiting for NDA Process" ||
                ndaStatus === "Pending" ||
                ndaStatus === "Requested permission for the sensitive file.") && (
                <Image src={PendingGif} alt="Pending" boxSize="14px" />
              )}
              {ndaStatus === "Rejected" && (
                <Image src={RejectedGif} alt="Rejected" boxSize="14px" />
              )}
              {ndaStatus === "Not Applied" && (
                <Image src={NotappliedGif} alt="Not Applied" boxSize="14px" />
              )}
            </Box>
          </Heading>
          <Badge w="xxs" colorScheme={ndaStatus === "Approved" ? "green" : "orange"}
            mb={2} p={1} borderRadius="full">
            {ndaStatus}
          </Badge>
          <Text fontSize="sm" color="gray.400">
            Complete NDA to access sensitive documents
          </Text>
          <Button
            w="full"
            colorScheme={ndaStatus === "Approved" ? "teal" : "blue"}
            mt={4}
            onClick={handleStartNdaProcess}
            isDisabled={ndaButtonDisabled}
          >
            {ndaButtonText}
          </Button>
        </Box>

        {/* KYC Verification Section */}
        <Box bg="#1D1D1D" p={6} display="flex" flexDirection="column" justifyContent="space-between"
          alignItems="center" borderRadius="lg" shadow="lg" textAlign="center">
          <Heading fontSize="md" display="flex" flexDirection="row" gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center" justifyContent="center">
            <Icon as={CheckCircleIcon} w={8} h={8} color="grey" /> KYC Verification
          </Heading>
          <Badge w="xxs" bg="blue.900" color="blue.300" mb={2} p={1} borderRadius="full">
            Coming Soon
          </Badge>
          <Text fontSize="sm" color="gray.400">
            Know Your Customer verification process
          </Text>
          <Button mt={4} w="full" colorScheme="gray" isDisabled>
            Coming Soon
          </Button>
        </Box>
      </SimpleGrid>
      </div>


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

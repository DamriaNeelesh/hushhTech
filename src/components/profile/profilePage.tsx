import React, { useState, useEffect } from "react";
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
import { CheckCircleIcon, InfoIcon, TicketIcon } from "lucide-react";
import HushhLogo from "../images/Hushhogo.png";
import NDARequestModal from "../NDARequestModal";
import NDADocumentModal from "../NDADocumentModal";
import axios from "axios";
import config from "../../resources/config/config";

const ProfilePage: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const [session, setSession] = useState<any>(null);
  const [ndaStatus, setNdaStatus] = useState<string>("Not Applied");
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [showNdaDocModal, setShowNdaDocModal] = useState(false);

  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    const checkNdaStatus = async () => {
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
        console.log("NDA Access Status:", response.data);

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
    };

    if (session) {
      checkNdaStatus();
    }
  }, [session]);

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
        toast({
          title: "Error",
          description:
            ndaResponse.data.message || "Error fetching NDA metadata.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
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

  const handleStartNdaProcess = () => {
    if (ndaStatus === "Approved") {
      toast({
        title: "NDA Completed",
        description: "Your NDA is already approved.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (ndaStatus === "Not Applied") {
      setShowNdaModal(true);
    } else if (ndaStatus === "Pending: Waiting for NDA Process") {
      setShowNdaDocModal(true);
    }
  };

  const handlePrivateDocsClick = () => {
    if (ndaStatus === "Approved") {
      window.location.href = "/community";
    }
  };

  return (
    <Box bg="black" width="100%" color="white">
      <VStack bg="black" px={5} spacing={6} alignItems="center">
        <Image
          src={HushhLogo}
          alt="Hushh Tech Logo"
          boxSize={{ md: "14rem", base: "xs" }}
        />
        <Box w="100%" textAlign="left">
          <Heading fontSize="2xl">
            Hello {session?.user?.user_metadata?.full_name || "User"},
          </Heading>
          <Text fontSize="md" color="gray.400">
            Please complete the required processes below to access investment
            information.
          </Text>
        </Box>
      </VStack>

      {/* Grid for Desktop, Stack for Mobile */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} my={8} px={5}>
        {/* Documents Section */}
        <Box
          bg="#1D1D1D"
          p={6}
          borderRadius="lg"
          shadow="lg"
          textAlign="left"
        >
          <Heading
            size="md"
            display="flex"
            flexDirection={"row"}
            gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaFileAlt} w={8} h={8} color="grey" /> Documents
          </Heading>
          <Text fontSize="sm" color="gray.400">
            Access private investment documents and reports
          </Text>
         
          <Button
            w="full"
            colorScheme="teal"
            mt={4}
            onClick={() => (window.location.href = "/community")}
          >
            View Public Documents
          </Button>
          <Button
            w="full"
            mt={2}
            colorScheme={ndaStatus !== "Approved" ? "gray" : "teal"}
            isDisabled={ndaStatus !== "Approved"}
            onClick={handlePrivateDocsClick}
          >
            View Private Documents
          </Button>

          <Text
            mt={2}
            fontSize="xs"
            color={ndaStatus !== "Approved" ? "yellow.400" : "green.400"}
          >
            <Icon as={ndaStatus !== "Approved" ? InfoIcon : CheckCircleIcon} />{" "}
            {ndaStatus !== "Approved"
              ? "NDA required for access"
              : "NDA approved."}
          </Text>
        </Box>

        {/* NDA Process Section */}
        <Box
          bg="#1D1D1D"
          p={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderRadius="lg"
          shadow="lg"
          textAlign="center"
        >
          <Heading
            size="md"
            display="flex"
            flexDirection={"row"}
            gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaUserShield} w={8} h={8} color="grey" />
            NDA Process
          </Heading>
          <Badge
            w={"xxs"}
            colorScheme={ndaStatus === "Approved" ? "green" : "orange"}
            mb={2}
            p={1}
            borderRadius="full"
          >
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
          >
            {ndaStatus === "Approved" ? "NDA Completed" : "Start NDA Process"}
          </Button>
        </Box>

        {/* KYC Verification Section */}
        <Box
          bg="#1D1D1D"
          p={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderRadius="lg"
          shadow="lg"
          textAlign="center"
        >
          <Heading
            size="md"
            display="flex"
            flexDirection={"row"}
            gap={{ md: "0.5rem", base: "0.3rem" }}
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={CheckCircleIcon} w={8} h={8} color="grey" />
            KYC Verification
          </Heading>
          <Badge
            w={"xxs"}
            bg="blue.900"
            color="blue.300"
            mb={2}
            p={1}
            borderRadius="full"
          >
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

      {/* Modals */}
      {showNdaModal && (
        <NDARequestModal
          isOpen={showNdaModal}
          onClose={() => setShowNdaModal(false)}
          session={session}
        />
      )}
      {showNdaDocModal && ndaMetadata && (
        <NDADocumentModal
          isOpen={showNdaDocModal}
          onClose={() => setShowNdaDocModal(false)}
          session={session}
        />
      )}
    </Box>
  );
};

export default ProfilePage;

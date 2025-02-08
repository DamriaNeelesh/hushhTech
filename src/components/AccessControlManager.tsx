// AccessControlManager.tsx
import { useEffect, useState } from "react";
import { Spinner, Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import config from "../resources/config/config";
import NDARequestModal from "./NDARequestModal";
import NDADocumentModal from "./NDADocumentModal";

// Placeholder for the community page component
const CommunityPage: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Welcome to the Community</h1>
      {/* Add dropdowns for funds, investors, etc. as needed */}
    </Box>
  );
};

interface AccessControlManagerProps {
  session: any;
}

const AccessControlManager: React.FC<AccessControlManagerProps> = ({ session }) => {
  const [accessStatus, setAccessStatus] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // API endpoint URLs
  const CHECK_ACCESS_URL =
    "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/check_access_status";
  const GET_NDA_METADATA_URL =
    "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/get_nda_metadata";
  const ACCEPT_NDA_URL =
    "https://gsqmwxqgqrgzhlhmbscg.supabase.co/rest/v1/rpc/accept_nda";

  // Check the current access status on component mount
  useEffect(() => {
    const checkAccessStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          CHECK_ACCESS_URL,
          {},
          {
            headers: {
              apikey: config.SUPABASE_ANON_KEY,
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res = response.data;
        console.log("Access Status:", res);
        setAccessStatus(res);

        if (res === "Not Applied") {
          setIsRequestModalOpen(true);
        } else if (res === "Pending: Waiting for NDA Process") {
          // Fetch the NDA metadata
          const ndaResponse = await axios.post(
            GET_NDA_METADATA_URL,
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
            setIsNdaModalOpen(true);
          } else {
            toast({
              title: "Error",
              description: ndaResponse.data.message || "Error fetching NDA metadata.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
        } else if (res === "Rejected") {
          toast({
            title: "Request Rejected",
            description: "Your request was rejected. Please re-apply after 2-3 days.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else if (res === "Pending") {
          toast({
            title: "Request Pending",
            description: "Your request is under review.",
            status: "info",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error("Error checking access status:", error);
        toast({
          title: "Error",
          description: error.response?.data || "Error checking access status.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      setLoading(false);
    };

    checkAccessStatus();
  }, [session, toast]);

  // Called when the user submits the request access form.
  const handleRequestSubmit = async (result: string) => {
    setAccessStatus(result);
    // If the response requires NDA processing, fetch and show NDA modal.
    if (result === "Pending: Waiting for NDA Process") {
      try {
        const ndaResponse = await axios.post(
          GET_NDA_METADATA_URL,
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
          setIsNdaModalOpen(true);
        } else {
          toast({
            title: "Error",
            description: ndaResponse.data.message || "Error fetching NDA metadata.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error("Error fetching NDA metadata:", error);
        toast({
          title: "Error",
          description: error.response?.data || "Error fetching NDA metadata.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  // Called when the user accepts the NDA in the NDA modal.
  const handleNdaAccept = async () => {
    try {
      const response = await axios.post(
        ACCEPT_NDA_URL,
        {},
        {
          headers: {
            apikey: config.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Accept NDA Response:", response.data);
      if (response.data === "Approved") {
        toast({
          title: "NDA Accepted",
          description: "Your NDA has been accepted. Welcome to the community!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setAccessStatus("Approved");
        setIsNdaModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.data || "Error accepting NDA.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error accepting NDA:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Could not accept NDA.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  // If the access status is approved, show the community page.
  if (accessStatus === "Approved") {
    return <CommunityPage />;
  }

  return (
    <>
      {/* Request access modal */}
      <NDARequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        session={session}
        onSubmit={handleRequestSubmit}
      />

      {/* NDA document modal */}
      <NDADocumentModal
        isOpen={isNdaModalOpen}
        onClose={() => setIsNdaModalOpen(false)}
        ndaMetadata={ndaMetadata}
        onAccept={handleNdaAccept}
      />
    </>
  );
};

export default AccessControlManager;

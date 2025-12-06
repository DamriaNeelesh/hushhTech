import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  useClipboard,
  Collapse,
  Code,
  Divider,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp, Copy, Check, Terminal, Code as CodeIcon } from "lucide-react";
import resources from "../resources/resources";

interface EndpointCardProps {
  title: string;
  description: string;
  endpoint: string;
  method?: string;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ title, description, endpoint, method = "GET" }) => {
  const { hasCopied, onCopy } = useClipboard(endpoint);

  return (
    <Box
      bg="#F8FAFC"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      p={4}
      transition="all 0.2s ease"
      _hover={{
        borderColor: "#CBD5E1",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" spacing={1} flex={1}>
            <HStack spacing={2}>
              <Box
                px={2}
                py={0.5}
                bg={method === "POST" ? "#FEF3C7" : "#DBEAFE"}
                color={method === "POST" ? "#92400E" : "#1E40AF"}
                borderRadius="6px"
                fontSize="11px"
                fontWeight="500"
                letterSpacing="0.05em"
              >
                {method}
              </Box>
              <Text fontSize="15px" fontWeight="500" color="#0B1120">
                {title}
              </Text>
            </HStack>
            <Text fontSize="13px" color="#64748B" lineHeight="1.5">
              {description}
            </Text>
          </VStack>
        </HStack>

        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="8px"
          p={3}
          fontFamily="'Monaco', 'Menlo', monospace"
        >
          <HStack spacing={2} justify="space-between">
            <Code
              fontSize="12px"
              color="#0F172A"
              bg="transparent"
              p={0}
              flex={1}
              wordBreak="break-all"
              whiteSpace="pre-wrap"
            >
              {endpoint}
            </Code>
            <IconButton
              aria-label="Copy endpoint"
              icon={<Icon as={hasCopied ? Check : Copy} boxSize={4} />}
              onClick={onCopy}
              size="sm"
              variant="ghost"
              colorScheme={hasCopied ? "green" : "gray"}
              minW="32px"
              h="32px"
              _hover={{ bg: "#F1F5F9" }}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

interface DeveloperSettingsProps {
  investorSlug?: string;
}

const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({ investorSlug }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get Supabase URL - use the actual deployed URL
  const supabaseUrl = "https://ibsisfnjxeowvdtvgzff.supabase.co";
  
  const endpoints = [
    {
      title: "MCP Discovery Endpoint",
      description: "Get available MCP tools and resources for agent-to-agent communication",
      endpoint: investorSlug
        ? `${supabaseUrl}/functions/v1/investor-agent-mcp/mcp?slug=${investorSlug}`
        : `${supabaseUrl}/functions/v1/investor-agent-mcp/mcp?slug={investor-slug}`,
      method: "GET",
    },
    {
      title: "Chat Endpoint",
      description: "Public chat endpoint for conversing with investor profiles",
      endpoint: investorSlug
        ? `${supabaseUrl}/functions/v1/investor-chat?slug=${investorSlug}`
        : `${supabaseUrl}/functions/v1/investor-chat?slug={investor-slug}`,
      method: "POST",
    },
    {
      title: "AgentCard Endpoint (A2A)",
      description: "Get structured agent card data for agent-to-agent discovery",
      endpoint: investorSlug
        ? `${supabaseUrl}/functions/v1/investor-agent-mcp/a2a/agent-card.json?slug=${investorSlug}`
        : `${supabaseUrl}/functions/v1/investor-agent-mcp/a2a/agent-card.json?slug={investor-slug}`,
      method: "GET",
    },
  ];

  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="16px"
      overflow="hidden"
      boxShadow="0 1px 3px rgba(0,0,0,0.04)"
    >
      <Button
        w="full"
        onClick={() => setIsExpanded(!isExpanded)}
        variant="ghost"
        justifyContent="space-between"
        p={5}
        h="auto"
        borderRadius={0}
        _hover={{ bg: "#F8FAFC" }}
        _active={{ bg: "#F1F5F9" }}
      >
        <HStack spacing={3}>
          <Box
            bg="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
            p={2}
            borderRadius="10px"
          >
            <Icon as={Terminal} color="white" boxSize={5} />
          </Box>
          <VStack align="flex-start" spacing={0.5}>
            <Text fontSize="16px" fontWeight="500" color="#0B1120">
              Developer Settings
            </Text>
            <Text fontSize="13px" color="#64748B" fontWeight="500">
              API endpoints for MCP integration
            </Text>
          </VStack>
        </HStack>
        <Icon
          as={isExpanded ? ChevronUp : ChevronDown}
          boxSize={5}
          color="#64748B"
          transition="transform 0.2s ease"
        />
      </Button>

      <Collapse in={isExpanded} animateOpacity>
        <Box p={5} pt={0}>
          <Divider mb={4} />
          
          <VStack align="stretch" spacing={4}>
            <Box
              bg="#F0F9FF"
              border="1px solid #BAE6FD"
              borderRadius="10px"
              p={4}
            >
              <HStack spacing={2} mb={2}>
                <Icon as={CodeIcon} color="#0369A1" boxSize={4} />
                <Text fontSize="14px" fontWeight="500" color="#0369A1">
                  About MCP (Model Context Protocol)
                </Text>
              </HStack>
              <Text fontSize="13px" color="#075985" lineHeight="1.6">
                These endpoints enable AI agents to discover and interact with investor profiles.
                The MCP standard allows agents to access structured data and tools for agent-to-agent
                communication.
              </Text>
            </Box>

            {endpoints.map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}

            <Box
              bg="#FEF3C7"
              border="1px solid #FDE68A"
              borderRadius="10px"
              p={4}
              mt={2}
            >
              <Text fontSize="12px" fontWeight="500" color="#92400E" mb={2}>
                📝 Note:
              </Text>
              <Text fontSize="12px" color="#92400E" lineHeight="1.6">
                All endpoints are public and don't require authentication. The chat endpoint accepts
                POST requests with a JSON body containing: <Code fontSize="11px">{"{ message: string }"}</Code>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default DeveloperSettings;

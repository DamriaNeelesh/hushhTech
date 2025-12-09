'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Badge,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AgentCollabStrip from '../../components/kyc/AgentCollabStrip';
import AgentConversationLog, { ConversationEntry } from '../../components/kyc/AgentConversationLog';
import KYCResultCard, { KYCResult } from '../../components/kyc/KYCResultCard';

// Demo banks for selection
const demoBanks = [
  { id: 'demo_bank_alpha', name: 'Alpha Bank', type: 'bank' },
  { id: 'demo_fintech_beta', name: 'Beta Fintech', type: 'fintech' },
  { id: 'demo_neobank_gamma', name: 'Gamma Neobank', type: 'neobank' },
];

// Demo users for testing (only visible in demo mode)
const demoUsers = [
  { email: 'verified@example.com', name: 'John Verified', status: 'PASS' },
  { email: 'review@example.com', name: 'Jane Review', status: 'REVIEW' },
  { email: 'failed@example.com', name: 'Bob Failed', status: 'FAIL' },
  { email: 'notfound@example.com', name: 'Unknown User', status: 'NOT_FOUND' },
];

// =====================================================
// Environment Configuration for Test/Production
// =====================================================
const API_BASE = import.meta.env.VITE_KYC_API_BASE || 
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kyc-agent-a2a`;

const IS_DEMO_MODE = import.meta.env.VITE_KYC_DEMO_MODE === 'true';
const KYC_ENV = import.meta.env.VITE_KYC_ENV || 'development';

if (import.meta.env.DEV) {
  console.log('[KYC Demo] Environment:', KYC_ENV);
  console.log('[KYC Demo] API Base:', API_BASE);
  console.log('[KYC Demo] Demo Mode:', IS_DEMO_MODE);
}

const KYCDemoPage: React.FC = () => {
  const toast = useToast();
  const [selectedBank, setSelectedBank] = useState(demoBanks[0].id);
  const [userEmail, setUserEmail] = useState('');
  const [consentToken, setConsentToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'checking' | 'complete' | 'error'>('idle');
  const [conversationLog, setConversationLog] = useState<ConversationEntry[]>([]);
  const [kycResult, setKycResult] = useState<KYCResult | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | undefined>();

  const selectedBankInfo = demoBanks.find(b => b.id === selectedBank);

  const addLogEntry = (entry: Omit<ConversationEntry, 'id' | 'timestamp'>) => {
    const newEntry: ConversationEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setConversationLog(prev => [...prev, newEntry]);
  };

  const runKYCCheck = async () => {
    setStatus('connecting');
    setConversationLog([]);
    setKycResult(null);
    setLatencyMs(undefined);

    const startTime = Date.now();

    try {
      addLogEntry({
        direction: 'request',
        from: `${selectedBankInfo?.name} KYC Copilot`,
        to: 'Hushh KYC Agent',
        method: 'GET',
        summary: 'Fetching AgentCard for discovery...',
        payload: { endpoint: `${API_BASE}/a2a/agent-card.json` },
        status: 'pending',
      });

      const agentCardStart = Date.now();
      const agentCardResponse = await fetch(`${API_BASE}/a2a/agent-card.json`);
      const agentCard = await agentCardResponse.json();
      const agentCardLatency = Date.now() - agentCardStart;

      addLogEntry({
        direction: 'response',
        from: 'Hushh KYC Agent',
        to: `${selectedBankInfo?.name} KYC Copilot`,
        summary: 'AgentCard returned with capabilities',
        payload: agentCard,
        status: 'success',
        latencyMs: agentCardLatency,
      });

      setStatus('checking');

      const rpcPayload = {
        jsonrpc: '2.0',
        method: 'CheckKYCStatus',
        params: {
          userIdentifier: userEmail || 'demo@example.com',
          consentToken: consentToken || 'demo-consent-token',
          requestedAttributes: ['full_name', 'dob', 'national_id'],
        },
        id: Date.now(),
      };

      addLogEntry({
        direction: 'request',
        from: `${selectedBankInfo?.name} KYC Copilot`,
        to: 'Hushh KYC Agent',
        method: 'CheckKYCStatus',
        summary: `Requesting KYC verification for ${userEmail || 'demo@example.com'}`,
        payload: rpcPayload,
        status: 'pending',
      });

      const rpcStart = Date.now();
      const rpcResponse = await fetch(`${API_BASE}/a2a/rpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bank-id': selectedBank,
        },
        body: JSON.stringify(rpcPayload),
      });
      const rpcResult = await rpcResponse.json();
      const rpcLatency = Date.now() - rpcStart;

      if (rpcResult.result?.policyUsed) {
        addLogEntry({
          direction: 'response',
          from: 'Hushh KYC Agent',
          to: 'Hushh KYC Agent (Internal)',
          summary: 'Policy evaluation completed',
          payload: rpcResult.result.policyUsed,
          status: 'success',
          latencyMs: 12,
        });
      }

      const totalLatency = Date.now() - startTime;

      if (rpcResult.error) {
        throw new Error(rpcResult.error.message || 'RPC Error');
      }

      const result: KYCResult = {
        status: rpcResult.result?.status || 'NOT_FOUND',
        riskBand: rpcResult.result?.riskBand,
        riskScore: rpcResult.result?.riskScore,
        verifiedAttributes: rpcResult.result?.verifiedAttributes,
        verificationLevel: rpcResult.result?.verificationLevel,
        attestationAge: rpcResult.result?.attestationAge,
        missingRequirements: rpcResult.result?.missingRequirements,
        additionalInfo: rpcResult.result?.additionalInfo,
        timestamp: new Date().toISOString(),
        providerName: rpcResult.result?.providerName || 'Hushh',
      };

      addLogEntry({
        direction: 'response',
        from: 'Hushh KYC Agent',
        to: `${selectedBankInfo?.name} KYC Copilot`,
        method: 'CheckKYCStatus',
        summary: `KYC check complete: ${result.status}`,
        payload: rpcResult,
        status: result.status === 'PASS' ? 'success' : result.status === 'REVIEW' ? 'pending' : 'error',
        latencyMs: rpcLatency,
      });

      setLatencyMs(totalLatency);
      setKycResult(result);
      setStatus('complete');

      toast({
        title: `KYC Check Complete`,
        description: `Result: ${result.status} - Latency: ${totalLatency}ms`,
        status: result.status === 'PASS' ? 'success' : result.status === 'REVIEW' ? 'warning' : 'info',
        duration: 4000,
        isClosable: true,
      });

    } catch (error) {
      const totalLatency = Date.now() - startTime;
      setLatencyMs(totalLatency);
      setStatus('error');

      addLogEntry({
        direction: 'response',
        from: 'Hushh KYC Agent',
        to: `${selectedBankInfo?.name} KYC Copilot`,
        summary: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: 'error',
        latencyMs: totalLatency,
      });

      toast({
        title: 'API Error',
        description: error instanceof Error ? error.message : 'Failed to connect to KYC Agent',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const resetDemo = () => {
    setStatus('idle');
    setConversationLog([]);
    setKycResult(null);
    setLatencyMs(undefined);
    setUserEmail('');
    setConsentToken('');
  };

  return (
    <Box bg="white" minH="100vh">
      <Navbar />
      
      <Container maxW="7xl" pt="120px" pb="60px">
        {/* Header */}
        <VStack spacing={4} mb={12} textAlign="center">
          <Badge 
            bg="black" 
            color="white" 
            px={4} 
            py={1} 
            borderRadius="full"
            fontSize="sm"
            fontWeight="500"
          >
            A2A Protocol
          </Badge>
          <Heading 
            size="2xl" 
            color="black"
            fontWeight="600"
          >
            KYC A2A Network
          </Heading>
          <Text color="gray.600" maxW="2xl" fontSize="lg">
            Experience how banks and fintechs can verify user KYC status through the Hushh KYC Agent 
            using the A2A (Agent-to-Agent) protocol. No raw documents are shared.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Left Column - Controls & Agent Collab */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Agent Collaboration Strip */}
              <AgentCollabStrip
                bankName={selectedBankInfo?.name || 'Bank'}
                bankAgentName="KYC Copilot"
                status={status}
                latencyMs={latencyMs}
              />

              {/* Demo Controls */}
              <Box
                bg="white"
                borderRadius="16px"
                border="1px solid"
                borderColor="gray.200"
                p={6}
                boxShadow="0 2px 8px rgba(0,0,0,0.04)"
              >
                <Text fontSize="sm" fontWeight="600" color="black" mb={4}>
                  Demo Controls
                </Text>

                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500">
                      Select Bank/Fintech
                    </FormLabel>
                    <Select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      color="black"
                      _hover={{ borderColor: 'gray.300' }}
                      borderRadius="12px"
                    >
                      {demoBanks.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name} ({bank.type})
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500">
                      User Email (for lookup)
                    </FormLabel>
                    <Input
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g., verified@example.com"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      color="black"
                      _placeholder={{ color: 'gray.400' }}
                      borderRadius="12px"
                    />
                    <Text fontSize="2xs" color="gray.400" mt={1}>
                      Try: verified@example.com, review@example.com, failed@example.com
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.500">
                      Consent Token (optional)
                    </FormLabel>
                    <Input
                      value={consentToken}
                      onChange={(e) => setConsentToken(e.target.value)}
                      placeholder="User consent token"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      color="black"
                      _placeholder={{ color: 'gray.400' }}
                      borderRadius="12px"
                    />
                  </FormControl>

                  <HStack spacing={3} pt={2}>
                    <Button
                      flex="1"
                      bg="black"
                      color="white"
                      _hover={{ bg: 'gray.800' }}
                      borderRadius="12px"
                      onClick={runKYCCheck}
                      isLoading={status === 'connecting' || status === 'checking'}
                      loadingText={status === 'connecting' ? 'Connecting...' : 'Checking...'}
                    >
                      Run KYC Check
                    </Button>
                    <Button
                      variant="outline"
                      borderColor="gray.300"
                      color="black"
                      _hover={{ bg: 'gray.50' }}
                      borderRadius="12px"
                      onClick={resetDemo}
                    >
                      Reset
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              {/* Conversation Log */}
              <AgentConversationLog entries={conversationLog} maxHeight="350px" />
            </VStack>
          </GridItem>

          {/* Right Column - Result */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Result Card or Placeholder */}
              {kycResult ? (
                <KYCResultCard result={kycResult} bankName={selectedBankInfo?.name} />
              ) : (
                <Box
                  bg="white"
                  borderRadius="20px"
                  border="1px solid"
                  borderColor="gray.200"
                  p={12}
                  textAlign="center"
                  boxShadow="0 2px 8px rgba(0,0,0,0.04)"
                >
                  <VStack spacing={4}>
                    <Box
                      w="80px"
                      h="80px"
                      borderRadius="20px"
                      bg="gray.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,0,0,0.2)' }}/>
                      </svg>
                    </Box>
                    <Text fontSize="lg" fontWeight="600" color="gray.500">
                      No Result Yet
                    </Text>
                    <Text fontSize="sm" color="gray.400" maxW="300px">
                      Configure the demo controls and click "Run KYC Check" to see the A2A protocol in action.
                    </Text>
                  </VStack>
                </Box>
              )}

              {/* How It Works */}
              <Box
                bg="white"
                borderRadius="16px"
                border="1px solid"
                borderColor="gray.200"
                p={6}
                boxShadow="0 2px 8px rgba(0,0,0,0.04)"
              >
                <Text fontSize="sm" fontWeight="600" color="black" mb={4}>
                  How It Works
                </Text>
                <VStack spacing={3} align="stretch">
                  {[
                    { step: '1', title: 'Discovery', desc: 'Bank agent fetches Hushh AgentCard' },
                    { step: '2', title: 'Request', desc: 'Bank sends CheckKYCStatus via JSON-RPC' },
                    { step: '3', title: 'Evaluate', desc: 'Hushh checks attestations against bank policy' },
                    { step: '4', title: 'Response', desc: 'Status + risk band returned (no raw docs)' },
                  ].map((item) => (
                    <HStack key={item.step} spacing={3}>
                      <Flex
                        w="24px"
                        h="24px"
                        borderRadius="full"
                        bg="gray.100"
                        align="center"
                        justify="center"
                        flexShrink={0}
                      >
                        <Text fontSize="xs" fontWeight="600" color="black">
                          {item.step}
                        </Text>
                      </Flex>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="500" color="black">
                          {item.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {item.desc}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* API Endpoints */}
              <Box
                bg="white"
                borderRadius="16px"
                border="1px solid"
                borderColor="gray.200"
                p={6}
                boxShadow="0 2px 8px rgba(0,0,0,0.04)"
              >
                <Text fontSize="sm" fontWeight="600" color="black" mb={4}>
                  API Endpoints
                </Text>
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between" p={2} bg="gray.50" borderRadius="8px">
                    <Text fontSize="xs" color="gray.500">AgentCard</Text>
                    <Text fontSize="xs" color="green.600" fontFamily="mono">GET /kyc-agent-a2a/agent-card.json</Text>
                  </HStack>
                  <HStack justify="space-between" p={2} bg="gray.50" borderRadius="8px">
                    <Text fontSize="xs" color="gray.500">RPC</Text>
                    <Text fontSize="xs" color="blue.600" fontFamily="mono">POST /kyc-agent-a2a/a2a/rpc</Text>
                  </HStack>
                  <HStack justify="space-between" p={2} bg="gray.50" borderRadius="8px">
                    <Text fontSize="xs" color="gray.500">REST Check</Text>
                    <Text fontSize="xs" color="purple.600" fontFamily="mono">POST /kyc-agent-a2a/check</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default KYCDemoPage;

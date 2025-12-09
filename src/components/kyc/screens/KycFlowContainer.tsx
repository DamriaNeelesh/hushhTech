/**
 * KycFlowContainer - State Machine for KYC Flow
 * 
 * Manages the 5-screen KYC UX flow:
 * 1. INTRO → 2. DETAILS_CONSENT → 3. AGENTS_COLLAB → 4. RESULT (PASS/REVIEW/FULL)
 * 
 * The container:
 * - Holds KycFlowState with step, loading, error, request, response
 * - Implements state transitions based on API response
 * - Renders appropriate screen component based on current step
 * - Handles API calls to /check endpoint
 */
'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
} from '@chakra-ui/react';
import {
  KycFlowState,
  KycFlowContainerProps,
  KycCheckRequest,
  KycCheckResponse,
  FlowStep,
  generateSyntheticSteps,
} from '../../../types/kyc';

// Import screen components
import KycIntroScreen from './KycIntroScreen';
import KycDetailsConsentScreen from './KycDetailsConsentScreen';
import KycAgentsCollabScreen from './KycAgentsCollabScreen';
import KycResultPassScreen from './KycResultPassScreen';
import KycResultReviewScreen from './KycResultReviewScreen';
import KycResultFullKycScreen from './KycResultFullKycScreen';
import KycAgentDetailModal from './KycAgentDetailModal';

// =====================================================
// Environment Configuration
// =====================================================

// Type assertion for Vite env
declare const import_meta_env: {
  VITE_KYC_API_BASE?: string;
  VITE_KYC_ENV?: string;
  VITE_KYC_DEMO_MODE?: string;
};

const getEnvVar = (key: string, fallback: string): string => {
  try {
    // @ts-ignore - Vite specific
    return import.meta.env?.[key] || fallback;
  } catch {
    return fallback;
  }
};

const KYC_API_BASE = getEnvVar('VITE_KYC_API_BASE', 
  'https://hkdlmkpqwbjnmcwlxczv.supabase.co/functions/v1/kyc-agent-a2a');
const KYC_ENV = getEnvVar('VITE_KYC_ENV', 'production');
const DEMO_MODE = getEnvVar('VITE_KYC_DEMO_MODE', 'false') === 'true';

// =====================================================
// Initial State
// =====================================================

const initialState: KycFlowState = {
  step: 'INTRO',
  isLoading: false,
  error: null,
  request: null,
  response: null,
  showDetailModal: false,
};

// =====================================================
// API Service
// =====================================================

async function callKycCheckApi(request: KycCheckRequest): Promise<KycCheckResponse> {
  // Demo mode - return mock responses based on name patterns
  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate network delay
    
    const fullName = request.identifiers.fullName.toLowerCase();
    
    // Demo patterns for testing different outcomes
    if (fullName.includes('pass') || fullName.includes('john')) {
      return {
        status: 'PASS',
        verifiedVia: {
          providerName: 'ICICI Bank',
          providerType: 'BANK',
          lastVerifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          riskBand: 'LOW',
          riskScore: 15,
          verificationLevel: 'standard',
          country: request.identifiers.country,
        },
        checkId: `demo-pass-${Date.now()}`,
        timestamp: new Date().toISOString(),
        latencyMs: 2500,
      };
    }
    
    if (fullName.includes('review') || fullName.includes('jane')) {
      return {
        status: 'REVIEW',
        verifiedVia: {
          providerName: 'HDFC Bank',
          providerType: 'BANK',
          lastVerifiedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          riskBand: 'MEDIUM',
          riskScore: 45,
          verificationLevel: 'basic',
          country: request.identifiers.country,
        },
        additionalRequirements: ['recent_address_proof'],
        checkId: `demo-review-${Date.now()}`,
        timestamp: new Date().toISOString(),
        latencyMs: 2500,
      };
    }
    
    // Default: NOT_FOUND
    return {
      status: 'NOT_FOUND',
      reasonCode: 'NO_ATTESTATION',
      message: 'No matching KYC attestation found in the network.',
      checkId: `demo-notfound-${Date.now()}`,
      timestamp: new Date().toISOString(),
      latencyMs: 2500,
    };
  }
  
  // Production API call
  const response = await fetch(`${KYC_API_BASE}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  
  return response.json();
}

// =====================================================
// KycFlowContainer Component
// =====================================================

export const KycFlowContainer: React.FC<KycFlowContainerProps> = ({
  relyingPartyId = 'default-bank',
  bankName = 'Your Bank',
  onComplete,
  onStartFullKyc,
}) => {
  const [state, setState] = useState<KycFlowState>(initialState);
  
  // =====================================================
  // State Transition Handlers
  // =====================================================
  
  /**
   * Handle INTRO → DETAILS_CONSENT transition
   */
  const handleIntroComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: 'DETAILS_CONSENT',
    }));
  }, []);
  
  /**
   * Handle DETAILS_CONSENT → AGENTS_COLLAB transition
   * Starts API call and shows collaboration animation
   */
  const handleFormSubmit = useCallback(async (request: KycCheckRequest) => {
    setState(prev => ({
      ...prev,
      step: 'AGENTS_COLLAB',
      isLoading: true,
      error: null,
      request,
    }));
    
    try {
      const response = await callKycCheckApi(request);
      
      // Add synthetic steps if not provided by API
      if (!response.steps) {
        response.steps = generateSyntheticSteps(response, bankName);
      }
      
      // Determine result screen based on status
      let nextStep: FlowStep;
      switch (response.status) {
        case 'PASS':
          nextStep = 'RESULT_PASS';
          break;
        case 'REVIEW':
          nextStep = 'RESULT_REVIEW';
          break;
        case 'NOT_FOUND':
        case 'FAIL':
        case 'EXPIRED':
        default:
          nextStep = 'RESULT_FULL';
          break;
      }
      
      setState(prev => ({
        ...prev,
        step: nextStep,
        isLoading: false,
        response,
      }));
      
      // Notify parent of completion
      if (onComplete) {
        onComplete(response);
      }
      
    } catch (error: any) {
      console.error('KYC check error:', error);
      setState(prev => ({
        ...prev,
        step: 'ERROR',
        isLoading: false,
        error: error.message || 'An error occurred during KYC verification.',
      }));
    }
  }, [bankName, onComplete]);
  
  /**
   * Handle "Continue" on PASS result
   */
  const handlePassContinue = useCallback(() => {
    // The bank app takes over from here
    console.log('KYC PASS - User continuing to bank app');
    if (onComplete && state.response) {
      onComplete(state.response);
    }
  }, [onComplete, state.response]);
  
  /**
   * Handle "Upload Document" on REVIEW result
   */
  const handleUploadDoc = useCallback(() => {
    // Redirect to document upload flow
    console.log('KYC REVIEW - User uploading additional document');
    // This would typically redirect to a document upload page
  }, []);
  
  /**
   * Handle "Start Full KYC" on NOT_FOUND result
   */
  const handleStartFullKyc = useCallback(() => {
    console.log('KYC NOT_FOUND - User starting full KYC');
    if (onStartFullKyc) {
      onStartFullKyc();
    }
  }, [onStartFullKyc]);
  
  /**
   * Handle "View Details" - opens modal with agent conversation
   */
  const handleViewDetails = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDetailModal: true,
    }));
  }, []);
  
  /**
   * Handle closing detail modal
   */
  const handleCloseDetailModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDetailModal: false,
    }));
  }, []);
  
  /**
   * Handle error retry - go back to form
   */
  const handleRetry = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: 'DETAILS_CONSENT',
      error: null,
    }));
  }, []);
  
  /**
   * Handle going back to start
   */
  const handleRestart = useCallback(() => {
    setState(initialState);
  }, []);
  
  // =====================================================
  // Render Screen Based on Current Step
  // =====================================================
  
  const renderScreen = () => {
    switch (state.step) {
      case 'INTRO':
        return (
          <KycIntroScreen
            onContinue={handleIntroComplete}
            bankName={bankName}
          />
        );
      
      case 'DETAILS_CONSENT':
        return (
          <KycDetailsConsentScreen
            onSubmit={handleFormSubmit}
            bankName={bankName}
            relyingPartyId={relyingPartyId}
            isLoading={state.isLoading}
          />
        );
      
      case 'AGENTS_COLLAB':
        return (
          <KycAgentsCollabScreen
            isLoading={state.isLoading}
            bankName={bankName}
            steps={state.response?.steps}
          />
        );
      
      case 'RESULT_PASS':
        return state.response ? (
          <KycResultPassScreen
            response={state.response}
            bankName={bankName}
            onContinue={handlePassContinue}
            onViewDetails={handleViewDetails}
          />
        ) : null;
      
      case 'RESULT_REVIEW':
        return state.response ? (
          <KycResultReviewScreen
            response={state.response}
            bankName={bankName}
            onUploadDoc={handleUploadDoc}
            onViewDetails={handleViewDetails}
          />
        ) : null;
      
      case 'RESULT_FULL':
        return (
          <KycResultFullKycScreen
            response={state.response || undefined}
            bankName={bankName}
            onStartFullKyc={handleStartFullKyc}
          />
        );
      
      case 'ERROR':
        return (
          <Container maxW="lg" py={10}>
            <VStack spacing={6}>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="xl"
                py={8}
                bg="rgba(255,107,107,0.1)"
                border="1px solid"
                borderColor="red.500"
              >
                <AlertIcon boxSize="40px" mr={0} color="red.400" />
                <AlertTitle mt={4} mb={2} fontSize="lg" color="white">
                  Verification Error
                </AlertTitle>
                <AlertDescription maxWidth="sm" color="gray.300">
                  {state.error || 'An unexpected error occurred. Please try again.'}
                </AlertDescription>
              </Alert>
              
              <VStack spacing={3} w="100%">
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={handleRetry}
                  w="100%"
                >
                  Try Again
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  color="gray.400"
                  onClick={handleRestart}
                  w="100%"
                >
                  Start Over
                </Button>
              </VStack>
            </VStack>
          </Container>
        );
      
      default:
        return null;
    }
  };
  
  // =====================================================
  // Main Render
  // =====================================================
  
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0A0A0A 0%, #1A1A2E 100%)"
      position="relative"
    >
      {/* Debug info in development */}
      {KYC_ENV === 'development' && (
        <Box
          position="fixed"
          top={2}
          right={2}
          bg="blackAlpha.700"
          color="yellow.300"
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="md"
          zIndex={9999}
        >
          Step: {state.step} | Demo: {DEMO_MODE ? 'ON' : 'OFF'}
        </Box>
      )}
      
      {/* Screen Content */}
      {renderScreen()}
      
      {/* Agent Detail Modal */}
      <KycAgentDetailModal
        isOpen={state.showDetailModal}
        onClose={handleCloseDetailModal}
        response={state.response || undefined}
        bankName={bankName}
      />
    </Box>
  );
};

export default KycFlowContainer;

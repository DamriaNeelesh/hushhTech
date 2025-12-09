'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import A2AScenarioSetupScreen from './A2AScenarioSetupScreen';
import A2AConversationScreen from './A2AConversationScreen';
import A2AResultSummaryScreen from './A2AResultSummaryScreen';
import { generateA2AConversation } from './conversationGenerator';
import type {
  A2APlaygroundState,
  A2APlaygroundStep,
  A2AScenarioConfig,
  A2AScenarioResult,
  ConversationMessage,
  A2APlaygroundContainerProps,
} from '../../types/a2aPlayground';

/**
 * A2APlaygroundContainer
 * 
 * State machine that manages the 3-screen A2A Playground demo:
 * 1. SETUP - Configure scenario (bank, user, operations)
 * 2. CONVERSATION - Watch agents collaborate in real-time
 * 3. RESULT - View KYC decision and export summary
 */
const A2APlaygroundContainer: React.FC<A2APlaygroundContainerProps> = ({
  defaultRelyingPartyId,
}) => {
  // Main state
  const [state, setState] = useState<A2APlaygroundState>({
    step: 'SETUP',
    config: null,
    messages: [],
    isRunning: false,
    result: null,
    error: null,
  });

  // Ref for cancelling ongoing conversation
  const abortRef = useRef<boolean>(false);

  /**
   * Handle running a new scenario
   * Transitions from SETUP → CONVERSATION and starts generating messages
   */
  const handleRunScenario = useCallback(async (config: A2AScenarioConfig) => {
    // Reset abort flag
    abortRef.current = false;

    // Move to conversation screen
    setState((prev) => ({
      ...prev,
      step: 'CONVERSATION',
      config,
      messages: [],
      isRunning: true,
      result: null,
      error: null,
    }));

    try {
      // Generate conversation messages with delays
      const { messages, result } = await generateA2AConversation(
        config,
        // Callback to add messages one by one
        (message: ConversationMessage) => {
          if (abortRef.current) return;
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
          }));
        },
        // Check if aborted
        () => abortRef.current
      );

      // Set final result
      if (!abortRef.current) {
        setState((prev) => ({
          ...prev,
          isRunning: false,
          result,
        }));
      }
    } catch (error) {
      console.error('A2A conversation error:', error);
      if (!abortRef.current) {
        setState((prev) => ({
          ...prev,
          isRunning: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    }
  }, []);

  /**
   * Navigate to result screen
   */
  const handleViewResult = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: 'RESULT',
    }));
  }, []);

  /**
   * Go back to conversation screen from result
   */
  const handleViewConversation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: 'CONVERSATION',
    }));
  }, []);

  /**
   * Reset to setup screen for a new scenario
   */
  const handleRunAnother = useCallback(() => {
    abortRef.current = true; // Cancel any ongoing conversation
    setState({
      step: 'SETUP',
      config: null,
      messages: [],
      isRunning: false,
      result: null,
      error: null,
    });
  }, []);

  // Render current screen based on step
  const renderScreen = () => {
    switch (state.step) {
      case 'SETUP':
        return (
          <A2AScenarioSetupScreen
            onRunScenario={handleRunScenario}
          />
        );

      case 'CONVERSATION':
        if (!state.config) {
          // Should not happen, but handle gracefully
          return null;
        }
        return (
          <A2AConversationScreen
            config={state.config}
            messages={state.messages}
            isRunning={state.isRunning}
            result={state.result}
            onViewResult={handleViewResult}
          />
        );

      case 'RESULT':
        if (!state.config || !state.result) {
          // Should not happen, but handle gracefully
          return null;
        }
        return (
          <A2AResultSummaryScreen
            config={state.config}
            result={state.result}
            messages={state.messages}
            onRunAnother={handleRunAnother}
            onViewConversation={handleViewConversation}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bg="#0a0a0a">
      {renderScreen()}
    </Box>
  );
};

export default A2APlaygroundContainer;

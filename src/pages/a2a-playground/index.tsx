'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { A2APlaygroundContainer } from '../../components/a2aPlayground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

/**
 * A2A Playground Page
 * 
 * Interactive demo showing Agent-to-Agent KYC verification.
 * Demonstrates privacy-preserving identity verification between 
 * Bank Agent and Hushh KYC Agent.
 * 
 * Route: /a2a-playground
 * 
 * Features:
 * - Screen 1: Scenario Setup (select bank, user, operations)
 * - Screen 2: Live Conversation (watch agents collaborate)
 * - Screen 3: Result Summary (KYC decision, export, audit)
 */
const A2APlaygroundPage: React.FC = () => {
  return (
    <Box minH="100vh" bg="white">
      <Navbar />
      <Box pt="120px" pb="40px">
        <A2APlaygroundContainer />
      </Box>
      <Footer />
    </Box>
  );
};

export default A2APlaygroundPage;

import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const AIDrivenPersonalAgents = () => {
  return (
    <>
      <Helmet>
        <title>AI-Driven Personal Agents | Hushh Fund A</title>
        <meta name="description" content="Improving Financial Habits Through Everyday Wellness" />
      </Helmet>

      <Box 
        position="fixed"
        top="64px"
        left="0"
        right="0"
        bottom="0"
        width="100vw"
        height="calc(100vh - 64px)"
        overflow="hidden"
        margin="0"
        padding="0"
        zIndex="999"
        bg="white"
      >
        <Box
          as="iframe"
          src="https://gamma.app/embed/vhhj7mq2pqdc6kk"
          title="AI-Driven Personal Agents"
          allowFullScreen
          width="100%"
          height="100%"
          border="0"
          display="block"
        />
      </Box>
    </>
  );
};

export default AIDrivenPersonalAgents;

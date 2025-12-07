import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const AlphaAgentsPortfolio = () => {
  return (
    <>
      <Helmet>
        <title>AlphaAgents: Revolutionizing Portfolio Construction | Hushh Fund A</title>
        <meta name="description" content="A groundbreaking multi-agent system that combines the precision of quantitative analysis with the adaptability of Large Language Models to identify elite investment opportunities in the world's fastest-growing markets." />
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
          src="https://gamma.app/embed/l1bry9px3iy4xwd"
          title="AlphaAgents: Revolutionizing Portfolio Construction Through AI-Powered Intelligence"
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

export default AlphaAgentsPortfolio;

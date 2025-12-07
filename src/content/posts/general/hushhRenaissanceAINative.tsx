import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const HushhRenaissanceAINative = () => {
  return (
    <>
      <Helmet>
        <title>Hushh Renaissance: The AI-Native Medallion Fund | Hushh Fund A</title>
        <meta name="description" content="Building India's first AI-native quantitative hedge fund targeting 60-69% annual returns through 1,000 autonomous AI agents discovering patterns in global markets." />
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
          src="https://gamma.app/embed/76f6njkwnhpusl5"
          title="Hushh Renaissance: The AI-Native Medallion Fund"
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

export default HushhRenaissanceAINative;

import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const RenaissanceAIFirstFund = () => {
  return (
    <>
      <Helmet>
        <title>Renaissance AI First Fund | Hushh Fund A</title>
        <meta name="description" content="Aloha compounding in an AI decade. Finding the fastest absolute free cash flow growing businesses in the fastest growing markets — the King of Kings strategy for elite capital allocators." />
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
          src="https://gamma.app/embed/yrb490q25kkik1v"
          title="Renaissance AI First Fund"
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

export default RenaissanceAIFirstFund;

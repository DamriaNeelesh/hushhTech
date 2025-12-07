import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const PerpetualAlphaEngine = () => {
  return (
    <>
      <Helmet>
        <title>The Perpetual Alpha Engine | Hushh Fund A</title>
        <meta name="description" content="A Technical Blueprint for Next-Generation Quantitative Investment Systems" />
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
          src="https://gamma.app/embed/ovisgrhbrs9z8jl"
          title="The Perpetual Alpha Engine"
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

export default PerpetualAlphaEngine;

import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const SellTheWallPage = () => {
  return (
    <>
      <Helmet>
        <title>Sell the Wall Options Framework | Hushh Fund A</title>
        <meta name="description" content="Discover our proprietary Sell the Wall options framework - a systematic approach to generating alpha through volatility harvesting and time decay." />
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
          src="https://gamma.app/embed/ya0impa0panawof"
          title="Sell the Wall Options Framework"
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

export default SellTheWallPage;

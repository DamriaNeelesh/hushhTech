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
      >
        <iframe 
          src="https://gamma.app/embed/ya0impa0panawof" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block',
          }}
          allow="fullscreen" 
          title="Sell the Wall Options Framework Presentation"
        />
      </Box>
    </>
  );
};

export default SellTheWallPage;

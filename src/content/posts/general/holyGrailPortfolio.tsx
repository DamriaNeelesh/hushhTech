import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const HolyGrailPortfolio = () => {
  return (
    <>
      <Helmet>
        <title>The Holy Grail Portfolio | Hushh Fund A</title>
        <meta name="description" content="A Complete Implementation Playbook for the World's Most Sophisticated Capital Allocators" />
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
          src="https://gamma.app/embed/1qt8u41wzozuwnh"
          title="The Holy Grail Portfolio"
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

export default HolyGrailPortfolio;

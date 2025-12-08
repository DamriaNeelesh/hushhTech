import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const SellTheWallFeatured = () => {
  return (
    <>
      <Helmet>
        <title>Sell the Wall | Hushh Fund A</title>
        <meta name="description" content="A systematic approach to capturing alpha through intelligent options selling on the world's most exceptional businesses—those rare monopolies printing cash while AI optimizes every trade." />
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
          title="Sell the Wall"
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

export default SellTheWallFeatured;

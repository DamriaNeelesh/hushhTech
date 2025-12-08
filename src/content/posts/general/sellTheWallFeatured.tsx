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
        bg="#fdf7f1"
        minH="100vh"
        // px={{ base: 4, md: 8 }}
        // pt={{ base: 20, md: 34 }}
        // pb={{ base: 12, md: 16 }}
      >
        <Box
          as="iframe"
          src="https://gamma.app/embed/ya0impa0panawof"
          title="Sell the Wall"
          allowFullScreen
          width="100%"
          minHeight={{ base: "70vh", md: "80vh" }}
          border="0"
          display="block"
          borderRadius="18px"
          boxShadow="0 16px 48px rgba(15, 23, 42, 0.12)"
          bg="white"
        />
      </Box>
    </>
  );
};

export default SellTheWallFeatured;

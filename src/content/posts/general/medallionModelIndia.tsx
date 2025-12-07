import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const MedallionModelIndia = () => {
  return (
    <>
      <Helmet>
        <title>The Medallion Model Comes to India | Hushh Fund A</title>
        <meta name="description" content="A Letter to the World's Greatest Capital Allocators. Where Jim Simons' legendary playbook meets India's elite AI talent—and creates the most asymmetric opportunity in systematic investing today." />
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
          src="https://gamma.app/embed/wh3l18kv9bjfi2q"
          title="The Medallion Model Comes to India"
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

export default MedallionModelIndia;

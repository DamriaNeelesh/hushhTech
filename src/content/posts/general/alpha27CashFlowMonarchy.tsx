import React from 'react';
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const Alpha27CashFlowMonarchy = () => {
  return (
    <>
      <Helmet>
        <title>Alpha 27: The Absolute Cash Flow Monarchy | Hushh Fund A</title>
        <meta name="description" content="For institutional allocators managing billions across sovereign wealth mandates, endowment perpetuity obligations, or multi-generational family office preservation goals, Alpha 27 offers something increasingly rare: a strategy you can explain in one sentence and defend with one formula." />
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
          src="https://gamma.app/embed/iyub9kg8ozkapp3"
          title="Alpha 27: The Absolute Cash Flow Monarchy"
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

export default Alpha27CashFlowMonarchy;

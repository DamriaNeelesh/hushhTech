import React, { useState, useEffect } from 'react';
import { Box, Spinner, Center, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const SellTheWallPage = () => {
  const [useFallback, setUseFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set timeout to fallback to PDF if Gamma doesn't load within 8 seconds
    const timeoutId = setTimeout(() => {
      console.log('Gamma iframe timeout - falling back to PDF');
      setUseFallback(true);
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleIframeLoad = () => {
    console.log('Gamma iframe loaded successfully');
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log('Gamma iframe error - falling back to PDF');
    setUseFallback(true);
    setIsLoading(false);
  };

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
        overflow="auto"
        margin="0"
        padding="0"
        zIndex="999"
        bg="white"
      >
        {/* Loading Spinner */}
        {isLoading && !useFallback && (
          <Center height="100%" position="absolute" width="100%" zIndex="1000" bg="white">
            <Box textAlign="center">
              <Spinner size="xl" color="blue.500" thickness="4px" mb={4} />
              <Text fontSize="sm" color="gray.600">Loading Sell the Wall presentation...</Text>
            </Box>
          </Center>
        )}

        {/* Try Gamma embed first */}
        {!useFallback ? (
          <Box
            width="100%"
            maxWidth="100%"
            margin="0 auto"
            padding={{ base: "16px", md: "24px" }}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              position="relative"
              width="100%"
              maxWidth="1200px"
              paddingTop={{ base: "70%", md: "56.25%" }} // 16:9 aspect ratio on desktop, taller on mobile
              borderRadius="12px"
              overflow="hidden"
            >
              <Box
                as="iframe"
                src="https://gamma.app/embed/ya0impa0panawof"
                title="Sell the Wall Options Framework"
                loading="lazy"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                border="0"
              />
            </Box>
          </Box>
        ) : (
          // Fallback to PDF embed
          <embed
            src="https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public/costco-products-scrapped/Sell-the-Wall.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: 'block',
            }}
          />
        )}
      </Box>
    </>
  );
};

export default SellTheWallPage;

import React from "react";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

interface GammaEmbedProps {
  title: string;
  description: string;
  src: string;
}

/**
 * Shared Gamma embed wrapper to avoid fixed positioning overlap.
 * Provides padding, background, and responsive sizing for desktop/mobile.
 */
const GammaEmbed: React.FC<GammaEmbedProps> = ({ title, description, src }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Box
        bg="#f8fafc"
        minH="100vh"
        px={{ base: 4, md: 8 }}
        pt={{ base: 20, md: 24 }}
        pb={{ base: 12, md: 16 }}
      >
        <Box
          as="iframe"
          src={src}
          title={title}
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

export default GammaEmbed;

import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import React from 'react';

/**
 * FloatingContactBubble component
 * A 3D floating bubble that appears on the right side of the screen across all pages
 * Clicking it opens email to invest@hushh.ai
 */

// Create motion components
const MotionBox = motion(Box);

export default function FloatingContactBubble() {
  const handleClick = () => {
    window.location.href = 'mailto:invest@hushh.ai';
  };

  return (
    <Tooltip 
      label="Contact Us - invest@hushh.ai" 
      placement="left"
      hasArrow
      bg="gray.700"
      color="white"
      fontSize="sm"
      px={3}
      py={2}
      borderRadius="md"
    >
      <MotionBox
        as="button"
        position="fixed"
        bottom={{ base: '20px', md: '32px' }}
        right={{ base: '20px', md: '32px' }}
        width={{ base: '56px', md: '64px' }}
        height={{ base: '56px', md: '64px' }}
        borderRadius="full"
        bgGradient="linear(to-br, blue.500, purple.600)"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        boxShadow="0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)"
        zIndex={9999}
        border="none"
        outline="none"
        onClick={handleClick}
        aria-label="Contact us via email"
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        _hover={{
          bgGradient: 'linear(to-br, blue.600, purple.700)',
        }}
        _focus={{
          outline: '3px solid',
          outlineColor: 'blue.300',
          outlineOffset: '2px',
        }}
        // Floating animation
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        } as any}
        // Hover animation
        whileHover={{
          scale: 1.1,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        {/* Pulse ring effect */}
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          borderRadius="full"
          border="2px solid"
          borderColor="blue.400"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          } as any}
        />
        
        {/* Mail Icon */}
        <Icon 
          as={Mail} 
          boxSize={{ base: '24px', md: '28px' }}
          strokeWidth={2}
        />
      </MotionBox>
    </Tooltip>
  );
}

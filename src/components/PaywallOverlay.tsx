// Paywall Overlay - Locks all content until $1 payment
// Displays payment prompt and handles payment flow

import { Box, VStack, HStack, Heading, Text, Button, Icon, List, ListItem, ListIcon } from '@chakra-ui/react';
import { Lock, CheckCircle, Clock, Shield, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface PaywallOverlayProps {
  profileName: string;
  slug: string;
  onPayment: () => void;
}

export function PaywallOverlay({ profileName, slug, onPayment }: PaywallOverlayProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await onPayment();
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.95)"
      backdropFilter="blur(20px)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        spacing={6}
        bg="white"
        borderRadius="24px"
        p={{ base: 8, md: 10 }}
        maxW="500px"
        w="full"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        position="relative"
      >
        {/* Lock Icon */}
        <Box
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          borderRadius="full"
          p={5}
          boxShadow="0 10px 30px rgba(102, 126, 234, 0.4)"
        >
          <Icon as={Lock} boxSize={12} color="white" />
        </Box>

        {/* Title */}
        <VStack spacing={2} textAlign="center">
          <Heading as="h2" size="lg" color="gray.900">
            Premium Content Locked
          </Heading>
          <Text fontSize="md" color="gray.600">
            {profileName}'s complete investor profile
          </Text>
        </VStack>

        {/* Features List */}
        <Box w="full" bg="gray.50" borderRadius="16px" p={6}>
          <List spacing={3}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckCircle} color="green.500" boxSize={5} />
              <Text fontSize="sm" color="gray.700">
                <strong>Full Investment Profile</strong> - All 12 AI-generated preferences
              </Text>
            </ListItem>
            
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckCircle} color="green.500" boxSize={5} />
              <Text fontSize="sm" color="gray.700">
                <strong>Contact Information</strong> - Email, phone & address details
              </Text>
            </ListItem>
            
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckCircle} color="green.500" boxSize={5} />
              <Text fontSize="sm" color="gray.700">
                <strong>Unlimited AI Chat</strong> - Ask anything for 30 minutes
              </Text>
            </ListItem>
            
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckCircle} color="green.500" boxSize={5} />
              <Text fontSize="sm" color="gray.700">
                <strong>MCP Integration</strong> - Developer API endpoints
              </Text>
            </ListItem>
          </List>
        </Box>

        {/* Pricing */}
        <VStack spacing={4} w="full">
          <Box textAlign="center">
            <Text fontSize="4xl" fontWeight="bold" color="gray.900">
              $1
            </Text>
            <Text fontSize="sm" color="gray.500">
              30 minutes full access
            </Text>
          </Box>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            isLoading={isProcessing}
            loadingText="Processing..."
            size="lg"
            w="full"
            h="56px"
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            fontSize="md"
            fontWeight="600"
            leftIcon={<Icon as={CreditCard} boxSize={5} />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4)',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
          >
            Unlock Now with Stripe
          </Button>

          {/* Trust Badges */}
          <HStack spacing={4} justify="center" pt={2}>
            <HStack spacing={1}>
              <Icon as={Shield} boxSize={4} color="green.500" />
              <Text fontSize="xs" color="gray.500">Secure Payment</Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={Clock} boxSize={4} color="blue.500" />
              <Text fontSize="xs" color="gray.500">Instant Access</Text>
            </HStack>
          </HStack>
        </VStack>

        {/* Fine Print */}
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Access expires 30 minutes after payment. No recurring charges. Secure checkout via Stripe.
        </Text>
      </VStack>
    </Box>
  );
}

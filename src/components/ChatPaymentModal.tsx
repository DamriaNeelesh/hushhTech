// Payment Modal for Chat Access
// Shows $1 payment prompt after 3 free messages

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Button,
  Icon,
  HStack,
  Box,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircle, MessageCircle, Clock, Shield } from 'lucide-react';

interface ChatPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayment: () => void;
  isProcessing?: boolean;
}

export function ChatPaymentModal({ isOpen, onClose, onPayment, isProcessing = false }: ChatPaymentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="16px" mx={4}>
        <ModalCloseButton />
        <ModalHeader pt={6} pb={2}>
          <HStack spacing={2}>
            <Icon as={MessageCircle} boxSize={6} color="blue.500" />
            <Text fontSize="xl" fontWeight="600">Continue Chatting</Text>
          </HStack>
        </ModalHeader>
        
        <ModalBody pb={6}>
          <VStack spacing={5} align="stretch">
            {/* Message */}
            <Box>
              <Text fontSize="md" color="gray.600">
                You've used your 3 free messages! Unlock unlimited chatting for just <Text as="span" fontWeight="600" color="blue.600">$1</Text>
              </Text>
            </Box>

            {/* Benefits */}
            <List spacing={3}>
              <ListItem>
                <HStack align="flex-start">
                  <ListIcon as={CheckCircle} color="green.500" mt={0.5} />
                  <Text fontSize="sm" color="gray.700">
                    <Text as="span" fontWeight="500">Unlimited messages</Text> for 30 minutes
                  </Text>
                </HStack>
              </ListItem>
              
              <ListItem>
                <HStack align="flex-start">
                  <ListIcon as={Clock} color="blue.500" mt={0.5} />
                  <Text fontSize="sm" color="gray.700">
                    <Text as="span" fontWeight="500">Instant access</Text> after payment
                  </Text>
                </HStack>
              </ListItem>
              
              <ListItem>
                <HStack align="flex-start">
                  <ListIcon as={Shield} color="purple.500" mt={0.5} />
                  <Text fontSize="sm" color="gray.700">
                    <Text as="span" fontWeight="500">Secure payment</Text> via Stripe
                  </Text>
                </HStack>
              </ListItem>
            </List>

            {/* Payment Button */}
            <VStack spacing={3}>
              <Button
                onClick={onPayment}
                isLoading={isProcessing}
                loadingText="Processing..."
                colorScheme="blue"
                size="lg"
                width="100%"
                height="50px"
                fontSize="md"
                fontWeight="600"
                leftIcon={<Icon as={CheckCircle} />}
                _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Pay $1 with Stripe
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                color="gray.500"
                _hover={{ bg: 'gray.100' }}
              >
                Maybe Later
              </Button>
            </VStack>

            {/* Fine Print */}
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Access expires 30 minutes after payment. No recurring charges.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

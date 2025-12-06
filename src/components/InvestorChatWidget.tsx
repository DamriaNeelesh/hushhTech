import { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Avatar, Spinner, useDisclosure, Badge, Icon, useToast } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Clock, MessageCircle } from 'lucide-react';
import { getOrCreateVisitorId } from '../utils/visitorId';
import { ChatPaymentModal } from './ChatPaymentModal';

type Message = { role: 'user' | 'assistant'; content: string };

interface AccessInfo {
  canChat: boolean;
  needsPayment: boolean;
  accessType: 'free' | 'paid' | 'expired';
  messagesRemaining?: number | 'unlimited';
  timeRemaining?: string;
  message?: string;
}

export function InvestorChatWidget({ slug, investorName }: { slug: string; investorName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm ${investorName}'s AI assistant. Ask me about their investment preferences!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [accessInfo, setAccessInfo] = useState<AccessInfo | null>(null);
  const [visitorId] = useState(() => getOrCreateVisitorId());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Check access on mount and handle payment success
  useEffect(() => {
    checkAccess();
    handlePaymentReturn();
  }, []);

  const checkAccess = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-check-access`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          },
          body: JSON.stringify({ visitorId, slug }),
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        setAccessInfo(data);
      }
    } catch (err) {
      console.error('Access check error:', err);
    }
  };

  const handlePaymentReturn = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (paymentStatus === 'success' && sessionId) {
      // Verify payment
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-verify-payment`,
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
            },
            body: JSON.stringify({ sessionId, visitorId, slug }),
          }
        );

        if (res.ok) {
          toast({
            title: 'Payment Successful!',
            description: 'You now have unlimited access for 30 minutes.',
            status: 'success',
            duration: 5000,
          });
          await checkAccess();
        }
      } catch (err) {
        console.error('Payment verification error:', err);
      }

      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (paymentStatus === 'cancel') {
      toast({
        title: 'Payment Cancelled',
        description: 'You can try again when ready.',
        status: 'info',
        duration: 3000,
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-create-checkout`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          },
          body: JSON.stringify({ visitorId, slug }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        status: 'error',
        duration: 5000,
      });
      setProcessing(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    
    // Check if payment is needed before sending
    if (accessInfo && !accessInfo.canChat) {
      onOpen(); // Show payment modal
      return;
    }

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/investor-chat`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          },
          body: JSON.stringify({ slug, message: text, visitorId, history }),
        }
      );
      
      if (res.status === 402) {
        // Payment required
        const data = await res.json();
        setMessages(prev => prev.slice(0, -1)); // Remove user message
        setInput(text); // Restore input
        toast({
          title: 'Payment Required',
          description: data.message || 'Please pay to continue chatting.',
          status: 'warning',
          duration: 5000,
        });
        await checkAccess(); // Refresh access info
        onOpen(); // Show payment modal
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      
      // Update access info if provided
      if (data.accessInfo) {
        setAccessInfo(prev => ({ ...prev!, ...data.accessInfo }));
      } else {
        await checkAccess(); // Refresh access info
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="white" shadow="sm">
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <HStack>
              <Icon as={MessageCircle} color="blue.500" />
              <Text fontWeight="500" fontSize="lg">Chat with {investorName}'s AI Assistant</Text>
            </HStack>
            
            {/* Access Status Badge */}
            {accessInfo && (
              <HStack spacing={2}>
                {accessInfo.accessType === 'free' && accessInfo.messagesRemaining !== undefined && (
                  <Badge colorScheme="blue" fontSize="xs">
                    {accessInfo.messagesRemaining} free messages left
                  </Badge>
                )}
                {accessInfo.accessType === 'paid' && accessInfo.timeRemaining && (
                  <Badge colorScheme="green" fontSize="xs">
                    <HStack spacing={1}>
                      <Icon as={Clock} boxSize={3} />
                      <Text>{accessInfo.timeRemaining}</Text>
                    </HStack>
                  </Badge>
                )}
              </HStack>
            )}
          </HStack>
          
          <Box 
            h="400px" 
            overflowY="auto" 
            bg="gray.50" 
            p={4} 
            borderRadius="md"
            css={{
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
              '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '4px' },
            }}
          >
            {messages.map((msg, i) => (
              <HStack 
                key={i} 
                mb={3} 
                justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                align="flex-start"
              >
                {msg.role === 'assistant' && (
                  <Avatar size="sm" name={investorName} bg="blue.500" />
                )}
                <Box
                  maxW="75%"
                  bg={msg.role === 'user' ? 'blue.500' : 'white'}
                  color={msg.role === 'user' ? 'white' : 'black'}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  {msg.role === 'assistant' ? (
                    <Box
                      fontSize="sm"
                      sx={{
                        '& p': {
                          marginBottom: '0.5rem',
                          lineHeight: '1.6',
                        },
                        '& p:last-child': {
                          marginBottom: '0',
                        },
                        '& strong': {
                          fontWeight: '500',
                          color: 'black',
                        },
                        '& em': {
                          fontStyle: 'italic',
                        },
                        '& ul, & ol': {
                          marginLeft: '1.25rem',
                          marginTop: '0.25rem',
                          marginBottom: '0.5rem',
                        },
                        '& li': {
                          marginBottom: '0.25rem',
                          lineHeight: '1.5',
                        },
                        '& ul li': {
                          listStyleType: 'disc',
                        },
                        '& ol li': {
                          listStyleType: 'decimal',
                        },
                      }}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </Box>
                  ) : (
                    <Text fontSize="sm" whiteSpace="pre-wrap">{msg.content}</Text>
                  )}
                </Box>
                {msg.role === 'user' && (
                  <Avatar size="sm" name="You" bg="gray.400" />
                )}
              </HStack>
            ))}
            {loading && (
              <HStack justify="flex-start" align="center">
                <Avatar size="sm" name={investorName} bg="blue.500" />
                <Spinner size="sm" />
                <Text fontSize="sm" color="gray.500">Thinking...</Text>
              </HStack>
            )}
          </Box>
          
          <HStack>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={accessInfo?.canChat ? "Ask about investment preferences..." : "Pay to continue chatting..."}
              disabled={loading}
            />
            <Button 
              onClick={sendMessage} 
              isLoading={loading}
              colorScheme="blue"
              minW="100px"
            >
              Send
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Payment Modal */}
      <ChatPaymentModal
        isOpen={isOpen}
        onClose={onClose}
        onPayment={handlePayment}
        isProcessing={processing}
      />
    </>
  );
}

import { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Avatar, Spinner } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

type Message = { role: 'user' | 'assistant'; content: string };

export function InvestorChatWidget({ slug, investorName }: { slug: string; investorName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm ${investorName}'s AI assistant. Ask me about their investment preferences!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    
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
          body: JSON.stringify({ slug, message: text, history }),
        }
      );
      
      if (!res.ok) throw new Error('Failed to get response');
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
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
    <Box border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="white" shadow="sm">
      <VStack spacing={4} align="stretch">
        <HStack>
          <Text fontWeight="500" fontSize="lg">💬 Chat with {investorName} Investor Assistant</Text>
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
            placeholder="Ask about investment preferences..."
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
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Heading, Text, Spinner, Button, Flex, Icon, Alert, AlertIcon } from '@chakra-ui/react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import config from '../resources/config/config';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Check for any type and error from the URL
        const type = searchParams.get('type');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        // If there's an error, display it
        if (error) {
          setVerificationStatus('error');
          setErrorMessage(errorDescription || 'An error occurred during verification');
          return;
        }
        
        // If it's a signup confirmation
        if (type === 'signup') {
          // Get the access token and refresh token from the URL
          const accessToken = searchParams.get('access_token');
          const refreshToken = searchParams.get('refresh_token');
          
          if (!accessToken || !refreshToken) {
            setVerificationStatus('error');
            setErrorMessage('Missing authentication tokens');
            return;
          }
          
          // Set the session with Supabase
          const { error } = await config.supabaseClient?.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            setVerificationStatus('error');
            setErrorMessage(error.message);
            return;
          }
          
          // Email verification successful
          setVerificationStatus('success');
          
          // After successful auth, check registration status
          setTimeout(async () => {
            try {
              const { data: { user } } = await config.supabaseClient?.auth.getUser();
              if (user?.email) {
                // Import the service to check registration status
                const { default: checkRegistrationStatus } = await import('../services/authentication/checkRegistrationStatus');
                const registrationStatus = await checkRegistrationStatus(user.email);
                
                if (!registrationStatus.isRegistered) {
                  // User needs to complete registration
                  navigate('/user-registration');
                } else {
                  // User is fully registered
                  navigate('/');
                }
              } else {
                navigate('/login');
              }
            } catch (error) {
              console.error('Error checking registration after auth:', error);
              // Default to registration page if check fails
              navigate('/user-registration');
            }
          }, 1500);
        } else {
          // Handle other auth types if needed
          setVerificationStatus('success');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setVerificationStatus('error');
        setErrorMessage('An unexpected error occurred');
      }
    };
    
    handleEmailVerification();
  }, [searchParams]);
  
  const redirectToLogin = () => {
    navigate('/login');
  };
  
  const redirectToHome = () => {
    navigate('/');
  };
  
  return (
    <Container maxW="container.md" py={12}>
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        p={8} 
        boxShadow="lg" 
        bg="white"
        textAlign="center"
      >
        {verificationStatus === 'loading' && (
          <Flex direction="column" align="center" py={10}>
            <Spinner size="xl" color="#0AADBC" thickness="4px" speed="0.65s" mb={6} />
            <Heading size="lg" mb={4}>Verifying your email...</Heading>
            <Text color="gray.600">Please wait while we confirm your email address.</Text>
          </Flex>
        )}
        
        {verificationStatus === 'success' && (
          <Flex direction="column" align="center" py={6}>
            <Icon as={CheckCircle} w={16} h={16} color="green.500" mb={6} />
            <Heading size="lg" mb={4}>Welcome to HushhTech!</Heading>
            <Text color="gray.600" mb={8}>
              Your email has been successfully verified. You can now set up your profile and start exploring the community.
            </Text>
            <Flex gap={4}>
              <Button 
                colorScheme="green" 
                size="lg" 
                onClick={() => navigate('/user-registration')}
              >
                Set us your profile
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/community')}
              >
                Checkout communnity posts
              </Button>
            </Flex>
          </Flex>
        )}
        
        {verificationStatus === 'error' && (
          <Flex direction="column" align="center" py={6}>
            <Icon as={AlertTriangle} w={16} h={16} color="red.500" mb={6} />
            <Heading size="lg" mb={4}>Verification Failed</Heading>
            <Alert status="error" mb={6}>
              <AlertIcon />
              {errorMessage || 'There was an error verifying your email. Please try again.'}
            </Alert>
            <Flex gap={4}>
              <Button 
                colorScheme="blue" 
                size="lg" 
                onClick={redirectToLogin}
              >
                Try Logging In
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={redirectToHome}
              >
                Go to Home
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default AuthCallback; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Text, Box, Container, VStack, HStack, usePrefersReducedMotion, Divider } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import config from "../resources/config/config";
import ProfilePage from "./profile/profilePage";
import WhyChooseSection from "./WhyChooseSection";
import { Session } from "@supabase/supabase-js";

export default function Hero() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const cardEntry = keyframes`
    from { opacity: 0; transform: translateY(20px) scale(0.96); box-shadow: 0 0 0 rgba(0,0,0,0); }
    to { opacity: 1; transform: translateY(0) scale(1); box-shadow: 0 20px 44px rgba(0,0,0,0.12); }
  `;
  const textEntry = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  `;
  const pulse = keyframes`
    0% { transform: scale(0.98); }
    100% { transform: scale(1); }
  `;
  
  useEffect(() => {
    // Fetch the current session
    if (config.supabaseClient) {
      config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      // Listen for auth state changes
      const { data: { subscription } } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription?.unsubscribe();
    }
  }, []);

  return (
    <>
      {!session ? (
        <Box
          bg="#FFFFFF"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={6}
          pt={{ base: "100px", md: "120px" }}
          pb={{ base: "120px", md: "140px" }}
        >
          <Container maxW="1200px" textAlign="center">
            {/* Hero Headline */}
            <Box mb={{ base: "32px", md: "40px" }}>
              <Text 
                fontSize={{ base: "40px", md: "56px", lg: "64px" }} 
                color="#1D1D1F"
                fontWeight="300" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                lineHeight="1.1"
                letterSpacing="-0.01em"
                mb="8px"
              >
                Investing in the Future.
              </Text>
              <Text 
                fontSize={{ base: "40px", md: "56px", lg: "64px" }} 
                color="#1D1D1F"
                fontWeight="500" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                lineHeight="1.1"
                letterSpacing="-0.01em"
              >
                The AI-Powered Berkshire Hathaway.
              </Text>
            </Box>
            
            {/* Simplified Description */}
            <Text 
              fontSize={{ base: "17px", md: "21px" }} 
              color="#6E6E73"
              fontWeight="400"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              lineHeight="1.5"
              maxW="800px"
              mx="auto"
              mb={{ base: "48px", md: "56px" }}
            >
              We combine AI and human expertise to build exceptional businesses for long-term value creation.
            </Text>
            
            {/* CTA Buttons */}
            <Flex 
              justifyContent="center" 
              gap={4} 
              flexDirection={{ base: 'column', sm: 'row' }}
              alignItems="center"
            >
              <Button
                onClick={() => navigate("/discover-fund-a")}
                background="linear-gradient(to right, #00A9E0, #6DD3EF)"
                color="white"
                rounded="full"
                _hover={{ background: "linear-gradient(to right, #0099CC, #5CC3E5)" }}
                px={8}
                py={6}
                fontSize="17px"
                fontWeight="600"
                minW="200px"
                height="auto"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              >
                Discover Fund A
              </Button>
              <Button
                onClick={() => navigate("/Signup")}
                bg="transparent"
                border="2px solid #1D1D1F"
                color="#1D1D1F"
                rounded="full"
                _hover={{ bg: "#F5F5F7" }}
                px={8}
                py={6}
                fontSize="17px"
                fontWeight="600"
                minW="200px"
                height="auto"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              >
                Become an Investor
              </Button>
            </Flex>
          </Container>
        </Box>
      ) : (
        <ProfilePage />
      )}
      
      <WhyChooseSection />
      
      {/* Fund A Section */}
      <Box py={{ md: 20, base: 14 }} px={4} bg="#F5F5F7">
        <Container maxW="700px">
          <Box textAlign="center" mb={{ base: 6, md: 8 }} animation={prefersReducedMotion ? undefined : `${textEntry} 0.2s ease-out`}>
            <Text
              as="h2"
              fontSize={{ base: "28px", md: "30px" }}
              fontWeight="700"
              color="#111827"
              lineHeight="1.2"
              maxW="90%"
              mx="auto"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
            >
              Fund A: The Genesis of Our Vision.
            </Text>
            <Text
              fontSize={{ base: "17px", md: "17px" }}
              color="#6E6E73"
              maxW="90%"
              mx="auto"
              mt={2}
              lineHeight="1.35"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
            >
              What you reliably get with every Hushh investor profile.
            </Text>
          </Box>
          <Divider borderColor="#E5E5EA" />

          <Flex justify="center" mt={6}>
            <Box
              w="92%"
              maxW="900px"
              bg="#FFFFFF"
              borderRadius="24px"
              boxShadow="0 22px 45px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.85)"
              px={{ base: 5, md: 8 }}
              py={{ base: 6, md: 8 }}
              animation={prefersReducedMotion ? undefined : `${cardEntry} 0.26s ease-out`}
            >
              <Text
                fontSize="13px"
                letterSpacing="0.12em"
                fontWeight="700"
                color="#8E8E93"
                textTransform="uppercase"
                mb={2}
              >
                Investor Profile
              </Text>
              <Text
                fontSize={{ base: "26px", md: "26px" }}
                fontWeight="600"
                color="#111827"
                lineHeight="1.25"
                textAlign="left"
                animation={prefersReducedMotion ? undefined : `${textEntry} 0.22s ease-out`}
              >
                Fund A: The Genesis of Our Vision.
              </Text>

              <VStack align="stretch" spacing={3} mt={4}>
                <Text fontSize="16px" lineHeight="1.5" color="#111827">
                  Launched in 2024, Fund A is our inaugural AI-first investment vehicle. It demonstrates our systematic approach to income investing and value creation.
                </Text>
                <Text fontSize="16px" lineHeight="1.5" color="#111827">
                  Targeting a{" "}
                  <Text as="span" fontWeight="700" animation={prefersReducedMotion ? undefined : `${pulse} 0.18s ease-out`}>
                    69% net IRR
                  </Text>
                  * through our proprietary “Sell the Wall” options framework.
                </Text>
              </VStack>

              <Box
                mt={5}
                border="1px solid #E5E5EA"
                borderRadius="18px"
                p={4}
                bg="rgba(255,255,255,0.7)"
              >
                <HStack spacing={4} align="stretch">
                  <VStack align="center" flex="1" spacing={1}>
                    <Text fontSize="13px" color="#6E6E73" textTransform="uppercase" letterSpacing="0.04em">
                      Target net IRR
                    </Text>
                    <Text fontSize="22px" fontWeight="700" color="#111827">
                      69%
                    </Text>
                  </VStack>
                  <Divider orientation="vertical" borderColor="#E5E5EA" />
                  <VStack align="center" flex="1" spacing={1}>
                    <Text fontSize="13px" color="#6E6E73" textTransform="uppercase" letterSpacing="0.04em">
                      Inception
                    </Text>
                    <Text fontSize="22px" fontWeight="700" color="#111827">
                      2024
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Text
                fontSize="13px"
                color="#6E6E73"
                fontStyle="italic"
                mt={3}
                mb={5}
                textAlign="left"
              >
                *Inspired by natural equilibrium and proven quantitative strategies.
              </Text>

              <Button
                onClick={() => navigate("/discover-fund-a")}
                background="linear-gradient(to right, #00A9E0, #6DD3EF)"
                color="white"
                rounded="full"
                _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
                px={8}
                py={6}
                fontSize="17px"
                fontWeight="600"
                w="full"
                boxShadow="0 16px 34px rgba(0,169,224,0.35)"
              >
                Learn More About Fund A
              </Button>
            </Box>
          </Flex>
          <Divider borderColor="#E5E5EA" mt={8} />
        </Container>
      </Box>
      
      {/* Ready to Transform Section */}
      <Box 
        py={{ base: "80px", md: "100px" }}
        px={6} 
        bg="#FFFFFF"
      >
        <Container maxW="1000px">
          <Box textAlign="center">
            <Text 
              as="h2" 
              fontSize={{ base: "36px", md: "48px" }} 
              fontWeight="500"
              mb={6}
              color="#1D1D1F"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
              lineHeight="1.1"
              letterSpacing="-0.01em"
            >
              Ready to Transform Your Investment Strategy?
            </Text>
            
            <Text 
              fontSize={{ base: "17px", md: "21px" }}
              color="#6E6E73"
              maxW="700px"
              mx="auto"
              mb={10}
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              lineHeight="1.5"
              fontWeight="400"
            >
              Join forward-thinking investors building wealth with our AI-powered approach.
            </Text>
            
            <Flex 
              justifyContent="center" 
              gap={4}
              flexDirection={{ base: 'column', sm: 'row' }}
              alignItems="center"
            >
              <Button
                onClick={() => navigate("/about")}
                background="linear-gradient(to right, #00A9E0, #6DD3EF)"
                color="white"
                minW="200px"
                _hover={{ background:"linear-gradient(to right, #0099CC, #5CC3E5)" }}
                px={8}
                py={6}
                fontSize="17px"
                fontWeight="600"
                borderRadius="full"
                height="auto"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              >
                Learn About Our Mission
              </Button>
              
              <Button
                onClick={() => navigate("/contact")}
                bg="transparent"
                border="2px solid #1D1D1F"
                color="#1D1D1F"
                minW="200px"
                _hover={{ bg: "#F5F5F7" }}
                px={8}
                py={6}
                fontSize="17px"
                fontWeight="600"
                borderRadius="full"
                height="auto"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              >
                Contact Us Today
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}

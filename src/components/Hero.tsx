import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Text, Box, Container, VStack, HStack, usePrefersReducedMotion } from "@chakra-ui/react";
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
          bg="white"
          color="white"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
          py={12}
          fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'}
        >
          <Container maxW="7xl" textAlign="center">
            <Flex direction="column" align="center" mb={{md:8,base:4}}>
              <Box className="pt-20" display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={{md:0,base:4}}>
                <Text fontSize={{ base: "3xl", md: "7xl", lg: "8xl" }} color={'rgb(29,29,29)'} fontWeight="300" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu'} lineHeight="1">
                  Investing in the Future.
                </Text>
                <Text fontSize={{ base: "4xl", md: "7xl", lg: "8xl" }} className="blue-gradient-text" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu'} fontWeight="500" lineHeight="1">
                The AI-Powered Berkshire
                </Text>
                <Text fontSize={{ base: "4xl", md: "7xl", lg: "8xl" }} fontWeight="500" className="blue-gradient-text" fontFamily={'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu'} lineHeight="1">
                Hathaway.
                </Text>
              </Box>
              
              <Text 
                fontSize={{ base: "md", md: "xl", lg: "2xl" }} 
                mb={{md:10,base:20}} 
                mt={6}
                color="rgb(110 110 115 / var(--tw-text-opacity, 1))"
                sx={{
                  "--tw-text-opacity": "1"
                }}
                lineHeight={'1.4'}
                className="text-xl md:text-2xl text-[#6E6E73] mb-12 max-w-5xl mx-auto leading-relaxed font-light"
              >
                Hushh Technologies is pioneering a new era of investment. We uniquely combine advanced AI and profound human expertise to build a modern conglomerate of exceptional, cash-flow rich businesses for long-term value creation.
              </Text>
              
              <Flex justifyContent={{md:"center",base:"flex-end"}} gap={4} flexDirection={{ base: 'column', sm: 'row' }} >
                <Button
                  onClick={() => navigate("/discover-fund-a")}
                  background="linear-gradient(to right, #00A9E0, #6DD3EF)"
                  color="white"
                  rounded="full"
                  _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
                  px={{md:8,base:4}}
                  py={{md:4,base:2}}
                  fontSize="md"
                  fontWeight="semibold"
                  minW={{md:"200px",base:"100px"}}
                  // h="auto"
                >
                  Discover Fund A
                </Button>
                <Button
                  onClick={() => navigate("/Signup")}
                  bg="transparent"
                  border="1px solid #1D293D"
                  color="#1D293D"
                  rounded="full"
                  // _hover={{ bg: "#fef08a" }}
                  px={4}
                  py={4}
                  fontSize="md"
                  fontWeight="semibold"
                  minW="200px"
                  // h="auto"
                >
                  Become an Investor
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Box>
      ) : (
        <ProfilePage />
      )}
      
      <WhyChooseSection />
      
      {/* Fund A Section */}
      <Box py={{ md: 20, base: 12 }} px={4} bg="white">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={{ base: 6, md: 8 }} animation={prefersReducedMotion ? undefined : `${textEntry} 0.2s ease-out`}>
            <Text
              as="h2"
              fontSize={{ base: "26px", md: "30px" }}
              fontWeight="700"
              color="#111827"
              lineHeight="1.2"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
            >
              Fund A: The Genesis of Our Vision.
            </Text>
            <Text
              fontSize={{ base: "16px", md: "17px" }}
              color="#6E6E73"
              maxW="4xl"
              mx="auto"
              mt={2}
              lineHeight="1.35"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
            >
              What you reliably get with every Hushh investor profile.
            </Text>
          </Box>
          <Box borderTop="1px solid #E5E5EA" />

          <Flex justify="center" mt={6}>
            <Box
              w="100%"
              maxW="900px"
              bg="#F9FAFB"
              borderRadius="24px"
              boxShadow="0 20px 44px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.85)"
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
                fontSize={{ base: "28px", md: "30px" }}
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
                  Targeting a <Text as="span" fontWeight="700" animation={prefersReducedMotion ? undefined : `${pulse} 0.18s ease-out`}>69% net IRR</Text>* through our proprietary “Sell the Wall” options framework.
                </Text>
              </VStack>

              <HStack
                mt={4}
                spacing={6}
                align="center"
                border="1px solid #E5E5EA"
                borderRadius="14px"
                p={3}
                bg="rgba(255,255,255,0.7)"
              >
                <VStack align="start" spacing={0}>
                  <Text fontSize="13px" color="#6E6E73" textTransform="uppercase" letterSpacing="0.04em">
                    Target net IRR
                  </Text>
                  <Text fontSize="17px" fontWeight="700" color="#111827">
                    69%
                  </Text>
                </VStack>
                <VStack align="start" spacing={0}>
                  <Text fontSize="13px" color="#6E6E73" textTransform="uppercase" letterSpacing="0.04em">
                    Inception
                  </Text>
                  <Text fontSize="17px" fontWeight="700" color="#111827">
                    2024
                  </Text>
                </VStack>
              </HStack>

              <Text
                fontSize="13px"
                color="#6E6E73"
                fontStyle="italic"
                mt={3}
                mb={4}
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
                boxShadow="0 14px 30px rgba(0,169,224,0.35)"
              >
                Learn More About Fund A
              </Button>
            </Box>
          </Flex>
          <Box borderBottom="1px solid #E5E5EA" mt={6} />
        </Container>
      </Box>
      
      {/* Ready to Transform Section - with white background */}
      <Box 
        py={16} 
        px={4} 
        bg="rgb(249, 250, 251)"
      >
        <Container maxW="container.xl">
          <Box textAlign="center">
            <Text 
              as="h2" 
              fontSize={{ base: "3xl", md: "5xl" }} 
              // fontWeight="bold" 
              mb={4} 
              // color="gray.800"
              className="font-light text-[#1D1D1F] mb-8 tracking-tight"
            >
              Ready to Transform Your Investment Strategy?
            </Text>
            
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="3xl" 
              mx="auto" 
              mb={10}
              className=" text-[#6E6E73] leading-relaxed font-light"
            >
              Join forward-thinking investors who are already benefiting from our advanced approach to wealth creation.
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
                size="lg"
                minW="200px"
                // h="auto"
                _hover={{background:"linear-gradient(to right, #00A9E0, #6DD3EF)"}}
                py={4}
                fontSize="md"
                fontWeight="semibold"
                borderRadius="full"
              >
                Learn About Our Mission
              </Button>
              
              <Button
                onClick={() => navigate("/contact")}
                bg="transparent"
                border="1px solid #1D293D"
                color="#1D293D"
                size="lg"
                minW="200px"
                // h="auto"
                py={4}
                fontSize="md"
                fontWeight="semibold"
                // _hover={{ bg: "#fef08a" }}
                borderRadius="full"
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

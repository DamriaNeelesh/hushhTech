import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Text, Box, Container, VStack, HStack, usePrefersReducedMotion, Divider } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import config from "../resources/config/config";
import ProfilePage from "./profile/profilePage";
import WhyChooseSection from "./WhyChooseSection";
import { Session } from "@supabase/supabase-js";
import HushhIDHero from "./HushhIDHero";

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
  
  const displayName =
    (session?.user?.user_metadata as { full_name?: string; name?: string } | undefined)?.full_name ||
    (session?.user?.user_metadata as { name?: string } | undefined)?.name ||
    session?.user?.email?.split('@')[0] ||
    'there';

  const handleCreateHushhID = () => {
    navigate("/investor-profile");
  };
  
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
        <>
          <Box
            bg="#FFFFFF"
            px={{ base: 6, sm: 8 }}
            pt={{ base: "56px", md: "88px" }}
            pb={{ base: "48px", md: "96px" }}
            minH={{ base: "100vh", md: "auto" }}
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "center", md: "initial" }}
          >
            <Container maxW="640px">
              <Box>
                <Box maxW="520px" mx="auto">
                  {/* Eyebrow Text */}
                  <Text
                    fontSize={{ base: "16px", md: "18px" }}
                    color="#6B7280"
                    fontWeight="400"
                    lineHeight="1.5"
                    textAlign="center"
                    fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                    mb="3"
                  >
                    Investing in the Future.
                  </Text>

                  {/* Main Heading */}
                  <Text
                    fontSize={{ base: "36px", md: "44px" }}
                    fontWeight="700"
                    color="#0B1120"
                    lineHeight="1.1"
                    textAlign="center"
                    fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
                    mb="5"
                    letterSpacing="-0.01em"
                  >
                    The AI-Powered Berkshire Hathaway.
                  </Text>

                  {/* Subheading */}
                  <Text
                    fontSize={{ base: "18px", md: "19px" }}
                    color="#475569"
                    fontWeight="400"
                    lineHeight="1.65"
                    maxW="520px"
                    mx="auto"
                    textAlign="center"
                    fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                    mb="8"
                  >
                    We combine AI and human expertise to build exceptional businesses for long-term value creation.
                  </Text>

                  {/* Blue Divider Line */}
                  <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mb="7">
                    <Box
                      position="absolute"
                      left="50%"
                      top="50%"
                      transform="translate(-50%, -50%)"
                      w="16px"
                      h="2px"
                      bg="#00A9E0"
                    />
                  </Box>

                  {/* CTA Buttons */}
                  <VStack spacing="3.5" w="100%">
                    <Button
                      onClick={() => navigate("/discover-fund-a")}
                      w="100%"
                      h="54px"
                      borderRadius="16px"
                      bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
                      color="#0B1120"
                      fontSize="17px"
                      fontWeight="650"
                      letterSpacing="0.01em"
                      _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
                      _active={{
                        transform: "scale(0.985)",
                        bgGradient: "linear(to-r, #0097CB, #5FC3E5)",
                      }}
                      transition="transform 120ms ease-out, background 120ms ease-out"
                      fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                    >
                      Discover Fund A
                    </Button>

                    <Button
                      onClick={() => navigate("/investor-profile")}
                      w="100%"
                      h="54px"
                      borderRadius="16px"
                      bg="#FFFFFF"
                      borderColor="#0B1120"
                      borderWidth="1.5px"
                      color="#0B1120"
                      fontSize="17px"
                      fontWeight="650"
                      fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                      _hover={{ bg: "#FFFFFF" }}
                      _active={{ bg: "#F9FAFB", borderColor: "#0B1120" }}
                      transition="transform 120ms ease-out, background 120ms ease-out, border-color 120ms ease-out"
                    >
                      Become an Investor
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <ProfilePage />
      )}
      
      <WhyChooseSection />
      
      {/* Fund A Section */}
      <Box bg="#FFFFFF" pt={{ base: 16, md: 16 }} pb={{ base: 16, md: 16 }} px={{ base: 6, sm: 8 }}>
        <Container maxW="760px">
          <Box textAlign="center" mb={{ base: 8, md: 10 }} animation={prefersReducedMotion ? undefined : `${textEntry} 0.24s ease-out`}>
            <Text
              fontSize="12px"
              letterSpacing="0.18em"
              fontWeight="600"
              color="#6B7280"
              textTransform="uppercase"
              mb={4}
            >
              Investor Profile
            </Text>
            <Text
              as="h2"
              fontSize={{ base: "38px", md: "40px" }}
              fontWeight="700"
              color="#0B1120"
              lineHeight="1.1"
              maxW="640px"
              mx="auto"
              letterSpacing="-0.01em"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
              mb={4}
            >
              Fund A: The Genesis of Our Vision.
            </Text>
            <Text
              fontSize={{ base: "18px", md: "19px" }}
              color="#475569"
              maxW="680px"
              mx="auto"
              lineHeight="1.65"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
              mb={8}
            >
              Launched in 2024, Fund A is our AI-first income vehicle—systematic, disciplined, and engineered for durable value creation.
            </Text>
            <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mb={6}>
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                w="16px"
                h="2px"
                bg="#00A9E0"
              />
            </Box>
          </Box>

          <Box>
            <Box
              border="1px solid #E5E7EB"
              borderRadius="20px"
              bg="#FFFFFF"
              px={5}
              py={5}
              boxShadow="none"
            >
              <VStack align="stretch" spacing={5}>
                <VStack align="stretch" spacing={4}>
                  <Text fontSize="20px" fontWeight="650" color="#0B1120" lineHeight="1.35">
                    Targeting <Text as="span" fontWeight="700">15-20% net IRR</Text>* with our "Sell the Wall" approach.
                  </Text>
                  <Text fontSize="17px" color="#111827" lineHeight="1.6">
                    AI-first, systematic income investing.
                  </Text>
                  <Text fontSize="17px" color="#111827" lineHeight="1.6">
                    Proven risk framework, built for long-term value creation.
                  </Text>
                </VStack>

                <Box borderTop="1px solid #E5E7EB" pt={4}>
                  <VStack align="stretch" spacing={3}>
                    {[
                      { label: "Target net IRR", value: "15-20%", valueSize: "46px" },
                      { label: "Inception", value: "2024", valueSize: "42px" },
                    ].map((stat) => (
                      <Box
                        key={stat.label}
                        border="1px solid #E5E7EB"
                        borderRadius="16px"
                        px={4}
                        py={4}
                        textAlign="center"
                        bg="#FFFFFF"
                      >
                        <Text fontSize="12px" letterSpacing="0.18em" fontWeight="600" color="#6B7280" textTransform="uppercase">
                          {stat.label}
                        </Text>
                        <Text fontSize={stat.valueSize} fontWeight="750" color="#0B1120" mt={1}>
                          {stat.value}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Text
              fontSize="13px"
              color="#6B7280"
              fontStyle="italic"
              mt={4}
              textAlign="left"
              lineHeight="1.45"
              maxW="620px"
            >
              *Inspired by natural equilibrium and proven quantitative strategies.
            </Text>

            <Button
              onClick={() => navigate("/discover-fund-a")}
              w="100%"
              h="54px"
              borderRadius="16px"
              bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
              color="#0B1120"
              fontSize="17px"
              fontWeight="650"
              letterSpacing="0.01em"
              mt={6}
              _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
              _active={{
                transform: "scale(0.985)",
                bgGradient: "linear(to-r, #0097CB, #5FC3E5)",
              }}
              transition="transform 120ms ease-out, background 120ms ease-out"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
            >
              Learn More About Fund A
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Ready to Transform Section */}
      <Box
        bg="#FFFFFF"
        pt={{ base: 16, md: 16 }}
        pb={{ base: 16, md: 16 }}
        px={{ base: 6, sm: 8 }}
      >
        <Container maxW="760px">
          <Box textAlign="center">
            <Text
              as="h2"
              fontSize={{ base: "36px", md: "42px" }}
              fontWeight="700"
              mb={4}
              color="#0B1120"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Display', sans-serif"
              lineHeight="1.1"
              letterSpacing="-0.01em"
            >
              Ready to Transform Your Investment Strategy?
            </Text>

            <Text
              fontSize={{ base: "18px", md: "19px" }}
              color="#475569"
              maxW="640px"
              mx="auto"
              lineHeight="1.65"
              fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
              fontWeight="400"
              mb={8}
            >
              Join forward-thinking investors building wealth with our AI-powered approach.
            </Text>

            <Box position="relative" w="100%" h="1px" bg="#E5E7EB" mb={6}>
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                w="16px"
                h="2px"
                bg="#00A9E0"
              />
            </Box>

            <VStack align="stretch" spacing="3.5">
              <Button
                onClick={() => navigate("/about")}
                w="100%"
                h="54px"
                borderRadius="16px"
                bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
                color="#0B1120"
                fontSize="17px"
                fontWeight="650"
                letterSpacing="0.01em"
                _hover={{ bgGradient: "linear(to-r, #00A9E0, #6DD3EF)" }}
                _active={{
                  transform: "scale(0.985)",
                  bgGradient: "linear(to-r, #0097CB, #5FC3E5)",
                }}
                transition="transform 120ms ease-out, background 120ms ease-out"
                fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
              >
                Learn About Our Mission
              </Button>

              <Button
                onClick={() => navigate("/contact")}
                w="100%"
                h="54px"
                borderRadius="16px"
                bg="#FFFFFF"
                borderColor="#0B1120"
                borderWidth="1.5px"
                color="#0B1120"
                fontSize="17px"
                fontWeight="650"
                fontFamily="Inter, -apple-system, system-ui, 'SF Pro Text', sans-serif"
                _hover={{ bg: "#FFFFFF" }}
                _active={{ bg: "#F9FAFB", borderColor: "#0B1120" }}
                transition="transform 120ms ease-out, background 120ms ease-out, border-color 120ms ease-out"
              >
                Contact Us Today
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

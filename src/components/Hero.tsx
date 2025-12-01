import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, Text, Box, Container } from "@chakra-ui/react";
import config from "../resources/config/config";
import ProfilePage from "./profile/profilePage";
import WhyChooseSection from "./WhyChooseSection";
import { Session } from "@supabase/supabase-js";

export default function Hero() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
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
      <Box 
        py={{md:24,base:16}} 
        px={4} 
        bg="white"
        textAlign="center"
      >
        <Container maxW="container.xl">
          <Box>
            <Text 
              as="h2" 
              fontSize={{ base: "3xl", md: "5xl" }}               
              fontWeight="300" 
              mb={4} 
              color="#1D1D1F"
              lineHeight="1.2"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
            >
              Fund A: The Genesis of Our Vision.
            </Text>
            
            <Text 
              fontSize={{ base: "md", md: "lg", lg: "xl" }} 
              color="#1D1D1F" 
              maxW="5xl" 
              mx="auto" 
              mb={4}
              lineHeight="1.6"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
              fontWeight="400"
            >
              Launched in 2024, Fund A is our inaugural AI-first investment vehicle. It demonstrates our systematic 
              approach to income investing and value creation, targeting a 69% net IRR* through our proprietary "Sell 
              the Wall" options framework.
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="#6E6E73"
              fontStyle="italic"
              maxW="4xl"
              mx="auto"
              mb={10}
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
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
              fontSize="md"
              fontWeight="semibold"
              minW="250px"
            >
              Learn More About Fund A
            </Button>
          </Box>
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

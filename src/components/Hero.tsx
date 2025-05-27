import { useNavigate } from "react-router-dom";
import isLoggedIn from "../services/authentication/isLoggedIn";
import { useEffect, useState } from "react";
import services from "../services/services";
import { Button, Flex, Image, Text, Heading, Box } from "@chakra-ui/react";
import HushhLogo from "./images/Hushhogo.png"
import config from "../resources/config/config";
import ProfilePage from "./profile/profilePage";
import WhyChooseSection from "./WhyChooseSection";

export default function Hero() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  useEffect(() => {
    // Fetch the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <>
    {!session ? (
      <div
        style={{ 
          fontFamily: "'Figtree', sans-serif",
          background: "linear-gradient(to bottom right, #1D293D, #1D2D35)",
        }} 
        className="text-white min-h-[100vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <Flex direction="column" align="center" mb={8}>
            {/* <Image src={HushhLogo} alt="Hushh logo" boxSize={{md:'xs',base:'100px'}}/> */}
            {/* <h1 className="font-bold mb-4">
              Hushh Technologies LLC
            </h1> */}
            <div className="text-lg md:text-xl lg:text-2xl mb-6 pt-20">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">Precision in Data.</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">Power in Investing.</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-[#0AADBC]">Purpose in Results.</span>
            </div>
            <p className="text-base md:text-xl lg:text-2xl mb-6 text-[rgb(209_213_219/var(--tw-text-opacity,1))]">
              At Hushh Technologies, we leverage advanced math, AI, and
              statistics to generate sustainable alpha in a dynamic market. Invest
              in the future of wealth with us.
            </p>
            {!session ? (
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => navigate("/about/leadership")}
                  bg="transparent"
                  color="white"
                  border="1px"
                  borderColor="white"
                  rounded="md"
                  _hover={{ bg: "white", color: "#1D293D" }}
                  px={{ base: 2, md: 4 }}
                  py={{ base: 1, md: 2 }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Explore Our Approach
                </Button>
                <Button
                  onClick={() => navigate("/Signup")}
                  bg="#0891B2"
                  color="#1D293D"
                  border="1px"
                  borderColor="#0891B2"
                  rounded="md"
                  _hover={{ bg: "white", color: "#1D293D" }}
                  px={{ base: 2, md: 4 }}
                  py={{ base: 1, md: 2 }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Become an Investor
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Flex>
        </div>
      </div>
    ):(
      <ProfilePage/>
    )}
    <WhyChooseSection/>
    </>
  );
}

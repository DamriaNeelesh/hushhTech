import { useNavigate } from "react-router-dom";
import isLoggedIn from "../services/authentication/isLoggedIn";
import { useEffect, useState } from "react";
import services from "../services/services";
import { Button, Flex, Image } from "@chakra-ui/react";
import HushhLogo from "./images/HushhTechlogo.png"
export default function Hero() {
  const navigate = useNavigate();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setInterval(() => {
      services.authentication.isLoggedIn(setIsLoggedIn);
    }, 10);
  }, []);
  return (
    <div
    style={{ fontFamily: "'Figtree', sans-serif" }} 
     className="bg-black text-white min-h-[100vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <Flex direction="column" align="center" mb={8}>
         <Image src={HushhLogo} alt="Hushh logo" boxSize={{md:'xs',base:'100px'}}/>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hushh Technologies LLC
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6">
            Precision in Data. Power in Investing. Purpose in Results.
          </p>
          <p className="text-base md:text-lg lg:text-xl mb-6">
            At Hushh Technologies, we leverage advanced math, AI, and
            statistics to generate sustainable alpha in a dynamic market. Invest
            in the future of wealth with us.
          </p>
          {!isLoggedIn ? (
            <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate("/Login")}
              bg="black"
              color="white"
              border="1px"
              borderColor="white"
              rounded="md"
              _hover={{ bg: "white", color: "black" }}
              px={{ base: 2, md: 4 }} // Responsive horizontal padding
              py={{ base: 1, md: 2 }} // Responsive vertical padding
              fontSize={{ base: "sm", md: "md" }} // Responsive font size
            >
              Have an account? Login
            </Button>
            <Button
              onClick={() => navigate("/Signup")}
              bg="black"
              color="white"
              border="1px"
              borderColor="white"
              rounded="md"
              _hover={{ bg: "white", color: "black" }}
              px={{ base: 2, md: 4 }} // Responsive horizontal padding
              py={{ base: 1, md: 2 }} // Responsive vertical padding
              fontSize={{ base: "sm", md: "md" }} // Responsive font size
            >
              Create a new account
            </Button>
          </div>
          ) : (
            <></>
          )}
        </Flex>
      </div>
    </div>
  );
}

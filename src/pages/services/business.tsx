import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Companion from "../../svg/companion.svg";
import MultiUserIcon from "../../svg/multiUser.svg";
import LockIcon from "../../svg/lockIcon.svg";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";

const Business = () => {
  return (
    <>
      <Box
        gap={{ md: "3rem", base: "1rem" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
        textAlign={"center"}
        minH={"100vh"}
      >
        <Heading
          fontWeight={"700"}
          lineHeight={"1.2"}
          fontSize={{ md: "1.25rem", base: "0.65rem" }}
          as={"h1"}
          color={"rgba(61,61,145,1)"}
          mt={{ md: "4rem", base: "2rem" }}
        >
          For Businesses
        </Heading>
        <Text
          fontSize={{ md: "2.83rem", base: "1.41rem" }}
          lineHeight={"1.2"}
          fontWeight={"700"}
          as={"h2"}
          color={"#1c1c1c"}
        >
          Enable Customers. Enrich Data.
          <br></br> Enhance Business.{" "}
        </Text>
        <Text
          color={"#434343"}
          fontWeight={"700"}
          lineHeight={"1.2"}
          fontSize={{ md: "1.5rem", base: "0.8rem" }}
        >
          Revolutionize customer insights, Personalize commerce,
          <br></br>
          Build deeper connections with your customers’ consent and control.
        </Text>

        <Text
          fontWeight={"400"}
          fontSize={{ md: "1rem", base: "0.5rem" }}
          lineHeight={"1.2"}
        >
          Hushh's AI-first platform bridges the gap by empowering customers to
          control their data while <br></br> brands unlock new possibilities for
          engagement, trust, and growth.
        </Text>
      </Box>

      <HStack
        display={"flex"}
        flexDirection={"row"}
        my={{ md: "2.5rem", base: "1.5rem" }}
        gap={{ md: "8rem", base: "2.5rem" }}
        px={{ md: "12rem", base: "1rem" }}
        boxSizing="border-box"
        width={"100%"}
      >
        <Image
          width={"474"}
          height={"440"}
          src="/images/media.png"
          alt="Hushh Eco System"
        />
        <VStack
          flex={1}
          gap={{ md: "1.25rem", base: "0.65rem" }}
          textAlign={"left"}
          alignItems={"flex-start"}
        >
          <Text
            fontWeight={"700"}
            lineHeight={"1.2"}
            color={"rgba(28,28,28,1)"}
            fontSize={{ md: "1.5rem", base: "0.65rem" }}
          >
            Hushh Ecosystem
          </Text>
          <Text
            fontWeight={"400"}
            lineHeight={"1.2"}
            color={"rgba(28,28,28,1)"}
            fontSize={{ md: "1rem", base: "0.5rem" }}
          >
            Hushh offers a suite of products designed to revolutionize how
            businesses interact with their customers in the age of personalized
            experiences.
          </Text>
          <Text
            fontWeight={"400"}
            lineHeight={"1.2"}
            color={"rgba(28,28,28,1)"}
            fontSize={{ md: "1rem", base: "0.5rem" }}
          >
            Forget generic marketing and one-size-fits-all approaches.
          </Text>
          <Text
            fontWeight={"400"}
            lineHeight={"1.2"}
            color={"rgba(28,28,28,1)"}
            fontSize={{ md: "1rem", base: "0.5rem" }}
          >
            Hushh empowers you to create{" "}
            <span style={{ fontWeight: "500" }}>meaningful connections </span>{" "}
            built on <span style={{ fontWeight: "500" }}>trust </span> and{" "}
            <span style={{ fontWeight: "500" }}>tailored</span> interactions.
          </Text>
        </VStack>
      </HStack>

      <Text
        my={{ md: "2rem", base: "1rem" }}
        fontSize={{ md: "1.5rem", base: "0.75rem" }}
        color={"#434343"}
        fontWeight={"700"}
        textAlign={"center"}
        width={"100%"}
        lineHeight={"1.2"}
      >
        Here's how Hushh can transform your business{" "}
      </Text>

      <VStack
        textAlign={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"rgba(245, 245, 247, 1)"}
        p={{ md: "3rem", base: "1rem" }}
      >
        <Text
          fontWeight={"700"}
          lineHeight={"1.2"}
          color={"#434343"}
          fontSize={{ md: "1.5rem", base: "0.75rem" }}
        >
          Hushh Developer APIs
        </Text>
        <Text
          fontWeight={"400"}
          lineHeight={"1.2"}
          mt={{ md: "1.5rem", base: "0.75rem" }}
          color={"rgba(28,28,28,1)"}
          fontSize={{ md: "1.16rem", base: "0.5rem" }}
        >
          Unlock the{" "}
          <span style={{ fontWeight: "500" }}>
            {" "}
            power of consent-driven data{" "}
          </span>{" "}
          to deliver personalized experiences by <br></br>{" "}
          <span style={{ fontWeight: "500" }}>
            integrating our APIs seamlessly with your CRM and applications,
          </span>
          leading to <br></br> increased engagement, customer loyalty, and
          ultimately, higher conversion rates.*
        </Text>
        <Accordion
          allowToggle
          minW={"80%"}
          w="100%"
          flexDirection="row"
          p={{ md: "4rem", base: "1rem" }}
          display="flex"
          justifyContent="center"
          gap={{ md: "6rem", base: "1rem" }}
        >
          <AccordionItem>
            <Box
              bg="purple.200"
              p={{ md: "2rem", base: "0.75rem" }} // Increased padding
              minW={{ md: "250px", base: "150px" }}
              m={2}
              textAlign="center"
              alignItems={"center"}
              justifyContent={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Image src={LockIcon} alt="Consent Driven" boxSize={"5rem"} />
              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  alignSelf="flex-start"
                >
                  Consent-driven <br></br> Data
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto" textAlign={"left"}>
                <Text
                  color={"#030712"}
                  lineHeight={"1.38"}
                  fontWeight={"400"}
                  fontSize={{ md: "1rem", base: "0.5rem" }}
                >
                  Integrate Hushh APIs into your systems to access valuable,
                  zero-party customer data with user consent, adhering to GDPR
                  standards.
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              bg="purple.200"
              p={{ md: "2rem", base: "0.75rem" }} // Increased padding
              minW={{ md: "250px", base: "150px" }}
              // h={{ md: "200px", base: "100px" }}
              m={2}
              textAlign="center"
              alignItems={"center"}
              justifyContent={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Image
                src={MultiUserIcon}
                alt="Personalized Experiences"
                boxSize={"5rem"}
              />

              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  Personalized <br></br> Experiences
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto" textAlign={"left"}>
                <Text
                  color={"#030712"}
                  lineHeight={"1.38"}
                  fontWeight={"400"}
                  fontSize={{ md: "1rem", base: "0.5rem" }}
                >
                  Leverage user preferences, purchase history, and behavior to
                  deliver targeted marketing, personalized recommendations, and
                  bespoke services.
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              bg="purple.200"
              p={{ md: "2rem", base: "1rem" }} // Increased padding
              minW={{ md: "250px", base: "150px" }}
              // h={{ md: "200px", base: "100px" }}
              m={2}
              textAlign="center"
            >
              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  textAlign="center"
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  Trust & <br></br> Transparency
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto" textAlign={"left"}>
                <Text
                  color={"#030712"}
                  lineHeight={"1.38"}
                  fontWeight={"400"}
                  fontSize={{ md: "1rem", base: "0.5rem" }}
                >
                  Empower your users to control their data and decide what they
                  share, fostering a relationship built on transparency and
                  trust.
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>

      <VStack
        my={{ md: "3rem", base: "1.5rem" }}
        px={"18.5%"}
        gap={{ md: "1rem", base: "0.5rem" }}
        textAlign={"left"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          textAlign={"left"}
          fontWeight={"700"}
          fontSize={{ md: "1.5rem", base: "0.75rem" }}
          lineHeight={"1.2"}
          color={"rgba(28,28,28,1)"}
          alignSelf="flex-start"
        >
          Glimpse into Developer APIs
        </Text>
        <Box display="flex" justifyContent="center" width="100%">
          <iframe
            style={{ borderRadius: "10px" }}
            width="950"
            height="506"
            src="https://www.youtube.com/embed/mXymL7IZBPg?si=ipvIGuTEY7eQlvJC"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
      </VStack>

      <Flex
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      justify="space-between"
      bg="#F5F7F9"
      p={{ base: 6, lg: 10 }}
      w="full"
      gap={10}
    >
      {/* Heading Section */}
      <Box textAlign={{ base: 'center', lg: 'left' }} flexShrink={0}>
        <Heading as="h2" size="lg" mb={6} color="#4A5568">
          Are you one of the following?
        </Heading>
      </Box>

      {/* Cards Section */}
      <Flex
        flexWrap="wrap"
        justify="space-around"
        w="full"
        gap={6}
         bg="#E6F4FF"
        mt={{ base: 8, lg: 0 }}
      >
        {/* Card 1 */}
        <VStack
          bg="#E6F4FF"
          p={8}
          borderRadius="md"
          align="start"
          boxShadow="md"
          maxW="300px"
        >
          <Heading as="h3" size="md" color="#2D3748">
            Forward-thinking Businesses
          </Heading>
          <Text mt={4} color="#4A5568">
            Across industries like <b>fashion, retail, wellness, travel, electronics, luxury,</b> and more, Hushh APIs empower you to personalize the customer journey and build deeper connections.
          </Text>
        </VStack>

        {/* Card 2 */}
        <VStack
          bg="#E6F4FF"
          p={8}
          borderRadius="md"
          align="start"
          boxShadow="md"
          maxW="300px"
        >
          <Heading as="h3" size="md" color="#2D3748">
            Application <br></br> Developers
          </Heading>
          <Text mt={4} color="#4A5568">
            Integrate Hushh's powerful consent-driven data insights into your apps to create <b>hyper-personalized user experiences</b> that drive engagement and satisfaction.
          </Text>
        </VStack>

        {/* Card 3 */}
        <VStack
          bg="#E6F4FF"
          p={8}
          borderRadius="md"
          align="start"
          boxShadow="md"
          maxW="300px"
        >
          <Heading as="h3" size="md" color="#2D3748">
            CRM & Database Managers
          </Heading>
          <Text mt={4} color="#4A5568">
            Enrich your customer profiles with valuable, <b>consented data</b> to power personalized marketing campaigns, targeted segmentation, and data-driven decision-making for your organization.
          </Text>
        </VStack>
      </Flex>
    </Flex>
  <Box  bg="#F5F7F9" mb={{md:'2rem',base:'1rem'}} w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
    <Button
          minW={{ md: "780px", base: "8rem" }}
          px={"12px"}
          bg={"rgba(153, 40, 112, 1)"}
          color={"white"}
          _hover={{
            color: "white",
            background: "black",
          }}
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSeIQF0GhLxmwEHrmOpMRQVlxuJBtQYUP2oT_GQt16h8oyw2Dg/viewform",
              "_blank"
            )
          }
        >
          Want to know more about Hushh Companion?
        </Button>
        </Box>  

        <Divider borderWidth={"2px"} my={"1rem"} stroke={"grey"} />

        <VStack
        gap={{ md: "2rem", base: "1rem" }}
        alignItems={"center"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <Text
          color={"#1c1c1c"}
          fontWeight={"700"}
          lineHeight={"1.2"}
          fontSize={{ md: "2.3rem", base: "1.4rem" }}
        >
VIBE Search API
</Text>
        <Text
          color={"#434343"}
          fontWeight={"400"}
          lineHeight={"1.2"}
          fontSize={{ md: "1.17rem", base: "0.65rem" }}
        >
          Delivers <span style={{fontWeight:'500'}}>highly personalized search results</span>  using <span style={{fontWeight:'500'}}>semantic analysis</span> , image search, <br></br> and  <span style={{fontWeight:'500'}}>implicit behavior understanding</span>. Boosts   <span style={{fontWeight:'500'}}>customer satisfaction, <br></br> engagement, and revenue.</span>


        </Text>
        <Accordion
          allowToggle
          minW={"80%"}
          w="100%"
          flexDirection="row"
          p={{ md: "4rem", base: "1rem" }}
          display="flex"
          justifyContent="center"
          gap={{ md: "6rem", base: "1rem" }}
        >
          <AccordionItem>
            <Box
              bg="purple.200"
              p={4}
              w={{ md: "250px", base: "150px" }}
              h={{ md: "200px", base: "100px" }}
              m={2}
              textAlign="center"
            >
              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  alignSelf="flex-start"
                >
                  Discover Your <br></br> Digital Self
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto">
                <UnorderedList spacing={3} textAlign="left">
                  <ListItem>
                    <strong>Track Your Browsing:</strong> Gain insights into
                    your online behavior and interests.
                  </ListItem>
                  <ListItem>
                    <strong>Evolving Interests:</strong> Watch how your
                    preferences change over time.
                  </ListItem>
                  <ListItem>
                    <strong>Data Control:</strong> Choose exactly what
                    information you want to collect.
                  </ListItem>
                </UnorderedList>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              bg="pink.200"
              w={{ md: "250px", base: "150px" }}
              h={{ md: "200px", base: "100px" }}
              p={4}
              m={2}
              textAlign="center"
            >
              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  alignSelf="flex-start"
                >
                  Shop Smarter, <br></br> Not Harder
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto">
                <UnorderedList spacing={3} textAlign="left">
                  <ListItem>
                    <strong>Cross-Brand Shopping Cart: </strong> Compare
                    products across different websites with ease.
                  </ListItem>
                  <ListItem>
                    <strong>Curated Collections: </strong> Save and organize
                    products you love.
                  </ListItem>
                  <ListItem>
                    <strong>Link Library:</strong> Keep all your favorite
                    content just a click away.
                  </ListItem>
                </UnorderedList>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              bg="pink.300"
              w={{ md: "250px", base: "150px" }}
              h={{ md: "200px", base: "100px" }}
              p={4}
              m={2}
              textAlign="center"
            >
              <AccordionButton
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <Box
                  as="span"
                  flex="1"
                  fontWeight="bold"
                  fontSize={{ md: "1.5rem", base: "1rem" }}
                  alignSelf="flex-start"
                >
                  Your Data, <br></br> Your Way
                </Box>
                <ChevronDownIcon
                  style={{
                    background: "#5f6368",
                    color: "white",
                    borderRadius: "50%",
                  }}
                  stroke="white"
                  alignSelf="flex-end"
                />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} fontSize={{ md: "1rem", base: "0.8rem" }}>
              <Box maxWidth="280px" mx="auto">
                <UnorderedList spacing={3} textAlign="left">
                  <ListItem>
                    <strong>Personal Insights:</strong> Understand your digital
                    footprint like never before.
                  </ListItem>
                  <ListItem>
                    <strong>Data Portability:</strong> Easily export your
                    information for personal use.
                  </ListItem>
                  <ListItem>
                    <strong>Future-Ready: </strong> Coming soon - Hushh Wallet
                    for secure, consensual data monetization.
                  </ListItem>
                </UnorderedList>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </>
  );
};

export default Business;

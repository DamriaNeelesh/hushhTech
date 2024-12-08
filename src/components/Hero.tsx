import { useNavigate } from "react-router-dom";
import isLoggedIn from "../services/authentication/isLoggedIn";
import { useEffect, useState } from "react";
import services from "../services/services";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { FaGoogle, FaMicrosoft, FaCheckCircle } from "react-icons/fa";
import { SiSplunk } from "react-icons/si";
import BigMl from '../svg/bigMl.svg';
import Capa from '../svg/capaW.svg';
import ChasingMoney from '../svg/chasingMoney.svg';
import GoogleIcon from '../svg/google.svg';
import Justin from '../svg/justin.svg';
import Manish from '../svg/manish.svg';
import Microsoft from '../svg/microsoft.svg';
import Banner from '../svg/missionBanner.svg';
import MissionLogo from '../svg/missionLogo.svg';
import SquareTick from '../svg/tickSquare.svg';
import Salesforce from '../svg/salesforce.svg';
import Splunk from '../svg/splunk.svg'



export default function Hero() {
  const navigate = useNavigate();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setInterval(() => {
      services.authentication.isLoggedIn(setIsLoggedIn);
    }, 10);
  }, []);
  return (
    <Box bg="white" color="#131313" minH="100vh">
    <Container minW={'100%'} px={4} py={8}>
      {/* Mission Section */}
      <Box mb={12} bg="black" display={'flex'} flexDirection={'row'} justifyContent={'space-between'} color="white" borderRadius="xl" p={8}>
      <Box display='flex' flexDirection='column' gap={{md:'0.5rem',base:'0.4rem' }}>
        <Heading display='flex' flexDirection='row' alignItems={'center'} gap='1rem' as="h2" size="md" mb={4}>
        <Image src={MissionLogo} alt="Hushh Mission"/>  Our Mission
        </Heading>
        <Text fontWeight={'600'} fontSize={{ base: "xxs", md: "xs" }}>Empowering Wealth Creation with Integrity and Innovation</Text>
        <Text fontWeight={'600'} fontSize={{ base: "sm", md: "md" }}>
          We blend quantitative expertise with ethical investment practices to deliver <br></br> personalized financial solutions.
        </Text>
        </Box>
        <Image src={Banner} alt="Hushh Tech Banner" w={{ base: "105px", md: "400px",sm:'240px' }} height={'250px'}/>
      </Box>

      {/* Innovative Strategies Section */}
      <HStack my={'20vh'} spacing={8} display={'flex'} flexDirection={'row'} gap={{md:'2rem',sm:'1rem',base:'0.5rem'}} align="start"  mb={12} fontWeight={'400'}>
        <Heading fontWeight={'400'}  flex={2} fontSize={{ base: "1.43rem",sm:'3.25rem' ,md: "6rem" }} lineHeight="1.2" mb={4}>
          Innovative{" "} <br></br>
          <Text as="span" >
             <span style={{fontStyle:'italic'}}>Strategies,</span> Proven
          </Text>  <br></br>
           Results
        </Heading>
        <VStack flex={1} spacing={6} w="full" align="start">
          {features.map((feature, index) => (
            <Box 
              key={index} 
              display="flex" 
              alignItems="flex-start"
              w="full"
              maxW="600px"
              gap={'2'}
            >
              {/* <Icon as={SquareTick} boxSize={5} color="black" mr={2} /> */}
                <Image src={SquareTick} alt="List items" style={{marginTop:'4px'}}/>
                <Text fontSize={{md:'20px',sm:'11px',base:'5.5px'}} lineHeight={{md:'30px',sm:'16.5px',base:'7.17px'}} fontWeight="400" mb={1}>
                  {feature.title}
                </Text>
           
            </Box>
          ))}
        </VStack>
      </HStack>

      <HStack my={{md:'6rem',base:'1.25rem',sm:'2.75rem'}} mb={12}  align="start" mx={{ base: "xs", md: "2rem", sm: "xs" }}  spacing={8}>
        <Text flex={0.8} color={'#323232'} fontSize={{ base: "xs", md: "sm", sm: "xs" }} fontWeight="600">
          Unique Approach <br></br> to Investment <br></br> Management
        </Text>
        <Heading flex={4} color={'#1C1C1C'} fontWeight={'400'} fontSize={{ base: "1.5rem", md: "6rem", sm: "4rem" }} lineHeight="1.2">
          we combine the art of investment with the science of technology
        </Heading>
      </HStack>

      <HStack minH={'100vh'} spacing={8} display={'flex'} flexDirection={'row'} gap={{md:'2rem',sm:'1rem',base:'0.5rem'}} align="start"  mb={12} fontWeight={'400'}>
        <Image src={ChasingMoney} flex={1} w={{ base: "180px", md: "400px",sm:'200px' }} height={{ base: "280px", md: "400px",sm:'400px' }} alt="Money Investment in Hushh"/>
        <VStack flex={1} spacing={6} w="full" align="start">
          {features2.map((feature, index) => (
            <Box 
              key={index} 
              display="flex" 
              alignItems="flex-start"
              w="full"
              maxW="600px"
              gap={'2'}
            >
              {/* <Icon as={SquareTick} boxSize={5} color="black" mr={2} /> */}
                <Image src={SquareTick} alt="List items" style={{marginTop:'4px'}}/>
                <Text fontSize={{md:'20px',sm:'10px',base:'5px'}} lineHeight={{md:'30px',sm:'16.5px',base:'7.17px'}} fontWeight="400" mb={{md:'1',base:'0',sm:'0'}}>
                  <span style={{fontWeight:'700'}}>{feature.title}:</span>  {feature.description}
                </Text>
                
            </Box>
          ))}
        </VStack>
      </HStack>
 {/* <Image
          src={ChasingMoney}
          alt="Investment Illustration"
          w={{ base: "full", md: "400px" }}
          mx="auto"
          my={8}
        /> */}
      {/* Leadership Section */}
      <Box mb={20} mx={{md:'12vh',base:'0.5vh',sm:'2vh'}}>
  <Heading 
    fontSize={{ base: "3xl", md: "5xl" }} 
    mb={12}
    textAlign="left"
  >
    Our Leadership Team
  </Heading>

  <VStack spacing={16} align="stretch">
    {leaders.map((leader, index) => (
      <Box key={index} w="100%">
        <Box display="flex" flexDirection="column" gap={8}>
          {/* Name and Title */}
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Heading 
              fontSize={{md:'14.2vh',base:'4vh',sm:'8vh'}} 
              fontStyle="italic"
              fontWeight="700"
              lineHeight="1"
            >
              {leader.name.split(' ')[0]} <br />
              {leader.name.split(' ')[1]}
            </Heading>
            <Box gap={'3.56vh'} display={'flex'} p={{md:'12',base:'3',sm:'6'}} flexDirection={'column'} bg={'#1C1C1C'} borderRadius={'2rem'}>
               <Text color={'#FFFFFF'} fontWeight={'700'} lineHeight={'3.33vh'} fontSize={{md:'2.22vh',sm:'1.8vh',base:'1vh'}}>{leader.title}</Text>
               <HStack gap={'3.5vh'}>
               {leader.companies.map((company, i) => (
                  <Image 
                    key={i} 
                    src={company} 
                    alt="Company Logo" 
                    h={{ base: "20px", md: "62px" }}
                    w={{base:'',md:'62px'}}
                  />
                ))}
               </HStack>
            </Box>
          </Box>

          <HStack gap={'0'}>
            <VStack flex={1} textAlign={'left'} alignItems={'flex-start'}>
               <Text fontWeight={'700'} lineHeight={'28px'} fontSize={'2.22vh'}>{leader.title}</Text>
            </VStack>
            <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
            <Image 
                src={leader.image} 
                alt={leader.name}
                borderRadius="xl"
                w="50%"
                aspectRatio={'290/328'}
                objectFit="cover"
              />
            </VStack>
            <VStack flex={1} justifyContent={'center'} alignItems={'center'} textAlign={'left'}>
              <Text color={'#323232'} fontWeight={'400'} lineHeight={'3.3vh'} fontSize={{md:'2.22vh',sm:'1.6vh',base:'1vh'}}>
              With over a decade of leadership at Google, Microsoft, and Splunk, Manish brings unmatched expertise in AI, machine learning, and data-driven innovation. His vision drives Hu$$h’s mission to empower investors with sustainable, technology-powered wealth strategies.
              </Text>
            </VStack>
          </HStack>
        
      

          
        </Box>
      </Box>
    ))}
  </VStack>
</Box>


      {/* CTA Section */}
      <VStack spacing={6} mb={8}>
        <Flex direction="column" align="center" textAlign="center" maxW="600px" mx="auto">
          <Heading size="lg" mb={4}>
            Join us in shaping the future of AI as it evolves into a reality
          </Heading>
          <Flex gap={4} w="full" direction={{ base: "column", sm: "row" }} justify="center">
            <Button variant="outline" size="lg" w={{ base: "full", sm: "auto" }}>
              Work with us
            </Button>
            <Button variant="outline" size="lg" w={{ base: "full", sm: "auto" }}>
              Join the team
            </Button>
          </Flex>
        </Flex>
      </VStack>
    </Container>
  </Box>
  );
}


const features = [
  {
    title: "Cutting-edge AI-powered insights for smarter investments.",
  },
  {
    title: "Proprietary options-based strategies generating consistent income.",
  },
  {
    title: "Focused investments in cash-generating giants like Apple and Microsoft.",
  },
  {
    title: "Generating 'rental income' through advanced options models.",
  },
];

const features2 = [
  {
    title: "Differentiation in Investment Approach",
    description:"Unlike traditional funds that rely on speculative returns, Hu$$h combines high-frequency options income with disciplined, data-driven long-term growth. We prioritize stability, focusing on high-FCF SPX10 companies that represent the backbone of global markets."
  },
  {
    title: "Math-Driven Decision Making",
    description:"Every strategy is informed by rigorous quantitative analysis, ensuring precision and accuracy."
  },
  {
    title: "AI-Powered Insights",
    description:" Leveraging the latest advancements in machine learning, we identify market inefficiencies and capitalize on opportunities in real time."
  },
  {
    title: "Long-Term Stability",
    description:"Our investments focus on high-quality, cash-generating businesses, ensuring a balance between growth and reliability."
  },
  {
    title:"Transparency You Can Trust",
    description:'Clear communication and a human-centric approach to wealth creation.'
  }
];

const leaders = [
  {
    name: "Manish Sainani",
    title: "Founder & CEO",
    image: Manish,
    description: "With over a decade of leadership at Google, Microsoft, and Splunk...",
    companies: [GoogleIcon, Microsoft, Splunk],
  },
  {
    name: "Justin Donaldson",
    title: "Chief Scientist & Investment Strategist",
    image: Justin,
    description: "Leading the development of our strategic investment approaches...",
    companies: [Capa, Salesforce, BigMl],
  },
];

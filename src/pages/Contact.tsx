import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { MapPin, Phone, Clock } from "lucide-react";

const reasonOptions = [
  "Infrastructure Consultation",
  "Investment Information",
  "Technical Support",
  "Other"
];

emailjs.init("_TMzDc8Bfy6riSfzq");

export default function Contact() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
    captcha: ''
  });

  

  const [captchaError, setCaptchaError] = useState<string>('');
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);

  const generateRandomNumbers = () => {
    const randomNum1 = Math.floor(Math.random() * 100);
    const randomNum2 = Math.floor(Math.random() * 100);
    setNum1(randomNum1);
    setNum2(randomNum2);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userCaptcha = parseInt(formData.captcha, 10);
    const correctAnswer = num1 + num2;

    if (userCaptcha !== correctAnswer) {
      setCaptchaError('Incorrect sum. Please try again.');
      return;
    } else {
      setCaptchaError('');
    }

    const serviceId = "service_tsuapx9";
    const templateId = "template_50ujflf";
    const userId = "DtG13YmoZDccI-GgA";

    const templateParams = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        toast.success('Email sent successfully!');
        navigate('/');
      }, (error) => {
        console.error('Failed to send email:', error.text);
        toast.error('Failed to send email. Please try again later');
      });
  };

  return (
    <Container maxW="container.xl" py={12} px={{ base: 4, md: 6 }}>
      {/* Main Header */}
      <Box textAlign="center" mb={8}>
        <Heading 
          as="h1" 
          size={{ base: "2xl", md: "3xl" }} 
          mb={4}
          letterSpacing="tight"
          fontWeight="bold"
        >
          <Text as="span" color="black">Get in </Text>
          <Text 
            as="span" 
            sx={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              display: "inline",
              backgroundImage: "linear-gradient(to right, #00A9E0, #6DD3EF)"
            }}
          >
            Touch
          </Text>
        </Heading>
        
        <Text 
          fontSize={{ base: "md", md: "lg" }} 
          maxW="3xl" 
          mx="auto" 
          color="gray.600"
        >
          Ready to transform your investment strategy? We'd love to hear from you.
        </Text>
        
        <Text mt={4} fontSize={{ base: "md", md: "md" }} color="gray.600">
          For career-related inquiries, please visit our{' '}
          <ChakraLink
            href="/career"
            // target="_blank"
            rel="noopener noreferrer"
            color="#0AADBC"
            fontWeight="medium"
            _hover={{ textDecoration: 'underline' }}
          >
            Jobs page
          </ChakraLink>. 
          For all other inquiries, please submit the form below.
        </Text>
      </Box>

      {/* Contact Form and Information */}
      <Grid 
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} 
        gap={8} 
        mt={10}
        maxW="container.lg"
        mx="auto"
      >
        {/* Contact Form */}
        <GridItem 
          as={Box} 
          p={8} 
          borderWidth="1px" 
          borderRadius="lg" 
          borderColor="gray.200" 
          bg="white"
          boxShadow="sm"
        >
          <Heading as="h2" size="lg" mb={6}>
            Send us a Message
          </Heading>
          
          <form ref={form} onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Full Name</FormLabel>
                <Input 
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontWeight="medium">Company</FormLabel>
                <Input 
                  name="company"
                  placeholder="Enter your company name (optional)"
                  value={formData.company}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Email Address</FormLabel>
                <Input 
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontWeight="medium">Phone Number</FormLabel>
                <Input 
                  name="phone"
                  placeholder="Enter your phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Reason for Contact</FormLabel>
                <Select 
                  name="reason"
                  placeholder="Select a reason"
                  value={formData.reason}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                >
                  {reasonOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Message</FormLabel>
                <Textarea 
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  rows={4}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel fontWeight="medium">What is the sum of {num1} and {num2}?</FormLabel>
                <Input 
                  name="captcha"
                  placeholder="Enter the answer"
                  value={formData.captcha}
                  onChange={handleChange}
                  size="md"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
                {captchaError && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {captchaError}
                  </Text>
                )}
              </FormControl>
              
              <Box pt={2}>
                <Button 
                  type="submit"
                  bg="linear-gradient(to right, #00A9E0, #6DD3EF)"
                  color="white"
                  size="md"
                  px={8}
                  _hover={{ bg: "cyan.500" }}
                  width="full"
                >
                  Submit Message
                </Button>
              </Box>
            </VStack>
          </form>
        </GridItem>
        
        {/* Contact Information */}
        <GridItem>
          <Box 
            p={8} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.200" 
            bg="white"
            boxShadow="sm"
            mb={8}
          >
            <Heading as="h2" size="lg" mb={6}>
              Contact Information
            </Heading>
            
            <VStack spacing={6} align="start">
              <HStack spacing={4} align="flex-start">
                <Icon as={MapPin} color="red.400" boxSize={5} mt={1} />
                <Box>
                  <Text fontWeight="medium">Address</Text>
                  <Text color="gray.600">1021 5th St W</Text>
                  <Text color="gray.600">Kirkland, WA 98033</Text>
                </Box>
              </HStack>
              
              <HStack spacing={4} align="flex-start">
                <Icon as={Phone} color="red.400" boxSize={5} mt={1} />
                <Box>
                  <Text fontWeight="medium">Phone</Text>
                  <Text color="gray.600">(888) 462-1726</Text>
                </Box>
              </HStack>
              
              <HStack spacing={4} align="flex-start">
                <Icon as={Clock} color="red.400" boxSize={5} mt={1} />
                <Box>
                  <Text fontWeight="medium">Office Hours</Text>
                  <Text color="gray.600">Monday - Friday</Text>
                  <Text color="gray.600">9:00 AM - 6:00 PM PST</Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
          
          <Box 
            p={8} 
            borderRadius="lg" 
            bgGradient="linear(to-r, #2A3B47, #1D2D35)"
            color="white"
            boxShadow="md"
          >
            <Heading as="h3" size="lg" mb={4}>
              Ready to Invest?
            </Heading>
            <Text mb={6}>
              Join forward-thinking investors who are already benefiting from our 
              AI-driven approach to wealth creation.
            </Text>
            <Button
              bg="linear-gradient(to right, #00A9E0, #6DD3EF)"
              color="white"
              _hover={{ bg: "cyan.500" }}
              size="md"
              onClick={() => navigate('/about/leadership')}
            >
              Learn About Our Strategy
            </Button>
          </Box>
        </GridItem>
      </Grid>
      
      <ToastContainer />
    </Container>
  );
}
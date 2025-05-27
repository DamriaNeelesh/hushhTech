import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  Box
} from '@chakra-ui/react';

interface ApplicationFormProps {
  jobTitle: string;
  jobLocation: string,
  onClose: () => void;
}

const ApplicationForm = ({ jobTitle, jobLocation, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    coverLetterLink: ''
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate URLs
      if (!isValidUrl(formData.resumeLink)) {
        throw new Error('Please enter a valid resume link');
      }

      if (formData.coverLetterLink && !isValidUrl(formData.coverLetterLink)) {
        throw new Error('Please enter a valid cover letter link');
      }

      // Send email with links
      await emailjs.send(
        'service_tsuapx9', 
        'template_fx7ipta',
        {
          to_name: 'Hiring Manager',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          position: jobTitle,
          location: jobLocation,
          resume_link: formData.resumeLink,
          cover_letter_link: formData.coverLetterLink || 'Not provided'
        },
        'DtG13YmoZDccI-GgA' 
      );

      toast({
        title: 'Application submitted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Application failed',
        description: error instanceof Error ? error.message : 'Error submitting application. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // URL validation helper
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent borderRadius="lg" mx={4}>
        <ModalHeader fontSize="xl">Apply for {jobTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={1}>
                  <PhoneInput
                    country={'us'}
                    value={formData.phone}
                    onChange={(phone) => setFormData({...formData, phone})}
                    inputStyle={{
                      width: '100%',
                      border: 'none',
                      outline: 'none'
                    }}
                    buttonStyle={{
                      border: 'none',
                      background: 'none'
                    }}
                  />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Resume Link</FormLabel>
                <Input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                  placeholder="https://drive.google.com/your-resume-link"
                  focusBorderColor="cyan.400"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Please provide a public link to your resume
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Cover Letter Link (Optional)</FormLabel>
                <Input
                  type="url"
                  value={formData.coverLetterLink}
                  onChange={(e) => setFormData({...formData, coverLetterLink: e.target.value})}
                  placeholder="https://drive.google.com/your-cover-letter-link"
                  focusBorderColor="cyan.400"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Optional: Provide a public link to your cover letter
                </Text>
              </FormControl>

              <Button 
                type="submit" 
                colorScheme="cyan"
                size="lg"
                isLoading={loading}
                loadingText="Submitting..."
                w="100%"
                mt={4}
              >
                Submit Application
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationForm;
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
  Box,
  Select
} from '@chakra-ui/react';

interface ApplicationFormProps {
  jobTitle: string;
  jobLocation: string,
  onClose: () => void;
}

const ApplicationForm = ({ jobTitle, jobLocation, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    collegeEmail: '',
    officialEmail: '',
    phone: '',
    resumeLink: '',
    college: '',
    collegeOther: ''
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

      // Validate college selection
      if (!formData.college) {
        throw new Error('Please select a college');
      }

      if (formData.college === 'Others' && !formData.collegeOther.trim()) {
        throw new Error('Please enter your college name');
      }

      // Determine college name
      const collegeName = formData.college === 'Others' ? formData.collegeOther : formData.college;

      // Combine first and last name for from_name
      const fromName = `${formData.firstName} ${formData.lastName}`;

      // Send email with links
      await emailjs.send(
        'service_tsuapx9', 
        'template_fx7ipta',
        {
          to_name: 'Hiring Manager',
          from_name: fromName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          from_email: formData.email,
          college_email: formData.collegeEmail,
          official_email: formData.officialEmail,
          phone: formData.phone,
          position: jobTitle,
          location: jobLocation,
          resume_link: formData.resumeLink,
          college: collegeName
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
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Enter your first name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Enter your last name"
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
                <FormLabel>College Email</FormLabel>
                <Input
                  type="email"
                  value={formData.collegeEmail}
                  onChange={(e) => setFormData({...formData, collegeEmail: e.target.value})}
                  placeholder="Enter your college email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Official Email</FormLabel>
                <Input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({...formData, officialEmail: e.target.value})}
                  placeholder="Enter your official email address"
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

              <FormControl isRequired>
                <FormLabel>College</FormLabel>
                <Select
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value, collegeOther: ''})}
                  placeholder="Select your college"
                  focusBorderColor="cyan.400"
                >
                  <option value="LPU">LPU</option>
                  <option value="MIT">MIT</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>

              {formData.college === 'Others' && (
                <FormControl isRequired>
                  <FormLabel>College Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.collegeOther}
                    onChange={(e) => setFormData({...formData, collegeOther: e.target.value})}
                    placeholder="Enter your college name"
                    focusBorderColor="cyan.400"
                  />
                </FormControl>
              )}

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
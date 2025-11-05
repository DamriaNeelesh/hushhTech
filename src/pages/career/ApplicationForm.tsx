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
  jobLocation: string;
  onClose: () => void;
}

interface ApplicationFormState {
  firstName: string;
  lastName: string;
  email: string;
  collegeEmail: string;
  officialEmail: string;
  phone: string;
  resumeLink: string;
  college: string;
}

const createInitialFormState = (): ApplicationFormState => ({
  firstName: '',
  lastName: '',
  email: '',
  collegeEmail: '',
  officialEmail: '',
  phone: '',
  resumeLink: '',
  college: ''
});

const ApplicationForm = ({ jobTitle, jobLocation, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormState>(createInitialFormState);
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

      // Validate college field
      if (!formData.college) {
        throw new Error('Please select a college');
      }

      const fullName = `${formData.firstName} ${formData.lastName}`;
      const collegeName = formData.college;

      // Prepare data for both EmailJS and Excel
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        collegeEmail: formData.collegeEmail,
        officialEmail: formData.officialEmail,
        phone: formData.phone,
        resumeLink: formData.resumeLink,
        college: collegeName,
        jobTitle,
        jobLocation,
        submittedAt: new Date().toISOString()
      };

      // Send email with EmailJS
      await emailjs.send(
        'service_tsuapx9', 
        'template_fx7ipta',
        {
          to_name: 'Hiring Manager',
          from_name: fullName,
          from_email: formData.email,
          phone: formData.phone,
          position: jobTitle,
          location: jobLocation,
          resume_link: formData.resumeLink,
          first_name: formData.firstName,
          last_name: formData.lastName,
          college_email: formData.collegeEmail,
          official_email: formData.officialEmail,
          college: collegeName
        },
        'DtG13YmoZDccI-GgA'
      );

      // Send data to Excel API endpoint
      // Use env override for local dev to hit deployed function
      const excelApiUrl = (import.meta as any).env?.VITE_EXCEL_API_URL || '/api/career-application';
      
      try {
        const excelResponse = await fetch(excelApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        });
        if (!excelResponse.ok) {
          const errorText = await excelResponse.text();
          throw new Error(errorText || 'Failed to save application to Google Sheets');
        }
      } catch (excelError) {
        // Log Excel error but don't fail the form submission
        console.error('Excel API error:', excelError);
        // Optionally show a warning toast
        toast({
          title: 'Application submitted',
          description: 'Email sent successfully, but there was an issue saving to Excel. Please contact support.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }

      toast({
        title: 'Application submitted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData(createInitialFormState());
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>College Email</FormLabel>
                <Input
                  type="email"
                  value={formData.collegeEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, collegeEmail: e.target.value }))}
                  placeholder="Enter your college email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Official Email</FormLabel>
                <Input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, officialEmail: e.target.value }))}
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
                    onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
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
                <FormLabel>College</FormLabel>
                <Select
                  placeholder="Select your college"
                  value={formData.college}
                  onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
                  focusBorderColor="cyan.400"
                >
                  <option value="LPU">LPU</option>
                  <option value="MIT">MIT</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Resume Link</FormLabel>
                <Input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resumeLink: e.target.value }))}
                  placeholder="https://drive.google.com/your-resume-link"
                  focusBorderColor="cyan.400"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Please provide a public link to your resume
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

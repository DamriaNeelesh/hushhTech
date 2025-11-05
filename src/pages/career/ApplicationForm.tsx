import React, { useCallback, useMemo, useState } from 'react';
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

const requiredFieldMessages: Record<keyof ApplicationFormState, string> = {
  firstName: 'Please enter your first name',
  lastName: 'Please enter your last name',
  email: 'Please enter your email address',
  collegeEmail: 'Please enter your college email address',
  officialEmail: 'Please enter your official email address',
  phone: 'Please provide a phone number',
  resumeLink: 'Please provide a link to your resume',
  college: 'Please select your college',
};

const getMissingFieldMessage = (data: ApplicationFormState): string | null => {
  for (const field of Object.keys(requiredFieldMessages) as Array<keyof ApplicationFormState>) {
    if (!data[field]) {
      return requiredFieldMessages[field];
    }
  }
  return null;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const ApplicationForm = ({ jobTitle, jobLocation, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormState>(createInitialFormState);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = useCallback(
    (field: keyof ApplicationFormState) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const emailTemplateParams = useMemo(
    () => ({
      to_name: 'Hiring Manager',
      position: jobTitle,
      location: jobLocation,
    }),
    [jobLocation, jobTitle]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sanitizedData: ApplicationFormState = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        collegeEmail: formData.collegeEmail.trim(),
        officialEmail: formData.officialEmail.trim(),
        phone: formData.phone.trim(),
        resumeLink: formData.resumeLink.trim(),
        college: formData.college,
      };

      const missingFieldMessage = getMissingFieldMessage(sanitizedData);
      if (missingFieldMessage) {
        throw new Error(missingFieldMessage);
      }

      if (!isValidUrl(sanitizedData.resumeLink)) {
        throw new Error('Please enter a valid resume link');
      }

      const applicationData = {
        ...sanitizedData,
        jobTitle,
        jobLocation,
        submittedAt: new Date().toISOString(),
      };

      await emailjs.send(
        'service_tsuapx9',
        'template_fx7ipta',
        {
          ...emailTemplateParams,
          from_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`.trim(),
          from_email: sanitizedData.email,
          phone: sanitizedData.phone,
          resume_link: sanitizedData.resumeLink,
          first_name: sanitizedData.firstName,
          last_name: sanitizedData.lastName,
          college_email: sanitizedData.collegeEmail,
          official_email: sanitizedData.officialEmail,
          college: sanitizedData.college,
        },
        'DtG13YmoZDccI-GgA'
      );

      const excelApiUrl = (import.meta as any).env?.VITE_EXCEL_API_URL || '/api/career-application';
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
                  onChange={handleInputChange('firstName')}
                  placeholder="Enter your first name"
                  focusBorderColor="cyan.400"
                  autoComplete="given-name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  placeholder="Enter your last name"
                  focusBorderColor="cyan.400"
                  autoComplete="family-name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email address"
                  focusBorderColor="cyan.400"
                  autoComplete="email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>College Email</FormLabel>
                <Input
                  type="email"
                  value={formData.collegeEmail}
                  onChange={handleInputChange('collegeEmail')}
                  placeholder="Enter your college email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Official Email</FormLabel>
                <Input
                  type="email"
                  value={formData.officialEmail}
                  onChange={handleInputChange('officialEmail')}
                  placeholder="Enter your official email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={1}>
                  <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={(phone) => setFormData((prev) => ({ ...prev, phone: phone.trim() }))}
                    inputStyle={{
                      width: '100%',
                      border: 'none',
                      outline: 'none'
                    }}
                    buttonStyle={{
                      border: 'none',
                      background: 'none'
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoComplete: 'tel',
                    }}
                  />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>College</FormLabel>
                <Select
                  placeholder="Select your college"
                  value={formData.college}
                  onChange={handleInputChange('college')}
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
                  onChange={handleInputChange('resumeLink')}
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

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

type ApplicationFormState = {
  firstName: string;
  lastName: string;
  email: string;
  collegeEmail: string;
  officialEmail: string;
  phone: string;
  resumeLink: string;
  college: string;
};

const ALLOWED_COLLEGES = [
  { value: 'LPU', label: 'Lovely Professional University (LPU)' },
  { value: 'MIT', label: 'Manipal Institute of Technology (MIT)' },
];

const initialState: ApplicationFormState = {
  firstName: '',
  lastName: '',
  email: '',
  collegeEmail: '',
  officialEmail: '',
  phone: '',
  resumeLink: '',
  college: '',
};

const ApplicationForm = ({ jobTitle, jobLocation, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormState>(() => initialState);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const allowedCollegeValues = useMemo(
    () => new Set(ALLOWED_COLLEGES.map(({ value }) => value)),
    []
  );

  const updateFormField = useCallback(
    <K extends keyof ApplicationFormState>(field: K, value: ApplicationFormState[K]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form inputs
      const sanitizedData: ApplicationFormState = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        collegeEmail: formData.collegeEmail.trim(),
        officialEmail: formData.officialEmail.trim(),
        phone: formData.phone.trim(),
        resumeLink: formData.resumeLink.trim(),
        college: formData.college.trim(),
      };

      const requiredFields: (keyof ApplicationFormState)[] = [
        'firstName',
        'lastName',
        'email',
        'collegeEmail',
        'officialEmail',
        'phone',
        'resumeLink',
        'college',
      ];

      const missingField = requiredFields.find((field) => !sanitizedData[field]);
      if (missingField) {
        throw new Error('Please complete all required fields before submitting');
      }

      if (!allowedCollegeValues.has(sanitizedData.college)) {
        throw new Error('Please select a valid college option');
      }

      if (!isValidUrl(sanitizedData.resumeLink)) {
        throw new Error('Please enter a valid resume link');
      }

      const fullName = `${sanitizedData.firstName} ${sanitizedData.lastName}`;
      const selectedCollege = ALLOWED_COLLEGES.find(({ value }) => value === sanitizedData.college)?.label ?? sanitizedData.college;

      // Prepare data for both EmailJS and Excel
      const applicationData = {
        ...sanitizedData,
        college: selectedCollege,
        collegeValue: sanitizedData.college,
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
          from_email: sanitizedData.email,
          phone: sanitizedData.phone,
          position: jobTitle,
          location: jobLocation,
          resume_link: sanitizedData.resumeLink,
          first_name: sanitizedData.firstName,
          last_name: sanitizedData.lastName,
          college_email: sanitizedData.collegeEmail,
          official_email: sanitizedData.officialEmail,
          college: selectedCollege
        },
        'DtG13YmoZDccI-GgA'
      );

      // Send data to Excel API endpoint
      // Use env override for local dev to hit deployed function
      const excelApiUrl = (import.meta as any).env?.VITE_EXCEL_API_URL || '/api/career-application';
      
      try {
        await fetch(excelApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        });
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
      setFormData(() => ({ ...initialState }));
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
                  onChange={(e) => updateFormField('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormField('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormField('email', e.target.value)}
                  placeholder="Enter your email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>College Email</FormLabel>
                <Input
                  type="email"
                  value={formData.collegeEmail}
                  onChange={(e) => updateFormField('collegeEmail', e.target.value)}
                  placeholder="Enter your college email address"
                  focusBorderColor="cyan.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Official Email</FormLabel>
                <Input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) => updateFormField('officialEmail', e.target.value)}
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
                    onChange={(phone) => updateFormField('phone', phone)}
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
                  onChange={(e) => updateFormField('college', e.target.value)}
                  focusBorderColor="cyan.400"
                >
                  {ALLOWED_COLLEGES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Resume Link</FormLabel>
                <Input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => updateFormField('resumeLink', e.target.value)}
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
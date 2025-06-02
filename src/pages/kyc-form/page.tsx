'use client';

import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  useToast,
  Radio,
  RadioGroup,
  Input,
  Flex,
  Checkbox,
  Textarea,
  Select,
  Stack,
  Divider,
  useColorModeValue,
  SimpleGrid,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../resources/config/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const KYCFormPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [investorType, setInvestorType] = useState("individual");
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedDeclarations, setAcceptedDeclarations] = useState<Record<string, boolean>>({});
  const [eddScreening, setEddScreening] = useState({
    isPep: false,
    isHighRiskJurisdiction: false,
    investmentAmountExceeds10m: false,
    hasComplexStructure: false
  });
  const [beneficialOwners, setBeneficialOwners] = useState<any[]>([{ 
    fullLegalName: "", 
    residentialAddress: { street: "", city: "", state: "", postalCode: "", country: "" },
    dateOfBirth: "",
    nationality: "",
    idNumber: "",
    ownershipPercentage: ""
  }]);
  const [authorizedSignatories, setAuthorizedSignatories] = useState<any[]>([{ 
    fullLegalName: "", 
    position: "" 
  }]);
  
  // File upload references
  const fileRefs = {
    idDocument: useRef<HTMLInputElement>(null),
    proofOfAddress: useRef<HTMLInputElement>(null),
    taxFormW9: useRef<HTMLInputElement>(null),
    taxFormW8BEN: useRef<HTMLInputElement>(null),
    sourceOfFundsDoc: useRef<HTMLInputElement>(null),
    articlesOfIncorporation: useRef<HTMLInputElement>(null),
    operatingAgreement: useRef<HTMLInputElement>(null),
    certificateOfGoodStanding: useRef<HTMLInputElement>(null),
    authorizationDocument: useRef<HTMLInputElement>(null),
    financialDocuments: useRef<HTMLInputElement>(null),
  };

  // File state
  const [files, setFiles] = useState<Record<string, File | null>>({
    idDocument: null,
    proofOfAddress: null,
    taxFormW9: null,
    taxFormW8BEN: null,
    sourceOfFundsDoc: null,
    articlesOfIncorporation: null,
    operatingAgreement: null,
    certificateOfGoodStanding: null,
    authorizationDocument: null,
    financialDocuments: null,
  });

  // Arrays of beneficial owner document refs and files
  const [beneficialOwnerIdRefs, setBeneficialOwnerIdRefs] = useState<React.RefObject<HTMLInputElement>[]>([useRef<HTMLInputElement>(null)]);
  const [beneficialOwnerIdFiles, setBeneficialOwnerIdFiles] = useState<(File | null)[]>([null]);

  // Declaration statements
  const declarations = [
    { id: "decl1", text: "I/We confirm that I am/we are the beneficial owner(s) of the investment capital." },
    { id: "decl2", text: "I/We certify that the funds used for this investment originate from legitimate and legal sources and are not linked to any illicit activities, including money laundering or terrorist financing." },
    { id: "decl3", text: "I/We confirm that I/we (and any associated beneficial owners/entities) are not listed on OFAC, EU, UK, UN, FATF, or other relevant sanctions watchlists, nor are we acting on behalf of any sanctioned individuals or entities." },
    { id: "decl4", text: "I/We confirm that I/we are not investing from, nor are we (or our entity) primarily operating in, a jurisdiction classified as non-cooperative by FATF or the U.S. Treasury, or otherwise prohibited by the Fund." },
    { id: "decl5", text: "I/We agree to fully disclose my/our identity and source of funds as required by the Fund." },
    { id: "decl6", text: "I/We commit to submitting all required AML/KYC documents promptly before capital acceptance and subscription processing." },
    { id: "decl7", text: "I/We agree to undergo additional due diligence if requested by the Fund, which may include providing a Bank Reference Letter, detailed wealth origin documentation, or participating in a verification call." },
    { id: "decl8", text: "I/We understand that the Fund maintains an ongoing monitoring framework and may request updated information periodically." },
    { id: "decl9", text: "I/We certify that all information and documentation provided in this form is true, complete, and accurate to the best of my/our knowledge." },
    { id: "decl10", text: "I/We acknowledge that failure to comply with the Fund's AML/KYC requirements may result in investment rejection or redemption suspension." },
    { id: "decl11", text: "I/We certify that I/we comply with all AML/KYC regulations applicable to my/our jurisdiction." },
    { id: "decl12", text: "By submitting this form, I/we acknowledge that I/we have read, understood, and agree to the terms outlined in the Hushh Renaissance Aloha & Alpha Fund, LP's AML/KYC Documentation." },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    // Clear error for the field being changed
    if (formErrors[field]) {
      setFormErrors((prevErrors: any) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    // Clear nested field error if exists
    if (formErrors[`${parent}.${field}`]) {
      setFormErrors((prevErrors: any) => ({
        ...prevErrors,
        [`${parent}.${field}`]: null
      }));
    }
  };

  const handleAddressChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    if (formErrors[`${parent}.${field}`]) {
      setFormErrors((prevErrors: any) => ({
        ...prevErrors,
        [`${parent}.${field}`]: null
      }));
    }
  };

  const handleFileChange = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      
      // Clear any error for this file field
      if (formErrors[fieldName]) {
        setFormErrors((prev: Record<string, string | null>) => ({ ...prev, [fieldName]: null }));
      }
    }
  };

  const handleBeneficialOwnerChange = (index: number, field: string, value: any) => {
    const updatedOwners = [...beneficialOwners];
    if (field.includes('.')) {
      // Handle nested field (address)
      const [parent, childField] = field.split('.');
      updatedOwners[index][parent] = {
        ...updatedOwners[index][parent],
        [childField]: value
      };
    } else {
      updatedOwners[index][field] = value;
    }
    setBeneficialOwners(updatedOwners);
  };

  const handleAddBeneficialOwner = () => {
    setBeneficialOwners([...beneficialOwners, {
      fullLegalName: "",
      residentialAddress: { street: "", city: "", state: "", postalCode: "", country: "" },
      dateOfBirth: "",
      nationality: "",
      idNumber: "",
      ownershipPercentage: ""
    }]);
    
    // Add a new ref for file upload
    setBeneficialOwnerIdRefs([...beneficialOwnerIdRefs, useRef<HTMLInputElement>(null)]);
    
    // Add a null file placeholder
    setBeneficialOwnerIdFiles([...beneficialOwnerIdFiles, null]);
  };

  const handleBeneficialOwnerFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const updatedFiles = [...beneficialOwnerIdFiles];
      updatedFiles[index] = file;
      setBeneficialOwnerIdFiles(updatedFiles);
    }
  };

  const handleRemoveBeneficialOwner = (index: number) => {
    if (beneficialOwners.length > 1) {
      const updatedOwners = [...beneficialOwners];
      updatedOwners.splice(index, 1);
      setBeneficialOwners(updatedOwners);
      
      const updatedRefs = [...beneficialOwnerIdRefs];
      updatedRefs.splice(index, 1);
      setBeneficialOwnerIdRefs(updatedRefs);
      
      const updatedFiles = [...beneficialOwnerIdFiles];
      updatedFiles.splice(index, 1);
      setBeneficialOwnerIdFiles(updatedFiles);
    }
  };

  const handleSignatoryChange = (index: number, field: string, value: any) => {
    const updatedSignatories = [...authorizedSignatories];
    updatedSignatories[index][field] = value;
    setAuthorizedSignatories(updatedSignatories);
  };

  const handleAddSignatory = () => {
    setAuthorizedSignatories([...authorizedSignatories, { fullLegalName: "", position: "" }]);
  };

  const handleRemoveSignatory = (index: number) => {
    if (authorizedSignatories.length > 1) {
      const updatedSignatories = [...authorizedSignatories];
      updatedSignatories.splice(index, 1);
      setAuthorizedSignatories(updatedSignatories);
    }
  };

  const handleDeclarationChange = (id: string, isChecked: boolean) => {
    setAcceptedDeclarations(prev => ({
      ...prev,
      [id]: isChecked
    }));
  };

  const handleEddChange = (field: string, value: boolean) => {
    setEddScreening(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      // No validation needed for step 1 as the investor type has a default value
      return true;
    } else if (step === 2) {
      // Validate Step 2 - Investor Details
      if (investorType === 'individual') {
        // Validate individual investor fields
        if (!formData.fullLegalName) errors.fullLegalName = "Full legal name is required";
        if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
        if (!formData.nationality) errors.nationality = "Nationality is required";
        if (!formData.identificationType) errors.identificationType = "Identification type is required";
        if (!formData.identificationNumber) errors.identificationNumber = "Identification number is required";
        if (!formData.identificationIssuingCountry) errors.identificationIssuingCountry = "Issuing country is required";
        if (!formData.identificationIssueDate) errors.identificationIssueDate = "Issue date is required";
        if (!formData.identificationExpiryDate) errors.identificationExpiryDate = "Expiry date is required";
        
        // Validate address
        if (!formData.streetAddress) errors.streetAddress = "Street address is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.state) errors.state = "State/Province is required";
        if (!formData.postalCode) errors.postalCode = "Postal code is required";
        if (!formData.country) errors.country = "Country is required";
        
        // Validate tax info
        if (!formData.taxCountry) errors.taxCountry = "Tax residence country is required";
        if (!formData.taxIdentificationNumber) errors.taxIdentificationNumber = "Tax identification number is required";
        
        // Validate source of funds
        if (!formData.sourceOfFundsDescription) errors.sourceOfFundsDescription = "Source of funds description is required";
      } else {
        // Validate institutional investor fields
        if (!formData.legalEntityName) errors.legalEntityName = "Legal entity name is required";
        if (!formData.registrationNumber) errors.registrationNumber = "Registration number is required";
        if (!formData.incorporationDate) errors.incorporationDate = "Incorporation date is required";
        if (!formData.jurisdiction) errors.jurisdiction = "Jurisdiction is required";
        if (!formData.natureOfBusiness) errors.natureOfBusiness = "Nature of business is required";
        
        // Validate registered address
        if (!formData.regStreetAddress) errors.regStreetAddress = "Registered street address is required";
        if (!formData.regCity) errors.regCity = "Registered city is required";
        if (!formData.regState) errors.regState = "Registered state/province is required";
        if (!formData.regPostalCode) errors.regPostalCode = "Registered postal code is required";
        if (!formData.regCountry) errors.regCountry = "Registered country is required";
        
        // Validate source of funds
        if (!formData.entitySourceOfFundsDescription) errors.entitySourceOfFundsDescription = "Source of funds description is required";
      }
    } else if (step === 3) {
      // Validate Step 3 - Documents and Beneficial Owners
      if (investorType === 'individual') {
        // Validate required individual documents
        if (!files.idDocument) errors.idDocument = "Identification document is required";
        if (!files.proofOfAddress) errors.proofOfAddress = "Proof of address is required";
        
        // Validate tax forms based on US tax person status
        if (formData.isUSTaxPerson && !files.taxFormW9) {
          errors.taxFormW9 = "W-9 form is required for U.S. tax persons";
        } else if (!formData.isUSTaxPerson && !files.taxFormW8BEN) {
          errors.taxFormW8BEN = "W-8BEN form is required for non-U.S. tax persons";
        }
      } else {
        // Validate required institutional documents
        if (!files.articlesOfIncorporation) errors.articlesOfIncorporation = "Articles of incorporation are required";
        if (!files.operatingAgreement) errors.operatingAgreement = "Operating agreement is required";
        if (!files.certificateOfGoodStanding) errors.certificateOfGoodStanding = "Certificate of good standing is required";
        if (!files.authorizationDocument) errors.authorizationDocument = "Authorization document is required";
        
        // Validate beneficial owners
        const hasMissingBeneficialOwnerInfo = beneficialOwners.some(
          owner => !owner.fullLegalName || !owner.dateOfBirth || !owner.nationality || 
                  !owner.idNumber || !owner.ownershipPercentage || !owner.residentialAddress.street ||
                  !owner.residentialAddress.city || !owner.residentialAddress.state ||
                  !owner.residentialAddress.postalCode || !owner.residentialAddress.country
        );
        
        if (hasMissingBeneficialOwnerInfo) {
          errors.beneficialOwners = "Please complete all required fields for each beneficial owner";
        }
        
        // Validate beneficial owner ID documents
        const hasMissingBeneficialOwnerDocs = beneficialOwnerIdFiles.some(file => !file);
        if (hasMissingBeneficialOwnerDocs) {
          errors.beneficialOwnerIds = "Please upload ID documents for all beneficial owners";
        }
        
        // Validate authorized signatories
        const hasMissingSignatoryInfo = authorizedSignatories.some(
          signatory => !signatory.fullLegalName || !signatory.position
        );
        
        if (hasMissingSignatoryInfo) {
          errors.authorizedSignatories = "Please complete all required fields for each authorized signatory";
        }
      }
    } else if (step === 4) {
      // Validate Step 4 - Declarations and Contact Info
      
      // Validate declarations
      declarations.forEach(declaration => {
        if (!acceptedDeclarations[declaration.id]) {
          errors[`declaration_${declaration.id}`] = "This declaration must be accepted";
        }
      });
      
      // Validate contact information
      if (!formData.contactName) errors.contactName = "Contact name is required";
      
      if (!formData.contactEmail) {
        errors.contactEmail = "Contact email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
        errors.contactEmail = "Please enter a valid email address";
      }
      
      if (!formData.contactPhone) {
        errors.contactPhone = "Contact phone number is required";
      } else if (formData.contactPhone.length < 10) {
        errors.contactPhone = "Please enter a valid phone number";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Log form data for debugging
      console.log("KYC Form Data:", {
        investorType,
        formData,
        acceptedDeclarations,
        eddScreening,
        beneficialOwners,
        authorizedSignatories,
        files: Object.keys(files).reduce((acc, key) => {
          acc[key] = files[key] ? files[key]?.name : null;
          return acc;
        }, {} as Record<string, string | null>),
        beneficialOwnerIdFiles: beneficialOwnerIdFiles.map(file => file?.name || null)
      });
      
      // Prepare form data for submission
      const formDataToSubmit = new FormData();
      
      // Add investor type
      formDataToSubmit.append('investorType', investorType);
      
      // Add contact info
      const contactInfo = {
        name: formData.contactName || "",
        email: formData.contactEmail || "",
        phone: formData.contactPhone || ""
      };
      formDataToSubmit.append('contactInfo', JSON.stringify(contactInfo));
      
      // Add declarations
      const declarationsArray = declarations.map(decl => ({
        id: decl.id,
        text: decl.text,
        accepted: !!acceptedDeclarations[decl.id]
      }));
      formDataToSubmit.append('declarations', JSON.stringify(declarationsArray));
      
      // Add EDD screening
      formDataToSubmit.append('eddScreening', JSON.stringify(eddScreening));
      
      if (investorType === 'individual') {
        // Individual investor details
        const investorDetails = {
          fullLegalName: formData.fullLegalName || "",
          dateOfBirth: formData.dateOfBirth || "",
          nationality: formData.nationality || "",
          idType: formData.identificationType || "",
          idNumber: formData.identificationNumber || "",
          idIssuingCountry: formData.identificationIssuingCountry || "",
          identificationIssueDate: formData.identificationIssueDate || "",
          identificationExpiryDate: formData.identificationExpiryDate || "",
          residentialAddress: {
            street: formData.streetAddress || "",
            city: formData.city || "",
            state: formData.state || "",
            postalCode: formData.postalCode || "",
            country: formData.country || ""
          },
          taxResidenceCountry: formData.taxCountry || "",
          taxIdNumber: formData.taxIdentificationNumber || "",
          isUSTaxPerson: formData.isUSTaxPerson || false,
          sourceOfFundsDescription: formData.sourceOfFundsDescription || ""
        };
        formDataToSubmit.append('investorDetails', JSON.stringify(investorDetails));
        
        // Add individual files - Updated field names to match backend expectations
        if (files.idDocument) formDataToSubmit.append('idDocument', files.idDocument);
        if (files.proofOfAddress) formDataToSubmit.append('addressProof', files.proofOfAddress);
        if (files.taxFormW9) formDataToSubmit.append('taxForm', files.taxFormW9);
        if (files.taxFormW8BEN) formDataToSubmit.append('taxForm', files.taxFormW8BEN);
        if (files.sourceOfFundsDoc) formDataToSubmit.append('sourceOfFundsDoc', files.sourceOfFundsDoc);
      } else {
        // Institutional investor details
        const investorDetails = {
          legalEntityName: formData.legalEntityName || "",
          registrationNumber: formData.registrationNumber || "",
          incorporationDate: formData.incorporationDate || "",
          jurisdiction: formData.jurisdiction || "",
          registeredAddress: {
            street: formData.regStreetAddress || "",
            city: formData.regCity || "",
            state: formData.regState || "",
            postalCode: formData.regPostalCode || "",
            country: formData.regCountry || ""
          },
          businessAddress: {
            street: formData.businessStreetAddress || "",
            city: formData.businessCity || "",
            state: formData.businessState || "",
            postalCode: formData.businessPostalCode || "",
            country: formData.businessCountry || ""
          },
          natureOfBusiness: formData.natureOfBusiness || "",
          sourceOfFundsDescription: formData.entitySourceOfFundsDescription || ""
        };
        formDataToSubmit.append('investorDetails', JSON.stringify(investorDetails));
        
        // Add beneficial owners
        formDataToSubmit.append('beneficialOwners', JSON.stringify(beneficialOwners));
        
        // Add authorized signatories
        formDataToSubmit.append('authorizedSignatories', JSON.stringify(authorizedSignatories));
        
        // Add institutional files
        if (files.articlesOfIncorporation) formDataToSubmit.append('articlesOfIncorporation', files.articlesOfIncorporation);
        if (files.operatingAgreement) formDataToSubmit.append('operatingAgreement', files.operatingAgreement);
        if (files.certificateOfGoodStanding) formDataToSubmit.append('certificateOfGoodStanding', files.certificateOfGoodStanding);
        if (files.authorizationDocument) formDataToSubmit.append('authorizationDocument', files.authorizationDocument);
        if (files.financialDocuments) formDataToSubmit.append('financialDocuments', files.financialDocuments);
        
        // Add beneficial owner ID documents
        beneficialOwnerIdFiles.forEach((file, index) => {
          if (file) formDataToSubmit.append(`beneficialOwnerIds[${index}]`, file);
        });
      }
      
      // Explicitly execute a POST request to the API endpoint
      const response = await axios({
        method: 'post',
        url: 'https://hushh-techh.onrender.com/api/admin/kyc-verification',
        data: formDataToSubmit,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("API Response:", response.data);
      
      // Handle success
      toast({
        title: "KYC Information Submitted",
        description: "Your KYC information has been successfully submitted for review.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Redirect to profile page
      navigate("/profile");
      
    } catch (error: any) {
      console.error("Error submitting KYC verification:", error);
      
      // Handle error
      toast({
        title: "Submission Error",
        description: error.response?.data?.message || "Failed to submit KYC information. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    const totalSteps = 4;
    
    return (
      <Flex justify="center" align="center" my={8}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <Box 
              w="40px" 
              h="40px" 
              borderRadius="full" 
              background={currentStep >= index + 1 ? "linear-gradient(to right, #00A9E0, #6DD3EF)" : "gray.200"}
              color="white" 
              display="flex" 
              alignItems="center" 
              justifyContent="center" 
              fontWeight="bold"
            >
              {index + 1}
            </Box>
            {index < totalSteps - 1 && (
              <Box w="60px" h="1px" bg={currentStep > index + 1 ? "#1CADBC" : "gray.200"} />
            )}
          </React.Fragment>
        ))}
      </Flex>
    );
  };

  const renderStep1 = () => {
    return (
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel fontWeight="medium" fontSize="xl" color="gray.700">Investor Type</FormLabel>
          <RadioGroup onChange={(value) => setInvestorType(value)} value={investorType} mt={2}>
            <HStack spacing={6}>
              <Radio value="individual" colorScheme="cyan" size="md">
                <Text ml={1}>Individual Investor</Text>
              </Radio>
              <Radio value="institutional" colorScheme="cyan" size="md">
                <Text ml={1}>Institutional / Corporate Investor</Text>
              </Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>
            Select the type of investor you are registering as. This will determine the required documentation.
          </FormHelperText>
        </FormControl>

        <Box mt={8} textAlign="center">
          <Button
            onClick={() => {
              if (validateStep(1)) {
                goToStep(2);
              }
            }}
            background="linear-gradient(to right, #00A9E0, #6DD3EF)"
            size="lg"
            width="50%"
            _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
            py={6}
            color="white"
            borderRadius="md"
          >
            Continue
          </Button>
        </Box>
      </VStack>
    );
  };

  const renderStep2 = () => {
    return (
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="md" mb={4}>
          {investorType === 'individual' ? 'Individual Investor Details' : 'Institutional Investor Details'}
        </Heading>

        {investorType === 'individual' ? (
          // Individual Investor Form Fields
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.fullLegalName}>
                <FormLabel>Full Legal Name</FormLabel>
                <Input 
                  value={formData.fullLegalName || ''} 
                  onChange={(e) => handleInputChange('fullLegalName', e.target.value)}
                  placeholder="Enter your full legal name as it appears on official documents"
                />
                {formErrors.fullLegalName && <FormErrorMessage>{formErrors.fullLegalName}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.dateOfBirth}>
                <FormLabel>Date of Birth</FormLabel>
                <Input 
                  type="date" 
                  value={formData.dateOfBirth || ''} 
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
                {formErrors.dateOfBirth && <FormErrorMessage>{formErrors.dateOfBirth}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.nationality}>
                <FormLabel>Nationality</FormLabel>
                <Input 
                  value={formData.nationality || ''} 
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Enter your nationality"
                />
                {formErrors.nationality && <FormErrorMessage>{formErrors.nationality}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.identificationType}>
                <FormLabel>Identification Type</FormLabel>
                <Select 
                  placeholder="Select identification type"
                  value={formData.identificationType || ''} 
                  onChange={(e) => handleInputChange('identificationType', e.target.value)}
                >
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="national_id">National ID Card</option>
                  <option value="other">Other Government-Issued ID</option>
                </Select>
                {formErrors.identificationType && <FormErrorMessage>{formErrors.identificationType}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.identificationNumber}>
                <FormLabel>Identification Number</FormLabel>
                <Input 
                  value={formData.identificationNumber || ''} 
                  onChange={(e) => handleInputChange('identificationNumber', e.target.value)}
                  placeholder="Enter your ID number"
                />
                {formErrors.identificationNumber && <FormErrorMessage>{formErrors.identificationNumber}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.identificationIssuingCountry}>
                <FormLabel>Issuing Country</FormLabel>
                <Input 
                  value={formData.identificationIssuingCountry || ''} 
                  onChange={(e) => handleInputChange('identificationIssuingCountry', e.target.value)}
                  placeholder="Country that issued your ID"
                />
                {formErrors.identificationIssuingCountry && <FormErrorMessage>{formErrors.identificationIssuingCountry}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.identificationIssueDate}>
                <FormLabel>Issue Date</FormLabel>
                <Input 
                  type="date" 
                  value={formData.identificationIssueDate || ''} 
                  onChange={(e) => handleInputChange('identificationIssueDate', e.target.value)}
                />
                {formErrors.identificationIssueDate && <FormErrorMessage>{formErrors.identificationIssueDate}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.identificationExpiryDate}>
                <FormLabel>Expiry Date</FormLabel>
                <Input 
                  type="date" 
                  value={formData.identificationExpiryDate || ''} 
                  onChange={(e) => handleInputChange('identificationExpiryDate', e.target.value)}
                />
                {formErrors.identificationExpiryDate && <FormErrorMessage>{formErrors.identificationExpiryDate}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Residential Address</Heading>

            <FormControl isRequired isInvalid={!!formErrors.streetAddress}>
              <FormLabel>Street Address</FormLabel>
              <Input 
                value={formData.streetAddress || ''} 
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                placeholder="Enter your street address"
              />
              {formErrors.streetAddress && <FormErrorMessage>{formErrors.streetAddress}</FormErrorMessage>}
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.city}>
                <FormLabel>City</FormLabel>
                <Input 
                  value={formData.city || ''} 
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
                {formErrors.city && <FormErrorMessage>{formErrors.city}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.state}>
                <FormLabel>State/Province</FormLabel>
                <Input 
                  value={formData.state || ''} 
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State/Province"
                />
                {formErrors.state && <FormErrorMessage>{formErrors.state}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.postalCode}>
                <FormLabel>Postal Code</FormLabel>
                <Input 
                  value={formData.postalCode || ''} 
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="Postal/ZIP Code"
                />
                {formErrors.postalCode && <FormErrorMessage>{formErrors.postalCode}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={!!formErrors.country}>
              <FormLabel>Country</FormLabel>
              <Input 
                value={formData.country || ''} 
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Country"
              />
              {formErrors.country && <FormErrorMessage>{formErrors.country}</FormErrorMessage>}
            </FormControl>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Tax Information</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.taxCountry}>
                <FormLabel>Tax Residence Country</FormLabel>
                <Input 
                  value={formData.taxCountry || ''} 
                  onChange={(e) => handleInputChange('taxCountry', e.target.value)}
                  placeholder="Country of tax residence"
                />
                {formErrors.taxCountry && <FormErrorMessage>{formErrors.taxCountry}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.taxIdentificationNumber}>
                <FormLabel>Tax Identification Number (TIN)</FormLabel>
                <Input 
                  value={formData.taxIdentificationNumber || ''} 
                  onChange={(e) => handleInputChange('taxIdentificationNumber', e.target.value)}
                  placeholder="Enter your TIN"
                />
                {formErrors.taxIdentificationNumber && <FormErrorMessage>{formErrors.taxIdentificationNumber}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <Checkbox 
                isChecked={formData.isUSTaxPerson || false}
                onChange={(e) => handleInputChange('isUSTaxPerson', e.target.checked)}
              >
                I am a U.S. tax person (U.S. citizen, U.S. resident, or entity formed in the U.S.)
              </Checkbox>
            </FormControl>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Source of Funds</Heading>

            <FormControl isRequired isInvalid={!!formErrors.sourceOfFundsDescription}>
              <FormLabel>Description of Source of Funds</FormLabel>
              <Textarea 
                value={formData.sourceOfFundsDescription || ''} 
                onChange={(e) => handleInputChange('sourceOfFundsDescription', e.target.value)}
                placeholder="Please describe the origin of the funds you intend to invest (e.g., salary, business income, inheritance, investment returns, etc.)"
                rows={4}
              />
              {formErrors.sourceOfFundsDescription && <FormErrorMessage>{formErrors.sourceOfFundsDescription}</FormErrorMessage>}
            </FormControl>
          </>
        ) : (
          // Institutional Investor Form Fields
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.legalEntityName}>
                <FormLabel>Legal Entity Name</FormLabel>
                <Input 
                  value={formData.legalEntityName || ''} 
                  onChange={(e) => handleInputChange('legalEntityName', e.target.value)}
                  placeholder="Enter full legal entity name"
                />
                {formErrors.legalEntityName && <FormErrorMessage>{formErrors.legalEntityName}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.registrationNumber}>
                <FormLabel>Registration/Incorporation Number</FormLabel>
                <Input 
                  value={formData.registrationNumber || ''} 
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="Registration or incorporation number"
                />
                {formErrors.registrationNumber && <FormErrorMessage>{formErrors.registrationNumber}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.incorporationDate}>
                <FormLabel>Date of Incorporation</FormLabel>
                <Input 
                  type="date" 
                  value={formData.incorporationDate || ''} 
                  onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
                />
                {formErrors.incorporationDate && <FormErrorMessage>{formErrors.incorporationDate}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.jurisdiction}>
                <FormLabel>Jurisdiction of Incorporation</FormLabel>
                <Input 
                  value={formData.jurisdiction || ''} 
                  onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                  placeholder="Country/state of incorporation"
                />
                {formErrors.jurisdiction && <FormErrorMessage>{formErrors.jurisdiction}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={!!formErrors.natureOfBusiness}>
              <FormLabel>Nature of Business</FormLabel>
              <Input 
                value={formData.natureOfBusiness || ''} 
                onChange={(e) => handleInputChange('natureOfBusiness', e.target.value)}
                placeholder="Describe the main business activities"
              />
              {formErrors.natureOfBusiness && <FormErrorMessage>{formErrors.natureOfBusiness}</FormErrorMessage>}
            </FormControl>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Registered Address</Heading>

            <FormControl isRequired isInvalid={!!formErrors.regStreetAddress}>
              <FormLabel>Street Address</FormLabel>
              <Input 
                value={formData.regStreetAddress || ''} 
                onChange={(e) => handleInputChange('regStreetAddress', e.target.value)}
                placeholder="Enter registered street address"
              />
              {formErrors.regStreetAddress && <FormErrorMessage>{formErrors.regStreetAddress}</FormErrorMessage>}
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl isRequired isInvalid={!!formErrors.regCity}>
                <FormLabel>City</FormLabel>
                <Input 
                  value={formData.regCity || ''} 
                  onChange={(e) => handleInputChange('regCity', e.target.value)}
                  placeholder="City"
                />
                {formErrors.regCity && <FormErrorMessage>{formErrors.regCity}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.regState}>
                <FormLabel>State/Province</FormLabel>
                <Input 
                  value={formData.regState || ''} 
                  onChange={(e) => handleInputChange('regState', e.target.value)}
                  placeholder="State/Province"
                />
                {formErrors.regState && <FormErrorMessage>{formErrors.regState}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired isInvalid={!!formErrors.regPostalCode}>
                <FormLabel>Postal Code</FormLabel>
                <Input 
                  value={formData.regPostalCode || ''} 
                  onChange={(e) => handleInputChange('regPostalCode', e.target.value)}
                  placeholder="Postal/ZIP Code"
                />
                {formErrors.regPostalCode && <FormErrorMessage>{formErrors.regPostalCode}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={!!formErrors.regCountry}>
              <FormLabel>Country</FormLabel>
              <Input 
                value={formData.regCountry || ''} 
                onChange={(e) => handleInputChange('regCountry', e.target.value)}
                placeholder="Country"
              />
              {formErrors.regCountry && <FormErrorMessage>{formErrors.regCountry}</FormErrorMessage>}
            </FormControl>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Business Address (if different from registered address)</Heading>

            <FormControl isInvalid={!!formErrors.businessStreetAddress}>
              <FormLabel>Street Address</FormLabel>
              <Input 
                value={formData.businessStreetAddress || ''} 
                onChange={(e) => handleInputChange('businessStreetAddress', e.target.value)}
                placeholder="Enter business street address"
              />
              {formErrors.businessStreetAddress && <FormErrorMessage>{formErrors.businessStreetAddress}</FormErrorMessage>}
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl isInvalid={!!formErrors.businessCity}>
                <FormLabel>City</FormLabel>
                <Input 
                  value={formData.businessCity || ''} 
                  onChange={(e) => handleInputChange('businessCity', e.target.value)}
                  placeholder="City"
                />
                {formErrors.businessCity && <FormErrorMessage>{formErrors.businessCity}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!formErrors.businessState}>
                <FormLabel>State/Province</FormLabel>
                <Input 
                  value={formData.businessState || ''} 
                  onChange={(e) => handleInputChange('businessState', e.target.value)}
                  placeholder="State/Province"
                />
                {formErrors.businessState && <FormErrorMessage>{formErrors.businessState}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!formErrors.businessPostalCode}>
                <FormLabel>Postal Code</FormLabel>
                <Input 
                  value={formData.businessPostalCode || ''} 
                  onChange={(e) => handleInputChange('businessPostalCode', e.target.value)}
                  placeholder="Postal/ZIP Code"
                />
                {formErrors.businessPostalCode && <FormErrorMessage>{formErrors.businessPostalCode}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={!!formErrors.businessCountry}>
              <FormLabel>Country</FormLabel>
              <Input 
                value={formData.businessCountry || ''} 
                onChange={(e) => handleInputChange('businessCountry', e.target.value)}
                placeholder="Country"
              />
              {formErrors.businessCountry && <FormErrorMessage>{formErrors.businessCountry}</FormErrorMessage>}
            </FormControl>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Source of Funds</Heading>

            <FormControl isRequired isInvalid={!!formErrors.entitySourceOfFundsDescription}>
              <FormLabel>Description of Source of Funds</FormLabel>
              <Textarea 
                value={formData.entitySourceOfFundsDescription || ''} 
                onChange={(e) => handleInputChange('entitySourceOfFundsDescription', e.target.value)}
                placeholder="Please describe the origin of the funds your entity intends to invest (e.g., operating income, investment returns, capital contributions, etc.)"
                rows={4}
              />
              {formErrors.entitySourceOfFundsDescription && <FormErrorMessage>{formErrors.entitySourceOfFundsDescription}</FormErrorMessage>}
            </FormControl>
          </>
        )}

        <HStack spacing={4} justify="center" mt={8}>
          <Button
            onClick={() => goToStep(1)}
            size="lg"
            variant="outline"
            colorScheme="cyan"
            width={{ base: "100%", md: "30%" }}
            py={6}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (validateStep(2)) {
                goToStep(3);
              }
            }}
            background="linear-gradient(to right, #00A9E0, #6DD3EF)"
            size="lg"
            width={{ base: "100%", md: "30%" }}
            _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
            py={6}
            color="white"
            borderRadius="md"
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    );
  };

  const renderStep3 = () => {
    return (
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="md" mb={4}>
          {investorType === 'individual' ? 'Required Documents' : 'Organizational Structure & Required Documents'}
        </Heading>

        {investorType === 'institutional' && (
          <>
            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Beneficial Owners (25% or more ownership)</Heading>
            
            {beneficialOwners.map((owner, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h5" size="sm">Beneficial Owner #{index + 1}</Heading>
                  {beneficialOwners.length > 1 && (
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      variant="ghost"
                      onClick={() => handleRemoveBeneficialOwner(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
                  <FormControl isRequired>
                    <FormLabel>Full Legal Name</FormLabel>
                    <Input 
                      value={owner.fullLegalName} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'fullLegalName', e.target.value)}
                      placeholder="Enter full legal name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input 
                      type="date" 
                      value={owner.dateOfBirth} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'dateOfBirth', e.target.value)}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
                  <FormControl isRequired>
                    <FormLabel>Nationality</FormLabel>
                    <Input 
                      value={owner.nationality} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'nationality', e.target.value)}
                      placeholder="Enter nationality"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>ID Number</FormLabel>
                    <Input 
                      value={owner.idNumber} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'idNumber', e.target.value)}
                      placeholder="Enter ID/passport number"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired mb={4}>
                  <FormLabel>Ownership Percentage</FormLabel>
                  <InputGroup>
                    <Input 
                      value={owner.ownershipPercentage} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'ownershipPercentage', e.target.value)}
                      placeholder="Enter percentage of ownership"
                      type="number"
                      max="100"
                      min="0"
                    />
                    <InputLeftAddon>%</InputLeftAddon>
                  </InputGroup>
                </FormControl>

                <Heading as="h6" size="xs" mb={2}>Residential Address</Heading>
                <FormControl isRequired mb={2}>
                  <FormLabel>Street Address</FormLabel>
                  <Input 
                    value={owner.residentialAddress.street} 
                    onChange={(e) => handleBeneficialOwnerChange(index, 'residentialAddress.street', e.target.value)}
                    placeholder="Enter street address"
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={4}>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input 
                      value={owner.residentialAddress.city} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'residentialAddress.city', e.target.value)}
                      placeholder="City"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>State/Province</FormLabel>
                    <Input 
                      value={owner.residentialAddress.state} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'residentialAddress.state', e.target.value)}
                      placeholder="State/Province"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Postal Code</FormLabel>
                    <Input 
                      value={owner.residentialAddress.postalCode} 
                      onChange={(e) => handleBeneficialOwnerChange(index, 'residentialAddress.postalCode', e.target.value)}
                      placeholder="Postal/ZIP Code"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired mb={4}>
                  <FormLabel>Country</FormLabel>
                  <Input 
                    value={owner.residentialAddress.country} 
                    onChange={(e) => handleBeneficialOwnerChange(index, 'residentialAddress.country', e.target.value)}
                    placeholder="Country"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Identification Document</FormLabel>
                  <Input
                    type="file"
                    display="none"
                    ref={beneficialOwnerIdRefs[index]}
                    onChange={(e) => handleBeneficialOwnerFileChange(index, e)}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Button 
                    onClick={() => beneficialOwnerIdRefs[index].current?.click()}
                    colorScheme="cyan"
                    variant="outline"
                    width="100%"
                  >
                    {beneficialOwnerIdFiles[index] ? `File selected: ${beneficialOwnerIdFiles[index]?.name}` : 'Upload ID Document'}
                  </Button>
                  <FormHelperText>
                    Upload a copy of government-issued ID (passport, driver's license, or national ID card)
                  </FormHelperText>
                </FormControl>
              </Box>
            ))}

            <Button
              onClick={handleAddBeneficialOwner}
              colorScheme="cyan"
              variant="ghost"
              leftIcon={<Box as="span" role="img" aria-label="add">+</Box>}
              mb={4}
            >
              Add Another Beneficial Owner
            </Button>

            <Divider my={6} />
            <Heading as="h4" size="sm" mb={4}>Authorized Signatories</Heading>
            
            {authorizedSignatories.map((signatory, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h5" size="sm">Authorized Signatory #{index + 1}</Heading>
                  {authorizedSignatories.length > 1 && (
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      variant="ghost"
                      onClick={() => handleRemoveSignatory(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Full Legal Name</FormLabel>
                    <Input 
                      value={signatory.fullLegalName} 
                      onChange={(e) => handleSignatoryChange(index, 'fullLegalName', e.target.value)}
                      placeholder="Enter full legal name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Position/Title</FormLabel>
                    <Input 
                      value={signatory.position} 
                      onChange={(e) => handleSignatoryChange(index, 'position', e.target.value)}
                      placeholder="Enter position or title"
                    />
                  </FormControl>
                </SimpleGrid>
              </Box>
            ))}

            <Button
              onClick={handleAddSignatory}
              colorScheme="cyan"
              variant="ghost"
              leftIcon={<Box as="span" role="img" aria-label="add">+</Box>}
              mb={4}
            >
              Add Another Signatory
            </Button>
          </>
        )}

        <Divider my={6} />
        <Heading as="h4" size="sm" mb={4}>Required Documents</Heading>

        {investorType === 'individual' ? (
          // Individual investor document uploads
          <VStack spacing={6} align="stretch">
            <FormControl isRequired isInvalid={!!formErrors.idDocument}>
              <FormLabel>Identification Document</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.idDocument}
                onChange={(e) => handleFileChange('idDocument', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.idDocument.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.idDocument ? `File selected: ${files.idDocument.name}` : 'Upload ID Document'}
              </Button>
              <FormHelperText>
                Upload a copy of your passport, driver's license, or national ID card
              </FormHelperText>
              {formErrors.idDocument && <FormErrorMessage>{formErrors.idDocument}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.proofOfAddress}>
              <FormLabel>Proof of Address</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.proofOfAddress}
                onChange={(e) => handleFileChange('proofOfAddress', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.proofOfAddress.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.proofOfAddress ? `File selected: ${files.proofOfAddress.name}` : 'Upload Proof of Address'}
              </Button>
              <FormHelperText>
                Upload a recent utility bill, bank statement, or government correspondence (not older than 3 months)
              </FormHelperText>
              {formErrors.proofOfAddress && <FormErrorMessage>{formErrors.proofOfAddress}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!formErrors.sourceOfFundsDoc}>
              <FormLabel>Source of Funds Documentation</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.sourceOfFundsDoc}
                onChange={(e) => handleFileChange('sourceOfFundsDoc', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.sourceOfFundsDoc.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.sourceOfFundsDoc ? `File selected: ${files.sourceOfFundsDoc.name}` : 'Upload Source of Funds Documentation'}
              </Button>
              <FormHelperText>
                Upload documentation that supports your source of funds (optional but recommended)
              </FormHelperText>
              {formErrors.sourceOfFundsDoc && <FormErrorMessage>{formErrors.sourceOfFundsDoc}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!formErrors.taxFormW9}>
              <FormLabel>Tax Form W-9 (for U.S. tax persons only)</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.taxFormW9}
                onChange={(e) => handleFileChange('taxFormW9', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.taxFormW9.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
                isDisabled={!formData.isUSTaxPerson}
              >
                {files.taxFormW9 ? `File selected: ${files.taxFormW9.name}` : 'Upload W-9 Form'}
              </Button>
              <FormHelperText>
                Required if you are a U.S. tax person
              </FormHelperText>
              {formErrors.taxFormW9 && <FormErrorMessage>{formErrors.taxFormW9}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!formErrors.taxFormW8BEN}>
              <FormLabel>Tax Form W-8BEN (for non-U.S. tax persons only)</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.taxFormW8BEN}
                onChange={(e) => handleFileChange('taxFormW8BEN', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.taxFormW8BEN.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
                isDisabled={formData.isUSTaxPerson}
              >
                {files.taxFormW8BEN ? `File selected: ${files.taxFormW8BEN.name}` : 'Upload W-8BEN Form'}
              </Button>
              <FormHelperText>
                Required if you are not a U.S. tax person
              </FormHelperText>
              {formErrors.taxFormW8BEN && <FormErrorMessage>{formErrors.taxFormW8BEN}</FormErrorMessage>}
            </FormControl>
          </VStack>
        ) : (
          // Institutional investor document uploads
          <VStack spacing={6} align="stretch">
            <FormControl isRequired isInvalid={!!formErrors.articlesOfIncorporation}>
              <FormLabel>Articles of Incorporation/Organization</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.articlesOfIncorporation}
                onChange={(e) => handleFileChange('articlesOfIncorporation', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.articlesOfIncorporation.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.articlesOfIncorporation ? `File selected: ${files.articlesOfIncorporation.name}` : 'Upload Articles of Incorporation'}
              </Button>
              <FormHelperText>
                Upload articles of incorporation or equivalent document
              </FormHelperText>
              {formErrors.articlesOfIncorporation && <FormErrorMessage>{formErrors.articlesOfIncorporation}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.operatingAgreement}>
              <FormLabel>Operating Agreement/Bylaws</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.operatingAgreement}
                onChange={(e) => handleFileChange('operatingAgreement', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.operatingAgreement.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.operatingAgreement ? `File selected: ${files.operatingAgreement.name}` : 'Upload Operating Agreement'}
              </Button>
              <FormHelperText>
                Upload operating agreement, bylaws, or equivalent document
              </FormHelperText>
              {formErrors.operatingAgreement && <FormErrorMessage>{formErrors.operatingAgreement}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.certificateOfGoodStanding}>
              <FormLabel>Certificate of Good Standing</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.certificateOfGoodStanding}
                onChange={(e) => handleFileChange('certificateOfGoodStanding', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.certificateOfGoodStanding.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.certificateOfGoodStanding ? `File selected: ${files.certificateOfGoodStanding.name}` : 'Upload Certificate of Good Standing'}
              </Button>
              <FormHelperText>
                Upload a recent certificate of good standing (not older than 3 months)
              </FormHelperText>
              {formErrors.certificateOfGoodStanding && <FormErrorMessage>{formErrors.certificateOfGoodStanding}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.authorizationDocument}>
              <FormLabel>Board Resolution/Authorization Document</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.authorizationDocument}
                onChange={(e) => handleFileChange('authorizationDocument', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.authorizationDocument.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.authorizationDocument ? `File selected: ${files.authorizationDocument.name}` : 'Upload Authorization Document'}
              </Button>
              <FormHelperText>
                Upload board resolution or equivalent document authorizing this investment
              </FormHelperText>
              {formErrors.authorizationDocument && <FormErrorMessage>{formErrors.authorizationDocument}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!formErrors.financialDocuments}>
              <FormLabel>Financial Statements</FormLabel>
              <Input
                type="file"
                display="none"
                ref={fileRefs.financialDocuments}
                onChange={(e) => handleFileChange('financialDocuments', e)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => fileRefs.financialDocuments.current?.click()}
                colorScheme="cyan"
                variant="outline"
                width="100%"
              >
                {files.financialDocuments ? `File selected: ${files.financialDocuments.name}` : 'Upload Financial Statements'}
              </Button>
              <FormHelperText>
                Upload recent financial statements (recommended)
              </FormHelperText>
              {formErrors.financialDocuments && <FormErrorMessage>{formErrors.financialDocuments}</FormErrorMessage>}
            </FormControl>
          </VStack>
        )}

        <Divider my={6} />
        <Heading as="h4" size="sm" mb={4}>Enhanced Due Diligence Screening</Heading>
        
        <FormControl mb={3}>
          <Checkbox 
            isChecked={eddScreening.isPep}
            onChange={(e) => handleEddChange('isPep', e.target.checked)}
          >
            I am/The entity has a Politically Exposed Person (PEP) as a beneficial owner, director, or authorized signatory.
          </Checkbox>
        </FormControl>
        
        <FormControl mb={3}>
          <Checkbox 
            isChecked={eddScreening.isHighRiskJurisdiction}
            onChange={(e) => handleEddChange('isHighRiskJurisdiction', e.target.checked)}
          >
            I am/The entity is based in, or conducting substantial business in, a high-risk jurisdiction.
          </Checkbox>
        </FormControl>
        
        <FormControl mb={3}>
          <Checkbox 
            isChecked={eddScreening.investmentAmountExceeds10m}
            onChange={(e) => handleEddChange('investmentAmountExceeds10m', e.target.checked)}
          >
            The intended investment amount exceeds $10 million USD.
          </Checkbox>
        </FormControl>
        
        <FormControl mb={3}>
          <Checkbox 
            isChecked={eddScreening.hasComplexStructure}
            onChange={(e) => handleEddChange('hasComplexStructure', e.target.checked)}
          >
            The entity has a complex ownership structure involving multiple jurisdictions or layers.
          </Checkbox>
        </FormControl>

        <HStack spacing={4} justify="center" mt={8}>
          <Button
            onClick={() => goToStep(2)}
            size="lg"
            variant="outline"
            colorScheme="cyan"
            width={{ base: "100%", md: "30%" }}
            py={6}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (validateStep(3)) {
                goToStep(4);
              }
            }}
            background="linear-gradient(to right, #00A9E0, #6DD3EF)"
            size="lg"
            width={{ base: "100%", md: "30%" }}
            _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
            py={6}
            color="white"
            borderRadius="md"
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    );
  };

  const renderStep4 = () => {
    return (
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="md" mb={4}>
          Declarations and Contact Information
        </Heading>
        
        <Divider my={6} />
        <Heading as="h4" size="sm" mb={4}>Declarations</Heading>
        <Text mb={4} color="gray.600">
          Please carefully read and confirm each of the following declarations:
        </Text>
        
        <VStack align="stretch" spacing={3} mb={6}>
          {declarations.map((declaration) => (
            <FormControl key={declaration.id} isRequired isInvalid={!!formErrors[`declaration_${declaration.id}`]}>
              <Checkbox 
                isChecked={!!acceptedDeclarations[declaration.id]}
                onChange={(e) => handleDeclarationChange(declaration.id, e.target.checked)}
              >
                <Text fontSize="sm">{declaration.text}</Text>
              </Checkbox>
              {formErrors[`declaration_${declaration.id}`] && (
                <FormErrorMessage>{formErrors[`declaration_${declaration.id}`]}</FormErrorMessage>
              )}
            </FormControl>
          ))}
        </VStack>
        
        <Divider my={6} />
        <Heading as="h4" size="sm" mb={4}>Contact Information</Heading>
        
        <FormControl isRequired isInvalid={!!formErrors.contactName}>
          <FormLabel>Contact Name</FormLabel>
          <Input 
            value={formData.contactName || ''} 
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder="Enter the name of the primary contact person"
          />
          {formErrors.contactName && <FormErrorMessage>{formErrors.contactName}</FormErrorMessage>}
        </FormControl>
        
        <FormControl isRequired isInvalid={!!formErrors.contactEmail}>
          <FormLabel>Contact Email</FormLabel>
          <Input 
            type="email"
            value={formData.contactEmail || ''} 
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            placeholder="Enter contact email address"
          />
          {formErrors.contactEmail && <FormErrorMessage>{formErrors.contactEmail}</FormErrorMessage>}
        </FormControl>
        
        <FormControl isRequired isInvalid={!!formErrors.contactPhone}>
          <FormLabel>Contact Phone Number</FormLabel>
          <PhoneInput
            country={'us'}
            value={formData.contactPhone || ''}
            onChange={(phone) => handleInputChange('contactPhone', phone)}
            inputStyle={{
              width: '100%',
              height: '40px',
              fontSize: '16px',
              borderRadius: '0.375rem',
            }}
            containerStyle={{
              width: '100%',
            }}
          />
          {formErrors.contactPhone && <FormErrorMessage>{formErrors.contactPhone}</FormErrorMessage>}
        </FormControl>
        
        <Box my={8} textAlign="center">
          <Text color="gray.600" mb={6}>
            By clicking "Submit", you confirm that all information provided is accurate and complete, and you agree to the terms outlined in the declarations above.
          </Text>
          
          <HStack spacing={4} justify="center">
            <Button
              onClick={() => goToStep(3)}
              size="lg"
              variant="outline"
              colorScheme="cyan"
              width={{ base: "100%", md: "30%" }}
              py={6}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (validateStep(4)) {
                  handleSubmit();
                }
              }}
              background="linear-gradient(to right, #00A9E0, #6DD3EF)"
              size="lg"
              width={{ base: "100%", md: "30%" }}
              _hover={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)" }}
              py={6}
              color="white"
              borderRadius="md"
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Submit
            </Button>
          </HStack>
        </Box>
      </VStack>
    );
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" mb={4}>
          <Text as="span" fontSize={{md:'4xl', base:'2xl'}} className="font-light text-[#1D1D1F] mb-4 leading-tight tracking-tight">KYC Verification - </Text>
          <Text as="span" fontSize={{md:'4xl', base:'2xl'}} className="font-medium text-[#1D1D1F] mb-4 leading-tight tracking-tight blue-gradient-text">Hushh Renaissance Aloha & Alpha Fund, LP</Text>
        </Heading>
        <Text mt={4} className="text-lg md:text-xl text-[#6E6E73] max-w-3xl mx-auto font-light leading-relaxed">
          Complete this form to verify your identity and comply with AML/KYC requirements.
        </Text>
      </Box>

      {renderStepIndicator()}

      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        borderColor={useColorModeValue("gray.200", "gray.700")}
        p={6} 
        bg={useColorModeValue("white", "gray.800")}
        mb={8}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </Box>
    </Container>
  );
};

export default KYCFormPage; 
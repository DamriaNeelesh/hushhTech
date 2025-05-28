import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Divider,
  VStack,
} from "@chakra-ui/react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
    <Box textAlign="center" mt={{md:'5rem',base:'2rem'}} mb={10}>
        <Heading as="h1" size="2xl" fontWeight={'500'} className="blue-gradient-text" my={{md:'5rem',base:'2rem'}}>
          Website Privacy Policy
        </Heading>
      </Box>
    <Container maxW="container.lg" py={10} px={4}>
      {/* Page Header */}
      

      <VStack spacing={8} align="stretch">
        {/* Introduction */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Introduction
          </Heading>
          <Text>
            This website privacy policy (the “Policy”) describes how Hushh Technologies LLC and its affiliates (“Hushh”) treat personal information collected on the HushhTech.com website (the “Website”). This Policy does not apply to information that Hushh may collect through other means.
          </Text>
        </Box>
        <Divider />

        {/* Information That Hushh Collects */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Information That Hushh Collects
          </Heading>
          <Box ml={4}>
            <Heading as="h3" size="md" mb={2}>
              Personal Information
            </Heading>
            <Text mb={4}>
              When you visit the Website, Hushh may collect certain personal information about you, such as your name, address, and email address, as well as any other personal information that you may provide, for example, through submission of forms or other documents.
            </Text>
            <Heading as="h3" size="md" mb={2}>
              Nonpersonal Information
            </Heading>
            <Text>
              Hushh will also collect the following nonpersonal information about your visit(s):
            </Text>
            <Box pl={4} mt={2}>
              <Text>• The IP address and domain name used (the IP address is a numerical identifier assigned either to your internet service provider or directly to your computer);</Text>
              <Text>• The type of browser and operating system you use;</Text>
              <Text>• The date, time, and duration for which you visit the Website, the number of times you have visited the Website, and where you come from.</Text>
            </Box>
            <Text mt={4}>
              For purposes of collecting some of the above-referenced information, Hushh uses tracking tools on its Website, such as browser cookies and web beacons. A cookie and a web beacon are pieces of data stored on your device containing information about your visit.
            </Text>
          </Box>
        </Box>
        <Divider />

        {/* How Hushh Uses Information */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            How Hushh Uses Information That It Collects
          </Heading>
          <Text mb={4}>
            Hushh uses information it collects in the following ways:
          </Text>
          <Box pl={4}>
            <Text>• To respond to your requests or questions;</Text>
            <Text>• To inform you about Hushh;</Text>
            <Text>• To communicate with you about your relationship with us;</Text>
            <Text>• To improve the Website and the services provided;</Text>
            <Text>• For security purposes.</Text>
          </Box>
          <Text mt={4}>
            In addition, Hushh may use your information as otherwise permitted by law.
          </Text>
        </Box>
        <Divider />

        {/* Sharing of Information */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Hushh May Share Your Information in Limited Circumstances
          </Heading>
          <Text>
            Hushh may share your information with its employees, agents, or third-party service providers who need to know such information for purposes of performing their jobs, including to respond to requests or questions that you may have. In addition, Hushh may share your information with third parties for purposes of complying with legal requirements or to respond to legal requests, such as in the case of a court order or subpoena or in connection with a regulatory investigation. Finally, Hushh might also share information that it collects with others when it is investigating potential fraud or for other reasons as permitted by law.
          </Text>
        </Box>
        <Divider />

        {/* Protection of Information */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Protection of Information
          </Heading>
          <Text>
            Hushh is strongly committed to protecting any personal information collected through the Website against unauthorized access, use, or disclosure. Hushh will not sell or otherwise disclose any personal information collected from the Website, other than as described herein.
          </Text>
          <Text mt={4}>
            In addition, Hushh has implemented procedures to safeguard the integrity of its information technology assets, including but not limited to authentication, monitoring, auditing, and encryption. These security procedures have been integrated into the design, implementation, and day-to-day operations of the Website as part of a continuing commitment to the security of electronic content as well as the electronic transmission of information. However, no method of safeguarding information is completely secure. While Hushh uses measures designed to protect personal information, it cannot guarantee that our safeguards will be effective or sufficient.
          </Text>
          <Text mt={4}>
            For security purposes, Hushh employs software to monitor traffic to identify unauthorized attempts to upload or change information or otherwise damage the Website. Any information that an individual provides to Hushh by visiting the Website will be stored within the United States. If you live outside of the United States, you understand and agree that Hushh may store your information in the United States. The Website is subject to United States laws, which may or may not afford the same level of protection as those in your country.
          </Text>
        </Box>
        <Divider />

        {/* Retention of Personal Information */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Retention of Personal Information
          </Heading>
          <Text>
            Hushh retains personal information to the extent Hushh deems necessary to carry out the processing activities described above, including but not limited to compliance with applicable laws, regulations, rules, and requests of relevant law enforcement and/or other governmental agencies, and to the extent Hushh reasonably deems necessary to protect its and its partners’ rights, property, or safety and the rights, property, and safety of its users and other third parties.
          </Text>
        </Box>
        <Divider />

        {/* Cookies and Tracking Tools */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Cookies and Tracking Tools
          </Heading>
          <Text>
            As indicated above, Hushh collects nonpersonal information on its Website through the use of tracking tools, such as browser cookies. These cookies are necessary to allow you to browse the Website and access certain pages. Necessary cookies are required for the functionality of the Website so that it works properly. Hushh does not use these cookies to collect personal information about you.
          </Text>
          <Text mt={4}>
            Your browser may give you the ability to control cookies. Certain browsers can be set to reject cookies. Options you select are browser and device specific. If you block or delete cookies, not all of the tracking that we have described in this Policy will stop.
          </Text>
          <Text mt={4}>
            Hushh does not engage in automated decision-making for the processing of any personal information it collects.
          </Text>
        </Box>
        <Divider />

        {/* Children and the Website */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Children and the Website
          </Heading>
          <Text>
            The Website is meant for adults. Hushh does not knowingly collect personally identifiable information from children under age 16. If you are a parent or legal guardian of a child under 16 who believes that child may have visited the Website, please contact us at the address below. By using the services provided by the Website, you represent that you are 16 years of age or older.
          </Text>
        </Box>
        <Divider />

        {/* Business Transfer */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Business Transfer
          </Heading>
          <Text>
            Hushh may, in the future, sell or otherwise transfer some or all of its business, operations, or assets to a third party, whether by merger, acquisition, or otherwise. Personal information Hushh obtains from or about you through the Website may be disclosed to any potential or actual third-party acquirers and may be among those assets transferred.
          </Text>
        </Box>
        <Divider />

        {/* Links to Other Sites or Third-Party Services */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Links to Other Sites or Third-Party Services
          </Heading>
          <Text>
            If a link to a third-party site is included on the Website and you click on it, you will be taken to a website Hushh does not control. This Policy does not apply to the privacy practices of that website. Read the privacy policy of other websites carefully. Hushh is not responsible for these third-party sites.
          </Text>
        </Box>
        <Divider />

        {/* Disclaimer and Policy Updates */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Disclaimer and Policy Updates
          </Heading>
          <Text>
            This Policy should not be construed as giving business, legal, or other advice or warranting as failproof the security of information provided through the Website. Hushh will notify you of any material changes in this Policy by posting an updated copy on the Website.
          </Text>
        </Box>
        <Divider />

        {/* Modifications and Updates */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Modifications and Updates to this Privacy Policy
          </Heading>
          <Text>
            This Policy replaces all previous disclosures. We reserve the right, at any time, to modify, alter, and/or update this Policy. Any such modifications will be effective upon our posting of the revised Policy.
          </Text>
        </Box>
        <Divider />

        {/* Contact Information */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Contact Information
          </Heading>
          <Text>
            For questions regarding this Policy, please contact{" "}
            <Text as="span" fontWeight="bold">
            ir@hushh.ai
            </Text>
            .
          </Text>
        </Box>
        <Divider />

        {/* Last Updated */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.600">
            Last Updated: February 5, 2025
          </Text>
        </Box>
      </VStack>
    </Container>
    </>
  );
};

export default PrivacyPolicyPage;

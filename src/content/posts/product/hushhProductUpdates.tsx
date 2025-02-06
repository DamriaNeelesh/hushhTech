import React from 'react';
import { Box, Text, Image, Heading, List, ListItem, Divider, VStack, Link } from '@chakra-ui/react';
import HushhWalletImg from '../../../components/images/hushhWallet.png';
import PlaystoreIcon from '../../../components/images/playstore.png';
import AppleIcon from '../../../components/images/appleIcon.png';

export const frontmatter = {
  title: "Product Update: Exciting New Features Coming Soon!",
  publishedAt: "2025-02-03",
  description: "Announcement of upcoming product features that will revolutionize investment management and community interactions.",
  category: "product updates"
};

const HushhWalletUpdates = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Image src={HushhWalletImg} alt="Hushh Wallet Update" mb={4} borderRadius="md" />

      <Heading as="h2" size="xl" mb={4} color="teal.300">
        Product Update: Exciting New Features Coming Soon!
      </Heading>

      <Text fontSize="lg" mb={4}>
        We are excited to announce that new product features are on the horizon! Stay tuned for updates that will revolutionize the way you manage your investments and community interactions.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={4}>Hushh Wallet App: Empowering Your Digital Identity</Heading>

      <Text mb={4}>
        The Hushh Wallet App is designed to empower users by putting them in control of their digital identity and personal data. It allows users to aggregate and manage data from various sources, including phone data, data companies, and shopping brands. Users can personalize their experiences, get rewarded for sharing data, and sell data to trusted brands and agencies.
      </Text>

      <Heading as="h4" size="md" color="teal.100" mb={2}>Key Features:</Heading>
      <List spacing={2} pl={4}>
        <ListItem><strong>Personalized Experiences:</strong> Tailor your interactions and receive recommendations that match your preferences.</ListItem>
        <ListItem><strong>Data Monetization:</strong> Earn rewards for sharing your data with trusted partners.</ListItem>
        <ListItem><strong>Enhanced Privacy:</strong> Your data is stored securely on your device, with cloud storage available only with your consent.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h4" size="md" color="grey.300" mb={2}>Download the Hushh Wallet App:</Heading>
      <List spacing={2}>
        <ListItem>
          <Link display={'flex'} flexDirection={'row'} href="https://bit.ly/hushh-app-ios" className='hushh-gradient' isExternal>
          <Image src={AppleIcon} alt="Wallet App Store Link" boxSize="20px" mr={2} />
            App Store Link
          </Link>
        </ListItem>
        <ListItem >
          <Link display={'flex'} flexDirection={'row'} href="https://bit.ly/hushh-wallet-play-store" className='hushh-gradient' isExternal>
          <Image src={PlaystoreIcon} alt="Play Store Icon" boxSize="20px" mr={2} />
            Play Store Link
          </Link>
        </ListItem>
      </List>

      <Text mt={4}>More details coming soon!</Text>
    </Box>
  );
};

export default HushhWalletUpdates;

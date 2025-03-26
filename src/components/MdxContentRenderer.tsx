// ✅ src/components/MdxContentRenderer.tsx (fixed render issue)
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  Heading,
  Text,
  Link,
  Image,
  Code as ChakraCode,
  Box,
  UnorderedList,
  OrderedList,
  ListItem,
  Divider,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

const components = {
  h1: (props: any) => <Heading as="h1" size="2xl" my={4} {...props} />,
  h2: (props: any) => <Heading as="h2" size="xl" my={4} {...props} />,
  h3: (props: any) => <Heading as="h3" size="lg" my={4} {...props} />,
  p: (props: any) => <Text my={2} {...props} />,
  a: (props: any) => <Link color="teal.500" {...props} />,
  img: (props: any) => <Image my={4} borderRadius="md" {...props} />,
  code: (props: any) => (
    <ChakraCode
      px={2}
      py={1}
      borderRadius="md"
      backgroundColor="gray.100"
      fontSize="sm"
      {...props}
    />
  ),
  ul: (props: any) => <UnorderedList pl={5} my={2} {...props} />,
  ol: (props: any) => <OrderedList pl={5} my={2} {...props} />,
  li: (props: any) => <ListItem my={1} {...props} />,
  hr: () => <Divider my={6} />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <Alert status="info" variant="left-accent" my={4} borderRadius="md">
      <AlertIcon />
      <Box flex="1">{children}</Box>
    </Alert>
  )
};

interface MdxContentRendererProps {
  content?: React.ElementType;
}

export const MdxContentRenderer: React.FC<MdxContentRendererProps> = ({ content: Content }) => {
  if (!Content) return null;

  return (
    <MDXProvider>
      <Box className="mdx-content">
        <Content />
      </Box>
    </MDXProvider>
  );
};

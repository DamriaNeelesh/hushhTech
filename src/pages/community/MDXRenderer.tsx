import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const components = {
  h2: (props) => <Heading as="h2" size="lg" color="teal.400" {...props} />,
  p: (props) => <Text color="gray.300" {...props} />,
  ul: (props) => <UnorderedList spacing={2} pl={5} {...props} />,
  li: (props) => <ListItem {...props} />,
};

export default function MDXRenderer({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

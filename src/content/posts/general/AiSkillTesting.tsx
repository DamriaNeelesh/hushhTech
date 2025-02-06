import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider, Badge, VStack } from '@chakra-ui/react';

const AISkillsTesting: React.FC = () => {
  return (
    <Box p={5} bg="gray.900" color="white" borderRadius="md" shadow="lg">
      <Heading as="h2" size="xl" mb={4} color="teal.300">
        🚀 AI Skills and Testing
      </Heading>

      <Text fontSize="lg" mb={4}>
        We live in an age of miracles. But a pre-requisite for any company to harness these miracles is that employees should be excited - and proactive - about learning how to use them.
      </Text>

      <Text mb={4}>
        To test this, I’d suggest a new 2-part interview question for every candidate, whether CFO or CSR (customer service rep):
      </Text>

      <List spacing={2} mb={4}>
        <ListItem>1️⃣ How will you use AI to make your job more effective?</ListItem>
        <ListItem>2️⃣ What steps have you already taken to learn about AI tools in your field?</ListItem>
      </List>

      <Text mb={4}>This interview question tests for several things:</Text>

      <List spacing={2} mb={4}>
        <ListItem>✅ Proactively engaging with new technology rather than waiting to be trained.</ListItem>
        <ListItem>✅ Practical understanding of AI's capabilities and limitations in their specific role.</ListItem>
        <ListItem>✅ Viewing AI as a tool for augmentation and productivity rather than just automation.</ListItem>
        <ListItem>✅ Insight into their learning mindset and adaptability.</ListItem>
        <ListItem>✅ Ability to think strategically about incorporating new tools into their workflow.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>💡 Strong Candidate Responses Might Include:</Heading>
      <List spacing={2} mb={4}>
        <ListItem>🔍 Specific examples of AI tools they've experimented with and lessons learned.</ListItem>
        <ListItem>📈 Realistic applications for their role, not just generic AI use cases.</ListItem>
        <ListItem>⚖️ A balance between enthusiasm and pragmatism about AI's capabilities.</ListItem>
        <ListItem>📰 Concrete examples of staying updated on AI developments in their field.</ListItem>
      </List>

      <Heading as="h3" size="lg" color="red.300" mb={2}>⚠️ Weak Responses Might Be:</Heading>
      <List spacing={2} mb={4}>
        <ListItem>❌ Vague statements about AI being "the future" without specific applications.</ListItem>
        <ListItem>❌ Only mentioning obvious tools like ChatGPT without deeper understanding.</ListItem>
        <ListItem>❌ Showing resistance or anxiety about AI's role in their work.</ListItem>
        <ListItem>❌ No evidence of self-directed learning or experimentation.</ListItem>
        <ListItem>❌ Unrealistic expectations about AI capabilities.</ListItem>
      </List>

      <Divider my={4} borderColor="teal.500" />

      <Heading as="h3" size="lg" color="teal.200" mb={2}>👩‍💼 For Founders and Leaders:</Heading>
      <Text mb={4}>
        I’d suggest including this question (or even a session!) as part of every interview loop, to help identify candidates who will help your company succeed in this age of miracles. Candidates who do poorly in this question should not get an offer, even if they excel in other parts of the interview.
      </Text>

      <Heading as="h3" size="lg" color="teal.200" mb={2}>💼 AI Fitness Reviews for Current Teams:</Heading>
      <List spacing={2}>
        <ListItem>📊 <strong>Quarterly AI Skill-Review:</strong> "What AI skill did you learn last quarter? How did it impact your work?"</ListItem>
        <ListItem>🤝 <strong>Peer-Driven AI Spotlight Sessions:</strong> Employees demo tools they’ve integrated into their workflows.</ListItem>
        <ListItem>🏆 <strong>Reward AI Experiments:</strong> Even failed ones!</ListItem>
      </List>
    </Box>
  );
};

export default AISkillsTesting;

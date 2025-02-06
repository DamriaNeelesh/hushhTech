import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "lucide-react";

const BenefitsPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={10} px={4}>
      {/* Main Header */}
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Hushh Technologies LLC – World-Class Benefits for World-Class Talent
      </Heading>
      <Text fontSize="lg" textAlign="center" mb={10}>
        At Hushh Technologies, we are building the AI-first modern renaissance of
        investment and technology, blending Charlie Munger’s wisdom with the
        cutting-edge discipline of an AI-powered hedge fund and tech firm. To
        attract and retain the best minds in finance, engineering, and AI, we
        offer a compensation and benefits package designed for those who think
        long-term, value excellence, and seek to compound not just wealth, but
        knowledge and impact.
      </Text>

      {/* Section: Compensation & Investment Opportunities */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Compensation &amp; Investment Opportunities
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Exceptionally Competitive Pay – We believe in paying for performance.
            If you help compound alpha, we’ll compound your income.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Performance-Driven Incentives – Our compensation plans are tied
            directly to real-world results. Make money? We share the upside.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Hushh Fund Investment Opportunities – Like Renaissance, but built for
            the AI age. Qualified employees get to invest in our own alpha-
            generating strategies.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Retirement Program – Because compounding works best over decades,
            and we want you to be part of Hushh for the long haul.
          </ListItem>
        </List>
      </Box>

      <Divider mb={8} />

      {/* Section: Health, Wellness & Family Support */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Health, Wellness &amp; Family Support
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Best-in-Class Insurance – Medical, dental, and vision for employees and
            their dependents. If you’re solving AI, markets, or building billion-
            dollar businesses, you shouldn’t be worrying about medical bills.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Life &amp; Disability Insurance – Because protecting downside risk
            applies to people, not just portfolios.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Flexible Spending Accounts – Tax-advantaged accounts for health and
            dependent care.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Adoption Assistance – If you can take care of a newborn and still manage
            a portfolio or ship production code, you deserve a reward.
          </ListItem>
        </List>
      </Box>

      <Divider mb={8} />

      {/* Section: Work-Life, Growth & Giving Back */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Work-Life, Growth &amp; Giving Back
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Educational Assistance Program – Learn, grow, and get better every day.
            We fund degrees, certifications, and any education that compounds alpha.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Charitable Gift Matching – We believe in investing in great people and
            great causes. If you support it, we’ll match it.
          </ListItem>
        </List>
      </Box>

      <Divider mb={8} />

      {/* Section: Perks, Culture & Quality of Life */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Perks, Culture &amp; Quality of Life
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Complimentary (On-Site) Meals, Snacks &amp; Beverages – Because no one
            ever built a world-class hedge fund and AI company on an empty stomach.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Elite Fitness &amp; Recreation Facilities –
            <List spacing={2} ml={6} mt={2}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                (Kirkland HQ): Two full gyms, indoor basketball and squash courts,
                outdoor tennis courts, and a jogging trail.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                (New York City Office): Premium gym memberships, transit benefits,
                and a workplace designed for high performers.
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Annual Company Retreat – Once a year, we step away from our screens to
            relax, reflect, and bond—think of it as a shareholders’ meeting for our
            greatest asset: our people.
          </ListItem>
        </List>
      </Box>

      <Divider mb={8} />

      {/* Section: Why Join Hushh Technologies? */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Why Join Hushh Technologies?
        </Heading>
        <Text fontSize="lg" mb={4}>
          We aren’t just building another tech company or hedge fund. We are
          engineering a smarter, AI-first version of Renaissance Technologies—an
          entity that compounds intelligence, capital, and human potential into
          something exponentially greater.
        </Text>
        <Text fontSize="lg">
          If you believe in first principles, compounding wealth and wisdom, and
          want to be part of something truly special, Hushh is where you belong.
          Join us. Let’s build the future together.
        </Text>
      </Box>
    </Container>
  );
};

export default BenefitsPage;

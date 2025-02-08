import { Container, Box, Heading, Text,Image, VStack, Divider } from "@chakra-ui/react";
import HushhAiLogoImg from '../../../components/images/blog2o.png'

export const frontmatter = {
    title: "Rude FAQ - Sell the wall",
    publishedAt: "2025-02-08",
     description: "A no-nonsense FAQ about the 'Sell the Wall' strategy and smart investing.",
     category: 'investor relations & strategies',
    };
  
const RudeFAQ = () => {
  return (
    <Container maxW="container.md" py={10}>
                    <Image src={HushhAiLogoImg} alt="Funds Update" mb={4} borderRadius="md" />
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Rude FAQ: The No-BS Guide to “Sell the Wall” and Making Money the Smart Way
      </Heading>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg">1. What the hell is “Sell the Wall”?</Heading>
          <Text>
            It’s the cheat code for making money off market stupidity. We sell options on the
            biggest, baddest, most cash-rich companies on the planet—Apple, Google, NVIDIA, Amazon—
            because the market overreacts every damn day and pays us to stay calm.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">2. Why options? Why not just buy stocks like a “normal” investor?</Heading>
          <Text>
            Because “normal investors” are waiting years for dividends while we’re getting paid every
            week. We don’t do hope-and-pray investing. We extract value from stocks we already want to own.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">3. Isn’t this risky? I heard options are dangerous.</Heading>
          <Text>
            Risky? You know what’s risky? Buying garbage stocks that don’t generate cash. You know what’s NOT
            risky? Selling options on businesses with more cash than some governments. We’re collecting rent from
            people making dumb bets—not making them ourselves.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">4. What if the stock crashes?</Heading>
          <Text>
            Then we do what billionaires do: buy more at a discount while still making money on premiums. We play this
            game with patience and math, not emotions.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">5. What happens if the shares get called away?</Heading>
          <Text>
            We let the shares go at a profit, then sell puts to buy them back cheaper. We don’t get attached to stocks;
            we get attached to cash flow.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">6. Can’t I just YOLO options and make more money?</Heading>
          <Text>
            Sure, if you want to blow up your account in a week. Options traders lose because they buy options like
            lottery tickets. We sell options like the house in Vegas—and the house always wins.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">7. How do you pick which options to sell?</Heading>
          <Text>
            We target free cash flow monsters that have the deepest, most liquid options markets. If it’s a company that
            runs the world, we probably have it in the rotation.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">8. What’s your edge?</Heading>
          <Text>
            We don’t panic, we don’t guess, and we sure as hell don’t gamble. We use:
          </Text>
          <Text>• AI & market data to price options with machine-level precision.</Text>
          <Text>• Liquidity & size to execute trades most retail traders can’t.</Text>
          <Text>• Mathematical inevitability to make volatility work for us.</Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">9. What returns can I expect?</Heading>
          <Text>
            We target 12%-20% annualized returns in a strategy that pays us every single week. That’s before even
            accounting for stock appreciation.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">10. What’s the minimum buy-in?</Heading>
          <Text>
            $1,000,000/-. If that sounds high, this fund isn’t for you.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">11. What’s the catch?</Heading>
          <Text>
            The only catch is you should have started sooner. We built a strategy designed to print money from market
            inefficiencies. If you want to keep playing the stock market like a casino, go ahead—just know we’re the
            ones running the table.
          </Text>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg">12. How do I invest?</Heading>
          <Text>
            Wire the funds. We’ll take care of the rest. Welcome to the smart money.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default RudeFAQ;

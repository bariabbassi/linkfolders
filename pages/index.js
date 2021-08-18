import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Image
} from '@chakra-ui/react';
import NextLink from 'next/link';

import LandingShell from '@/components/Landing/LandingShell';

const Feature = ({ emoji, title, text }) => {
  return (
    <Box mb={8}>
      <Text fontSize="5xl" mb={2}>
        {emoji}
      </Text>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text as="p" fontSize="sm" color={'gray.600'}>
        {text}
      </Text>
    </Box>
  );
};
const Home = () => {
  return (
    <LandingShell>
      <Box w="100%" textAlign="center" mt={10} mb={20}>
        <Heading as="h1" mb={6} size="3xl" letterSpacing="tighter">
          All your links in one place.
        </Heading>
        <Heading as="h2" mb={12} size="md" fontWeight="200">
          The easiest way to save links and manage bookmarks.
        </Heading>
        <NextLink href="/signup" passHref>
          <Button
            as="a"
            colorScheme="yellow"
            m={1}
            size="lg"
            w={['100%', '100%', '240px']}
          >
            Get started<Text fontWeight="400">&nbsp;– it's free</Text>
          </Button>
        </NextLink>
      </Box>
      <Box
        w="100%"
        mb={24}
        boxShadow="md"
        borderRadius="2xl"
        overflow="hidden"
        borderWidth="1px"
      >
        <Image src="/screenshot.png" alt="Screenshot" />
      </Box>

      <Box w="100%" mb={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            emoji={'🌍'}
            title={'Access bookmarks anywhere'}
            text={`Your bookmarks are not kept hostage in Chrome or any other browser or computer.`}
          />
          <Feature
            emoji={'🗂️'}
            title={'Cut down on open tabs'}
            text={`Found a cool article or podcast? Don't keep the tab open for a month. Save it.`}
          />
          <Feature
            emoji={'⏱️'}
            title={'Speed up your workflow'}
            text={`Stop wasting time looking for links in Slack, emails, and note-taking apps.`}
          />
        </SimpleGrid>
      </Box>
      <Box w="100%" mb={14} p={[10, 16]} bg="yellow.400" borderRadius="2xl">
        <Heading as="h4" mb={10} size="2xl" letterSpacing="tighter">
          Start saving links and managing bookmarks today.
        </Heading>
        <NextLink href="/signup" passHref>
          <Button
            as="a"
            m={1}
            size="lg"
            w={['100%', '100%', '240px']}
            colorScheme="blackAlpha"
            bg="black"
          >
            Get started<Text fontWeight="400">&nbsp;– it's free</Text>
          </Button>
        </NextLink>
      </Box>
    </LandingShell>
  );
};

export default Home;

import { useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import LandingShell from '@/components/LandingShell';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();
  const [username, setUsername] = useState('username');

  return (
    <LandingShell>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('linkfolders-auth')) {
                window.location.href = "/profile"
              }
            `
          }}
        />
      </Head>
      <Flex backgroundColor="white" mb={[8, 16]} w="100%" h="100%" maxH="500px">
        <Flex
          direction="column"
          align="center"
          justify="center"
          px={8}
          py={4}
          maxW="1250px"
          m="0 auto"
          w="100%"
          h="100%"
        >
          <Heading
            mb={6}
            as="h1"
            size="3xl"
            fontWeight="900"
            letterSpacing="tighter"
          >
            All your links in one place.
          </Heading>
          <Heading mb={14} as="h2" size="md" fontWeight="200">
            Linkfolders helps organize and share links.
          </Heading>
          <Text></Text>

          <InputGroup size="lg" maxW="500px" w="100%">
            <Input
              maxW="450px"
              w="70%"
              py={6}
              pl="9.6rem"
              placeholder="yourusername"
            />
            <InputLeftElement w="9.5rem">
              <Flex
                pl={6}
                pt="0.13rem"
                direction="column"
                align="center"
                justify="center"
              >
                <Text>📂 linkfolde.rs/</Text>
              </Flex>
            </InputLeftElement>
            <Button
              variant="solid"
              colorScheme="yellow"
              h="100%"
              ml={4}
              rightIcon={<ArrowForwardIcon />}
            >
              Sign up
            </Button>
          </InputGroup>
        </Flex>
      </Flex>
    </LandingShell>
  );
};

export default Home;

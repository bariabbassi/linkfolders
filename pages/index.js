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
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';

import LandingShell from '@/components/LandingShell';
import { useAuth } from '@/lib/auth';
import { checkUsername } from '@/lib/db';

const Home = () => {
  const auth = useAuth();
  const [username, setUsername] = useState();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange'
  });

  const onCheckUsername = (values) => {
    onsole.log('onSubmit');
    console.log('username', values.username);
    console.log('errors', errors.username);
  };

  const onChange = (username) => {
    console.log('onChange');
    console.log('username', username);
    console.log('errors', errors.username);
  };

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

      <Flex
        as="form"
        align="center"
        justify="stretch"
        spacing={1}
        maxW="460px"
        w="100%"
        onSubmit={handleSubmit(onCheckUsername)}
        onChange={(e) => onChange(e.target.value)}
      >
        <InputGroup size="lg">
          <Input
            py={6}
            pl="9.6rem"
            type="username"
            name="username"
            placeholder="yourusername"
            value={username}
            ref={register({
              minLength: 3,
              maxLength: 30,
              pattern: /([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g
              // validate: (input) => checkUsername(input)
            })}
            // isInvalid={errors.username}
            focusBorderColor={errors.username !== undefined && 'crimson'}
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
        </InputGroup>
        <Text>errors: {errors.username?.type}</Text>
        <NextLink href={`/sigup?username=${username}`} passHref>
          <Button
            as="a"
            ml={2}
            size="lg"
            variant="solid"
            colorScheme="yellow"
            rightIcon={<ArrowForwardIcon />}
          >
            Sign up
          </Button>
        </NextLink>
      </Flex>
    </LandingShell>
  );
};

export default Home;

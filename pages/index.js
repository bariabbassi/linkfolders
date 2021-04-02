import { useState, useRef } from 'react';
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
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import LandingShell from '@/components/LandingShell';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();
  const { register } = useForm({
    mode: 'onBlur'
  });
  const [username, setUsername] = useState();
  const regEx = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
  const [form, setForm] = useState(false);
  const fetcher = (url) =>
    fetch(url)
      .then((res) => {
        setForm({ state: 'loading', message: '⏳ Loading...' });
        return res.json();
      })
      .then((data) => {
        if (data.available === true) {
          setForm({
            state: 'success',
            message: `🎉 Hooray! @${username} is available`
          });
        } else {
          setForm({
            state: 'error',
            message: `😥 Sorry! @${username} is already taken`
          });
        }
      });
  const { data } = useSWR(
    form.state === 'valid' ? `/api/usernames/${username}/availability` : null,
    fetcher
  );

  const isValid = (username) => {
    if (username === undefined || username.length === 0) {
      setForm({
        state: 'empty',
        message: ''
      });
      return false;
    } else if (username?.length < 3) {
      setForm({
        state: 'error',
        message: `😥 Sorry! @${username} is too short`
      });
    } else if (username?.length > 30) {
      setForm({
        state: 'error',
        message: `😥 Sorry! @${username} is too long`
      });
    } else if (!regEx.test(username)) {
      setForm({
        state: 'error',
        message: `😥 Sorry! @${username} is not valid`
      });
    } else {
      setForm({
        state: 'valid',
        message: ''
      });
      return true;
    }
    return false;
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
        mt={8}
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

      <Flex as="form" spacing={1} maxW="460px" w="100%">
        <Stack>
          <InputGroup size="lg">
            <Input
              py={6}
              pl="9.6rem"
              type="username"
              name="username"
              placeholder="yourusername"
              value={username}
              onChange={(e) => {
                setForm({
                  state: 'empty',
                  message: ''
                });
                setUsername(e.target.value);
              }}
              ref={register({
                validate: (input) => isValid(input)
              })}
              isInvalid={form.state === 'error'}
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
          <Box pl={2} fontWeight="600">
            {form.state === 'error' ? (
              <Text color="red.500">{form.message}</Text>
            ) : form.state === 'success' ? (
              <Text color="green.500">{form.message}</Text>
            ) : null}
          </Box>
        </Stack>
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

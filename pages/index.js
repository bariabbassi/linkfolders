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
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import LandingShell from '@/components/LandingShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const isValidUsername = (username) => {
  const regEx = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
  if (
    username === undefined ||
    username.length === 0 ||
    username?.length < 3 ||
    username?.length > 30 ||
    !regEx.test(username)
  ) {
    return false;
  }
  return true;
};

const Home = () => {
  const auth = useAuth();
  const { register, handleBlur, errors } = useForm({
    mode: 'onBlur'
  });
  const [username, setUsername] = useState();
  const regEx = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
  const [form, setForm] = useState(false);
  const { data } = useSWR(
    form.state === 'valid' ? `/api/usernames/${username}/availability` : null,
    fetcher
  );

  // const { data } = useSWR(`/api/usernames/${username}/availability`, fetcher);

  const isValid = (username) => {
    if (username === undefined || username.length === 0) {
      setForm({
        state: 'empty',
        message: ''
      });
      return false;
    } else if (username?.length < 3) {
      setForm({
        state: 'short',
        message: `😥 Sorry! @${username} is too short`
      });
    } else if (username?.length > 30) {
      setForm({
        state: 'long',
        message: `😥 Sorry! @${username} is too long`
      });
    } else if (!regEx.test(username)) {
      setForm({
        state: 'not-valid',
        message: `😥 Sorry! @${username} is not valid`
      });
      // } else if (data?.vailable !== true) {
      //   console.log('NOT available');
      //   setForm({
      //     state: 'error',
      //     message: `😥 Sorry! @${username} is already taken`
      //   });
      // } else if (data?.vailable === true) {
      //   console.log('available');
      //   setForm({
      //     state: 'success',
      //     message: `🎉 Hooray! @${username} is available`
      //   });
    } else {
      console.log(data?.available);
      setForm({
        state: 'valid',
        message: `🎉 Hooray! @${username} is available`
      });
      console.log(data?.available);
      console.log('valid  --', username);
      return true;
    }
    console.log('Not valid  --', username, form);
    return false;
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading', message: '⏳ Loading...' });
    const username = e.target.value;

    if (username.length == 0) {
      setForm({
        state: 'empty',
        message: ''
      });
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
    } else if (data?.vailable !== true) {
      console.log('NOT available');
      setForm({
        state: 'error',
        message: `😥 Sorry! @${username} is already taken`
      });
    } else if (data?.vailable === true) {
      console.log('available');
      setForm({
        state: 'success',
        message: `🎉 Hooray! @${username} is available`
      });
    } else {
      setForm({
        state: 'success',
        message: `🎉 Hooray! @${username} is available`
      });
    }
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
        direction="column"
        justify="stretch"
        spacing={1}
        maxW="460px"
        w="100%"
      >
        <Stack direction="row">
          <InputGroup size="lg">
            <Input
              py={6}
              pl="9.6rem"
              type="username"
              name="username"
              placeholder="yourusername"
              value={username}
              ref={register({
                validate: (input) => isValid(input)
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
        </Stack>
        <Box m={2} fontWeight="600">
          {form.state === 'loading' ? (
            <Text>{form.message}</Text>
          ) : form.state === 'error' ? (
            <Text color="red.500">{form.message}</Text>
          ) : form.state === 'success' ? (
            <Text color="green.400">{form.message}</Text>
          ) : null}
        </Box>
      </Flex>
      <Text>{data?.available === true && 'available'}</Text>
      <Text>{data?.available === false && 'Not available'}</Text>
    </LandingShell>
  );
};

export default Home;

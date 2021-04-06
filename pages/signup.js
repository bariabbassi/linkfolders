import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Text,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import TitleShell from '@/components/TitleShell';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState(router.query.username);
  console.log(router.query.username, username);
  useEffect(() => {
    setUsername(router.query.username);
  }, [router.query.username]);
  useEffect(() => {
    isValid(username);
  }, [username]);
  const [form, setForm] = useState(false);
  const regEx = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;
  const auth = useAuth();
  const { register, handleSubmit } = useForm({
    mode: 'onBlur'
  });

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
    <TitleShell>
      <Heading as="h1" size="2xl">
        Sign up
      </Heading>
      <Flex mt={14} w="100%" direction="column">
        <Stack as="form">
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
        <Stack
          as="form"
          onSubmit={handleSubmit((values) => {
            if (form.state === 'success') {
              auth.loginWithGoogle(values.email, values.password, username);
            }
          })}
        >
          <FormControl mt={10} mb={4}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address'
                }
              })}
            />
          </FormControl>
          <FormControl mb={4}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: 'Required',
                minLength: {
                  value: 5,
                  message: 'min length is 5'
                }
              })}
            />
          </FormControl>
        </Stack>

        <Button w="100%" type="submit">
          Sign up with Email
        </Button>
        <Divider my={5} />
        <Flex w="100%" direction="column">
          <Button
            onClick={(e) => {
              if (form.state === 'success') {
                auth.loginWithGoogle(username);
              }
            }}
          >
            Sign up with Google
          </Button>
        </Flex>
        <Text mt={14} align="center">
          Already have an account?{' '}
          <NextLink href="/login" passHref>
            <Link color="yellow.500">Log in</Link>
          </NextLink>
        </Text>
      </Flex>
    </TitleShell>
  );
};

export default Signup;

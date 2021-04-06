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
import { appendErrors, useForm } from 'react-hook-form';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import TitleShell from '@/components/TitleShell';
import SignupWithEmail from '@/components/Signup/SignupWithEmail';
import SignupWithGoogle from '@/components/Signup/SignupWithGoogle';

const Signup = () => {
  const router = useRouter();
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm({ mode: 'onBlur' });
  const {
    handleSubmit: handleSubmitGoogle,
    register: registerGoogle,
    errors: errorsGoogle
  } = useForm({
    mode: 'onBlur'
  });

  const isAvailable = async (username) => {
    await fetch(`/api/usernames/${username}/availability`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.available === false) {
          return `${username} is already taken`;
        }
        return true;
      });
  };

  return (
    <TitleShell>
      <Heading as="h1" size="2xl">
        Sign up
      </Heading>
      <Flex mt={16} w="100%" direction="column">
        <SignupWithEmail usernameQuery={router.query.username} />
        <Divider my={10} />
        <SignupWithGoogle usernameQuery={router.query.username} />

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

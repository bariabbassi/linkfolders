import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Text,
  Link
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import TitleShell from '@/components/TitleShell';

const Signup = () => {
  const { register, handleSubmit } = useForm();

  return (
    <TitleShell>
      <Heading as="h1" size="2xl">
        Sign up
      </Heading>
      <Flex w="100%" mt={14} direction="column">
        <Button mb={4} onClick={(e) => auth.signInWithGitHub()}>
          Login with Github
        </Button>
        <Button onClick={(e) => auth.signInWithGoogle()}>
          Login with Google
        </Button>
      </Flex>
      <Divider my={10} />

      <Flex w="100%" direction="column">
        <FormControl mb={4}>
          <Input
            name="name"
            placeholder="Name"
            ref={register({ required: true })}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
        </FormControl>

        <Button w="100%" mt={5} type="submit">
          Sign up
        </Button>
        <Text mt={14} align="center">
          Have an account?{' '}
          <NextLink href="/login" passHref>
            <Link color="yellow.500">Log in</Link>
          </NextLink>
        </Text>
      </Flex>
    </TitleShell>
  );
};

export default Signup;

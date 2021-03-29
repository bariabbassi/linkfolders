import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  Input,
  Divider,
  Text,
  Link
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import TitleShell from '@/components/TitleShell';
import { useAuth } from '@/lib/auth';

const Login = () => {
  const auth = useAuth();
  const { register, handleSubmit } = useForm();

  const onLogin = (values) => {
    console.log(values, values.email, values.password);
    auth.loginWithEmail(values.email, values.password);
  };

  return (
    <TitleShell>
      <Heading as="h1" size="2xl">
        Log in
      </Heading>
      <Flex w="100%" mt={14} direction="column">
        <Button onClick={(e) => auth.loginWithGoogle()}>
          Log in with Google
        </Button>
      </Flex>
      <Divider my={10} />

      <Flex
        w="100%"
        direction="column"
        as="form"
        onSubmit={handleSubmit(onLogin)}
      >
        <FormControl mb={4}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
        </FormControl>

        <Button w="100%" mt={5} type="submit">
          Log in
        </Button>
        <Text mt={14} align="center">
          Already have an account?{' '}
          <NextLink href="/signup" passHref>
            <Link color="yellow.500">Sign up</Link>
          </NextLink>
        </Text>
      </Flex>
    </TitleShell>
  );
};

export default Login;

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
import { useAuth } from '@/lib/auth';

const Signup = () => {
  const auth = useAuth();
  const { register, handleSubmit } = useForm();

  const onSignUp = (values) => {
    console.log(values, values.email, values.password);
    auth.signupWithEmail(values.email, values.password);
  };

  return (
    <TitleShell>
      <Heading as="h1" size="2xl">
        Sign up
      </Heading>
      <Flex w="100%" mt={14} direction="column">
        <Button onClick={(e) => auth.loginWithGoogle()}>
          Sign up with Google
        </Button>
      </Flex>
      <Divider my={10} />

      <Flex
        w="100%"
        direction="column"
        as="form"
        onSubmit={handleSubmit(onSignUp)}
      >
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

import { Flex, Heading, Divider, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Page from '@/components/Page';
import SignupShell from '@/components/Signup/SignupShell';
import SignupWithEmail from '@/components/Signup/SignupWithEmail';
import SignupWithGoogle from '@/components/Signup/SignupWithGoogle';

const Signup = () => {
  const router = useRouter();

  return (
    <SignupShell>
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
    </SignupShell>
  );
};

const SignupPage = () => (
  <Page name="Signup" path="/signup">
    <Signup />
  </Page>
);

export default SignupPage;

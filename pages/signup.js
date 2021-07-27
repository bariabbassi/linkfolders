import { Flex, Heading, Divider, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import SignupShell from '@/components/Signup/SignupShell';
import SignupWithEmail from '@/components/Signup/SignupWithEmail';
import SignupWithGoogle from '@/components/Signup/SignupWithGoogle';

const Signup = () => {
  const router = useRouter();

  if (auth?.loading) {
    return (
      <SignupShell>
        <Box mt={14}>
          <Spinner />
        </Box>
      </SignupShell>
    );
  }

  if (auth?.user?.profile) {
    router.push(`/${auth?.user?.profile?.username}`);
    return (
      <SignupShell>
        <Box mt={14}>
          <Spinner />
        </Box>
      </SignupShell>
    );
  }

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

export default Signup;

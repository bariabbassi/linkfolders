import Head from 'next/head';
import { Button, Heading, Text, Box, Flex } from '@chakra-ui/react';

import Subscribe from '@/components/Subscribe';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Box py={16}>
      <Flex as="main" direction="column" maxW="700px" margin="0 auto">
        <Heading>All your links in one place</Heading>
        <Text>
          Linkfolders helps you bookmark, organize, and store links
          <br />
          so you can quickly share them.
        </Text>
        <h4>
          We’re in private beta. Drop in your email to join the waiting list.
        </h4>
        {auth.user ? (
          // <Button as="a" href="/folders">
          //   Open folders
          // </Button>
          <Button onClick={(e) => auth.signout()}>
            Sign out {auth?.user?.email}
          </Button>
        ) : (
          <Button onClick={(e) => auth.signinWithGitHub()}>
            Login with Github
          </Button>
        )}
        <Subscribe />
      </Flex>
    </Box>
  );
};

export default Home;

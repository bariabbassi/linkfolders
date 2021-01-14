import Head from 'next/head';
import styled from 'styled-components';
import { Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';

import Subscribe from '@/components/ Subscribe';
import { useAuth } from '@/lib/auth';

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 2rem;
  margin-left: 2rem;
`;

const HeroContainer = styled.div`
  margin-top: 15vh;
  max-width: 1500px;
  width: 100%;
`;

const Home = () => {
  const auth = useAuth();

  return (
    <HeroSection>
      <HeroContainer>
        <Heading>All your links in one place</Heading>
        <Text>
          Linkfolders helps you bookmark and organize all your links in folders
          <br />
          so you can quickly grab them whenever you need them.
        </Text>
        <h4>
          We’re in private beta. Drop in your email to join the waiting list.
        </h4>
        <Button onClick={(e) => auth.signinWithGitHub()}>
          Login with Github
        </Button>
        {/* <button onClick={(e) => auth.signinWithGitHub()}>
          Login with Github
        </button> */}
        <button onClick={(e) => auth.signout()}>Sign out</button>
        <div>{auth?.user?.email}</div>
        <Subscribe />
      </HeroContainer>
    </HeroSection>
  );
};

export default Home;

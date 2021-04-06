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
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import LandingShell from '@/components/LandingShell';
import Username from '@/components/Username';

const Home = () => {
  const auth = useAuth();
  // const { register } = useForm({
  //   mode: 'onBlur'
  // });

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
        mt={8}
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
      <Username />
    </LandingShell>
  );
};

export default Home;

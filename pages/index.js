import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

import LandingShell from '@/components/Landing/LandingShell';
import LandingUsername from '@/components/Landing/LandingUsername';

const Home = () => {
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
        Organize your links in folders and share them with the world.
      </Heading>
      <LandingUsername />
    </LandingShell>
  );
};

export default Home;

import { Heading } from '@chakra-ui/react';

import LandingShell from '@/components/LandingShell';
import LandingUsername from '@/components/LandingUsername';

const Home = () => {
  return (
    <LandingShell>
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

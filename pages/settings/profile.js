import { Box, Stack, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import SettingsShell from '@/components/Settings/SettingsShell';

const ProfileEditPage = () => {
  const auth = useAuth();

  return (
    <SettingsShell>
      <Box w="100%"></Box>
    </SettingsShell>
  );
};

export default ProfileEditPage;

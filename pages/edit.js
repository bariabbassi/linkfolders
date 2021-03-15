import { Flex, Text, Icon, Link, Button, Box } from '@chakra-ui/react';
import useSWR from 'swr';

import ProfileEditShell from '@/components/ProfileEditShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import TreeEdit from '@/components/TreeEdit';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const Edit = () => {
  const { user } = useAuth();
  const { data } = useSWR(() => `/api/profiles/${user.username}`, fetcher); //useSWR('/api/profiles/satoshi', fetcher);

  if (!data) {
    return (
      <ProfileEditShell>
        <TreeSkeleton />
      </ProfileEditShell>
    );
  }

  return (
    <ProfileEditShell>
      <Box w="500px" maxW="100vw" mr={6}>
        <TreeEdit children={data?.profile?.children} isRoot={true} />
      </Box>
    </ProfileEditShell>
  );
};

export default Edit;

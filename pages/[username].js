import { Box, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProfileShell from '@/components/ProfileShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import Tree from '@/components/Tree';
import fetcher from '@/utils/fetcher';

const Profile = () => {
  const router = useRouter();
  const username = router.query?.username;
  const { data } = useSWR(
    username ? `/api/profiles/username/${username}` : null,
    fetcher
  );

  if (!data) {
    return (
      <ProfileShell>
        <TreeSkeleton />
      </ProfileShell>
    );
  }

  return (
    <ProfileShell name={data?.profile?.name} photoUrl={data?.profile?.photoUrl}>
      <Stack w="100%" maxW="550px">
        <Box>
          <Tree children={data?.profile?.children} />
        </Box>
      </Stack>
    </ProfileShell>
  );
};

export default Profile;

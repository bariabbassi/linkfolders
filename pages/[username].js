import { Box, Text, Spinner, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProfileShell from '@/components/Profile/ProfileShell';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const ProfilePage = () => {
  const auth = useAuth();
  const router = useRouter();
  const username = router.query?.username;
  const { data } = useSWR(
    username ? `/api/profiles/username/${username}` : null,
    fetcher
  );
  let profile = {};
  if (auth?.user?.profile && username === auth?.user?.profile?.username)
    profile = auth?.user?.profile;
  else profile = data?.profile;

  if (data?.error !== undefined) {
    return (
      <ProfileShell>
        <Box mt={14}>
          <Heading size="lg">Sorry! This page doesn't existe.</Heading>
        </Box>
      </ProfileShell>
    );
  }

  if (!profile) {
    return (
      <ProfileShell>
        <Box mt={14}>
          <Spinner />
        </Box>
      </ProfileShell>
    );
  }

  return (
    <ProfileShell>
      <Box w="100%">
        <ProfileHeader
          name={profile?.name}
          photoUrl={profile?.photoUrl}
          username={username}
          editable={auth.user?.uid === profile?.id}
        />
        <Text minH="15px" mb={10}></Text>
        {auth?.user?.uid === profile?.id ? (
          <>
            <ChildrenList
              folderId={data?.profile?.id}
              childrenOrder={data?.profile?.children}
              editable={true}
              username={data?.profile?.username}
            />
            <LinkInput folderId={data?.profile?.id} />
          </>
        ) : (
          <ChildrenList
            folderId={data?.profile?.id}
            childrenOrder={data?.profile?.children}
            editable={false}
          />
        )}
      </Box>
    </ProfileShell>
  );
};

export default ProfilePage;

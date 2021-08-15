import { Box, Flex, Text, Spinner, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import Page from '@/components/Page';
import SidebarShell from '@/components/Sidebar/SidebarShell';
import ProfileShell from '@/components/Profile/ProfileShell';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import ProfileInput from '@/components/Profile/ProfileInput';

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
      <SidebarShell>
        <Heading size="lg">Sorry! This page doesn't existe.</Heading>
      </SidebarShell>
    );
  }

  if (!profile) {
    return (
      <Flex direction="column" align="center" minH="100vh">
        <Spinner mt={32} />
      </Flex>
    );
  }

  return (
    <Page name={profile?.name} path={`/${username}`}>
      <SidebarShell>
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
              <ProfileInput folderId={data?.profile?.id} />
            </>
          ) : (
            <ChildrenList
              folderId={data?.profile?.id}
              childrenOrder={data?.profile?.children}
              editable={false}
            />
          )}
        </Box>
      </SidebarShell>
    </Page>
  );
};

export default ProfilePage;

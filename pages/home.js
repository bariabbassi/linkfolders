import { Box, Text, Spinner, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Page from '@/components/Page';
import FolderShell from '@/components/Folder/FolderShell';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();
  const router = useRouter();
  const username = auth?.user?.profile?.username;
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
      <FolderShell>
        <Box mt={14}>
          <Heading size="lg">Sorry! This page doesn't existe.</Heading>
        </Box>
      </FolderShell>
    );
  }

  if (!profile) {
    return (
      <FolderShell>
        <Box mt={14}>
          <Spinner />
        </Box>
      </FolderShell>
    );
  }

  return (
    <FolderShell name="📄 Documents" userId={auth.user?.uid}>
      <Box w="100%">
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
    </FolderShell>
  );
};

const HomePage = () => (
  <Page name="Home" path="/home">
    <Home />
  </Page>
);

export default HomePage;

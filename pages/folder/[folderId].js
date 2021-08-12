import { Box, Text, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Page from '@/components/Page';
import SidebarShell from '@/components/Sidebar/SidebarShell';
import ProfileShell from '@/components/Profile/ProfileShell';
import ChildrenList from '@/components/Folder/ChildrenList';
import FolderInput from '@/components/Folder/FolderInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import FolderHeader from '@/components/Folder/FolderHeader';

const FolderPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const folderId = router.query?.folderId;
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}` : null,
    fetcher
  );

  if (!data) {
    return (
      <ProfileShell>
        <Box mt={14}>
          <Spinner />
        </Box>
      </ProfileShell>
    );
  }

  if (data?.error !== undefined) {
    if (!auth.user && !auth.loading) {
      return (
        <ProfileShell>
          <Box mt={14}>
            <Heading size="lg">Sorry! This page doesn't existe.</Heading>
          </Box>
        </ProfileShell>
      );
    } else {
      return (
        <SidebarShell>
          <Box mt={14}>
            <Heading size="lg">Sorry! This page doesn't existe.</Heading>
          </Box>
        </SidebarShell>
      );
    }
  }

  if (!auth.user && !auth.loading) {
    return (
      <ProfileShell>
        <Box mt={14}>
          <Heading size="lg">Sorry! This page is private.</Heading>
        </Box>
      </ProfileShell>
    );
  }

  return (
    <Page name={data?.folder?.name} path={`/folder/${folderId}`}>
      <SidebarShell parent={data?.folder?.parent}>
        <FolderHeader
          name={data?.folder?.name}
          userId={data?.folder?.userId}
          parent={data?.folder?.parent}
        />
        <Text minH="15px" mb={10}></Text>

        {auth?.user?.uid === data?.folder?.userId ? (
          <>
            <ChildrenList
              folderId={folderId}
              childrenOrder={data?.folder?.children}
              editable={true}
            />
            <FolderInput folderId={folderId} />
          </>
        ) : (
          <ChildrenList
            folderId={folderId}
            childrenOrder={data?.folder?.children}
            editable={false}
          />
        )}
      </SidebarShell>
    </Page>
  );
};

export default FolderPage;

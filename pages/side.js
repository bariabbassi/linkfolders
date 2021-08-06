import { Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Page from '@/components/Page';
import SideFolderShell from '@/components/Folder/SideFolderShell';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const FolderPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const folderId = router.query?.folderId;
  const { data } = useSWR(
    folderId ? '/api/folders/3b6e86b0-3396-4f5d-ab9c-f5cfdfd3514d' : null,
    fetcher
  );

  if (!data) {
    return (
      <SideFolderShell>
        <Spinner />
      </SideFolderShell>
    );
  }

  return (
    <Page
      name={data?.folder?.name}
      path={'/folder/3b6e86b0-3396-4f5d-ab9c-f5cfdfd3514d'}
    >
      <SideFolderShell
        name={data?.folder?.name}
        userId={data?.folder?.userId}
        parent={data?.folder?.parent}
      >
        <Text minH="15px" mb={10}></Text>
        {auth?.user?.uid === data?.folder?.userId ? (
          <>
            <ChildrenList
              folderId={folderId}
              childrenOrder={data?.folder?.children}
              editable={true}
            />
            <LinkInput folderId={folderId} />
          </>
        ) : (
          <ChildrenList
            folderId={folderId}
            childrenOrder={data?.folder?.children}
            editable={false}
          />
        )}
      </SideFolderShell>
    </Page>
  );
};

export default FolderPage;

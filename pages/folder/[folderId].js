import { Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Page from '@/components/Page';
import FolderShell from '@/components/Folder/FolderShell';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

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
      <FolderShell>
        <Spinner />
      </FolderShell>
    );
  }

  return (
    <Page name={data?.folder?.name} path={`/folder/${folderId}`}>
      <FolderShell
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
      </FolderShell>
    </Page>
  );
};

export default FolderPage;

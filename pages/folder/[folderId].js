import { Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Page from '@/components/Page';
import Shell from '@/components/Navigation/Shell';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
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
      <Shell>
        <Spinner />
      </Shell>
    );
  }

  return (
    <Page name={data?.folder?.name} path={`/folder/${folderId}`}>
      <Shell
        name={data?.folder?.name}
        userId={data?.folder?.userId}
        parent={data?.folder?.parent}
      >
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
            <LinkInput folderId={folderId} />
          </>
        ) : (
          <ChildrenList
            folderId={folderId}
            childrenOrder={data?.folder?.children}
            editable={false}
          />
        )}
      </Shell>
    </Page>
  );
};

export default FolderPage;

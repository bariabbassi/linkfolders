import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';

import FolderShell from '@/components/Folder/FolderShell';
import FolderHeader from '@/components/Folder/FolderHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { handleUpdateChildrenOrder } from '@/lib/handlers';
import { useAuth } from '@/lib/auth';

const FolderPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const folderId = router.query?.folderId;
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}` : null,
    fetcher
  );
  const { profileData } = useSWR(
    auth?.user && data?.folder?.userId !== auth?.user?.uid
      ? `/api/profiles/${data?.folder?.userId}`
      : null,
    fetcher
  );
  let profile = {};
  if (auth?.user && data?.folder?.userId !== auth?.user?.uid) {
    profile = {
      name: profileData?.profile?.name,
      username: profileData?.profile?.username,
      photoUrl: profileData?.profile?.photoUrl
    };
    console.log('not same', profile);
  } else {
    profile = {
      name: auth?.user.name,
      username: auth?.user.username,
      photoUrl: auth?.user.photoUrl
    };
    console.log('same', profile);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const childrenOrder = Array.from(data?.folder?.children);
    childrenOrder.splice(source.index, 1);
    childrenOrder.splice(destination.index, 0, draggableId);

    handleUpdateChildrenOrder(folderId, childrenOrder);
  };

  if (!data) {
    return <FolderShell>Loanding ...</FolderShell>;
  }

  return (
    <FolderShell
      parentPath={
        data?.folder?.parent !== data?.folder?.userId
          ? `/folder/${data?.folder?.parent}`
          : '/facebook'
      }
    >
      <Box w="100%">
        <FolderHeader name={data?.folder?.name} profile={profile} />
        <Text minH="15px" mb={10}></Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box>
            <ChildrenList
              folderId={folderId}
              childrenOrder={data?.folder?.children}
            />
            <LinkInput folderId={folderId} />
          </Box>
        </DragDropContext>
      </Box>
    </FolderShell>
  );
};

export default FolderPage;

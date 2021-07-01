import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';

import ProfileShell from '@/components/Profile/ProfileShell';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { handleUpdateChildrenOrder } from '@/lib/handlers';
import { useAuth } from '@/lib/auth';

const ProfilePage = () => {
  const auth = useAuth();
  const router = useRouter();
  const username = router.query?.username;
  const { data } = useSWR(
    username ? `/api/profiles/username/${username}` : null,
    fetcher
  );
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

    const childrenOrder = Array.from(data?.profile?.children);
    childrenOrder.splice(source.index, 1);
    childrenOrder.splice(destination.index, 0, draggableId);

    handleUpdateChildrenOrder(data?.profile?.id, childrenOrder);
  };

  if (!data) {
    return <ProfileShell>Loanding ...</ProfileShell>;
  }

  return (
    <ProfileShell>
      <Box w="100%">
        <ProfileHeader
          name={data?.profile?.name}
          photoUrl={data?.profile?.photoUrl}
          username={username}
        />
        <Text minH="15px" mb={10}></Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box>
            <ChildrenList
              folderId={data?.profile?.id}
              childrenOrder={data?.profile?.children}
            />
            {auth.user?.uid === data?.profile?.id && (
              <LinkInput folderId={data?.profile?.id} />
            )}
          </Box>
        </DragDropContext>
      </Box>
    </ProfileShell>
  );
};

export default ProfilePage;

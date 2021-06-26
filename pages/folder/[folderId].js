import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';

import FolderShell from '@/components/Folder/FolderShell';
import ChildrenList from '@/components/Folder/ChildrenList';
import fetcher from '@/utils/fetcher';
import { handleUpdateChildrenOrder } from '@/lib/handlers';

const FolderPage = () => {
  const router = useRouter();
  //   const username = router.query?.username;
  const folderId = router.query?.folderId;
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}` : null,
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

    const childrenOrder = Array.from(data?.folder?.children);
    console.log('before', childrenOrder);
    childrenOrder.splice(source.index, 1);
    childrenOrder.splice(destination.index, 0, draggableId);
    console.log('after', childrenOrder);

    mutate(
      `/api/folders/${folderId}`,
      async (data) => ({
        folder: {
          ...data?.folder,
          children: [...childrenOrder]
        }
      }),
      false
    );
    // handleUpdateChildrenOrder(folderId, newLinks, childrenOrder);
  };

  if (!data) {
    return <FolderShell>Loanding ...</FolderShell>;
  }

  return (
    <FolderShell>
      <Stack w="100%" maxW="550px">
        <Box>
          <Heading size="xl" mb={5}>
            {data?.folder?.name}
          </Heading>
          <Text minH="15px" mb={10}></Text>
          <DragDropContext onDragEnd={onDragEnd}>
            <ChildrenList
              folderId={folderId}
              childrenOrder={data?.folder?.children}
            />
          </DragDropContext>
        </Box>
      </Stack>
    </FolderShell>
  );
};

export default FolderPage;

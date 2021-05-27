import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';

import FolderShell from '@/components/Folder/FolderShell';
import ChildrenList from '@/components/Folder/ChildrenList';
import fetcher from '@/utils/fetcher';

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

    const newLinks = data?.folder?.links;
    [newLinks[source.index], newLinks[destination.index]] = [
      newLinks[destination.index],
      newLinks[source.index]
    ];

    mutate(
      `/api/folders/${folderId}`,
      async (data) => {
        data.folder.links = newLinks;
      },
      false
    );
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
          <Text minH="15px" mb={10}>
            {/* {data?.folder?.description} */}
          </Text>
          <DragDropContext onDragEnd={onDragEnd}>
            <ChildrenList folderId={folderId} />
          </DragDropContext>
        </Box>
      </Stack>
    </FolderShell>
  );
};

export default FolderPage;

import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import { Droppable } from 'react-beautiful-dnd';

import Item from '@/components/Folder/Item';
import NewItemButtons from '@/components/Folder/NewItemButtons';
import fetcher from '@/utils/fetcher';
import LinkInput from '@/components/Folder/LinkInput';

const ChildrenList = ({ folderId, childrenOrder }) => {
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}/children` : null,
    fetcher
  );

  return (
    <Box w="100%" maxW="400px">
      <Droppable droppableId={'main'}>
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {childrenOrder?.length > 0 && data?.children?.length > 0
              ? childrenOrder.map((childId, index) => {
                  const item = data?.children.find(
                    (child) => child.id === childId
                  );
                  return <Item key={item?.id} item={item} index={index} />;
                })
              : null}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <LinkInput folderId={folderId} />
      <NewItemButtons folderId={folderId} />
    </Box>
  );
};

export default ChildrenList;

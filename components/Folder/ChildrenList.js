import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Droppable } from 'react-beautiful-dnd';

import Item from '@/components/Folder/Item';
import fetcher from '@/utils/fetcher';

const ChildrenList = ({ folderId, childrenOrder }) => {
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}/children` : null,
    fetcher
  );

  return (
    <Droppable droppableId={'main'}>
      {(provided) => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
          {childrenOrder?.length > 0 && data?.children?.length > 0
            ? childrenOrder.map((childId, index) => {
                const item = data?.children.find(
                  (child) => child.id === childId
                );
                if (item)
                  return <Item key={item?.id} item={item} index={index} />;
              })
            : null}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default ChildrenList;

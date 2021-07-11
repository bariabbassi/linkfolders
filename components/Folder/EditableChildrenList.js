import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

import Item from '@/components/Folder/Item';
import fetcher from '@/utils/fetcher';
import { handleUpdateChildrenOrder } from '@/lib/handlers';

const EditableChildrenList = ({ folderId, childrenOrder }) => {
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}/children` : null,
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

    const newChildrenOrder = Array.from(childrenOrder);
    newChildrenOrder.splice(source.index, 1);
    newChildrenOrder.splice(destination.index, 0, draggableId);

    handleUpdateChildrenOrder(folderId, newChildrenOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'main'}>
        {(provided) => (
          <Box w="100%" ref={provided.innerRef} {...provided.droppableProps}>
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
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EditableChildrenList;

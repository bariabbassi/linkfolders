import { Box } from '@chakra-ui/react';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

import Item from '@/components/Folder/Item';
import EditableItem from '@/components/Folder/EditableItem';
import fetcher from '@/utils/fetcher';
import { handleUpdateChildrenOrder } from '@/lib/handlers';

const ChildrenList = ({ folderId, childrenOrder, editable, username }) => {
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}/children` : null,
    fetcher
  );

  if (!editable) {
    return (
      <Box w="100%">
        {childrenOrder?.length > 0 && data?.children?.length > 0
          ? childrenOrder.map((childId) => {
              const item = data?.children.find((child) => child.id === childId);
              if (item) return <Item key={item?.id} item={item} />;
            })
          : null}
      </Box>
    );
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleUpdateChildrenOrder(result, folderId, childrenOrder, username);
      }}
    >
      <Droppable droppableId={'main'}>
        {(provided) => (
          <Box w="100%" ref={provided.innerRef} {...provided.droppableProps}>
            {childrenOrder?.length > 0 && data?.children?.length > 0
              ? childrenOrder.map((childId, index) => {
                  const item = data?.children.find(
                    (child) => child.id === childId
                  );
                  if (item)
                    return (
                      <EditableItem key={item?.id} item={item} index={index} />
                    );
                })
              : null}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChildrenList;

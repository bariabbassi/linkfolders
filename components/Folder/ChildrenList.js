import { Box, List, ListItem, Text } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import { Droppable } from 'react-beautiful-dnd';

import Item from '@/components/Folder/Item';
import NewItemButtons from '@/components/Folder/NewItemButtons';
import fetcher from '@/utils/fetcher';
import { createItem, updateItem } from '@/lib/db';

const ChildrenList = ({ folderId }) => {
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}/children` : null,
    fetcher
  );

  return (
    <>
      <Droppable droppableId={'main'}>
        {(provided) => (
          <List
            w="100%"
            maxW="400px"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data?.children?.length > 0 &&
              data?.children?.map((item, index) => (
                <Item key={index} item={item} index={index} />
              ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <NewItemButtons folderId={folderId} />
    </>
  );
};

export default ChildrenList;

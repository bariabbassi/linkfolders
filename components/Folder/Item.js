import { Box } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

import DragButton from '@/components/Folder/DragButton';
import Link from '@/components/Folder/Link';
import Folder from '@/components/Folder/Folder';

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          w="100%"
          h="100%"
          my={2}
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {item.type === 'link' ? (
            <Link link={item} />
          ) : item.type === 'folder' ? (
            <Folder folder={item} />
          ) : null}
        </Box>
      )}
    </Draggable>
  );
};

export default Item;

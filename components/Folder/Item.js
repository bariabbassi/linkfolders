import { Box, Flex, ListItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';

import DragButton from '@/components/Folder/DragButton';
import Link from '@/components/Folder/Link';
import Folder from '@/components/Folder/Folder';

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Flex align="center">
            <DragButton />
            <Box
              w="100%"
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
          </Flex>
        </ListItem>
      )}
    </Draggable>
  );
};

export default Item;

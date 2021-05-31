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

export default Item;

______________;
import { Box } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

import DragButton from '@/components/Folder/DragButton';
import Link from '@/components/Folder/Link';
import Folder from '@/components/Folder/Folder';

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <>
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
            pl={4}
            pr={2}
            py={2}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            cursor={'pointer'}
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)'
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
            }}
            onClick={() => {
              if (item?.type === 'link') window.open(`${link.url}`);
            }}
          >
            <Flex align="center"></Flex>
            {item.type === 'link' ? (
              <Link link={item} />
            ) : item.type === 'folder' ? (
              <Folder folder={item} />
            ) : null}
          </Box>
          <ItemkMenu item={item} />
        </>
      )}
    </Draggable>
  );
};

export default Item;

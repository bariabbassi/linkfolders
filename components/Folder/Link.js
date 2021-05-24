import { Box, ListItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';

const Link = ({ link, index }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          my={2}
          d="flex"
          alignItems="center"
          height="57px"
          px={7}
          py={1}
          borderRadius="base"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.200',
            transform: 'scale(0.98)'
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
          }}
          onClick={() => window.open(`${link.url}`)}
        >
          <Image
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=32`}
            alt={link.name}
            width="32px"
            height="32px"
          />
          <Text size="sm" pl={3}>
            {link.name}
          </Text>
        </Box>
      )}
    </Draggable>
  );
};

export default Link;

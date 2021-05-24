import { Box, List, ListItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Droppable } from 'react-beautiful-dnd';

import Link from '@/components/Folder/Link';

const LinkList = ({ links }) => {
  return (
    <Droppable droppableId={'main'}>
      {(provided) => (
        <List
          w="100%"
          maxW="400px"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {links !== undefined &&
            links.length > 0 &&
            links.map((link, index) => (
              <Link key={index} link={link} index={index} />
            ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default LinkList;

import { Box, Flex, Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Draggable } from 'react-beautiful-dnd';

import DragButton from '@/components/Folder/DragButton';
import Link from '@/components/Folder/Link';
import Folder from '@/components/Folder/Folder';
import ItemMenu from '@/components/Folder/ItemMenu';
import { LinkfoldersIcon } from '@/styles/icons';

const Item = ({ item, index }) => {
  const router = useRouter();

  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <Flex
          align="center"
          mb={3}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box
            mr={1}
            w="100%"
            h="55px"
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
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
              if (item?.type === 'link') {
                window.open(item?.url);
              } else if (item?.type === 'folder') {
                router.push(`/folder/${item?.id}`);
              }
            }}
          >
            <Flex
              align="center"
              w="100%"
              h="100%"
              pl={4}
              pr={2}
              py={2}
              cursor="pointer"
            >
              {item.type === 'link' ? (
                <Image
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${item.url}&sz=32`}
                  alt={item?.name}
                  width="32px"
                  height="32px"
                />
              ) : item.type === 'folder' ? (
                <LinkfoldersIcon width="9" height="9" mb={2} />
              ) : null}

              <Text size="sm" pl={3}>
                {item?.name.length < 40
                  ? item?.name
                  : `${item?.name.substring(0, 37)} ...`}
              </Text>
            </Flex>
          </Box>
          <ItemMenu item={item} />
        </Flex>
      )}
    </Draggable>
  );
};

export default Item;

import {
  Box,
  Flex,
  Button,
  Text,
  Input,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';

import ItemMenu from '@/components/Folder/ItemMenu';
import NameInput from '@/components/Folder/NameInput';
import { LinkfoldersIcon } from '@/styles/icons';

const EditableItem = ({ item, index }) => {
  const [renameMode, setRenameMode] = React.useState(!item?.name);

  return (
    <Draggable draggableId={item?.id} index={index}>
      {(provided) => (
        <>
          {!renameMode ? (
            <Flex
              align="center"
              h="3.75rem"
              w="100%"
              pl={8}
              pr={2}
              py={2}
              mr={1}
              mb={4}
              borderWidth="1px"
              boxShadow="base"
              borderRadius="2xl"
              overflow="hidden"
              _hover={{ bg: 'gray.100', boxShadow: 'md' }}
              _active={{
                bg: 'gray.200',
                boxShadow: 'outline'
              }}
              _focus={{ boxShadow: 'outline' }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <LinkBox
                d="flex"
                align="center"
                justify="space-between"
                w="100%"
                h="100%"
                cursor="pointer"
              >
                <Flex align="center">
                  {item?.type === 'link' ? (
                    <>
                      <Image
                        src={`https://s2.googleusercontent.com/s2/favicons?domain=${item.url}&sz=32`}
                        alt={item?.name}
                        width="32px"
                        height="32px"
                      />
                      <Text size="sm" fontWeight="400" pl={4}>
                        <LinkOverlay href={item?.url} isExternal>
                          {item?.name.length < 40
                            ? item?.name
                            : `${item?.name.substring(0, 36)}...`}
                        </LinkOverlay>
                      </Text>
                    </>
                  ) : item?.type === 'folder' || item?.type === 'profile' ? (
                    <>
                      <LinkfoldersIcon width="9" height="9" mb={2} />
                      <Text size="sm" fontWeight="400" pl={4}>
                        <NextLink href={`/folder/${item?.id}`} passHref>
                          <LinkOverlay href={item?.url}>
                            {item?.name.length < 40
                              ? item?.name
                              : `${item?.name.substring(0, 36)}...`}
                          </LinkOverlay>
                        </NextLink>
                      </Text>
                    </>
                  ) : null}
                </Flex>
              </LinkBox>
              <Box pl={6} pr={1}>
                <ItemMenu
                  item={item}
                  renameMode={renameMode}
                  setRenameMode={setRenameMode}
                />
              </Box>
            </Flex>
          ) : (
            <Flex
              align="center"
              h="3.75rem"
              w="100%"
              pl={8}
              pr={2}
              py={2}
              mr={1}
              mb={4}
              borderWidth="1px"
              boxShadow="base"
              borderRadius="2xl"
              overflow="hidden"
              _hover={{ bg: 'gray.100', boxShadow: 'md' }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Flex
                align="center"
                justify="space-between"
                w="100%"
                h="100%"
                cursor="default"
              >
                <Flex align="center">
                  {item?.type === 'link' ? (
                    <Image
                      src={`https://s2.googleusercontent.com/s2/favicons?domain=${item.url}&sz=32`}
                      alt={item?.name}
                      width="32px"
                      height="32px"
                    />
                  ) : item?.type === 'folder' || item?.type === 'profile' ? (
                    <LinkfoldersIcon width="9" height="9" mb={2} />
                  ) : null}
                  <NameInput item={item} setRenameMode={setRenameMode} />
                </Flex>
              </Flex>
              <Box pl={6} pr={1}>
                <ItemMenu
                  item={item}
                  renameMode={renameMode}
                  setRenameMode={setRenameMode}
                />
              </Box>
            </Flex>
          )}
        </>
      )}
    </Draggable>
  );
};
export default EditableItem;

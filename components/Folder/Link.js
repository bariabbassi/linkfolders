import { Box, Flex, Heading, Text, Input, Menu } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu';

import DeleteButton from '@/components/Folder/DeleteButton';
import LinkMenuList from '@/components/Folder/LinkMenuList';

const Link = ({ link }) => {
  const [editMode, setEditMode] = useState(
    !link?.name || !link?.url || link?.url === 'https://'
  );

  return (
    <>
      <ContextMenuTrigger id="contextmenu">
        <Box
          w="100%"
          h="100%"
          pl={4}
          pr={2}
          py={2}
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          cursor={editMode ? 'default' : 'pointer'}
          _hover={{ bg: 'gray.100' }}
          _active={
            !editMode && {
              bg: 'gray.200',
              transform: 'scale(0.98)'
            }
          }
          _focus={
            !editMode && {
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
            }
          }
          onClick={() => {
            if (!editMode) window.open(`${link.url}`);
          }}
        >
          {!editMode && link?.url !== 'https://' ? (
            <Flex align="center">
              <Image
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=32`}
                alt={link?.name}
                width="32px"
                height="32px"
              />
              <Text size="sm" pl={3}>
                {link?.name}
              </Text>
            </Flex>
          ) : (
            <Flex align="center" justify="space-between" w="100%">
              <Text size="sm" mr={1} pl={1}>
                🔗
              </Text>

              <Flex direction="column">
                <Input
                  m={1}
                  size="sm"
                  placeholder="New link"
                  value={link?.name}
                  onChange={(e) => {
                    changeName(e.target.value);
                  }}
                />
                <Input
                  m={1}
                  size="sm"
                  placeholder="https://website.com"
                  value={link?.url}
                  onChange={(e) => {
                    changeUrl(e.target.value);
                  }}
                />
              </Flex>
              <DeleteButton itemId={link.id} folderId={link.parent} />
            </Flex>
          )}
        </Box>
      </ContextMenuTrigger>
      <ContextMenu id="contextmenu">
        <Menu isOpen={true}>
          <LinkMenuList link={link} setEditMode={setEditMode} />
        </Menu>
      </ContextMenu>
    </>
  );
};

export default Link;

import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import ItemMenu from '@/components/Folder/ItemMenu';
import NameInput from '@/components/Folder/NameInput';

const Link = ({ item }) => {
  const [renameMode, setRenameMode] = React.useState(!item?.name);

  return (
    <Flex align="center" mb={3}>
      <Box
        mr={1}
        w="100%"
        h="55px"
        bg="white"
        // borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        _hover={{ bg: 'gray.100' }}
        _active={
          !renameMode && {
            bg: 'gray.200',
            transform: 'scale(0.98)'
          }
        }
        _focus={
          !renameMode && {
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
          }
        }
        onClick={() => {
          if (!renameMode) window.open(item?.url);
        }}
      >
        <Flex
          align="center"
          w="100%"
          h="100%"
          pl={4}
          pr={2}
          py={2}
          cursor={renameMode ? 'default' : 'pointer'}
        >
          <Image
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${item.url}&sz=32`}
            alt={item?.name}
            width="32px"
            height="32px"
          />

          {!renameMode ? (
            <Text size="sm" pl={3}>
              {item?.name.length < 40
                ? item?.name
                : `${item?.name.substring(0, 36)}...`}
            </Text>
          ) : (
            <NameInput item={item} setRenameMode={setRenameMode} />
          )}
        </Flex>
      </Box>
      <ItemMenu
        item={item}
        renameMode={renameMode}
        setRenameMode={setRenameMode}
      />
    </Flex>
  );
};

export default Link;

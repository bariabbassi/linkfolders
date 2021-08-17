import { Flex, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

import { LinkfoldersIcon } from '@/styles/icons';

const Item = ({ item }) => {
  return (
    <LinkBox
      d="flex"
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
      bg="white"
      _hover={{ bg: 'gray.100', boxShadow: 'md' }}
      _active={{
        bg: 'gray.200',
        boxShadow: 'outline'
      }}
      _focus={{ boxShadow: 'outline' }}
    >
      <Flex align="center" w="100%" h="100%">
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
  );
};

export default Item;

import {
  Box,
  IconButton,
  Flex,
  Avatar,
  Tag,
  TagLabel,
  LinkBox,
  LinkOverlay,
  Spinner
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const FolderShell = ({ parentPath, children }) => {
  const auth = useAuth();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justify="space-between"
      w="100vw"
      minH="100vh"
      bg=""
    >
      <Box w="100%">
        <Flex backgroundColor="white" w="100%" h="65px">
          <Flex align="center" px={2} py={3} w="100%">
            {auth?.user?.profile ? (
              <NextLink href={`/${auth?.user?.profile?.username}`} passHref>
                <LinkBox as="article">
                  <Tag size="lg" borderRadius="full">
                    <Avatar
                      bg="gray.200"
                      size="md"
                      ml={-1}
                      mr={2}
                      my={1}
                      name={auth?.user?.profile?.name}
                      src={auth?.user?.profile?.photoUrl}
                    />
                    <TagLabel size="lg" fontWeight="400" mr={2}>
                      <LinkOverlay href="#">
                        {auth?.user?.profile?.name}
                      </LinkOverlay>
                    </TagLabel>
                  </Tag>
                </LinkBox>
              </NextLink>
            ) : null}
            {/* <NextLink href="/" passHref>
              <IconButton
                variant="ghost"
                aria-label="Hamburger menu"
                size="md"
                icon={<HamburgerIcon boxSize={6} />}
              />
            </NextLink> */}
            <NextLink href={`${parentPath}`} passHref>
              <IconButton
                variant="ghost"
                borderRadius="full"
                aria-label="Parent folder"
                size="lg"
                ml={2}
                icon={<ArrowBackIcon boxSize={6} />}
              />
            </NextLink>
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            w="100%"
            maxW="570px"
            px={3}
            pb={7}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FolderShell;

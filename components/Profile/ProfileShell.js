import {
  Box,
  Button,
  Heading,
  IconButton,
  Flex,
  Avatar,
  Tag,
  TagLabel,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const ProfileShell = ({ children }) => {
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
        <Flex backgroundColor="white" w="100%">
          <Flex align="center" px={2} py={3} w="100%" h="65px">
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
      {!auth.user && (
        <NextLink href="/" passHref>
          <Button
            as="a"
            variant="ghost"
            mt={8}
            mb={2}
            leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
          >
            <Heading size="sm">Linkfolders</Heading>
          </Button>
        </NextLink>
      )}
    </Flex>
  );
};

export default ProfileShell;

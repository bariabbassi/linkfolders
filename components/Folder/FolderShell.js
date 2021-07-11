import {
  Box,
  Button,
  Heading,
  IconButton,
  Flex,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import NextLink from 'next/link';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';
import FolderHeader from '@/components/Folder/FolderHeader';

const FolderShell = ({ name, userId, parent, children }) => {
  const auth = useAuth();
  const { data } = useSWR(
    userId && (!auth?.user?.profile || userId !== auth?.user?.uid)
      ? `/api/profiles/${userId}`
      : null,
    fetcher
  );
  let profile = {};
  if (auth?.user?.profile && userId === auth?.user?.uid)
    profile = auth?.user?.profile;
  else profile = data?.profile;

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      w="100vw"
      minH="100vh"
      bg=""
    >
      <Box w="100%">
        <Flex bg="" align="center" w="100%" h="4.6rem">
          <Flex align="center" w="100%">
            {/* <NextLink href="/" passHref>
              <IconButton
                variant="ghost"
                aria-label="Hamburger menu"
                size="md"
                icon={<HamburgerIcon boxSize={6} />}
              />
            </NextLink> */}
            <NextLink
              href={
                parent !== userId
                  ? `/folder/${parent}`
                  : `/${profile?.username}`
              }
              passHref
            >
              <IconButton
                variant="ghost"
                borderRadius="full"
                aria-label="Parent folder"
                p={4}
                ml={1}
                size="xl"
                icon={<ArrowBackIcon boxSize={6} />}
              />
            </NextLink>
          </Flex>
          {auth?.user?.profile && (
            <NextLink href={`/${auth?.user?.profile?.username}`} passHref>
              <Button
                as="a"
                variant="ghost"
                p={2}
                mr={1}
                size="xl"
                borderRadius="full"
              >
                <Avatar
                  bg="gray.200"
                  size="md"
                  name={auth?.user?.profile?.name}
                  src={auth?.user?.profile?.photoUrl}
                />
              </Button>
            </NextLink>
          )}
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
            <FolderHeader
              name={name}
              profilePhotoUrl={profile?.photoUrl}
              profileName={profile?.name}
              profileUsername={profile?.username}
            />
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

export default FolderShell;

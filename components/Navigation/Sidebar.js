import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  Avatar,
  Heading
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import ChildrenList from '@/components/Folder/ChildrenList';
import AddRootFolderButton from '@/components/Add/AddRootFolderButton';

const Sidebar = ({ onClose, ...rest }) => {
  const auth = useAuth();
  const folderId = `root-${auth.user?.uid}`;
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}` : null,
    fetcher
  );

  return (
    <Box
      transition="3s ease"
      w={{ base: 'full', md: 96 }}
      h="full"
      px={3}
      pos="fixed"
      bg="gray.100"
      {...rest}
    >
      <Flex align="center" justify="space-between" h="20" mb={7}>
        <NextLink href={`/${auth.user?.profile?.username}`} passHref>
          <Button
            as="a"
            variant="ghost"
            size="xl"
            borderRadius="2xl"
            fontWeight="400"
          >
            <HStack as="header" w="100%">
              <Avatar
                color="gray.600"
                bg="gray.200"
                size="lg"
                h="3.5rem"
                w="3.5rem"
                borderRadius="2xl"
                mr={1}
                name={auth.user?.profile?.name}
                src={auth.user?.profile?.photoUrl}
              />
              <Box>
                <Heading as="h1" size="md">
                  {auth.user?.profile?.name}
                </Heading>
                <Heading size="xs" fontWeight="300" color="gray">
                  @{auth.user?.profile?.username}
                </Heading>
              </Box>
            </HStack>
          </Button>
        </NextLink>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          variant="ghost"
          size="md"
          aria-label="Close sidebar"
          icon={<CloseIcon boxSize={4} color="gray" />}
          onClick={onClose}
        />
      </Flex>
      <ChildrenList
        folderId={folderId}
        childrenOrder={data?.folder?.children}
        editable={true}
      />
      <AddRootFolderButton />
    </Box>
  );
};

export default Sidebar;

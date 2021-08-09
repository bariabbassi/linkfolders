import {
  Box,
  CloseButton,
  Flex,
  Text,
  Button,
  Avatar,
  Heading
} from '@chakra-ui/react';
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
            <Avatar
              color="gray.600"
              bg="gray.200"
              size="lg"
              h="3.75rem"
              w="3.75rem"
              borderRadius="2xl"
              mr={2}
              name={auth.user?.profile?.name}
              src={auth.user?.profile?.photoUrl}
            />
            {auth.user?.profile?.name}
          </Button>
        </NextLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
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

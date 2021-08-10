import { Box, Flex, VStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import AccountMenu from '@/components/Account/AccountMenu';
import ChildrenList from '@/components/Folder/ChildrenList';
import AddRootFolderButton from '@/components/Add/AddRootFolderButton';

const SidebarContent = ({ onClose, ...rest }) => {
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
      pos="fixed"
      bg="gray.100"
      {...rest}
    >
      <Flex
        display={{ base: 'flex', md: 'none' }}
        ml={{ base: 0, md: 96 }}
        px={{ base: 1, md: 2 }}
        h={{ base: 12, md: 14 }}
        align="center"
        justify="flex-end"
      >
        <IconButton
          variant="ghost"
          size="md"
          aria-label="Close sidebar"
          icon={<CloseIcon boxSize={4} color="gray" />}
          onClick={onClose}
        />
      </Flex>
      <Flex direction="column" align="flex-start" px={3} py={2}>
        <AccountMenu />
        <ChildrenList
          folderId={folderId}
          childrenOrder={data?.folder?.children}
          editable={true}
        />
        <AddRootFolderButton />
      </Flex>
    </Box>
  );
};

export default SidebarContent;

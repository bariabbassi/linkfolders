import {
  Box,
  Flex,
  VStack,
  Button,
  Heading,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';
import SidebarContent from '@/components/Sidebar/SidebarContent';
import Navbar from '@/components/Sidebar/Navbar';

const SidebarShell = ({ parent, children }) => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!auth.user && !auth.loading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        minH="100vh"
        mb={6}
        px={3}
      >
        <VStack w="100%" maxW="33rem" mt={24}>
          {children}
        </VStack>
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
      </Flex>
    );
  }

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar parent={parent} onOpen={onOpen} />
      <Box ml={{ base: 0, md: '36rem' }} mb={6} px={3}>
        <VStack w="100%" maxW="33rem" mt={3}>
          {children}
        </VStack>
      </Box>
    </Box>
  );
};

export default SidebarShell;

import {
  Box,
  VStack,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';

import Sidebar from '@/components/Sidebar/SidebarContent';
import Navbar from '@/components/Sidebar/Navbar';

const SidebarShell = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <Sidebar
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
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: '36rem' }} mb={6} px={{ base: 3, md: 3 }}>
        <VStack w="100%" maxW="33rem" mt={3}>
          {children}
        </VStack>
      </Box>
    </Box>
  );
};

export default SidebarShell;

import {
  Box,
  VStack,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';

import Sidebar from '@/components/Navigation/Sidebar';
import Navbar from '@/components/Navigation/Navbar';

const Shell = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        bg="gray.100"
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
      <Box ml={{ base: 0, md: 96 }} p={4}>
        <VStack w="100%" maxW="700px">
          {children}
        </VStack>
      </Box>
    </Box>
  );
};

export default Shell;

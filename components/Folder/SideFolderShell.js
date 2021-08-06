import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import FolderHeader from './FolderHeader';

export default function SideFolderShell({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 96 }} p={4}>
        <VStack w="100%" maxW="700px">
          {children}
        </VStack>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      // borderRight="1px"
      // borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 96 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        {/* <IconButton
          display={{ base: 'flex', md: 'none' }}
          variant="ghost"
          aria-label="open menu"
          icon={<HamburgerIcon />}
          onClic={onClose}
        /> */}
      </Flex>
      <Button w="100%">Home</Button>
      <Button w="100%">Home</Button>
      <Button w="100%">Home</Button>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 96 }}
      px={{ base: 4, md: 4 }}
      h="20"
      align="center"
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justify={{ base: 'space-between', md: 'flex-start' }}
      {...rest}
    >
      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text> */}

      {/* <HStack spacing={{ base: '0', md: '6' }}>
        <Button>Account</Button>
      </HStack> */}
      <IconButton
        onClick={onOpen}
        variant="ghost"
        size="lg"
        aria-label="open menu"
        icon={<ArrowBackIcon boxSize={6} />}
      />
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
    </Flex>
  );
};

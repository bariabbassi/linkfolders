import { IconButton, Flex } from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';

const Navbar = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 96 }}
      px={{ base: 4, md: 4 }}
      h="20"
      align="center"
      justify={{ base: 'space-between', md: 'flex-start' }}
      {...rest}
    >
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

export default Navbar;

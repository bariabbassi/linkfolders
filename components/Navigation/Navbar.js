import { IconButton, Flex } from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const Navbar = ({ onOpen, parent, username, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 96 }}
      px={{ base: 1, md: 1 }}
      h="20"
      align="center"
      justify={{ base: 'space-between', md: 'flex-start' }}
      {...rest}
    >
      <NextLink href={username ? `/${username}` : `/folder/${parent}`} passHref>
        <IconButton
          as="a"
          variant="ghost"
          size="lg"
          aria-label="Parent folder"
          icon={<ArrowBackIcon boxSize={6} />}
        />
      </NextLink>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        variant="ghost"
        aria-label="open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
    </Flex>
  );
};

export default Navbar;

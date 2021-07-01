import {
  Box,
  Button,
  IconButton,
  Flex,
  Avatar,
  Heading
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const FolderShell = ({ parent, children }) => {
  const auth = useAuth();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justify="space-between"
      w="100vw"
      minH="100vh"
      bg=""
    >
      <Box w="100%">
        <Flex backgroundColor="white" w="100%">
          <Flex px={2} py={3} w="100%">
            <NextLink href={`/folder/${parent}`} passHref>
              <IconButton
                variant="ghost"
                aria-label="Hamburger menu"
                size="md"
                icon={<HamburgerIcon boxSize={6} />}
              />
            </NextLink>
            <NextLink href="/" passHref>
              <IconButton
                variant="ghost"
                aria-label="Parent folder"
                size="md"
                icon={<ArrowBackIcon boxSize={6} />}
              />
            </NextLink>
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            w="100%"
            maxW="770px"
            px={3}
            pb={7}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FolderShell;

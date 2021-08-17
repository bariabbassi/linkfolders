import {
  Box,
  Button,
  Heading,
  IconButton,
  Flex,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const ProfileShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      w="100vw"
      minH="100vh"
      bg=""
    >
      <Box w="100%">
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            w="100%"
            maxW="570px"
            px={3}
            pb={7}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
      {!auth.user && !auth.loading && (
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
      )}
    </Flex>
  );
};

export default ProfileShell;

import {
  Box,
  Button,
  Heading,
  IconButton,
  Flex,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const SettingsShell = ({ children }) => {
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
        <Flex bg="" align="center" w="100%" h="4.6rem">
          <Flex align="center" w="100%"></Flex>
          {auth?.user?.profile && (
            <NextLink href={`/${auth?.user?.profile?.username}`} passHref>
              <Button
                as="a"
                variant="ghost"
                p={2}
                mr={1}
                size="xl"
                borderRadius="full"
              >
                <Avatar
                  bg="gray.200"
                  size="md"
                  name={auth?.user?.profile?.name}
                  src={auth?.user?.profile?.photoUrl}
                />
              </Button>
            </NextLink>
          )}
        </Flex>
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
    </Flex>
  );
};

export default SettingsShell;

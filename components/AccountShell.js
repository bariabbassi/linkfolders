import { Box, Button, Flex, Avatar, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const AccountShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="white" h="100vh">
      <Flex backgroundColor="white" w="100%">
        <Flex
          align="center"
          justify="space-between"
          px={2}
          py={4}
          m="0 auto"
          maxW="1250px"
          w="100%"
          h="60px"
        >
          <Flex align="center">
            <NextLink href={`/${auth.user.username}`} passHref>
              <Button
                as="a"
                variant="ghost"
                mr={3}
                leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
              >
                <Heading size="sm">Linkfolders</Heading>
              </Button>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {auth.user && (
              <>
                <Button mr={2} onClick={(e) => auth.logout()}>
                  Log out
                </Button>
                <NextLink href={`/${auth.user.username}`} passHref>
                  <Button
                    as="a"
                    isLoading={auth.loading}
                    leftIcon={
                      <Avatar
                        size="sm"
                        name={auth.user.name}
                        src={auth.user.photoUrl}
                      />
                    }
                  >
                    <Heading as="h3" size="sm">
                      View profile
                    </Heading>
                  </Button>
                </NextLink>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" align="center">
        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          maxW="1250px"
          w="100%"
          px={3}
          pb={5}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountShell;

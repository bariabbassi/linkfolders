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
            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                mr={3}
                leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
              >
                <Heading size="sm">Linkfolders</Heading>
              </Button>
            </NextLink>
            {/* <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink> */}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {
              auth.user ? (
                <>
                  <Button variant="ghost" mr={2} onClick={(e) => auth.logout()}>
                    Log out
                  </Button>
                  <NextLink href="/profile" passHref>
                    <Avatar
                      size="sm"
                      name={auth.user.name}
                      src={auth.user.photoUrl}
                    />
                  </NextLink>
                </>
              ) : null
              // <Stack direction="row" spacing={4}>
              //   <NextLink href="/login" passHref>
              //     <Button as="a" variant="outline" colorScheme="yellow">
              //       Log in
              //     </Button>
              //   </NextLink>
              //   <NextLink href="/signup" passHref>
              //     <Button as="a" variant="solid" colorScheme="yellow">
              //       Sign up
              //     </Button>
              //   </NextLink>
              // </Stack>
            }
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

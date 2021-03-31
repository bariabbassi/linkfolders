import { Box, Button, Flex, Link, Avatar, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const AccountShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="" h="100vh">
      <Flex backgroundColor="white" mb={[8, 16]} w="100%">
        <Flex
          align="center"
          justify="space-between"
          px={8}
          py={4}
          maxW="1250px"
          m="0 auto"
          w="100%"
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost" mr={3}>
                <Heading as="h2" size="sm">
                  📂 Linkfolders
                </Heading>
              </Button>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {auth.user && (
              <>
                <Button variant="ghost" mr={2} onClick={(e) => auth.logout()}>
                  Log out
                </Button>
                <Avatar size="sm" src={auth.user?.photoUrl} />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export default AccountShell;

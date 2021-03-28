import { Box, Button, Flex, Link, Avatar, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const AccountShell = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box backgroundColor="" h="100vh">
      <Flex backgroundColor="white" mb={[8, 16]} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost" borderRadius={0} mr={3}>
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
            {user && (
              <NextLink href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </NextLink>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export default AccountShell;

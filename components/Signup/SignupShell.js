import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import Head from 'next/head';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';
import AccountLoading from '@/components/Account/AccountLoading';

const SignupShell = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();

  if (auth?.loading) {
    return <AccountLoading />;
  }

  if (auth?.user?.profile) {
    router.push(`/${auth?.user?.profile?.username}`);
    return <AccountLoading />;
  }

  return (
    <Box backgroundColor="" h="100vh">
      <Flex
        direction="column"
        align="center"
        w="100%"
        backgroundColor="white"
        mb={[8, 16]}
      >
        <Flex
          align="center"
          justify="space-between"
          h="60px"
          w="100%"
          maxW="1250px"
          p={2}
        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
            >
              <Heading size="sm">Linkfolders</Heading>
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      <Flex direction="column" align="center">
        <Flex direction="column" align="center" w="100%" maxW="400px" p={6}>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignupShell;

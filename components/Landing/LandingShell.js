import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { LinkfoldersIcon } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import AccountLoading from '../Account/AccountLoading';

const LandingShell = ({ children }) => {
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
      <Flex w="100%" backgroundColor="white" mb={[8, 16]}>
        <Flex
          align="center"
          justify="space-between"
          p={3}
          maxW="1250px"
          m="0 auto"
          w="100%"
          h="60px"
        >
          <Stack direction="row" spacing={3}>
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
            {/* <NextLink href="/blog" passHref>
              <Button as="a" variant="ghost" fontWeight="400">
                Blog
              </Button>
            </NextLink>
            <NextLink href="/pricing" passHref>
              <Button as="a" variant="ghost" fontWeight="400">
                Pricing
              </Button>
            </NextLink> */}
          </Stack>
          <Stack direction="row" spacing={4}>
            <NextLink href="/login" passHref>
              <Button as="a" variant="ghost">
                Log in
              </Button>
            </NextLink>
            <NextLink href="/signup" passHref>
              <Button as="a" variant="solid" colorScheme="yellow">
                Sign up
              </Button>
            </NextLink>
          </Stack>
        </Flex>
      </Flex>
      <Flex mb={5} direction="column" align="center">
        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          p={3}
          maxW="990px"
          margin="0 auto"
          w="100%"
          px={8}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingShell;

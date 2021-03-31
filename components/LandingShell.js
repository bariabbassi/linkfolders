import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Heading,
  Stack
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const LandingShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="" h="100vh">
      <Flex backgroundColor="white" mb={[8, 16]} w="100%">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={8}
          py={4}
          maxW="1250px"
          m="0 auto"
          w="100%"
          h="60px"
        >
          <Stack direction="row" spacing={3}>
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost">
                <Heading as="h2" size="md">
                  📂 Linkfolders
                </Heading>
              </Button>
            </NextLink>
            <NextLink href="/blog" passHref>
              <Button as="a" variant="ghost">
                Blog
              </Button>
            </NextLink>
            <NextLink href="/pricing" passHref>
              <Button as="a" variant="ghost">
                Pricing
              </Button>
            </NextLink>
          </Stack>
          <Stack direction="row" spacing={4}>
            <NextLink href="/login" passHref>
              <Button as="a" variant="outline" colorScheme="yellow">
                Log in
              </Button>
            </NextLink>
            <NextLink href="/signup" passHref>
              <Button as="a" variant="solid" colorScheme="yellow">
                Sign up for free
              </Button>
            </NextLink>
          </Stack>
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export default LandingShell;

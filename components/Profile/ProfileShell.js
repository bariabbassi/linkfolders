import { Box, Button, Flex, Avatar, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { LinkfoldersIcon } from '@/styles/icons';

const ProfileShell = ({ name, photoUrl, children }) => {
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
          <Flex justify="space-between" px={2} py={3} w="100%">
            {/* <NextLink href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
              >
                <Heading as="h3" size="sm">
                  Linkfolders
                </Heading>
              </Button>
            </NextLink> */}
            <NextLink href="/profile" passHref>
              <Button as="a" variant="ghost">
                <Flex align="center">
                  {/* <Avatar mx={3} size="sm" name={name} src={photoUrl} />
                  <Heading as="h1" size="md">
                    {name}
                  </Heading> */}
                </Flex>
              </Button>
            </NextLink>
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            w="100%"
            maxW="550px"
            px={3}
            pb={5}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
      {!auth.user && (
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

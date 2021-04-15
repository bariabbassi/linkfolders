import { Box, Button, Flex, Avatar, Heading } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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
          <Flex
            justify="space-between"
            px={2}
            py={3}
            m="0 auto"
            maxW="1250px"
            w="100%"
            h="82px"
          >
            <Flex align="center">
              <Avatar mx={3} size="md" name={name} src={photoUrl}></Avatar>
              <Heading as="h1" size="lg">
                {name}
              </Heading>
            </Flex>
            {auth.user && (
              <NextLink href="/profile" passHref>
                <Button as="a" leftIcon={<EditIcon />}>
                  <Heading as="h3" size="sm">
                    Edit profile
                  </Heading>
                </Button>
              </NextLink>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            maxW="1250px"
            w="100vw"
            px={3}
            pb={5}
            mt={16}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          mt={8}
          mb={2}
          leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
        >
          <Heading as="h3" size="sm">
            Linkfolders
          </Heading>
        </Button>
      </NextLink>
    </Flex>
  );
};

export default ProfileShell;

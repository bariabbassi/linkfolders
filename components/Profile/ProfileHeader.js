import { Box, Flex, HStack, Avatar, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const ProfileHeader = ({ name, photoUrl, username, editable }) => {
  const auth = useAuth();

  return (
    <HStack as="header" w="100%">
      <Avatar
        color="gray.600"
        bg="gray.200"
        size="xl"
        h="5rem"
        w="5rem"
        borderRadius="3xl"
        mr={1}
        name={name}
        src={photoUrl}
      />
      <Box>
        <Heading as="h1" size="xl">
          {name}
        </Heading>
        <Heading size="md" fontWeight="400" color="gray">
          @{username}
        </Heading>
      </Box>
    </HStack>
  );
};

export default ProfileHeader;

import { Flex, Avatar, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const ProfileHeader = ({ name, photoUrl, username, editable }) => {
  const auth = useAuth();

  return (
    <Flex direction="column" align="center" w="100%" as="header">
      <Avatar
        color="gray.600"
        bg="gray.200"
        mb={3}
        size="xl"
        name={name}
        src={photoUrl}
      />
      <Heading as="h1" size="xl">
        {name}
      </Heading>
      <Heading size="md" fontWeight="400" color="gray">
        @{username}
      </Heading>
      {editable && (
        <NextLink href="/settings/profile" passHref>
          <Button
            as="a"
            variant="outline"
            borderRadius="full"
            size="md"
            mt={5}
            fontWeight="400"
          >
            Edit profile
          </Button>
        </NextLink>
      )}
    </Flex>
  );
};

export default ProfileHeader;

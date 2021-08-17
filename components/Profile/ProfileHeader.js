import { Box, HStack, Avatar, Heading, IconButton } from '@chakra-ui/react';
import { Edit } from 'react-feather';
import NextLink from 'next/link';

const ProfileHeader = ({ name, photoUrl, username, editable }) => {
  return (
    <HStack as="header" w="100%">
      <Avatar
        color="gray.600"
        bg="gray.200"
        size="xl"
        h="5rem"
        w="5rem"
        borderRadius="3xl"
        mr={2}
        name={name}
        src={photoUrl}
      />
      <Box>
        <HStack>
          <Heading as="h1" size="xl">
            {name}
          </Heading>
          {editable && (
            <NextLink href="/settings/profile" passHref>
              <IconButton
                as="a"
                aria-label="Edit profile"
                variant="ghost"
                size="md"
                icon={<Edit size={19} color="gray" />}
              />
            </NextLink>
          )}
        </HStack>
        <Heading size="md" fontWeight="400" color="gray">
          @{username}
        </Heading>
      </Box>
    </HStack>
  );
};

export default ProfileHeader;

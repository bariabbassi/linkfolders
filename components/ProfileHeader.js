import { Flex, Stack, Avatar, Heading, Text } from '@chakra-ui/react';

const ProfileHeader = ({ name, photoUrl, username }) => (
  <Flex align="space-between" w="100%" as="header">
    <Avatar m={3} size="xl" name={name} src={photoUrl}></Avatar>
    <Stack spacing={1} mx={3} my={4}>
      <Heading as="h1" size="lg">
        {name}
      </Heading>
      <Heading as="h2" size="sm" fontWeight="400">
        @{username}
      </Heading>
    </Stack>
  </Flex>
);

export default ProfileHeader;

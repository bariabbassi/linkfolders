import { Flex, Stack, Avatar, Heading } from '@chakra-ui/react';

const ProfileHeader = ({ name, photoUrl, username }) => (
  <Flex align="space-between" w="100%" as="header">
    <Avatar m={3} size="xl" name={name} src={photoUrl} />
    <Stack spacing={1} mx={3} my={4}>
      <Heading as="h1" size="xl">
        {name}
      </Heading>
      <Heading size="md" fontWeight="400" mb={5} color="grey">
        {username}
      </Heading>
    </Stack>
  </Flex>
);

export default ProfileHeader;

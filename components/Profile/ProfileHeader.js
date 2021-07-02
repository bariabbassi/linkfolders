import { Flex, Stack, Avatar, Heading, Button } from '@chakra-ui/react';

const ProfileHeader = ({ name, photoUrl, username }) => (
  <Flex align="space-between" w="100%" as="header">
    <Avatar bg="gray.200" m={3} size="xl" name={name} src={photoUrl} />
    <Flex direction="column" w="100%" mx={3} my={4}>
      <Flex align="center">
        <Heading as="h1" size="xl">
          {name}
        </Heading>
        <Button
          variant="outline"
          borderRadius="full"
          size="md"
          fontWeight="400"
          ml={4}
        >
          Edit profile
        </Button>
      </Flex>

      <Heading size="md" fontWeight="400" mb={5} color="gray">
        @{username}
      </Heading>
    </Flex>
  </Flex>
);

export default ProfileHeader;

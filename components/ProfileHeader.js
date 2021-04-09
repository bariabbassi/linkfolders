import { Flex, Stack, Avatar, Heading, Text } from '@chakra-ui/react';

const ProfileHeader = ({ name, photoUrl }) => (
  <Flex align="center" w="100%" mt="60px" as="header">
    <Avatar m={3} size="lg" name={name} src={photoUrl}></Avatar>
    <Heading as="h1" size="lg">
      {name}
    </Heading>
  </Flex>
);

export default ProfileHeader;

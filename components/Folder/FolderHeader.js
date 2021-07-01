import { Flex, Stack, Avatar, Heading } from '@chakra-ui/react';

const FolderHeader = ({ name, profile }) => (
  <Flex w="100%" as="header">
    <Stack spacing={1} mx={3} my={4}>
      <Heading as="h1" size="xl" mb={2}>
        {name}
      </Heading>
      {/* <Heading size="md" fontWeight="400" mb={5} color="grey"></Heading> */}
      <Flex align="center">
        <Avatar
          size="sm"
          name={profile?.name}
          src={
            'http://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg'
          }
          // src={profile?.photoUrl}
        />
        <Heading size="sm" fontWeight="400" color="grey" ml={2}>
          {profile?.username}
        </Heading>
      </Flex>
    </Stack>
  </Flex>
);

export default FolderHeader;

import { Flex, Stack, Avatar, Heading } from '@chakra-ui/react';

const FolderHeader = ({ name }) => (
  <Flex align="space-between" w="100%" as="header">
    <Stack spacing={1} mx={3} my={4}>
      <Heading as="h1" size="xl">
        {name}
      </Heading>
      <Heading size="md" fontWeight="400" mb={5} color="grey"></Heading>
    </Stack>
  </Flex>
);

export default FolderHeader;
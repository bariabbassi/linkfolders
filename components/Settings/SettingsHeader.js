import { Flex, Stack, Heading } from '@chakra-ui/react';

const FolderHeader = ({ name }) => (
  <Flex w="100%" as="header">
    <Stack spacing={1} mx={3} my={4}>
      <Heading as="h1" size="xl" mb={2}>
        {name}
      </Heading>
    </Stack>
  </Flex>
);

export default FolderHeader;

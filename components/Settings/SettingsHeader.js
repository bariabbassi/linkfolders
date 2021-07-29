import { Flex, Stack, Heading } from '@chakra-ui/react';

const FolderHeader = ({ name }) => (
  <Heading as="h1" size="xl" mb={2}>
    {name}
  </Heading>
);

export default FolderHeader;

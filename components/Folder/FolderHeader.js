import { Box, Heading } from '@chakra-ui/react';

const FolderHeader = ({ name }) => {
  return (
    <Box w="100%" as="header">
      <Heading as="h1" size="xl" mt={4} mb={2}>
        {name}
      </Heading>
    </Box>
  );
};

export default FolderHeader;

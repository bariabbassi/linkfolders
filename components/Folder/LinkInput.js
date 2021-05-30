import { Box, Flex, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const LinkInput = ({ link }) => {
  return (
    <Box w="100%" h="100%" pl={4} pr={2} py={2} _hover={{ bg: 'gray.100' }}>
      <Flex align="center">
        <AddIcon mr={2} />
        <Input
          variant="unstyled"
          m={1}
          size="sm"
          placeholder="https:// ..."
          value={link?.name}
          onChange={(e) => {
            changeName(e.target.value);
          }}
        />
      </Flex>
    </Box>
  );
};

export default LinkInput;

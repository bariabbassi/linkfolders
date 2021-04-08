import { Box, Flex, Stack, IconButton, Input, Button } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import { LinkfoldersIcon } from '@/styles/icons';

const EditableLink = (props) => {
  const { name, changeName, removeNode, addLink, addFolder } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      my={2}
      p={2}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100px"
      borderRadius="base"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Stack w="100%">
        <Flex align="center">
          <LinkfoldersIcon mr={1} width="6" height="6" mb={1} m={2} mr={4} />
          <Input
            m={1}
            size="sm"
            placeholder="New folder"
            value={name}
            onChange={(e) => {
              changeName(e.target.value);
            }}
          />
        </Flex>
        <Flex justify="flex-end">
          <Button
            ml={2}
            size="sm"
            aria-label="Add link"
            leftIcon={<AddIcon />}
            onClick={addLink}
          >
            🔗
          </Button>
          <Button
            ml={2}
            size="sm"
            aria-label="Add folder"
            leftIcon={<AddIcon />}
            onClick={addFolder}
          >
            <LinkfoldersIcon width="6" height="6" mb={1} />
          </Button>
          <IconButton
            ml={2}
            size="sm"
            aria-label="Delete folder"
            icon={<DeleteIcon />}
            onClick={removeNode}
            value
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default EditableLink;

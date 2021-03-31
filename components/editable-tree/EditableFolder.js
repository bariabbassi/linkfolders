import { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  IconButton,
  Input,
  Button,
  ButtonGroup,
  Heading
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';

const EditableLink = (props) => {
  const { name, changeName, removeNode, addLink, addFolder } = props;
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      p={3}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      height="88px"
      pl={3}
      lineHeight="1.2"
      borderRadius="base"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Flex align="center">
        {/* <ChevronDownIcon /> */}
        <Heading ml={2} mr={4} as="h2" size="sm" pl={1}>
          📂
        </Heading>
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
      <Flex>
        <Button
          m={1}
          size="sm"
          aria-label="Add link"
          leftIcon={<AddIcon />}
          onClick={addLink}
        >
          🔗
        </Button>
        <Button
          m={1}
          size="sm"
          aria-label="Add folder"
          leftIcon={<AddIcon />}
          onClick={addFolder}
        >
          📂
        </Button>
        <IconButton
          m={1}
          size="sm"
          aria-label="Delete folder"
          icon={<DeleteIcon />}
          onClick={removeNode}
          value
        />
      </Flex>
    </Box>
  );
};

export default EditableLink;

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      height="88px"
      pl={3}
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Flex align="center">
        {/* <ChevronDownIcon /> */}
        <Heading as="h2" size="sm" pl={1}>
          📂
        </Heading>
        <Input
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
          size="sm"
          aria-label="Add link"
          leftIcon={<AddIcon />}
          onClick={addLink}
          value
        >
          Link
        </Button>
        <Button
          size="sm"
          aria-label="Add folder"
          leftIcon={<AddIcon />}
          onClick={addFolder}
          value
        >
          Folder
        </Button>
        <IconButton
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

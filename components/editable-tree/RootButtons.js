import { Flex, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const EditableLink = ({ addRootLink, addRootFolder }) => (
  <Flex m={2}>
    <Button
      m={1}
      size="sm"
      aria-label="Add root link"
      leftIcon={<AddIcon />}
      onClick={addRootLink}
      value
    >
      🔗
    </Button>
    <Button
      m={1}
      size="sm"
      aria-label="Add root folder"
      leftIcon={<AddIcon />}
      onClick={addRootFolder}
      value
    >
      📂
    </Button>
  </Flex>
);

export default EditableLink;

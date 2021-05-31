import { Flex, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { LinkfoldersIcon } from '@/styles/icons';
import { handleCreateLink, handleCreateFolder } from '@/lib/handlers';

const NewItemButtons = ({ folderId }) => {
  return (
    <Flex m={2}>
      <Button
        m={1}
        size="sm"
        aria-label="Add root link"
        leftIcon={<AddIcon />}
        onClick={() => handleCreateLink('https://', folderId)}
      >
        🔗
      </Button>
      <Button
        m={1}
        size="sm"
        aria-label="Add root folder"
        leftIcon={<AddIcon />}
        onClick={() => handleCreateFolder(folderId)}
      >
        <LinkfoldersIcon width="6" height="6" mb={1} />
      </Button>
    </Flex>
  );
};

export default NewItemButtons;

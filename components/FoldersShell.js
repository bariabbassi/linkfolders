import { Flex, IconButton, Heading } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import AddFolderModal from '@/components/AddFolderModal';

const FoldersShell = ({ children }) => (
  <Flex flexDirection="column" p={4} width="100%" height="100%">
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        <IconButton
          aria-label="icon"
          icon={<ArrowBackIcon />}
          size="md"
          mr={4}
        />
        <Heading>Heading title</Heading>
      </Flex>
      <Flex>
        <AddFolderModal />
      </Flex>
    </Flex>
    <Flex
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="100%"
      justifyContent="flex-start"
    >
      <Flex flexDirection="column" alignItems="stretch">
        {children}
      </Flex>
    </Flex>
  </Flex>
);

export default FoldersShell;

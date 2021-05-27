import { Box, Flex, Heading, Text, Input } from '@chakra-ui/react';

import DeleteButton from '@/components/Folder/DeleteButton';
import { LinkfoldersIcon } from '@/styles/icons';

const Folder = ({ folder }) => {
  return (
    <Box
      w="100%"
      h="100%"
      pl={4}
      pr={2}
      py={2}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      cursor="pointer"
      _hover={{ bg: 'gray.100' }}
      _active={{
        bg: 'gray.200',
        transform: 'scale(0.98)'
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
      }}
      onClick={() => {
        if (folder?.url && folder.url !== 'https://')
          window.open(`${folder?.url}`);
      }}
    >
      <Flex align="center" justify="space-between" w="100%">
        <LinkfoldersIcon width="6" height="6" mb={1} />
        {folder?.name !== '' ? (
          <Text size="sm" pl={3}>
            {folder?.name}
          </Text>
        ) : (
          <Input
            m={1}
            size="sm"
            placeholder="New folder"
            value={folder?.name}
            onChange={(e) => {}}
          />
        )}
        <DeleteButton itemId={folder?.id} folderId={folder?.parent} />
      </Flex>
    </Box>
  );
};

export default Folder;

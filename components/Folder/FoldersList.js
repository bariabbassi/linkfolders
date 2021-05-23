import { Box, List, ListItem, Text } from '@chakra-ui/react';

import { LinkfoldersIcon } from '@/styles/icons';

const FoldersList = ({ folders }) => {
  return (
    <List w="100%" maxW="400px">
      {folders !== undefined &&
        folders.length > 0 &&
        folders.map((folder, index) => (
          <ListItem key={index}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              my={2}
              d="flex"
              alignItems="center"
              height="57px"
              px={7}
              py={1}
              borderRadius="base"
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
              onClick={() => window.open(`${folder.url}`)}
            >
              <LinkfoldersIcon width="7" height="7" ml={2} mb={1} />
              <Text size="sm" pl={3}>
                {folder.name}
              </Text>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};

export default FoldersList;

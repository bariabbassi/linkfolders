import { Box, Stack, Heading, Text } from '@chakra-ui/react';

import FolderShell from '@/components/Folder/FolderShell';
import LinksList from '@/components/Profile/LinksList';

const LinksPage = () => {
  return (
    <FolderShell>
      <Stack w="100%" maxW="550px">
        <Box>
          <Heading size="xl" mb={5}>
            Links
          </Heading>
          <Text minH="15px" mb={10}></Text>
          <LinksList />
        </Box>
      </Stack>
    </FolderShell>
  );
};

export default LinksPage;

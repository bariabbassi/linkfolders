import { Box, Stack, Heading, Text } from '@chakra-ui/react';

import FolderShell from '@/components/Folder/FolderShell';
import AllLinksList from '@/components/AllLinksList';

const AllLinksPage = () => {
  return (
    <FolderShell>
      <Stack w="100%" maxW="550px">
        <Box>
          <Heading size="xl" mb={5}>
            All links
          </Heading>
          <Text minH="15px" mb={10}></Text>
          <AllLinksList />
        </Box>
      </Stack>
    </FolderShell>
  );
};

export default AllLinksPage;

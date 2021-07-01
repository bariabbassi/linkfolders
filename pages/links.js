import { Box, Stack, Heading, Text } from '@chakra-ui/react';

import ProfileShell from '@/components/Profile/ProfileShell';
import LinksList from '@/components/Profile/LinksList';

const LinksPage = () => {
  return (
    <ProfileShell>
      <Stack w="100%" maxW="550px">
        <Box>
          <Heading size="xl" mb={5}>
            Links
          </Heading>
          <Text minH="15px" mb={10}></Text>
          <LinksList />
        </Box>
      </Stack>
    </ProfileShell>
  );
};

export default LinksPage;

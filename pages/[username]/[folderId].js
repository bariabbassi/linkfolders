import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import FolderShell from '@/components/Folder/FolderShell';
import LinksList from '@/components/Folder/LinksList';
import FoldersList from '@/components/Folder/FoldersList';
import fetcher from '@/utils/fetcher';

const FolderPage = () => {
  const router = useRouter();
  //   const username = router.query?.username;
  const folderId = router.query?.folderId;
  const { data } = useSWR(
    folderId ? `/api/folders/${folderId}` : null,
    fetcher
  );

  if (!data) {
    return <FolderShell>Loanding ...</FolderShell>;
  }

  return (
    <FolderShell>
      <Stack w="100%" maxW="550px">
        <Box>
          <Heading size="xl" mb={5}>
            {data?.folder?.name}
          </Heading>
          <Text minH="15px" mb={10}>
            {/* {data?.folder?.description} */}
          </Text>
          <LinksList links={data?.folder?.links} />
          <br />
          <FoldersList
            folders={[
              { name: 'Projects', folderId: 'gr687' },
              { name: 'About', folderId: 'jtu4763' }
            ]}
          />
        </Box>
      </Stack>
    </FolderShell>
  );
};

export default FolderPage;

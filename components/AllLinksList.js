import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

import Link from '@/components/Folder/Link';
// import NewItemButtons from '@/components/Folder/NewItemButtons';
// import LinkInput from '@/components/Folder/LinkInput';

const AllLinksList = () => {
  const { data } = useSWR('/api/links', fetcher);

  return (
    <Box w="100%" maxW="400px">
      <List>
        {data?.links.length > 0
          ? data?.links.map((item, index) => {
              if (item) return <Link key={item?.id} item={item} />;
            })
          : null}
      </List>
      {/* <LinkInput folderId={folderId} /> */}
    </Box>
  );
};

export default AllLinksList;

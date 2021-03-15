import { Flex, Text, Icon, Link, Button } from '@chakra-ui/react';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import FoldersShell from '@/components/FoldersShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import Tree from '@/components/Tree';

import fetcher from '@/utils/fetcher';

const Folders = () => {
  const auth = useAuth();
  const { data } = useSWR('/api/folders', fetcher);

  if (!data) {
    return (
      <FoldersShell>
        <TreeSkeleton />
      </FoldersShell>
    );
  }

  return <FoldersShell>{/* <Tree folders={data.folders} /> */}</FoldersShell>;
};

export default Folders;

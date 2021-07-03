import { Stack, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import AccountShell from '@/components/AccountShell';

const ProfileEditPage = () => {
  const auth = useAuth();

  return (
    <AccountShell>
      <Heading as="h1" size="2xl">
        Edit Profile
      </Heading>
      {/* <Box w="100%">
        <FolderHeader name={data?.folder?.name} userId={data?.folder?.userId} />
        <Text minH="15px" mb={10}></Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box>
            <ChildrenList
              folderId={folderId}
              childrenOrder={data?.folder?.children}
            />
            <LinkInput folderId={folderId} />
          </Box>
        </DragDropContext>
      </Box> */}
    </AccountShell>
  );
};

export default ProfileEditPage;

import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import ProfileShell from '@/components/Profile/ProfileShell';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ChildrenList from '@/components/Folder/ChildrenList';
import LinkInput from '@/components/Folder/LinkInput';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const ProfilePage = () => {
  const auth = useAuth();
  const router = useRouter();
  const username = router.query?.username;
  const { data } = useSWR(
    username ? `/api/profiles/username/${username}` : null,
    fetcher
  );

  if (!data) {
    return <ProfileShell>Loanding ...</ProfileShell>;
  }

  return (
    <ProfileShell>
      <Box w="100%">
        <ProfileHeader
          name={data?.profile?.name}
          photoUrl={data?.profile?.photoUrl}
          username={username}
          editable={auth.user?.uid === data?.profile?.id}
        />
        <Text minH="15px" mb={10}></Text>
        {auth?.user?.uid === data?.profile?.id ? (
          <>
            <ChildrenList
              folderId={data?.profile?.id}
              childrenOrder={data?.profile?.children}
              editable={true}
            />
            <LinkInput folderId={data?.profile?.id} />
          </>
        ) : (
          <ChildrenList
            folderId={data?.profile?.id}
            childrenOrder={data?.profile?.children}
            editable={false}
          />
        )}
      </Box>
    </ProfileShell>
  );
};

export default ProfilePage;

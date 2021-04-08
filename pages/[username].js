import { Box, Stack } from '@chakra-ui/react';

import AccountShell from '@/components/AccountShell';
import ProfileHeader from '@/components/ProfileHeader';
import TreeSkeleton from '@/components/TreeSkeleton';
import Tree from '@/components/Tree';
import { getAllUsernames, getUsername, getProfile } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const username = context.params.username;
  const { profile } = await getUsername(username).then((res) =>
    getProfile(res.uid)
  );

  return {
    props: {
      profile
    }
  };
}

export async function getStaticPaths() {
  const data = await getAllUsernames();
  const paths = data.usernames.map((username) => ({
    params: {
      username: username.username
    }
  }));

  return {
    paths,
    fallback: false
  };
}

const Profile = ({ profile }) => {
  if (!profile) {
    return (
      <AccountShell>
        <TreeSkeleton />
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <Stack w="100%" maxW="550px">
        <ProfileHeader
          name={profile.name}
          photoUrl={profile.photoUrl}
          username={profile.username}
        />
        <Box>
          <Tree children={profile.children} />
        </Box>
      </Stack>
    </AccountShell>
  );
};

export default Profile;

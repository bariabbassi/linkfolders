import { Box } from '@chakra-ui/react';

import ProfileShell from '@/components/ProfileShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import Tree from '@/components/Tree';
import { getAllProfiles, getProfile } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const username = context.params.username;
  const { profile } = await getProfile(username);

  return {
    props: {
      profile
    }
  };
}

export async function getStaticPaths() {
  const profiles = await getAllProfiles();
  const paths = profiles.profiles.map((profile) => ({
    params: {
      username: profile.username.toString()
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
      <ProfileShell>
        <TreeSkeleton />
      </ProfileShell>
    );
  }

  return (
    <ProfileShell photoUrl={profile.photoUrl} name={profile.name}>
      <Box w="500px" maxW="100vw" mr={6}>
        <Tree children={profile.children} />
      </Box>
    </ProfileShell>
  );
};

export default Profile;

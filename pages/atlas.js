import { Flex, Text, Icon, Link, Button, Box } from '@chakra-ui/react';

import ProfileShell from '@/components/ProfileShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import AtlasTree from '@/components/AtlasTree.tsx';
import { getAllProfiles, getProfile } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const username = 'bari@abbas.si';
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
        <AtlasTree children={profile.children} />
      </Box>
    </ProfileShell>
  );
};

export default Profile;

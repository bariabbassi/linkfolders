import { Flex, Stack, Avatar, Heading } from '@chakra-ui/react';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const FolderHeader = ({ name, userId }) => {
  const auth = useAuth();
  const { data } = useSWR(`/api/profiles/${userId}`, fetcher);

  // let profile = {};
  // if (auth?.user && data?.folder?.userId !== auth?.user?.uid) {
  //   profile = {
  //     name: profileData?.profile?.name,
  //     username: profileData?.profile?.username,
  //     photoUrl: profileData?.profile?.photoUrl
  //   };
  // } else {
  //   profile = {
  //     name: auth?.user.name,
  //     username: auth?.user.username,
  //     photoUrl: auth?.user.photoUrl
  //   };
  // }

  return (
    <Flex w="100%" as="header">
      <Stack spacing={1} mx={3} my={4}>
        <Heading as="h1" size="xl" mb={2}>
          {name}
        </Heading>
        {/* <Heading size="md" fontWeight="400" mb={5} color="grey"></Heading> */}
        <Flex align="center">
          <Avatar
            size="sm"
            name={data?.profile?.name}
            src={data?.profile?.photoUrl}
            // src={profile?.photoUrl}
          />
          <Heading size="sm" fontWeight="400" color="grey" ml={2}>
            {data?.profile?.name}
          </Heading>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default FolderHeader;

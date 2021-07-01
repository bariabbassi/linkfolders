import {
  Flex,
  Stack,
  Button,
  Avatar,
  Heading,
  Tag,
  TagLabel,
  LinkBox,
  LinkOverlay,
  Spinner
} from '@chakra-ui/react';
import useSWR from 'swr';
import NextLink from 'next/link';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const FolderHeader = ({ name, userId }) => {
  const auth = useAuth();
  const { data } = useSWR(
    !auth || userId !== auth?.user?.uid ? `/api/profiles/${userId}` : null,
    fetcher
  );
  let profile = {};
  if (auth && userId === auth?.user?.uid) profile = auth?.user?.profile;
  else profile = data?.profile;

  return (
    <Flex w="100%" as="header">
      <Stack spacing={1} mx={3} my={4}>
        <Heading as="h1" size="xl" mb={2}>
          {name}
        </Heading>
        {profile?.username ? (
          <NextLink href={`/${profile?.username}`} passHref>
            <LinkBox as="article">
              <Tag size="lg" borderRadius="full">
                <Avatar
                  size="xs"
                  ml={-1}
                  mr={2}
                  name={profile?.name}
                  src={profile?.photoUrl}
                />
                <TagLabel size="sm" fontWeight="400" mr={2}>
                  <LinkOverlay href="#">{profile?.name}</LinkOverlay>
                </TagLabel>
              </Tag>
            </LinkBox>
          </NextLink>
        ) : (
          <Tag size="lg" borderRadius="full" w="140px">
            {/* <Avatar size="xs" ml={-1} /> */}
            <Spinner ml={-1} mr={3} />
            <TagLabel size="sm" fontWeight="400">
              Loading...
            </TagLabel>
          </Tag>
        )}
      </Stack>
    </Flex>
  );
};

export default FolderHeader;

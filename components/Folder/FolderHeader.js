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
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const FolderHeader = ({
  name,
  profilePhotoUrl,
  profileName,
  profileUsername
}) => {
  const auth = useAuth();

  return (
    <Flex w="100%" as="header">
      <Stack spacing={1} mx={3} my={4}>
        <Heading as="h1" size="xl" mb={2}>
          {name}
        </Heading>
        {profileUsername ? (
          <NextLink href={`/${profileUsername}`} passHref>
            <LinkBox as="article">
              <Tag
                size="lg"
                borderRadius="2xl"
                boxShadow="sm"
                borderWidth="1px"
                bg="white"
              >
                <Avatar
                  bg="gray.200"
                  size="xs"
                  ml={-1}
                  mr={2}
                  name={profileName}
                  src={profilePhotoUrl}
                />
                <TagLabel size="sm" fontWeight="400" mr={2}>
                  <LinkOverlay href="#">{profileName}</LinkOverlay>
                </TagLabel>
              </Tag>
            </LinkBox>
          </NextLink>
        ) : (
          <Tag size="lg" borderRadius="full" w="140px">
            {/* <Avatar bg="gray.200" size="xs" ml={-1} /> */}
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

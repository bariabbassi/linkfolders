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
    <Flex direction="column" align="center" w="100%" as="header">
      <Heading as="h1" size="xl" mb={2}>
        {name}
      </Heading>
      {profileUsername ? (
        <NextLink href={`/${profileUsername}`} passHref>
          <Button
            as="a"
            variant="ghost"
            p={1}
            pr={4}
            size="xl"
            borderRadius="full"
            fontWeight="400"
          >
            <Avatar
              bg="gray.200"
              size="sm"
              mr={2}
              name={profileName}
              src={profilePhotoUrl}
            />
            {profileName}
          </Button>
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
    </Flex>
  );
};

export default FolderHeader;

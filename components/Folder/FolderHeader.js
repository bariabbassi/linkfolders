import { Box, Flex, Button, Avatar, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

const FolderHeader = ({
  name,
  profilePhotoUrl,
  profileName,
  profileUsername
}) => {
  return (
    <Box w="100%" as="header">
      <Heading as="h1" size="xl" mb={2}>
        {name}
      </Heading>
      {/* {profileUsername && (
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
              color="gray.600"
              bg="gray.200"
              size="sm"
              mr={2}
              name={profileName}
              src={profilePhotoUrl}
            />
            {profileName}
          </Button>
        </NextLink>
      )} */}
    </Box>
  );
};

export default FolderHeader;

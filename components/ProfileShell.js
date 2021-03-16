import { Flex, Image, Heading, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const ProfileShell = ({ name, photoUrl, children }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justify="space-between"
    w="100vw"
    minH="100vh"
    bg=""
  >
    <Flex flexDirection="column" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="150px"
        mb={2}
        mt={10}
        src={photoUrl}
        alt={name}
      />
      <Heading as="h1" size="lg" mb={10} mt={2}>
        {name}
      </Heading>
      {children}
    </Flex>
    <NextLink href="/" passHref>
      <Button as="a" variant="ghost" borderRadius={0} mb={3} mt={12}>
        <Heading as="h2" size="sm">
          📂 Linkfolders
        </Heading>
      </Button>
    </NextLink>
  </Flex>
);

export default ProfileShell;

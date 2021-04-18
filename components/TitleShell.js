import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { LinkfoldersIcon } from '@/styles/icons';

const TitleShell = ({ children }) => {
  return (
    <Box backgroundColor="" h="100vh">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('linkfolders-auth')) {
                window.location.href = "/account/profile"
              }
            `
          }}
        />
      </Head>
      <Flex backgroundColor="white" mb={[8, 16]} w="%100">
        <Flex
          align="center"
          justify="flex-start"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              mr={3}
              leftIcon={<LinkfoldersIcon width="8" height="8" mb={2} />}
            >
              <Heading size="sm">Linkfolders</Heading>
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      <Flex mb={5} direction="column" align="center">
        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          p={4}
          maxW="400px"
          margin="0 auto"
          w="100%"
          px={8}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TitleShell;

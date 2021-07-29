import {
  Button,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { LinkfoldersIcon } from '@/styles/icons';
import router from 'next/router';

const LandingUsername = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState();

  return (
    <Flex wrap="wrap">
      <InputGroup
        w={['100%', '100%', '340px']}
        size="lg"
        m={1}
        as="form"
        onSubmit={() =>
          username
            ? router.push({
                pathname: '/signup',
                query: { username }
              })
            : router.push('/signup')
        }
      >
        <Input
          py={6}
          pl="9.4rem"
          placeholder="yourusername"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputLeftElement w="9.7rem">
          <Flex
            pl={4}
            pt="0.37rem"
            direction="column"
            align="center"
            justify="center"
          >
            <Text>
              <LinkfoldersIcon width="5" height="5" mb={2} mr={2} />
              linkfolde.rs/
            </Text>
          </Flex>
        </InputLeftElement>
      </InputGroup>
      <NextLink
        href={
          username
            ? {
                pathname: '/signup',
                query: { username }
              }
            : '/signup'
        }
      >
        <Button
          as="a"
          colorScheme="yellow"
          cursor="pointer"
          m={1}
          size="lg"
          w={['100%', '100%', '140px']}
          rightIcon={<ArrowForwardIcon />}
        >
          Sign up
        </Button>
      </NextLink>
    </Flex>
  );
};

export default LandingUsername;

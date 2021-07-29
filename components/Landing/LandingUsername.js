import {
  Button,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import { LinkfoldersIcon } from '@/styles/icons';

const LandingUsername = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState('');

  return (
    <Flex
      wrap="wrap"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        username
          ? router.push({
              pathname: '/signup',
              query: { username }
            })
          : router.push('/signup');
      }}
    >
      <InputGroup w={['100%', '100%', '340px']} size="lg" m={1}>
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
      <Button
        type="submit"
        colorScheme="yellow"
        m={1}
        size="lg"
        w={['100%', '100%', '140px']}
        rightIcon={<ArrowForwardIcon />}
      >
        Sign up
      </Button>
    </Flex>
  );
};

export default LandingUsername;

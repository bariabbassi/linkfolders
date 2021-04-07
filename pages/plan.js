import { Stack, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import UserShell from '@/components/UserShell';

const Plan = () => {
  return (
    <UserShell>
      <Heading as="h1" size="2xl">
        Plan
      </Heading>
      <Stack direction="row" w="100%">
        <Stack>
          <Heading>Free plan</Heading>
          <NextLink href="/profile" passHref>
            <Button as="a" variant="outline" colorScheme="yellow">
              Free plan
            </Button>
          </NextLink>
        </Stack>
        <Stack>
          <Heading>Pro plan</Heading>
          <Button variant="solid" colorScheme="yellow">
            Pro plan
          </Button>
        </Stack>
      </Stack>
    </UserShell>
  );
};

export default Plan;

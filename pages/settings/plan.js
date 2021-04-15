import { Stack, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import AccountShell from '@/components/AccountShell';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';

const Plan = () => {
  const auth = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const [isBillingLoading, setBillingLoading] = useState(false);

  return (
    <AccountShell>
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
          <Button
            variant="solid"
            colorScheme="yellow"
            isLoading={isCheckoutLoading}
            onClick={() => {
              setCheckoutLoading(true);
              createCheckoutSession(auth.user?.uid);
            }}
          >
            Pro plan
          </Button>
        </Stack>
        <Button
          variant="solid"
          colorScheme="yellow"
          isLoading={isBillingLoading}
          onClick={() => {
            setBillingLoading(true);
            goToBillingPortal();
          }}
        >
          View billing portal
        </Button>
      </Stack>
    </AccountShell>
  );
};

export default Plan;

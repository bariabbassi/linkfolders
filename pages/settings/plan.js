import { Stack, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';

import { useAuth } from '@/lib/auth';
import AccountShell from '@/components/AccountShell';
import PricingGrid from '@/components/Plan/PricingGrid';
import { goToBillingPortal } from '@/lib/db';

const Plan = () => {
  const auth = useAuth();
  const [isBillingLoading, setBillingLoading] = useState(false);

  return (
    <AccountShell>
      <Heading as="h1" size="2xl">
        Plan
      </Heading>
      <Stack w="100%">
        <PricingGrid />
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

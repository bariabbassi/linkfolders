import { Stack, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import AccountShell from '@/components/AccountShell';
import PricingGrid from '@/components/Plan/PricingGrid';

const Plan = () => {
  const auth = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

  return (
    <AccountShell>
      <Heading as="h1" size="2xl">
        Plan
      </Heading>
      <PricingGrid />
    </AccountShell>
  );
};

export default Plan;

import { Heading } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import AccountShell from '@/components/AccountShell';
import PricingGrid from '@/components/SignupPlan/PricingGrid';

const Plan = () => {
  const auth = useAuth();

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

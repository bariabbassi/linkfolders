import { Heading } from '@chakra-ui/react';

import LandingShell from '@/components/LandingShell';
import PricingGrid from '@/components/Pricing/PricingGrid';

const Pricing = () => {
  return (
    <LandingShell>
      <Heading as="h1" size="2xl">
        Pricing
      </Heading>
      <PricingGrid />
    </LandingShell>
  );
};

export default Pricing;

import { SimpleGrid, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import LandingShell from '@/components/LandingShell';
import { createCheckoutSession } from '@/lib/db';
import PricingCard from '@/components/PricingCard';

const Pricing = () => {
  const auth = useAuth();

  return (
    <LandingShell>
      <Heading as="h1" size="2xl">
        Pricing
      </Heading>
      <SimpleGrid
        mt={16}
        columns={{
          base: 1,
          lg: 2
        }}
        spacing={{
          base: '8',
          lg: '5'
        }}
        maxW="7xl"
      >
        <PricingCard
          name={'Free'}
          price={'$0'}
          model={'/ month'}
          features={[
            'Your personal Linkfolders link',
            'Unlimited number of links',
            'Unlimited number of folders'
          ]}
          isHighlited={false}
        />
        <PricingCard
          name={'Premium'}
          price={'$9'}
          model={'/ month'}
          features={[
            'Your personal Linkfolders link',
            'Unlimited number of links',
            'Unlimited number of folders',
            'Customise apperance',
            'Hide Linkfolders logo'
          ]}
          isHighlited={true}
        />
      </SimpleGrid>
    </LandingShell>
  );
};

export default Pricing;

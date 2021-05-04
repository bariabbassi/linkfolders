import { Stack, Heading, Button } from '@chakra-ui/react';

import AccountShell from '@/components/AccountShell';
// import AppearanceFree from '@/components/Appearance/AppearanceFree';
import AppearancePremium from '@/components/Appearance/AppearancePremium';
import { useAuth } from '@/lib/auth';

const Appearance = () => {
  const { user } = useAuth();

  //   if (user?.stripeRole !== 'premium') {
  //     return (
  //       <AccountShell>
  //         <AppearanceFree />
  //       </AccountShell>
  //     );
  //   }

  return (
    <AccountShell>
      <Heading as="h1" size="2xl" mb={12}>
        Appearance
      </Heading>
      <AppearancePremium />
    </AccountShell>
  );
};

export default Appearance;

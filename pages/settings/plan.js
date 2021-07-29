import { Stack, Heading, Button } from '@chakra-ui/react';
// import NextLink from 'next/link';

// import { useAuth } from '@/lib/auth';
import SettingsShell from '@/components/Settings/SettingsShell';
// import { createCheckoutSession, goToBillingPortal } from '@/lib/db';

const Plan = () => {
  // const auth = useAuth();
  // const [isCheckoutLoading, setCheckoutLoading] = React.useState(false);
  // const [isBillingLoading, setBillingLoading] = React.useState(false);

  return (
    <SettingsShell>
      <Heading as="h1" size="2xl">
        Plan
      </Heading>
      {/* <Stack direction="row" w="100%">
        <Stack>
          <Heading>Free plan</Heading>
          <NextLink href={`/${auth.user?.profile?.username}`} passHref>
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
      </Stack> */}
    </SettingsShell>
  );
};

export default Plan;

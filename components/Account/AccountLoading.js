import { Box, Spinner } from '@chakra-ui/react';
import AccountShell from '@/components/Account/AccountShell';

const AccountLoading = ({ children }) => {
  return (
    <AccountShell>
      <Box mt={14}>
        <Spinner />
      </Box>
    </AccountShell>
  );
};

export default AccountLoading;

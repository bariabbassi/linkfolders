import { Box, Flex } from '@chakra-ui/react';
import AccountMenu from '@/components/Account/AccountMenu';

const AccountShell = ({ children }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      w="100vw"
      minH="100vh"
      bg=""
    >
      <Box w="100%">
        <Flex bg="" align="center" w="100%" h="4.6rem">
          <Flex align="center" w="100%"></Flex>
          <AccountMenu />
        </Flex>
        <Flex direction="column" align="center">
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            w="100%"
            maxW="570px"
            px={3}
            pb={7}
          >
            {children}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AccountShell;

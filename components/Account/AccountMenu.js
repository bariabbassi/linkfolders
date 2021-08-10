import {
  Box,
  HStack,
  IconButton,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';
import { User, Settings, LogOut } from 'react-feather';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const AccountMenu = () => {
  const auth = useAuth();

  if (!auth?.user) return null;
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        borderRadius="2xl"
        aria-label="Account menu"
        _hover={{ bg: 'gray.200' }}
        size="xl"
        w="100%"
        p={1}
        mb={9}
      >
        <HStack>
          <Avatar
            color="gray.600"
            bg="gray.200"
            size="lg"
            h="3.5rem"
            w="3.5rem"
            borderRadius="2xl"
            mr={1}
            name={auth.user?.profile?.name}
            src={auth.user?.profile?.photoUrl}
          />
          <Box>
            <Heading as="h1" size="md">
              {auth.user?.profile?.name}
            </Heading>
            <Heading size="xs" fontWeight="300" color="gray">
              @{auth.user?.profile?.username}
            </Heading>
          </Box>
        </HStack>
      </MenuButton>
      <MenuList>
        <NextLink href={`/${auth?.user?.profile?.username}`} passHref>
          <MenuItem icon={<User size={19} />}>Profile</MenuItem>
        </NextLink>
        <NextLink href="/settings/profile" passHref>
          <MenuItem icon={<Settings size={19} />}>Settings</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem
          icon={<LogOut size={19} />}
          onClick={() => {
            auth.logout();
          }}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;

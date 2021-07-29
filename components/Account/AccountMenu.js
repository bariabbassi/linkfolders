import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Avatar,
  Icon
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
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
        borderRadius="full"
        aria-label="Account menu"
        size="xl"
        p={1}
        mr={2}
        icon={
          <Avatar
            color="gray.600"
            bg="gray.200"
            size="md"
            name={auth?.user?.profile?.name}
            src={auth?.user?.profile?.photoUrl}
          />
        }
      />
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

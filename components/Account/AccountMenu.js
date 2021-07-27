import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  IconButton
} from '@chakra-ui/react';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

const AccountMenu = () => {
  const auth = useAuth();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        borderRadius="full"
        aria-label="Account menu"
        p={4}
        size="xl"
        icon={<ChevronDownIcon boxSize={6} />}
      />
      <MenuList>
        <NextLink href="/settings/profile" passHref>
          <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem
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

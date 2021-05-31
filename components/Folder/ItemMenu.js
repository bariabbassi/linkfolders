import { Menu, MenuButton, IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

import LinkMenuList from '@/components/Folder/LinkMenuList';

const LinkMenu = ({ link, setEditMode }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        icon={<DragHandleIcon />}
        variant="ghost"
        size="xs"
      />
      <LinkMenuList link={link} setEditMode={setEditMode} />
    </Menu>
  );
};

export default LinkMenu;

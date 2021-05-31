import { Menu, MenuButton, IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

import LinkMenuList from '@/components/Folder/LinkMenuList';
import FolderMenuList from '@/components/Folder/FolderMenuList';

const LinkMenu = ({ item }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        icon={<DragHandleIcon />}
        variant="ghost"
        size="xs"
      />
      {item?.type === 'link' ? (
        <LinkMenuList link={item} />
      ) : item.type === 'folder' ? (
        <FolderMenuList folder={item} />
      ) : null}
    </Menu>
  );
};

export default LinkMenu;

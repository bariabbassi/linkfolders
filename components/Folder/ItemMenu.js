import { Menu, MenuButton, IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

import LinkMenuList from '@/components/Folder/LinkMenuList';
import FolderMenuList from '@/components/Folder/FolderMenuList';

const ItemMenu = ({ item }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        icon={<DragHandleIcon />}
        variant="ghost"
        size="xs"
        color="grey"
      />
      {item?.type === 'link' ? (
        <LinkMenuList link={item} />
      ) : item?.type === 'folder' ? (
        <FolderMenuList folder={item} />
      ) : null}
    </Menu>
  );
};

export default ItemMenu;

import { Menu, MenuButton, IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

import LinkMenuList from '@/components/Folder/LinkMenuList';
import FolderMenuList from '@/components/Folder/FolderMenuList';

const ItemMenu = ({ item, renameMode, setRenameMode }) => {
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
        <LinkMenuList link={item} setRenameMode={setRenameMode} />
      ) : item?.type === 'folder' ? (
        <FolderMenuList
          folder={item}
          renameMode={renameMode}
          setRenameMode={setRenameMode}
        />
      ) : null}
    </Menu>
  );
};

export default ItemMenu;

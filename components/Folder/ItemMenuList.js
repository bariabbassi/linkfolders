import { MenuList, MenuItem } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  CopyIcon,
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons';

import { handleDeleteItem } from '@/lib/handlers';

const ItemMenuList = ({ item }) => {
  return (
    <MenuList>
      {/* <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem> */}
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => {
          if (item?.type === 'folder') {
            handleDeleteFolder(item?.id, item?.parent);
          } else {
            handleDeleteItem(item?.id, item?.parent);
          }
        }}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default ItemMenuList;

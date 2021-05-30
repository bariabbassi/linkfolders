import { MenuList, MenuItem } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  CopyIcon,
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons';

import { handleDeleteItem } from '@/lib/handlers';

const LinkMenuList = ({ link, setEditMode }) => {
  return (
    <MenuList z-index="2">
      <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem>
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>
      <MenuItem icon={<EditIcon />}>Rename</MenuItem>
      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => handleDeleteItem(link.id, link.parent)}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default LinkMenuList;

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
    <MenuList position="absolute" z-index="9999" bg="white">
      <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem>
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>
      <MenuItem icon={<EditIcon />} onClick={() => setEditMode(true)}>
        Rename
      </MenuItem>
      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => {
          console.log('handle', link?.id, link?.parent);
          handleDeleteItem(link?.id, link?.parent);
        }}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default LinkMenuList;

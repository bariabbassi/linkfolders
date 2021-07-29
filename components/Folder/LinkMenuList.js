import { MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { handleDeleteLink } from '@/lib/handlers';

const LinkMenuList = ({ link, renameMode, setRenameMode }) => {
  return (
    <MenuList>
      {/* <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem> */}
      {/* <MenuItem icon={<CopyIcon />}>Copy link</MenuItem> */}
      <MenuItem
        icon={<EditIcon />}
        onClick={() => {
          setRenameMode(!renameMode);
        }}
      >
        Rename
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => {
          handleDeleteLink(link?.id, link?.parent);
        }}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default LinkMenuList;

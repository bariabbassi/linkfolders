import { MenuList, MenuItem } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  CopyIcon,
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons';

import { handleDeleteFolder } from '@/lib/handlers';

const FolderMenuList = ({ folder, renameMode, setRenameMode }) => {
  return (
    <MenuList>
      {/* <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem> */}
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>
      <MenuItem
        icon={<EditIcon />}
        onClick={() => {
          setRenameMode(!renameMode);
        }}
      >
        Rename
      </MenuItem>
      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => {
          handleDeleteFolder(folder?.id, folder?.parent);
        }}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default FolderMenuList;

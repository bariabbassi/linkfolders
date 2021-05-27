import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { handleDeleteItem } from '@/lib/handlers';

const DeleteButton = ({ itemId, folderId }) => {
  return (
    <IconButton
      aria-label="Remove node"
      variant="ghost"
      size="sm"
      ml={3}
      icon={<DeleteIcon />}
      onClick={() => handleDeleteItem(itemId, folderId)}
    />
  );
};

export default DeleteButton;

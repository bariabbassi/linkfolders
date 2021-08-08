import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useAuth } from '@/lib/auth';
import { handleCreateFolder } from '@/lib/handlers';

const AddRootFolderButton = ({ folderId }) => {
  const auth = useAuth();

  const onClick = () => {
    if (!auth?.user) return;
    handleCreateFolder(
      '',
      auth?.user?.uid,
      `root-${auth.user?.uid}`,
      auth?.user?.profile?.username
    );
  };

  return (
    <IconButton
      bg="white"
      size="md"
      aria-label="Add folder"
      icon={<AddIcon />}
      onClick={onClick}
    />
  );
};

export default AddRootFolderButton;

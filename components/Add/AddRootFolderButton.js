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
      variant="ghost"
      size="md"
      aria-label="Add folder"
      _hover={{ bg: 'gray.200' }}
      icon={<AddIcon boxSize={4} color="gray" />}
      onClick={onClick}
    />
  );
};

export default AddRootFolderButton;

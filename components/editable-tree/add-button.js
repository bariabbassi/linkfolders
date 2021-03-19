import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const AddButton = ({ onClick }) => {
  return (
    <IconButton
      size="sm"
      aria-label="Add to root"
      icon={<AddIcon />}
      onClick={onClick}
      value
    />
  );
};

export default AddButton;

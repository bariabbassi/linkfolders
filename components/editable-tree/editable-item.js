import { IconButton, Input } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const EditableItem = (props) => {
  const { name, changeName, removeNode, addChild } = props;

  return (
    <div className="EditableItem">
      <Input
        size="sm"
        placeholder="New Item"
        value={name}
        onChange={(e) => {
          changeName(e.target.value);
        }}
      />
      <IconButton
        size="sm"
        aria-label="Add child"
        icon={<AddIcon />}
        onClick={addChild}
        value
      />
      <IconButton
        size="sm"
        aria-label="Remove node"
        icon={<DeleteIcon />}
        onClick={removeNode}
        value
      />
    </div>
  );
};

export default EditableItem;

import { Box, FormControl, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { handleUpdateItem } from '@/lib/handlers';

const NameInput = ({ item, setRenameMode }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (values) => {
    if (values.itemName === item?.name) {
      setRenameMode(false);
      return;
    }
    const newItem = { ...item, name: values.itemName };
    handleUpdateItem(newItem);
    setRenameMode(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.itemName}>
        <Input
          // variant="unstyled"
          type="text"
          boxShadow="outline"
          pl={3}
          ml={1}
          placeholder={
            item?.type === 'link'
              ? 'Link name'
              : item?.type === 'folder'
              ? 'Folder name'
              : null
          }
          defaultValue={item?.name}
          onFocus={(e) => e.target.select()}
          {...register('itemName', {
            required: 'Name is required'
          })}
          onBlur={handleSubmit(onSubmit)}
        />
      </FormControl>
    </Box>
  );
};

export default NameInput;

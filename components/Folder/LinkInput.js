import {
  Box,
  Flex,
  Input,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { handleCreateLink, handleCreateFolder } from '@/lib/handlers';

const LinkInput = ({ folderId }) => {
  const { handleSubmit, register, errors, reset } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (values) => {
    handleCreateLink(values.url, folderId);
    reset();
  };

  return (
    <Box w="100%" h="100%" pl={4} pr={2} py={2} _hover={{ bg: 'gray.100' }}>
      <Flex align="center" as="form" onSubmit={handleSubmit(onSubmit)}>
        <AddIcon mr={2} />
        <FormControl isInvalid={errors.url}>
          <Input
            type="url"
            name="url"
            variant="unstyled"
            m={1}
            size="sm"
            placeholder="https:// ..."
            ref={register({
              required: 'Url is required'
            })}
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default LinkInput;

import { Flex, Input, FormControl } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import { handleCreateLink, handleCreateFolder } from '@/lib/handlers';

const LinkInput = ({ folderId }) => {
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (values) => {
    if (!auth?.user) return;
    if (
      values.input.substring(0, 8) === 'https://' ||
      values.input.substring(0, 7) === 'http://'
    ) {
      handleCreateLink(
        auth?.user?.uid,
        folderId,
        values.input,
        auth?.user?.profile?.username
      );
    } else if (values.input.includes('.') && !values.input.includes(' ')) {
      handleCreateLink(
        auth?.user?.uid,
        folderId,
        `https://${values.input}`,
        auth?.user?.profile?.username
      );
    } else {
      handleCreateFolder(
        values.input,
        auth?.user?.uid,
        folderId,
        auth?.user?.profile?.username
      );
    }
    reset();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
      my={2}
      bg="white"
      borderWidth="1px"
      borderRadius="full"
    >
      <Flex
        align="center"
        w="100%"
        pl={4}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AddIcon mr={3} boxSize={4} color="gray" />
        <FormControl isInvalid={errors?.url}>
          <Input
            autoComplete="off"
            variant="unstyled"
            py={3}
            size="md"
            placeholder="Type a URL or a folder name"
            {...register('input', {
              required: 'URL is required'
            })}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default LinkInput;

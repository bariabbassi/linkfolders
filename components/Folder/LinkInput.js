import {
  Box,
  Flex,
  Input,
  Button,
  IconButton,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { LinkfoldersIcon } from '@/styles/icons';
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
    if (!auth.user) return;
    handleCreateLink(auth.user.uid, folderId, values.input);
    reset();
  };

  const onClick = () => {
    if (!auth.user) return;
    handleCreateFolder(auth.user.uid, folderId);
    reset();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
      my={4}
      py={2}
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
            type="text"
            autoComplete="off"
            variant="unstyled"
            size="md"
            placeholder="Type a URL"
            {...register('input', {
              required: 'URL is required'
            })}
          />
        </FormControl>
      </Flex>
      <IconButton
        variant="ghost"
        mx={4}
        size="md"
        aria-label="New folder"
        icon={<LinkfoldersIcon width="6" height="6" mb={1} />}
        onClick={onClick}
      />
    </Flex>
  );
};

export default LinkInput;

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
    <Box borderWidth="1px" borderRadius="lg">
      <Box
        w="100%"
        bg="white"
        overflow="hidden"
        px={4}
        py={2}
        _hover={{ bg: 'gray.100' }}
      >
        <Flex align="center" as="form" onSubmit={handleSubmit(onSubmit)}>
          <AddIcon mr={1} boxSize={4} color="grey" />
          🔗
          {/* <IconButton
          variant="ghost"
          mr={2}
          color="grey"
          size="md"
          aria-label="New folder"
          icon={<AddIcon />}
          onClick={onNewFolder}
        /> */}
          <FormControl isInvalid={errors?.url}>
            <Input
              type="url"
              autoComplete="off"
              ml={2}
              size="sm"
              placeholder="https:// ..."
              {...register('input', {
                required: 'URL is required'
              })}
            />
          </FormControl>
        </Flex>
      </Box>
      <Button
        variant="ghost"
        color="grey"
        m={1}
        size="sm"
        aria-label="Add root folder"
        onClick={onClick}
      >
        <AddIcon mr={1} boxSize={4} color="grey" />
        <LinkfoldersIcon width="6" height="6" mb={1} />
      </Button>
    </Box>
  );
};

export default LinkInput;

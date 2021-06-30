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
    <Box>
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        py={2}
        bg="white"
        borderWidth="1px"
        borderRadius="3xl"
      >
        <Flex align="center" pl={4} as="form" onSubmit={handleSubmit(onSubmit)}>
          <AddIcon mr={2} boxSize={4} color="grey" />

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
        <Button
          variant="ghost"
          color="grey"
          mx={1}
          size="sm"
          aria-label="Add root folder"
          onClick={onClick}
        >
          <LinkfoldersIcon width="6" height="6" mb={1} />
        </Button>
      </Flex>
    </Box>
  );
};

export default LinkInput;

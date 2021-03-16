import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import { createFolder } from '@/lib/db';

const AddFolderModal = () => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm();
  const onCreateFolder = (values) => {
    createFolder(values);
    toast({
      title: 'Success!',
      description: 'Your folder was added.',
      status: 'success',
      duration: 2500,
      isClosable: true
    });
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="icon"
        icon={<AddIcon />}
        size="md"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="" onSubmit={handleSubmit(onCreateFolder)}>
          <ModalHeader>Add a new folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Name"
                ref={register({ required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFolderModal;

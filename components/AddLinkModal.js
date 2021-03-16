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
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

const AddLinkModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const { register, handleSubmit } = useForm();
  const onCreateLink = (values) => {
    console.log(values);
  };

  return (
    <>
      <IconButton
        aria-label="icon"
        icon={<AddIcon />}
        size="md"
        onClick={onOpen}
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateLink)}>
          <ModalHeader>Add a new link</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Link</FormLabel>
              <Input
                name="link"
                placeholder="https://website.com"
                ref={register({ required: true })}
              />
            </FormControl>
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

export default AddLinkModal;

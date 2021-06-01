import {
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  CopyIcon,
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { handleUpdateItem, handleDeleteItem } from '@/lib/handlers';
import EditLinkModal from '@/components/Folder/EditLinkModal';

const LinkMenuList = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, reset } = useForm();

  const onSubmit = (values) => {
    const newItem = { ...link, name: values.name, url: values.url };
    handleUpdateItem(newItem);
    onClose();
  };

  return (
    <MenuList>
      <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem>
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>

      <MenuItem icon={<EditIcon />} onClick={onOpen}>
        Edit
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit link</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={8}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Link name"
                  defaultValue={link?.name}
                  ref={register({
                    required: 'Name is required'
                  })}
                />
                <input></input>
              </FormControl>
              <FormControl isInvalid={errors.url} mt={6}>
                <FormLabel>URL</FormLabel>
                <Input
                  type="url"
                  name="url"
                  placeholder="https:// ..."
                  defaultValue={link?.url}
                  ref={register({
                    required: 'URL is required'
                  })}
                />
              </FormControl>
            </ModalBody>
            <Input></Input>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="yellow">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MenuItem>

      <MenuItem
        icon={<DeleteIcon />}
        onClick={() => {
          handleDeleteItem(link?.id, link?.parent);
        }}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

export default LinkMenuList;

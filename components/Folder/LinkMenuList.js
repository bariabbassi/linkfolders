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

const LinkMenuList = ({ link, renameMode, setRenameMode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (values) => {
    const newItem = { ...link, name: values.name, url: values.url };
    handleUpdateItem(newItem);
    onClose();
  };

  return (
    <MenuList>
      {/* <MenuItem icon={<ExternalLinkIcon />}>Open</MenuItem> */}
      <MenuItem icon={<CopyIcon />}>Copy link</MenuItem>
      <MenuItem
        icon={<EditIcon />}
        onClick={() => {
          setRenameMode(!renameMode);
        }}
      >
        Rename
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

import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { LinkfoldersIcon } from '@/styles/icons';

const UpgradeFolderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        variant="ghost"
        mx={4}
        size="md"
        aria-label="Add new folder"
        icon={<LinkfoldersIcon width="6" height="6" mb={1} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upgrade to Linkfolders Premium</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You need to upgrade to Linkfolders Premium to be able to add
            folders. Linkfolders Premium is still in the works. It's comming
            soon...
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpgradeFolderModal;

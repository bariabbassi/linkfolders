import { IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

const DragButton = () => {
  return <DragHandleIcon boxSize={3} m={3} />;
  // <IconButton
  //     aria-label="drag button"
  //     variant="ghost"
  //     size="xs"
  //     mr={2}
  //     cursor="grab"
  //     icon={<DragHandleIcon />}
  //   />
};

export default DragButton;

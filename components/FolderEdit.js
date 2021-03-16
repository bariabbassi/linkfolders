import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Link,
  Image,
  Button,
  Collapse,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Input,
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Stack,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const FolderForm = ({ index, name, link, firstFieldRef, onCancel }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Index"
        id="index"
        ref={firstFieldRef}
        defaultValue={index}
      />
      <TextInput label="Name" id="name" defaultValue={name} />
      <TextInput label="Link" id="link" defaultValue={link} />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const FolderEdit = ({ index, name, link }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Box
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            height="46px"
            pl={7}
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            color="gray.600"
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)'
            }}
            _focus={{
              bg: 'gray.200',
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
            }}
          >
            <Flex align="center">
              <Image
                boxSize="24px"
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${link}&sz=32`}
                alt={name}
              />
              <Heading as="h2" size="sm" pl={3}>
                {name}
              </Heading>
            </Flex>
            <Flex align="center">
              <IconButton mr={4} size="sm" icon={<DeleteIcon />} />
              <IconButton mr={7} size="sm" icon={<EditIcon />} />
            </Flex>
          </Box>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <LinkForm
            index={index}
            name={name}
            link={link}
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FolderEdit;

import { useState } from 'react';
import {
  Box,
  Image,
  Button,
  Flex,
  Heading,
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
  useDisclosure,
  Center
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

import { useProfile, useProfileUpdate } from '@/components/ProfileContext';

const Link = ({ name, setIsEditing }) => (
  <Flex p={3} w="100%" align="center" justify="space-between">
    <Heading as="h2" size="sm">
      {name}
    </Heading>
    <ButtonGroup alignItems="center" justify="center" size="sm">
      <IconButton
        mr={2}
        size="sm"
        icon={<EditIcon />}
        onClick={() => setIsEditing(true)}
      />
      <IconButton mr={4} size="sm" icon={<DeleteIcon />} />
    </ButtonGroup>
  </Flex>
);

const LinkForm = ({ name, link, setIsEditing }) => {
  const profile = useProfile();
  const updateLink = useProfileUpdate();
  updateLink();

  const { register, handleSubmit } = useForm();
  const onUpdateLink = (values) => {
    console.log(values);
  };

  return (
    <Flex w="100%" align="center" justify="space-between">
      <Flex
        as="form"
        ml={2}
        mr={2}
        direction="column"
        align="center"
        onSubmit={handleSubmit(onUpdateLink)}
      >
        <FormControl m={1}>
          <Input
            name="name"
            defaultValue={name}
            ref={register({ required: true })}
          />
        </FormControl>
        <FormControl m={1}>
          <Input
            name="link"
            defaultValue={link}
            ref={register({ required: true })}
          />
        </FormControl>
      </Flex>
      <ButtonGroup alignItems="center" justify="center" size="sm">
        <IconButton mr={2} size="sm" icon={<CheckIcon />} type="submit" />
        <IconButton
          mr={4}
          size="sm"
          icon={<CloseIcon />}
          onClick={() => setIsEditing(false)}
        />
      </ButtonGroup>
    </Flex>
  );
};

const LinkEdit = ({ index, name, link }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = () => console.log('onSubmit');
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box
      pl={7}
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Flex align="center">
        <Image
          boxSize="24px"
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${link}&sz=32`}
          alt={name}
        />
        {isEditing ? (
          <LinkForm name={name} link={link} setIsEditing={setIsEditing} />
        ) : (
          <Link index={index} name={name} setIsEditing={setIsEditing}></Link>
        )}
      </Flex>
    </Box>
  );
};

export default LinkEdit;

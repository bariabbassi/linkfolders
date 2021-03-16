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
  useDisclosure
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';

const LinkForm = ({ index, name, link, onClose }) => {
  const { register, handleSubmit } = useForm();
  const onUpdateLink = (values) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      settings: {
        icons: true,
        timestamp: true,
        ratings: false
      }
    };

    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites]
      }),
      false
    );
    onClose();
    // updateLink(values);
    console.log(values);
    // onClose();
  };

  return (
    <Stack spacing={4} onSubmit={handleSubmit(onUpdateLink)}>
      <FormControl>
        <FormLabel>Index</FormLabel>
        <Input
          name="index"
          defaultValue={index}
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          defaultValue={name}
          ref={register({ required: true })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Link</FormLabel>
        <Input
          name="link"
          defaultValue={link}
          ref={register({ required: true })}
        />
      </FormControl>
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="teal" type="submit">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const LinkEdit = ({ index, name, link }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      height="46px"
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
        <Heading as="h2" size="sm" pl={3}>
          {name}
        </Heading>
      </Flex>
      <Flex align="center">
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <IconButton mr={4} size="sm" icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <PopoverArrow />
            <PopoverCloseButton />
            <LinkForm index={index} name={name} link={link} onClose={onClose} />
          </PopoverContent>
        </Popover>
        <IconButton mr={7} size="sm" icon={<DeleteIcon />} />
      </Flex>
    </Box>
  );
};

export default LinkEdit;

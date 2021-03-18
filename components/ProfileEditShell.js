import { useState, createContext } from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Heading,
  Avatar,
  AvatarBadge,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import TreeEdit from '@/components/TreeEdit';
import { useProfile } from '@/components/ProfileContext';

export const ProfileContext = createContext();

const ProfileEditShell = () => {
  const profile = useProfile();

  const { register, handleSubmit } = useForm();
  const [tree, setTree] = useState(profile?.children);
  console.log(profile);
  const onUpdateProfile = (values) => {
    console.log('onSubmit', values);
  };

  const updateName = (values) => {
    console.log('updateName', values);
  };

  const updateUsername = (onSubmit) => {
    console.log('updateUsername');
    onSubmit();
  };
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <ButtonGroup alignItems="center" justify="center" size="sm" ml={4}>
        <IconButton icon={<CheckIcon />} type="submit" />
        <IconButton icon={<CloseIcon />} onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex alignItems="center" justify="center" ml={4}>
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
      </Flex>
    );
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Avatar mb={2} size="2xl" name={profile?.name} src={profile?.photoUrl}>
        <AvatarBadge border="none" p={4}>
          <IconButton size="sm" color="gray.700" icon={<EditIcon />} />
        </AvatarBadge>
      </Avatar>

      <Heading as="h1" size="lg">
        <Editable
          d="flex"
          textAlign="center"
          defaultValue={profile?.name}
          isPreviewFocusable={false}
          submitOnBlur={false}
        >
          {(props) => {
            const onUpdateName = (values) => {
              updateName(values);
              close;
            };
            return (
              <>
                <EditablePreview />
                <Flex as="form" onSubmit={handleSubmit(onUpdateName)}>
                  <FormControl>
                    <EditableInput
                      name="name"
                      ref={register({ required: true })}
                    />
                  </FormControl>
                  <EditableControls {...props} />
                </Flex>
              </>
            );
          }}
        </Editable>
      </Heading>

      <FormControl
        mt={2}
        ml={12}
        d="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading as="h2" size="sm" mb={10}>
          <Editable
            d="flex"
            textAlign="center"
            defaultValue={profile?.username}
            isPreviewFocusable={false}
            submitOnBlur={false}
          >
            {(props) => (
              <>
                <EditablePreview />
                <EditableInput
                  name="username"
                  ref={register({ required: true })}
                />
                <EditableControls {...props} />
              </>
            )}
          </Editable>
        </Heading>
      </FormControl>
      <Box w="500px" maxW="100vw" mr={6}>
        <TreeEdit children={profile.children} setTree={setTree} />
        <Flex align="space-between">
          <Button>Submit</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileEditShell;

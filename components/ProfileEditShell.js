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
  FormControl
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

const ProfileEditShell = ({ profile, children }) => {
  const { register, handleSubmit } = useForm();
  const onUpdateProfile = (values) => {
    console.log(onSubmit, values);
  };

  const updateName = () => console.log('updateName', profile?.name);
  const updateUsername = () => console.log('updateUsername');
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <ButtonGroup alignItems="center" justify="center" size="sm" ml={4}>
        <IconButton icon={<CheckIcon />} onClick={onSubmit} />
        <IconButton icon={<CloseIcon />} onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex alignItems="center" justify="center" ml={4}>
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
      </Flex>
    );
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      as="form"
      onSubmit={handleSubmit(onUpdateProfile)}
    >
      <Avatar mb={2} size="2xl" name={profile?.name} src={profile?.photoUrl}>
        <AvatarBadge border="none" p={4}>
          <IconButton size="sm" color="gray.700" icon={<EditIcon />} />
        </AvatarBadge>
      </Avatar>
      <Heading as="h1" size="lg" mt={2} ml={12}>
        <Editable
          d="flex"
          textAlign="center"
          defaultValue={profile?.name}
          isPreviewFocusable={false}
          submitOnBlur={false}
        >
          {(props) => (
            <>
              <EditablePreview />

              <EditableInput
                name="name"
                value={profile?.name}
                ref={register({ required: true })}
              />
              <EditableControls {...props} />
            </>
          )}
        </Editable>
      </Heading>
      <Heading as="h2" size="sm" mb={10} mt={2} ml={12}>
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
              <EditableInput />
              <EditableControls {...props} />
            </>
          )}
        </Editable>
      </Heading>
      <Box w="500px" maxW="100vw" mr={6}>
        {children}
        <Flex align="space-between" type="submit">
          <Button>Submit</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileEditShell;

import {
  Box,
  Stack,
  Heading,
  Button,
  IconButton,
  Text,
  Avatar,
  AvatarBadge,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import SettingsShell from '@/components/Settings/SettingsShell';
import SettingsHeader from '@/components/Settings/SettingsHeader';
import SettingsPhoto from '@/components/Settings/SettingsPhoto';
import SettingsUsername from '@/components/Settings/SettingsUsername';
import { handleUpdateProfile } from '@/lib/handlers';

const ProfileEditPage = () => {
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: auth?.user?.profile?.name,
      username: auth?.user?.profile?.username
    }
  });

  const onSubmit = (values) => {
    // if (values.photo[0]) if (values.name) if (values.username) updateProfile;
    console.log(
      'values: ',
      values.photo[0],
      values.name,
      values.username.toLowerCase()
    );
    handleUpdateProfile(
      values.photo[0],
      values.name,
      values.username.toLowerCase()
    );
  };

  return (
    <SettingsShell>
      <Box w="100%">
        <SettingsHeader name={'Edit profile'} />
        <Text minH="15px" mb={10}></Text>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8} mb={12}>
            <SettingsPhoto register={register} errors={errors} />
            {/* <FormControl isInvalid={errors.photoUrl}>
              <FormLabel>Photo</FormLabel>
              <Avatar
                bg="gray.200"
                size="xl"
                name={auth?.user?.profile?.name}
                src={auth?.user?.profile?.photoUrl}
              >
                <AvatarBadge border="none" p={4}>
                  <IconButton size="sm" color="gray.700" icon={<EditIcon />} />
                </AvatarBadge>
              </Avatar>
              {errors.name && (
                <FormErrorMessage>{errors.photoUrl.message}</FormErrorMessage>
              )}
            </FormControl> */}
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                defaultValue={auth?.user?.profile?.name}
                {...register('name', {
                  required: 'Name is required'
                })}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <SettingsUsername register={register} errors={errors} />
          </Stack>
          <Button colorScheme="yellow" type="submit">
            Save
          </Button>
          <Button ml={3}>Cancel</Button>
        </Box>
      </Box>
    </SettingsShell>
  );
};

export default ProfileEditPage;

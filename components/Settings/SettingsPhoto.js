import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Avatar,
  Icon,
  InputGroup
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const SettingsPhoto = ({ register, errors }) => {
  const auth = useAuth();

  return (
    <FormControl isInvalid={errors.photo}>
      <FormLabel>Photo</FormLabel>
      <Avatar
        bg="gray.200"
        size="xl"
        name={auth?.user?.profile?.name}
        src={auth?.user?.profile?.photoUrl}
      />
      <input type="file" {...register('photo')} />
      {errors.photo && (
        <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SettingsPhoto;

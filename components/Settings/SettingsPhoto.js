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

  const validatePhoto = (photo) => {
    if (!photo[0]) return true;
    for (const file of Array.from(photo[0])) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max photo size is 10 MB';
      }
    }
    return true;
  };

  return (
    <FormControl isInvalid={errors.photo}>
      <FormLabel>Photo</FormLabel>
      <Avatar
        bg="gray.200"
        size="xl"
        name={auth?.user?.profile?.name}
        src={auth?.user?.profile?.photoUrl}
      />
      <input
        type="file"
        accept="image/*"
        {...register('photo', { validate: validatePhoto })}
      />
      {errors.photo && (
        <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SettingsPhoto;

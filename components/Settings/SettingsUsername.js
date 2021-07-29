import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const SettingsUsername = ({ register, errors }) => {
  const auth = useAuth();

  return (
    <FormControl isInvalid={errors.username}>
      <FormLabel>Username</FormLabel>
      <Input
        placeholder="Username"
        defaultValue={auth?.user?.profile?.username}
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be at least 3 characters long'
          },
          maxLength: {
            value: 29,
            message: 'Username should be shorter that 30 characters'
          },
          pattern: {
            value: /^[a-z0-9_-]{3,29}$/,
            message:
              'Username should contain only letters, numbers, underscores, and hyphens'
          },
          validate: async (username) => {
            if (username === auth?.user?.profile?.username) return true;
            return await fetch(`/api/usernames/${username}/availability`)
              .then((res) => res.json())
              .then((data) => {
                if (data.available === true) {
                  return true;
                }
                return `${username} is already taken`;
              });
          }
        })}
      />
      {errors.username && (
        <FormErrorMessage>{errors.username.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SettingsUsername;

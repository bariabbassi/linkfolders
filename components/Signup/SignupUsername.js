import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

const SignupUsername = ({ usernameQuery, register, errors }) => {
  return (
    <FormControl isInvalid={errors.username}>
      <Input
        defaultValue={usernameQuery ? usernameQuery : undefined}
        placeholder="Username"
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
          validate: async (username) =>
            await fetch(`/api/usernames/${username}/availability`)
              .then((res) => res.json())
              .then((data) => {
                if (data.available === true) {
                  return true;
                }
                return `${username} is already taken`;
              })
        })}
      />
      {errors.username && (
        <FormErrorMessage>{errors.username.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SignupUsername;

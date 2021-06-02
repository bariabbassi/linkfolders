import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

const SignupUsername = ({ usernameQuery, register, errors }) => {
  return (
    <FormControl isInvalid={errors.username}>
      <Input
        type="text"
        defaultValue={usernameQuery ? usernameQuery : undefined}
        placeholder="Username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be at least 3 characters long'
          },
          maxLength: {
            value: 30,
            message: 'Username should be shorter that 30 characters'
          },
          pattern: {
            value: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
            message:
              'Username should contain only letters, numbers, periods, and underscores'
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

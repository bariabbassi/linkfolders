import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

const isAvailable = async (username) => {
  await fetch(`/api/usernames/${username}/availability`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.available === false) {
        return `${username} is already taken`;
      }
      return true;
    });
};

const SignupUsername = ({ usernameQuery, register, errors }) => {
  return (
    <FormControl isInvalid={errors.username}>
      <Input
        type="text"
        name="username"
        defaultValue={usernameQuery ? usernameQuery : undefined}
        placeholder="Username"
        ref={register({
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username is too short'
          },
          maxLength: {
            value: 30,
            message: 'Username is too long'
          },
          pattern: {
            value: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
            message:
              'You can only use letters, numbers, periods, and underscores'
          },
          validate: (input) => isAvailable(input)
        })}
      />
      {errors.username && (
        <FormErrorMessage>{errors.username.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SignupUsername;

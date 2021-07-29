import {
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  Input
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import SignupUsername from '@/components/Signup/SignupUsername';

const SignupWithEmail = ({ usernameQuery }) => {
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onTouched' });

  const onSubmit = (values) => {
    auth.signupWithEmail(
      values.email,
      values.password,
      values.username.toLowerCase()
    );
  };

  return (
    <Stack spacing={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <SignupUsername
        usernameQuery={usernameQuery}
        register={register}
        errors={errors}
      />
      <FormControl isInvalid={errors.email}>
        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long'
            }
          })}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="yellow" type="submit">
        Sign up with Email
      </Button>
    </Stack>
  );
};

export default SignupWithEmail;

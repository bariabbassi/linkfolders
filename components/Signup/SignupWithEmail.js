import {
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  Input
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import SignupUsername from '@/components/Signup/SignupUsername';

const SignupWithEmail = ({ usernameQuery }) => {
  const router = useRouter();
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm({ mode: 'onTouched' });

  const onSubmit = (values) => {
    console.log(vallues, errors);
    auth.loginWithEmail(values.email, values.password, values.username);
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
          name="email"
          placeholder="Email"
          ref={register({
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
          name="password"
          placeholder="Password"
          ref={register({
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters long'
            }
          })}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Sign up with Email</Button>
    </Stack>
  );
};

export default SignupWithEmail;

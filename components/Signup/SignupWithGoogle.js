import { Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import SignupUsername from '@/components/Signup/SignupUsername';

const SignupWithGoogle = ({ usernameQuery }) => {
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm({ mode: 'onTouched' });

  const onSubmit = (values) => {
    auth.signupWithGoogle(values.username.toLowerCase());
  };

  return (
    <Stack spacing={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <SignupUsername
        usernameQuery={usernameQuery}
        register={register}
        errors={errors}
      />
      <Button w="100%" type="submit">
        Sign up with Google
      </Button>
    </Stack>
  );
};

export default SignupWithGoogle;

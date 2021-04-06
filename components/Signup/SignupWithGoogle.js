import { Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import SignupUsername from '@/components/Signup/SignupUsername';

const SignupWithGoogle = ({ usernameQuery }) => {
  const router = useRouter();
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm({ mode: 'onBlur' });

  const onSubmit = (values) => {
    console.log(values, errors);
    auth.loginWithGoogle(values.username);
  };

  return (
    <Stack w="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
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

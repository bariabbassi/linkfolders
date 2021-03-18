import {
  Flex,
  Text,
  Icon,
  Link,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Heading,
  Image,
  Editable,
  EditableInput,
  EditablePreview
} from '@chakra-ui/react';
import useSWR from 'swr';

import AccountShell from '@/components/AccountShell';
import ProfileEditShell from '@/components/ProfileEditShell';
import TreeSkeleton from '@/components/TreeSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { ProfileProvider } from '@/components/ProfileContext';

const Edit = () => {
  const { user } = useAuth();
  const { data } = useSWR(() => `/api/profiles/${user.username}`, fetcher);

  if (!data) {
    return (
      <AccountShell>
        <TreeSkeleton />
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <ProfileProvider data={data}>
        <ProfileEditShell />
      </ProfileProvider>
    </AccountShell>
  );
};

export default Edit;

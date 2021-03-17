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
      <ProfileEditShell profile={data?.profile} />
    </AccountShell>
  );
};

export default Edit;

import useSWR from 'swr';

import UserShell from '@/components/UserShell';
import EditableTree from '@/components/editable-tree/EditableTree';
import TreeSkeleton from '@/components/TreeSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const EditProfile = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? `/api/profiles/${user.uid}` : null, fetcher);

  if (!data) {
    return (
      <UserShell>
        <TreeSkeleton />
      </UserShell>
    );
  }

  return (
    <UserShell>
      <EditableTree profile={data?.profile} />
    </UserShell>
  );
};

export default EditProfile;

import useSWR from 'swr';

import AccountShell from '@/components/AccountShell';
import EditableTree from '@/components/editable-tree/EditableTree';
import TreeSkeleton from '@/components/TreeSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const EditProfile = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? `/api/profiles/${user.uid}` : null, fetcher);

  if (!data) {
    return (
      <AccountShell>
        <TreeSkeleton />
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <EditableTree profile={data?.profile} />
    </AccountShell>
  );
};

export default EditProfile;

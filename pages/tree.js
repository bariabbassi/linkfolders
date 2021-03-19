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

import NewTree from '@/components/editable-tree/new-tree';

const DEFAULT_NODES = [
  {
    name: 'Tea',
    children: [
      {
        name: 'Black',
        children: [
          {
            name: 'Assam'
          },
          {
            name: 'Earl Grey'
          },
          {
            name: 'Lapsang Souchong'
          }
        ]
      },
      {
        name: 'Green',
        children: [
          {
            name: 'Japanese Sencha'
          },
          {
            name: 'Jasmine Pearls'
          }
        ]
      }
    ]
  },
  {
    name: 'Coffee',
    children: [
      {
        name: 'Espresso'
      },
      {
        name: 'Mochaccino'
      },
      {
        name: 'Flat White'
      },
      {
        name: 'Iced Latte',
        children: [
          {
            name: 'Vanilla'
          },
          {
            name: 'Gingerbread'
          }
        ]
      }
    ]
  },
  {
    name: 'Milk'
  }
];

const ETree = () => {
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
      <NewTree data={data?.profile?.children} />
    </AccountShell>
  );
};

export default ETree;

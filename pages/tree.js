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

import TreeX from '@/components/tree';

const DEFAULT_NODES = [
  {
    title: 'Tea',
    children: [
      {
        title: 'Black',
        children: [
          {
            title: 'Assam'
          },
          {
            title: 'Earl Grey'
          },
          {
            title: 'Lapsang Souchong'
          }
        ]
      },
      {
        title: 'Green',
        children: [
          {
            title: 'Japanese Sencha'
          },
          {
            title: 'Jasmine Pearls'
          }
        ]
      }
    ]
  },
  {
    title: 'Coffee',
    children: [
      {
        title: 'Espresso'
      },
      {
        title: 'Mochaccino'
      },
      {
        title: 'Flat White'
      },
      {
        title: 'Iced Latte',
        children: [
          {
            title: 'Vanilla'
          },
          {
            title: 'Gingerbread'
          }
        ]
      }
    ]
  },
  {
    title: 'Milk'
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
      <TreeX data={DEFAULT_NODES} />
    </AccountShell>
  );
};

export default ETree;

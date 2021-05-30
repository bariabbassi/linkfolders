import { mutate } from 'swr';

import { createItem, deleteItem } from '@/lib/db';

export function handleCreateItem(newItem) {
  const { id } = createItem(newItem);
  mutate(
    `/api/folders/${newItem.parent}/children`,
    async (data) => ({
      children: [...data.children, { id, ...newItem }]
    }),
    false
  );
}

export function handleCreateLink(folderId) {
  const newLink = {
    parent: folderId,
    type: 'link',
    name: '',
    url: 'https://'
  };
  handleCreateItem(newLink);
}

export function handleCreateFolder(folderId) {
  const newFolder = {
    parent: folderId,
    type: 'folder',
    name: ''
  };
  handleCreateItem(newFolder);
}

const updateLink = (name, url) => {
  const item = {
    type: 'link',
    name,
    url
  };
  const { id } = updateItem(id, item);
};

export function handleDeleteItem(itemId, folderId) {
  console.log('delete', itemId, folderId);
  deleteItem(itemId);
  mutate(
    `/api/folders/${folderId}/children`,
    async (data) => ({
      children: data.children.filter((item) => item.id !== itemId)
    }),
    false
  );
}

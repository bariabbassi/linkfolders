import { mutate } from 'swr';
import { createItem, updateItem, deleteItem, deleteFolder } from '@/lib/db';

export function handleCreateItem(newItem) {
  const { id } = createItem(newItem);
  mutate(
    `/api/folders/${newItem.parent}/children`,
    async (data) => ({
      children: [...data?.children, { id, ...newItem }]
    }),
    false
  );
  mutate(
    `/api/folders/${newItem.parent}`,
    async (data) => ({
      folder: { ...data?.folder, children: [...data?.folder?.children, id] }
    }),
    false
  );
}

const getUrlTitle = (url) => {
  const title = fetch(`https://cors.bridged.cc/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      origin: 'https://app.cors.bridged.cc'
    }
  })
    .then((response) => response.text())
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const titleHtml = doc.querySelectorAll('title')[0];
      const title = titleHtml.innerText;
      if (title) return title;
      return 'New link';
    });
  return title;
};

export async function handleCreateLink(url, folderId) {
  const title = await getUrlTitle(url);
  const newLink = {
    parent: folderId,
    type: 'link',
    name: title,
    url
  };
  handleCreateItem(newLink);
}

export function handleCreateFolder(folderId) {
  const newFolder = {
    parent: folderId,
    type: 'folder',
    name: 'New folder',
    children: []
  };
  handleCreateItem(newFolder);
}

export function handleUpdateItem(newItem) {
  mutate(
    `/api/folders/${newItem.parent}/children`,
    async (data) => ({
      children: [
        ...data?.children.filter((item) => item.id !== newItem.id),
        newItem
      ]
    }),
    false
  );
  updateItem(newItem.id, newItem);
}

export function handleDeleteItem(itemId, parentId) {
  mutate(
    `/api/folders/${parentId}/children`,
    async (data) => ({
      children: data?.children.filter((item) => item.id !== itemId)
    }),
    false
  );
  mutate(
    `/api/folders/${parentId}`,
    async (data) => ({
      folder: {
        ...data?.folder,
        children: [data?.folder?.children.filter((item) => item.id !== itemId)]
      }
    }),
    false
  );
  deleteItem(itemId, parentId);
}

export function handleDeleteFolder(itemId, parentId) {
  mutate(
    `/api/folders/${parentId}/children`,
    async (data) => ({
      children: data?.children.filter((item) => item.id !== itemId)
    }),
    false
  );
  mutate(
    `/api/folders/${parentId}`,
    async (data) => ({
      folder: {
        ...data?.folder,
        children: [data?.folder?.children.filter((item) => item.id !== itemId)]
      }
    }),
    false
  );
  deleteFolder(itemId, parentId);
}

import { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';

import {
  createItem,
  updateItem,
  deleteItem,
  deleteFolder,
  updateChildrenOrder
} from '@/lib/db';

const getUrlTitle = (url) => {
  const title = fetch(`https://cors.bridged.cc/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      origin: 'https://app.cors.bridged.cc'
    }
  })
    .then((response) => {
      if (response.ok) return response.text();
      throw new Error("Can't read url title");
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const titleHtml = doc.querySelectorAll('title')[0];
      if (titleHtml) return titleHtml.innerText;
      return null;
    })
    .catch(() => {
      return null;
    });
  return title;
};

export async function handleCreateLink(userId, folderId, url) {
  let newItem = {
    userId,
    parent: folderId,
    type: 'link',
    name: url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ''),
    url
  };
  const id = uuidv4();
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
      folder: {
        ...data?.folder,
        children: [...data?.folder?.children, id]
      }
    }),
    false
  );
  const title = await getUrlTitle(url);
  if (title) newItem.name = title;
  mutate(
    `/api/folders/${newItem.parent}/children`,
    async (data) => ({
      children: [
        ...data?.children.filter((item) => item.id !== id),
        { id, ...newItem }
      ]
    }),
    false
  );
  createItem(id, newItem);
}

export function handleCreateFolder(userId, folderId) {
  const newItem = {
    userId,
    parent: folderId,
    type: 'folder',
    name: 'New folder',
    children: []
  };
  const id = uuidv4();
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
      folder: {
        ...data?.folder,
        children: [...data?.folder?.children, id]
      }
    }),
    false
  );
  createItem(id, newItem);
}

export function handleAddFolderToProfile(userId) {
  const newItem = {
    userId,
    parent: userId,
    type: 'folder',
    name: 'New folder',
    children: []
  };
  const id = uuidv4();
  mutate(
    `/api/folders/${newItem.parent}/children`,
    async (data) => ({
      children: [...data?.children, { id, ...newItem }]
    }),
    false
  );
  // auth.updateProfile
  createItem(id, newItem);
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

export function handleUpdateChildrenOrder(result, folderId, childrenOrder) {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const newChildrenOrder = Array.from(childrenOrder);
  newChildrenOrder.splice(source.index, 1);
  newChildrenOrder.splice(destination.index, 0, draggableId);
  mutate(
    `/api/folders/${folderId}`,
    async (data) => ({
      folder: {
        ...data?.folder,
        children: [...newChildrenOrder]
      }
    }),
    false
  );
  updateChildrenOrder(folderId, newChildrenOrder);
}

export function handleDeleteLink(itemId, parentId) {
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
        children: [
          ...data?.folder?.children.filter((item) => item.id !== itemId)
        ]
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
        children: [
          ...data?.folder?.children.filter((item) => item.id !== itemId)
        ]
      }
    }),
    false
  );
  deleteFolder(itemId, parentId);
}

export function handleDeleteFolderFromProfile(itemId, parentId) {
  mutate(
    `/api/folders/${parentId}/children`,
    async (data) => ({
      children: data?.children.filter((item) => item.id !== itemId)
    }),
    false
  );
  deleteFolder(itemId, parentId);
}

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
    name: 'New folder'
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

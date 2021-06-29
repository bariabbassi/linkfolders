import { compareDesc, parseISO } from 'date-fns';

import { db } from './firebase-admin';

export async function getUser(id) {
  const doc = await db.collection('users').doc(id).get();
  const user = { id: doc.id, ...doc.data() };

  return { user };
}

export async function getUserUsername(id) {
  const doc = await db.collection('users').doc(id).get();
  const username = doc.data().username;

  return { username };
}

export async function getAllUsernames() {
  const snapshot = await db.collection('usernames').get();
  const usernames = [];

  snapshot.forEach((doc) => {
    usernames.push({ username: doc.id, ...doc.data() });
  });

  return { usernames };
}

export async function getUsername(usernameQuery) {
  const doc = await db.collection('usernames').doc(usernameQuery).get();
  const username = { username: doc.id, ...doc.data() };

  return username;
}

export async function getUsernameAvailability(username) {
  const doc = await db.collection('usernames').doc(username).get();
  return !doc.exists;
}

export async function getAllProfiles() {
  const snapshot = await db.collection('profiles').get();
  const profiles = [];

  snapshot.forEach((doc) => {
    profiles.push({ id: doc.id, ...doc.data() });
  });

  return { profiles };
}

export async function getProfile(id) {
  const doc = await db.collection('profiles').doc(id).get();
  const profile = { id: doc.id, ...doc.data() };

  return { profile };
}

export async function getItem(id) {
  const doc = await db.collection('items').doc(id).get();
  const item = { id: doc.id, ...doc.data() };

  return { item };
}

export async function getFolder(id) {
  const doc = await db.collection('items').doc(id).get();
  const item = { id: doc.id, ...doc.data() };

  if (item.type === 'folder') return { folder: item };
}

export async function getFolderChildren(folderId) {
  const snapshot = await db
    .collection('items')
    .where('parent', '==', folderId)
    .get();

  const children = [];

  snapshot.forEach((doc) => {
    children.push({ id: doc.id, ...doc.data() });
  });

  return { children };
}

export async function getAllFolders() {
  const snapshot = await db.collection('children').get();

  const children = [];

  snapshot.forEach((doc) => {
    children.push({ id: doc.id, ...doc.data() });
  });

  return { children };
}

export async function getUserFolders(uid) {
  const snapshot = await db
    .collection('children')
    .where('authorId', '==', uid)
    .get();

  const children = [];

  snapshot.forEach((doc) => {
    children.push({ id: doc.id, ...doc.data() });
  });

  children.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { children };
}

export async function getUserLinks() {
  const snapshot = await db
    .collection('items')
    .where('type', '==', 'link')
    .get();

  const links = [];

  snapshot.forEach((doc) => {
    links.push({ id: doc.id, ...doc.data() });
  });

  //   sites.sort((a, b) =>
  //   compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  // );

  return { links };
}

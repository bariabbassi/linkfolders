import { compareDesc, parseISO } from 'date-fns';

import { db } from './firebase-admin';

export async function getUser(id) {
  const doc = await db.collection('users').doc(id).get();
  const user = { id: doc.id, ...doc.data() };

  return { user };
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

export async function getFolder(folderId) {
  const doc = await db.collection('folders').doc(folderId).get();
  const folder = { id: doc.id, ...doc.data() };

  return { folder };
}

export async function getAllFolders() {
  const snapshot = await db.collection('folders').get();

  const folders = [];

  snapshot.forEach((doc) => {
    folders.push({ id: doc.id, ...doc.data() });
  });

  return { folders };
}

export async function getUserFolders(uid) {
  const snapshot = await db
    .collection('folders')
    .where('authorId', '==', uid)
    .get();

  const folders = [];

  snapshot.forEach((doc) => {
    folders.push({ id: doc.id, ...doc.data() });
  });

  folders.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { folders };
}

export async function getAllFeedbackForFolders(uid) {
  const { folders } = await getUserFolders(uid);

  if (!folders.length) {
    return { feedback: [] };
  }

  const folderIds = folders.map((folder) => folder.id);
  const snapshot = await db
    .collection('feedback')
    .where('folderId', 'in', folderIds)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}

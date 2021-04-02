import { compareDesc, parseISO } from 'date-fns';

import { db } from './firebase-admin';

// export async function getAllFeedback(folderId, route) {
//   try {
//     let ref = db
//       .collection('feedback')
//       .where('folderId', '==', folderId)
//       .where('status', '==', 'active');

//     if (route) {
//       ref = ref.where('route', '==', route);
//     }

//     const snapshot = await ref.get();
//     const feedback = [];

//     snapshot.forEach((doc) => {
//       feedback.push({ id: doc.id, ...doc.data() });
//     });

//     feedback.sort((a, b) =>
//       compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
//     );

//     return { feedback };
//   } catch (error) {
//     return { error };
//   }
// } TODO no feedback

export async function getUsername(usernameQuery) {
  const doc = await db.collection('usernames').doc(usernameQuery).get();
  const username = { username: doc.id, ...doc.data() };
  console.log(usernameQuery);
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
  console.log(profile);

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

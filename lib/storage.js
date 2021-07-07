import firebase from '@/lib/firebase';

const storage = firebase.storage();

export async function uploadProfilePhoto(photo) {
  const storageRef = storage.ref();
  const photoRef = storageRef.child(`profile-photos/${photo.name}`);
  await photoRef.put(photo);
  return await photoRef.getDownloadURL();
}

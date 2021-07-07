import firebase from '@/lib/firebase';

export async function uploadProfilePhoto(photo) {
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`profiles/${photo.name}`);
  await photoRef.put(photo);
  return await photoRef.getDownloadURL();
}

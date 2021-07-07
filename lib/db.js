import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, email, username, provider) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ email, username, provider }, { merge: true });
}

export function createUsername(uid, username) {
  return firestore.collection('usernames').doc(username).set({ uid });
}

export function createProfile(uid, name, photoUrl) {
  const profile = {
    name,
    photoUrl,
    children: []
  };
  return firestore.collection('profiles').doc(uid).set(profile);
}

export function updateProfile(id, data) {
  return firestore.collection('items').doc(id).update(data);
}

export function updateProfileAndUsername(id, data, oldUsername) {
  const batch = firestore.batch();

  const profileRef = firestore.collection('items').doc(id);
  batch.update(profileRef, data);

  const usernameRef = firestore.collection('usernames').doc(data.username);
  batch.set(
    usernameRef,
    {
      uid: id
    },
    { merge: true }
  );

  const oldUsernameRef = firestore.collection('usernames').doc(oldUsername);
  batch.delete(oldUsernameRef);

  return batch.commit();
}

export async function createItem(id, data) {
  const batch = firestore.batch();

  const itemRef = firestore.collection('items').doc(id);
  batch.set(itemRef, data);

  if (data.parent) {
    const parentRef = firestore.collection('items').doc(data.parent);
    batch.update(parentRef, {
      children: firebase.firestore.FieldValue.arrayUnion(id)
    });
  }

  return batch.commit();
}

export function updateItem(id, data) {
  return firestore.collection('items').doc(id).update(data);
}

export function updateChildrenOrder(id, data) {
  return firestore.collection('items').doc(id).update({
    children: data
  });
}

export async function deleteItem(itemId, parentId) {
  const batch = firestore.batch();

  const itemRef = firestore.collection('items').doc(itemId);
  batch.delete(itemRef);

  const parentRef = firestore.collection('items').doc(parentId);
  batch.update(parentRef, {
    children: firebase.firestore.FieldValue.arrayRemove(itemId)
  });

  return batch.commit();
}

export async function deleteFolder(folderId, parentId) {
  const snapshot = await firestore
    .collection('items')
    .where('parent', '==', folderId)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  const itemRef = firestore.collection('items').doc(folderId);
  batch.delete(itemRef);

  const parentRef = firestore.collection('items').doc(parentId);
  batch.update(parentRef, {
    children: firebase.firestore.FieldValue.arrayRemove(folderId)
  });

  return batch.commit();
}

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: process.env.NEXT_PUBLIC_PRICE_ID,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();

    if (sessionId) {
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function goToBillingPortal() {
  const functionRef = app
    .functions('europe-west1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/settings/plan`
  });

  window.location.assign(data.url);
}

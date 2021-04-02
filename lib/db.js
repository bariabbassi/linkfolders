import firebase from './firebase';
// import getStripe from './stripe'; TODO

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createUsername(uid, username) {
  return firestore.collection('usernames').doc(username);
}

export function createProfile(uid, name, username, photoUrl) {
  const defaultProfile = {
    name,
    username,
    photoUrl,
    children: []
  };
  return firestore.collection('profiles').doc(uid).set(defaultProfile);
}

export function updateProfile(id, profile) {
  return firestore.collection('profiles').doc(id).update(profile);
}

export function createFolder(data) {
  const folder = firestore.collection('folders').doc();
  folder.set(data);

  return folder;
}

export async function deleteFolder(id) {
  firestore.collection('folders').doc(id).delete();
  const snapshot = await firestore
    .collection('feedback')
    .where('folderId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateFolder(id, newValues) {
  return firestore.collection('folders').doc(id).update(newValues);
}

// export function createFeedback(data) {
//   return firestore.collection('feedback').add(data);
// }

// export function deleteFeedback(id) {
//   return firestore.collection('feedback').doc(id).delete();
// }

// export function updateFeedback(id, newValues) {
//   return firestore.collection('feedback').doc(id).update(newValues);
// } TODO no feedback

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
    .functions('us-central1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`
  });

  window.location.assign(data.url);
}

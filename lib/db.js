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

export function updateProfile(id, profile) {
  return firestore.collection('profiles').doc(id).update(profile);
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
    returnUrl: `${window.location.origin}/account/plan`
  });

  window.location.assign(data.url);
}

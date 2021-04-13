import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import firebase from './firebase';
import { createUser, createUsername, createProfile } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      cookie.set('linkfolders-auth', true);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setUsername(false);
      setProfile(false);
      cookie.remove('linkfolders-auth');
      setLoading(false);
      return false;
    }
  };

  const signupWithGoogle = (username) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user).then((user) => {
          setUsername(username.toLowerCase());
          setProfile({
            uid: user.uid,
            name: user.name,
            photoUrl: photoUrl,
            children: []
          });
          createUser(user.uid, user.email, username, user.provider);
          createUsername(user.uid, username);
          createProfile(user.uid, user.name, user.photoUrl);
        });
        Router.push('/plan');
      });
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user).then((user) => {
          const { token, ...userWithoutToken } = user;
          createUser(user.uid, userWithoutToken);
        });
        Router.push('/profile');
      });
  };

  const signupWithEmail = (email, password, username) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        formatUser({ username, ...response.user }).then((user) => {
          setUser({
            uid: user.uid,
            token: user.token,
            email: user.email,
            username: user.username
          });
          setUsername(user.username);
          setProfile({
            uid: user.uid,
            name: user.username,
            photoUrl: '',
            children: []
          });
          cookie.set('linkfolders-auth', true);
          setLoading(false);
          createUser(user.uid, user.email, user.username, user.provider);
          createUsername(user.uid, user.username);
          createProfile(user.uid, user.username, '');
        });
        Router.push('/plan');
      });
  };

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        formatUser(response.user).then((user) => {
          const userData = fetch(`/api/users/${user.uid}`).then(
            (res) => res.json().user
          );
          const profileData = fetch(`/api/profiles/${user.uid}`).then(
            (res) => res.json().profile
          );
          setUser({ token: user.token, ...userData });
          setUsername(userData.username);
          setProfile(profileData);
          cookie.set('linkfolders-auth', true);
          setLoading(false);
        });
        Router.push('/profile');
      });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return firebase.auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    setLoading(true);
    return user.updateEmail(email);
  };

  const updatePassword = (password) => {
    setLoading(true);
    return user.updatePassword(password);
  };

  const logout = () => {
    setLoading(true);

    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        Router.push('/');
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    username,
    profile,
    loading,
    signupWithGoogle,
    loginWithGoogle,
    signupWithEmail,
    loginWithEmail,
    resetPassword,
    updateEmail,
    updatePassword,
    logout
  };
}

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole || 'free';
};

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL

    // stripeRole: await getStripeRole() TODO
  };
};

const formatResponse = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    username: user.username?.toLowerCase()

    // stripeRole: await getStripeRole() TODO
  };
};

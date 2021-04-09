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
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      cookie.set('linkfolders-auth', true);
      setLoading(false);
      return user;
    } else {
      setUser(false);
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
        handleUser({ username: username.toLowerCase(), ...response.user }).then(
          (user) => {
            createUser(user.uid, user.email, user.username, user.provider);
            createUsername(user.uid, user.username);
            createProfile(user.uid, user.name, user.photoUrl);
          }
        );
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
        var userTest = {
          ...{ username: username.toLowerCase() },
          ...response.user
        };
        console.log(userTest);
        const userX = formatUser(userTest);
        console.log(user);
        setUser(userX);
        console.log(user);
        cookie.set('linkfolders-auth', true);
        setLoading(false);
        createUser(userX.uid, userX.email, userX.username, userX.provider);
        createUsername(userX.uid, userX.username);
        createProfile(userX.uid, userX.username, '');

        Router.push('/plan');
      });
  };

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
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

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    username: user.username

    // stripeRole: await getStripeRole() TODO
  };
};

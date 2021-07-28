import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import firebase from './firebase';
import { createUser } from './db';

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

  const signupWithEmail = (email, password, username) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        createUser(response.user.uid, {
          provider: response.user.providerData[0].providerId,
          email: response.user.email,
          username: username,
          name: `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
          photoUrl: null
        });
        handleUser({ username, ...response.user }).then(() =>
          Router.push(`/${username}`)
        );
      });
  };

  const signupWithGoogle = (username) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        createUser(response.user.uid, {
          provider: response.user.providerData[0].providerId,
          email: response.user.email,
          username: username,
          name: response.user.displayName,
          photoUrl: response.user.photoURL
        });
        handleUser({ username, ...response.user }).then(() =>
          Router.push(`/${username}`)
        );
      });
  };

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user).then((user) => {
          Router.push(`/${user.profile.username}`);
        });
      });
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user).then((user) => {
          Router.push(`/${user.profile.username}`);
        });
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

  const updateProfileHeader = (newProfileHeader) => {
    setUser((user) => {
      user.profile.photoUrl = newProfileHeader.photoUrl;
      user.profile.name = newProfileHeader.name;
      user.profile.username = newProfileHeader.username;
      return user;
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signupWithEmail,
    signupWithGoogle,
    loginWithEmail,
    loginWithGoogle,
    resetPassword,
    updateEmail,
    updatePassword,
    logout,
    updateProfileHeader
  };
}

const getUsername = async (uid) => {
  const username = await fetch(`/api/users/${uid}/username`).then((res) => {
    if (res.ok) {
      return res.json().then((res) => res.username);
    } else {
      return null;
    }
  });
  return username;
};

const getProfile = async (uid) => {
  const profile = await fetch(`/api/profiles/${uid}`).then((res) => {
    if (res.ok) {
      return res.json().then((res) => res.profile);
    } else {
      return null;
    }
  });
  return profile;
};

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
    photoUrl: user.photoURL,
    username: user.username ? user.username : await getUsername(user.uid),
    profile: user.profile ? user.profile : await getProfile(user.uid)
    //stripeRole: await getStripeRole()
  };
};

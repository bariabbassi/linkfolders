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
      const user = await formatUser(rawUser);
      setUser(user);
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

  const signupWithEmail = (email, password, useprofilername) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user).then((user) => {
          setProfile({
            username: username.toLowerCase(),
            uid: user.uid,
            name: user.name,
            photoUrl: '',
            children: []
          });
          createUser(user.uid, user.email, username, user.provider);
          createUsername(user.uid, username);
          createProfile(user.uid, username, '');
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

const getUsername = async (uid) => {
  // try {
  //   const username = await fetch(`/api/users/${uid}`).then(
  //     (res) => strres.json().user.username
  //   );
  //   return username;
  // } catch {
  //   return 'hhhhhh';
  // }
  const user = await fetch(`/api/users/${uid}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return 'nothing';
    }
  });
  // console.log(user, JSON.stringify(user.username));
  return user;
};

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole || 'free';
};

const formatUser = async (user) => {
  const username = await getUsername(user.uid);
  console.log(username);
  // const username = user.username ? user.username : getUsername(user.uid);

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    username: username,
    stripeRole: await getStripeRole()
  };
};

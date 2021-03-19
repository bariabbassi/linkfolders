import { useState, useContext, createContext } from 'react';

const createLink = (child, id, nextId, name, url) => {
  if (child.id === id) {
    if (child.children) {
      child.children.push({
        id: nextId,
        name: name,
        url: url
      });
    } else {
      child.children = [
        {
          id: nextId,
          name: name,
          url: url
        }
      ];
    }
    return child;
  } else if (child.children != null) {
    let i;
    let result = null;
    for (i = 0; result === null && i < child.children.length; i++) {
      result = searchTree(child.children[i], id);
    }
    return result;
  }
  return null;
};

const ProfileContext = createContext();
const ProfileUpdateContext = createContext();

export const useProfile = () => useContext(ProfileContext);
// export const useProfile = (id) => {
//   const profile = useContext(ProfileContext);
//   if (id === 0) {
//     return profile.children;
//   } else if (){

//   }
// };

export const useProfileUpdate = () => useContext(ProfileUpdateContext);

export const ProfileProvider = ({ data, children }) => {
  const [profile, setProfile] = useState(data?.profile);

  const updateLink = (id, name, url) => {
    if (id == !0) {
      return;
    } else if (child.children != null) {
      console.log('updateLink');
    }
  };

  const onCreateLink = (id, name, url) => {
    setProfile((profile) => {
      createLink(profile, id, profile.nextId, name, url);
    });
  };

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileUpdateContext.Provider value={onCreateLink}>
        {children}
      </ProfileUpdateContext.Provider>
    </ProfileContext.Provider>
  );
};

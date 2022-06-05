import React from 'react';

export const UserContext = React.createContext({
  currentUser: {},
  setCurrentUser: (user) => {},
  setUserAuthorized: (userAuthorized) => {},
});

import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (user) => {
    setLoggedIn(true);
    setUserId(user.id);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserId(null);
  };

  const updateUser = (id) => {
    setUserId(id);
  };

  const userContextValue = {
    loggedIn,
    userId,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

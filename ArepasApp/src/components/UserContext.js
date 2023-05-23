import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedUserId = localStorage.getItem('userId');

    if (storedLoggedIn && storedUserId) {
      setLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (user) => {
    setLoggedIn(true);
    setUserId(user.id);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', user.id);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
  };

  const updateUser = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
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

import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';

export const Home = () => {
  const { userId } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to the Home page</h1>
      {userId && <p>Logged in user ID: {userId}</p>}
    </div>
  );
};

/**
 * Context Provider for the current user.
 */

import React, {useState, useEffect} from 'react';
import { auth } from '../firebase/firebaseIndex';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsub();
  });

  return (
    <firebaseAuth.Provider
      value={{
        user
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  )
}

export default AuthProvider;
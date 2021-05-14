import React, {useState, useEffect} from 'react';
import {authMethods} from '../firebase/authMethods';
import { auth } from '../firebase/firebaseIndex';

import { useGetCollection } from '../hooks/useGetData';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
      console.log(user);
    });

    return () => unsub();
  });

  const handleSignup = () => {
    console.log('Signing up...', inputs.email, inputs.password);
    return authMethods.signup(inputs.email, inputs.password, setErrors);
  }
  
  const handleSignin = () => {
    console.log("Signing in...");
    return authMethods.signin(inputs.email, inputs.password, setErrors);;
  }
  
  const handleSignout = () => {
    console.log("Signing out...");
    return authMethods.signout();
  }

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        handleSignout,
        inputs,
        setInputs,
        errors,
        setErrors,
        user
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  )
}

export default AuthProvider;
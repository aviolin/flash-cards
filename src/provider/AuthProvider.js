import React, {useState, useEffect} from 'react';
import {authMethods} from '../firebase/authMethods';
import { auth } from '../firebase/firebaseIndex';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '', newEmail: '', newPassword: '' });
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
      //console.log(user);
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

  const handleChangeEmail = () => {
    console.log("Changing email...");
    return authMethods.changeEmail(inputs.newEmail, setErrors);
  }

  const handleChangePassword = () => {
    console.log("Changing password...");
    return authMethods.changePassword(inputs.newPassword, setErrors);
  }

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        handleSignout,
        handleChangeEmail,
        handleChangePassword,
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
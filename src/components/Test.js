import React, { useState, useContext, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import Signup from './Signup';
import Login from './Login';
import { useGetCollection, useGetOwnedDecks, useGetUserData } from '../hooks/useGetData';
import useCheckLoggedIn from '../hooks/useCheckLoggedIn';
import { dbMethods } from '../firebase/dbMethods';

const Test = (props) => {
  const { user } = useContext(firebaseAuth);

  const { userData, userDataLoading, userDataError } = useGetUserData(user);

  return (
    <>
      {userDataLoading ? "LOADING!!!!!!" : ""}
      <Switch>
        
        {/* <Route exact path='/' component={Signup} />
        <Route exact path='/login' component={Login} /> */}
      </Switch>
    </>
  )
}

export default Test;
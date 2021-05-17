import React, { useState, useContext, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import Signup from './Signup';
import Login from './Login';
import { useGetCollection, useGetUserData } from '../hooks/useGetData';
import useCheckLoggedIn from '../hooks/useCheckLoggedIn';
import { dbMethods } from '../firebase/dbMethods';
import useOnSnapshot from '../hooks/useOnSnapshot';

const Test = (props) => {
  const { user } = useContext(firebaseAuth);
  const { data: userData, loading, error } = useGetUserData(user);
  const { moreData } = useOnSnapshot();
  console.log("More: ", moreData);

  return (
    <>
      {!userData ? "LOADING!!!!!!" : userData.decks[0]}
      <Switch>
        
        {/* <Route exact path='/' component={Signup} />
        <Route exact path='/login' component={Login} /> */}
      </Switch>
    </>
  )
}

export default Test;
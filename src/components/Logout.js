import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import { authMethods } from '../firebase/authMethods';
import Spinner from './Spinner';

const Logout = () => {
  const { user } = useContext(firebaseAuth);
  const history = useHistory();

  useEffect(() => {
    if (!user) return;

    authMethods.signout();
    setTimeout(() => history.push("/"), 1000);

  }, [user])

  return (
    <div className="container center">
      <p><Spinner /> Logging out . . .</p>
    </div>
  )
}

export default Logout;
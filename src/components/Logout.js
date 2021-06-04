import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';
import Spinner from './Spinner';

import useAuth from '../hooks/useAuth';

const Logout = () => {
  const { user } = useContext(firebaseAuth);
  const { handleLogout } = useAuth()
  const history = useHistory();

  useEffect(() => {
    if (!user) return;
    handleLogout();
    setTimeout(() => history.push("/"), 1000);

  }, [user])

  return (
    <div className="container center">
      <p><Spinner /> Logging out . . .</p>
    </div>
  )
}

export default Logout;
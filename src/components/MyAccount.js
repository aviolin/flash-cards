import React, { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const { user } = useContext(firebaseAuth);

  if (!user) {
    return (
      <div className="dashboard">
        <p>You are not logged in. To view your dashboard, log in or sign up here:</p>
        <Link to="/">Home</Link>
      </div>
    )
  }

  console.log(user);

  return (
    <div className="landing">
      <h1>Your Account</h1>
      <p>Your email: {user.email}</p>
      <button className="btn-secondary">Change Email</button>
      <button className="btn-secondary">Change Password</button>
      <button className="btn-secondary">Delete Account</button>
      <button className="btn-secondary">Log Out</button>
    </div>

  )
}

export default MyAccount;
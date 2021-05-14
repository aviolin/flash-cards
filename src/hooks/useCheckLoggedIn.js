import { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';

const useCheckLoggedIn = () => {
  const { user } = useContext(firebaseAuth);

  console.log("Checking if logged in...");

  if (user) {
    return user.uid;
  }

  return false;
}

export default useCheckLoggedIn;
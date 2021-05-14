import { auth, db } from './firebaseIndex';

export const authMethods = {
  signup: (email, password, setErrors) => {
    console.log(email);
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        db.collection('users').doc(user.uid).set({
          decks: []
        });

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setErrors(prev => ([...prev, error.message]))
        // ..
      });
  },
  signin: (email, password, setErrors) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Logged in: ", user)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrors(prev => ([...prev, error.message]))
      });
  },
  signout: (setErrors) => {
    auth.signOut()
      .then(res => {
        console.log("Logged out");
      })
      .catch(err => {
        setErrors(prev => ([...prev, err.message]));
      })
  }
}
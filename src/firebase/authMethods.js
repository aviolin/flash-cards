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

        setErrors(null);
      })
      .catch((error) => {
        setErrors(error.code)
        // ..
      });
  },
  signin: (email, password, setErrors) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Logged in: ", user)
        setErrors(null);
      })
      .catch((error) => {
        setErrors(error.code);
      });
  },
  signout: (setErrors) => {
    auth.signOut()
      .then(console.log("Logged out"))
      .catch(error => {
        setErrors(error.code);
      })
  }
}
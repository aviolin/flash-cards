import { auth, db } from './firebaseIndex';

export const authMethods = {
  signup: (email, password, setErrors) => {
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
  },
  changeEmail: (email, setErrors) => {
    auth.currentUser.updateEmail(email).then(function() {
      console.log("Successfully updated email.");
    }).catch((error) => {
      setErrors(error.code);
      console.log("An error occurred updating the email: ", error.message);
    });
  },
  changePassword: (password, setErrors) => {
    auth.currentUser.updatePassword(password).then(function() {
      console.log("Successfully updated password.");
    }).catch((error) => {
      setErrors(error.code);
      console.log("An error occurred updating the password: ", error.message);
    });
  },
  reauthenticate: (password, setErrors) => {
    const credential = auth.EmailAuthProvider.credential(
        auth.currentUser.email, 
        password
    );
    auth.currentUser.reauthenticateWithCredential(credential).then(function() {
      console.log("User successfully reauthenticated.");
    }).catch((error) => {
      setErrors(error.code);
      console.log("An error occurred reauthenticating the user: ", error.message);
    });
  },
  deleteUser: (setErrors) => {
    auth.currentUser.delete().then(() => {
      console.log("User successfully deleted.");
    }).catch((error) => {
      setErrors(error.code);
      console.log("An error occurred deleting the user: ", error.message);
    })
  }
}
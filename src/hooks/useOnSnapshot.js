import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

const useOnSnapshot = (collection = 'users', document = false, dep = []) => {
  const db = firebase.firestore();
  const [data, setData] = useState([])

  useEffect(() => {
    let ref = db.collection(collection);
    if (document) {
      ref = db.collection(collection).doc(document);
    }

    let unsubscribe = ref.onSnapshot((snapshot) => {
      let arr = [];
      if (document) {
        arr = snapshot.data();
      } else {
        snapshot.forEach(doc => {
          arr.push(doc.data());
        });
      }
      setData(arr);
      console.log("Data updated: ", arr);
    });

    return () => unsubscribe();
  }, dep);

  return { data };
}

export default useOnSnapshot;
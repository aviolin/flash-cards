import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { dbMethods } from '../firebase/dbMethods';

export const useGetCollection = (collection="users") => {
  const [collectionDocs, setCollectionDocs] = useState([]);
  const db = firebase.firestore();

  console.log('Getting data for: ', collection);

  useEffect(() => {
    db.collection(collection).get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }));
        setCollectionDocs(arr[0]);
      });
  }, [db]);

  return [collectionDocs];
}

export const useGetUserData = (user) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    dbMethods.getUserData(user.uid)
    .then(users => {
      setData(users.data());
      console.log(users.data());
    })
    .catch(err => {
      console.error("Error getting user data: ", err.message);
      setError(err);
    })
    .finally(() => setLoading(false));
  }, [user])

  return { data, loading, error };
}
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyLf0KsgE7pOU7qlkS7i6WSI0o8R5hCdw",
    authDomain: "crwn-db-8f4e5.firebaseapp.com",
    projectId: "crwn-db-8f4e5",
    storageBucket: "crwn-db-8f4e5.appspot.com",
    messagingSenderId: "834506368140",
    appId: "1:834506368140:web:078a7ccae5a01f6d9807a9",
    measurementId: "G-CQPVY0HG7F"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
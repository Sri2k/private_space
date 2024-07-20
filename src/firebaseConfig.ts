import { initializeApp } from 'firebase/app';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9uuRVZfC5YwPgRSq_9YDBtYtwGMZC-G8",
    authDomain: "sri2k.github.io",
    projectId: "private-space-6fd4f",
    storageBucket: "private-space-6fd4f.appspot.com",
    messagingSenderId: "499338546858",
    appId: "1:499338546858:web:5beec7b7ae7574d4824ad3",
    measurementId: "G-YGYRNX3FEE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

enableIndexedDbPersistence(firestore).catch((err) =>
{
    if (err.code === 'failed-precondition')
    {
        console.error('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented')
    {
        console.error('The current browser does not support all of the features required to enable persistence.');
    }
});

export { auth, firestore };

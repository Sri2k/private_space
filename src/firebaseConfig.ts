import { initializeApp } from 'firebase/app';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
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

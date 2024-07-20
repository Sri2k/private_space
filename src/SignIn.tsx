import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './SignIn.css';


const SignIn = () =>
{
    const signInWithGoogle = () =>
    {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) =>
        {
            console.error('Error signing in with Google: ', error);
        });
    };

    return <button onClick={signInWithGoogle}>Sign In with Google</button>;
};

export default SignIn;

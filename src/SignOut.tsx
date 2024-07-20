import React from 'react';
import { auth } from './firebaseConfig';
import './SignOut.css';


const SignOut = () =>
{
    const handleSignOut = async () =>
    {
        try
        {
            await auth.signOut();
        } catch (error)
        {
            console.error('Error signing out: ', error);
        }
    };

    return auth.currentUser ? <button onClick={handleSignOut}>Sign Out</button> : null;
};

export default SignOut;

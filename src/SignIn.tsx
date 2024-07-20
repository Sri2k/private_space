import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Button, Box } from '@mui/material';

const SignIn: React.FC = () =>
{
    const signInWithGoogle = () =>
    {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) =>
        {
            console.error('Error signing in with Google: ', error);
        });
    };

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Button
                variant="contained"
                color="primary"
                onClick={signInWithGoogle}
            >
                Sign In with Google
            </Button>
        </Box>
    );
};

export default SignIn;

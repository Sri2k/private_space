import React from 'react';
import { auth } from './firebaseConfig';
import { Button, Box } from '@mui/material';

const SignOut: React.FC = () =>
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

    return auth.currentUser ? (
        <Box display="flex" justifyContent="center" mt={2}>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleSignOut}
            >
                Sign Out
            </Button>
        </Box>
    ) : null;
};

export default SignOut;

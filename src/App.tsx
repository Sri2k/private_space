import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const App: React.FC = () =>
{
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" mt={4}><Typography color="error">Authentication Error: {error.message}</Typography></Box>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
        <Typography variant="h4">Private Space</Typography>
        {user && <SignOut />}
      </Box>
      <Box mt={2}>
        {user ? <ChatRoom /> : <SignIn />}
      </Box>
    </Container>
  );
};

export default App;

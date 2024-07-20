import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';
import { auth } from './firebaseConfig';
import './App.css';
import SignOut from './SignOut';

const App = () =>
{
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Authenticating...</div>;
  if (error) return <div>Authentication Error: {error.message}</div>;

  return (
    <div className="App">
      <header>
        <h1>Private Space</h1>
        {user && <SignOut />}
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

export default App;

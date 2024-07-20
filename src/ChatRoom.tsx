import React, { useState, useEffect, useRef } from 'react';
import { collection, orderBy, query, limit, addDoc, serverTimestamp, startAfter, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from './firebaseConfig';
import ChatMessage from './ChatMessage';
import { Button, TextField, CircularProgress, Container, Box } from '@mui/material';

interface Message
{
    id?: string;
    text: string;
    uid: string;
    photoURL: string;
    createdAt: any;
}

const ChatRoom: React.FC = () =>
{
    const messageRef = collection(firestore, 'messages');
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const q = query(messageRef, orderBy('createdAt'), limit(25));

    const [initialMessages, loading, error] = useCollectionData(q);
    const [formValue, setFormValue] = useState('');

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const fetchMoreMessages = async () =>
    {
        if (!lastVisible) return;
        setLoadingMore(true);
        const nextQuery = query(messageRef, orderBy('createdAt'), startAfter(lastVisible), limit(25));
        const snapshot = await getDocs(nextQuery);
        const moreMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(prevMessages => [...prevMessages, ...moreMessages]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setLoadingMore(false);
    };

    useEffect(() =>
    {
        if (initialMessages)
        {
            setMessages(initialMessages as Message[]);
            setLastVisible(initialMessages[initialMessages.length - 1]?.createdAt);
        }
    }, [initialMessages]);

    const sendMessage = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        const uid = auth.currentUser?.uid;
        const photoURL = auth.currentUser?.photoURL;

        if (!formValue.trim()) return;

        await addDoc(messageRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
        });

        setFormValue('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormValue(e.target.value);
    };

    useEffect(() =>
    {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (loading) return <CircularProgress />;
    if (error) return <div>Error loading messages: {error.message}</div>;

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                height="80vh"
                justifyContent="space-between"
                mt={2}
            >
                <Box
                    flexGrow={1}
                    overflow="auto"
                    p={2}
                    bgcolor="background.paper"
                    borderRadius={1}
                    border={1}
                    borderColor="divider"
                >
                    {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                    {loadingMore && <CircularProgress />}
                    <div ref={endOfMessagesRef} />
                </Box>
                <Box mt={2}>
                    <Button
                        variant="outlined"
                        onClick={fetchMoreMessages}
                        disabled={loadingMore}
                        fullWidth
                    >
                        Load More
                    </Button>
                </Box>
                <form onSubmit={sendMessage}>
                    <Box display="flex" mt={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message..."
                            value={formValue}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1 }}
                        >
                            Send
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ChatRoom;

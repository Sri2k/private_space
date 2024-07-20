import React, { useState, useEffect, useRef } from 'react';
import { collection, orderBy, query, limit, addDoc, serverTimestamp, startAfter, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from './firebaseConfig';
import ChatMessage from './ChatMessage';
import './ChatRoom.css';

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

    // Function to fetch more messages when the user scrolls
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

    // Function to send a new message to Firestore
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

    if (loading) return <div>Loading messages...</div>;
    if (error) return <div>Error loading messages: {error.message}</div>;

    return (
        <>
            <main>
                {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                {loadingMore && <div>Loading more...</div>}
                <div ref={endOfMessagesRef} />
            </main>
            <button onClick={fetchMoreMessages} disabled={loadingMore}>Load More</button>
            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </>
    );
};

export default ChatRoom;

import React from 'react';
import { auth } from './firebaseConfig';
import './ChatMessage.css';

interface ChatMessageProps
{
    message: {
        id?: string;
        text: string;
        uid: string;
        photoURL: string;
        createdAt: any;
    };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) =>
{
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="User avatar" />
            <p>{text}</p>
        </div>
    );
};

export default ChatMessage;

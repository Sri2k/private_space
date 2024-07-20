import React from 'react';
import { auth } from './firebaseConfig';
import { Box, Avatar, Typography } from '@mui/material';

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
        <Box
            display="flex"
            alignItems="center"
            justifyContent={messageClass === 'sent' ? 'flex-end' : 'flex-start'}
            my={1}
        >
            {messageClass === 'received' && (
                <Avatar src={photoURL} alt="User avatar" sx={{ mr: 1 }} />
            )}
            <Box
                bgcolor={messageClass === 'sent' ? 'primary.main' : 'grey.300'}
                color={messageClass === 'sent' ? 'primary.contrastText' : 'text.primary'}
                px={2}
                py={1}
                borderRadius={1}
            >
                <Typography variant="body1">{text}</Typography>
            </Box>
            {messageClass === 'sent' && (
                <Avatar src={photoURL} alt="User avatar" sx={{ ml: 1 }} />
            )}
        </Box>
    );
};

export default ChatMessage;

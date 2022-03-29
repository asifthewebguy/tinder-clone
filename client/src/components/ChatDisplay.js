import axios from 'axios';
import { useEffect, useState } from 'react';
import Chat from './Chat';
import ChatInput from './ChatInput';

const ChatDisplay = ({user, clickedUser}) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const [userMessages, setUserMessages] = useState(null);

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages',{
                params: {
                    userId: userId,
                    correspondingUserId: clickedUserId
                }
            })
            setUserMessages(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getUsersMessages();
    } , [userMessages]);

    return (
        <>
            <Chat/>
            <ChatInput/>
        </>
    );
}
export default ChatDisplay;

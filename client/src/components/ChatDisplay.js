import axios from 'axios';
import { useEffect, useState } from 'react';
import Chat from './Chat';
import ChatInput from './ChatInput';

const ChatDisplay = ({ user, clickedUser }) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const [userMessages, setUserMessages] = useState(null);
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
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
    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {
                    userId: clickedUserId,
                    correspondingUserId: userId
                }
            })
            setClickedUsersMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsersMessages();
        getClickedUsersMessages();
    }, [userMessages, clickedUsersMessages]);

    const messages = [];
    userMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['class'] = 'self';
        formattedMessage['name'] = user?.first_name;
        formattedMessage['img'] = user?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    });

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['class'] = 'other';
        formattedMessage['name'] = clickedUser?.first_name;
        formattedMessage['img'] = clickedUser?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    });

    const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages}/>
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUsersMessages={getUsersMessages}
                getClickedUserMessages={getClickedUsersMessages}

            />
        </>
    );
}
export default ChatDisplay;

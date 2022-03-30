import {useState} from 'react';
import axios from 'axios';
const ChatInput = ({user, clickedUser, getUsersMessages, getClickedUserMessages}) => {
    const [textArea, setTextArea] = useState(null);
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const sendMessage = async () => {
        const message = {
            timestamp: new Date.toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        };

        try {
            await axios.post('http://localhost:8000/messages', message);
            getUsersMessages();
            getClickedUserMessages();
            setTextArea('');
        } catch (err){
            console.log(err);
        }
    }

    return (
        <div className="chat-input">
           <textarea
                name=""
                id=""
                value={textArea === null ? '' : textArea}
                onChange={(e)=>{setTextArea(e.target.value)}}>
            </textarea>
           <button className="secondary-button" onClick={sendMessage}>Submit</button>
        </div>
    );
}
export default ChatInput;

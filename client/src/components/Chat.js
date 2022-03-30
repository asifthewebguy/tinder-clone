const Chat = ({descendingOrderMessages}) => {
    return (
        <div>
            <div className="chat-display">
                {descendingOrderMessages?.map((message, _index) => (
                    <div key={message._index}>
                        <div className="chat-message-header">
                            <div className="img-container">
                                <img src={message.img} alt={message.first_name + ' profile'} />
                            </div>
                            <p className="message-name">{message.name}</p>
                        </div>
                        <p className="message-text">{message.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Chat;

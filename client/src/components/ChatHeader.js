import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({user}) => {
    const [cookies, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const logout = () => {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        navigate("/");
    }
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt="{user.first_name + 'profile'}" />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>«&nbsp;Logout</i>
        </div>
    )
}
export default ChatHeader;

import TinderCard from "react-tinder-card";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [lastDirection, setLastDirection] = useState(null);
    const userId = cookies.UserId;

    const tempGetUser = useRef(null);
    const tempGetGenderedUsers = useRef(null);

    const getUser = async () => {
        // console.log(userId);
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (err){
            console.log(err);
        }
    };

    const getGenderedUsers = async () => {
        try{
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (err){
            console.log(err);
        }
    };

    tempGetUser.current = getUser;
    tempGetGenderedUsers.current = getGenderedUsers;

    useEffect(
        () => {
            tempGetUser.current();
            tempGetGenderedUsers.current();
    } , [user, genderedUsers]);

    console.log(user);
    console.log(genderedUsers);
    const updateMatches = async (matchedUserId) => {
        try{
            console.log(userId, matchedUserId);
            await axios.put('http://localhost:8000/addmatch', {
              userId, matchedUserId
            });
            getUser();
        } catch(err) {
            console.log(err);
        }
    };

    const swiped = (direction, swippedUserId) => {
        if (direction === "right") {
            updateMatches(swippedUserId);
        }
        setLastDirection(direction);

    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen");
    };

    const matchedUserIds = user?.matches?.map(({ user_id}) => user_id).concat(userId);

    const filteredGenderedUsers = genderedUsers?.filter(
        genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )

    return (
        <div>
            {user?.gender_interest && <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swipe-container">
                <div className="cardContainer">
                {filteredGenderedUsers.map((character) => (
                    <TinderCard
                    className="swipe"
                    key={character.first_name}
                    onSwipe={(dir) => swiped(dir, character.user_id)}
                    onCardLeftScreen={() => outOfFrame(character.first_name)}
                    >
                    <div
                        style={{ backgroundImage: "url(" + character.url + ")" }}
                        className="card"
                    >
                        <h3>{character.first_name}</h3>
                    </div>
                    </TinderCard>
                ))}
                <div className="swipe-info">
                    {lastDirection ? <p>You Swiped {lastDirection}</p> : <p>Swipe Left or Right</p>}
                </div>
                </div>
            </div>
            </div>}
        </div>
    );
};

export default Dashboard;

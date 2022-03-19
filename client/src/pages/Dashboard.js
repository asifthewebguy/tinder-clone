import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
            getGenderedUsers();
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

    useEffect(() => {
        getUser();
    } , []);

    console.log(user?.gender_interest, genderedUsers);


//   const characters = [
//     {
//       name: "Richard Hendricks",
//       url: "https://i.imgur.com/oPj4A8u.png",
//     },
//     {
//       name: "Erlich Bachman",
//       url: "https://i.imgur.com/oPj4A8u.png",
//     },
//     {
//       name: "Monica Hall",
//       url: "https://i.imgur.com/oPj4A8u.png",
//     },
//     {
//       name: "Jared Dunn",
//       url: "https://i.imgur.com/oPj4A8u.png",
//     },
//     {
//       name: "Dinesh Chugtai",
//       url: "https://i.imgur.com/oPj4A8u.png",
//     },
//   ];
    const characters = genderedUsers;
  const [lastDirection, setLastDirection] = useState();
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };
  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };
  return (
    <div>
        {user && <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="cardContainer">
              {characters.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.name}</h3>
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

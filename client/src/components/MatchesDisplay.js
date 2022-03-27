import axios from "axios";
import {useState} from 'react';

const MatchesDisplay = ({matches, setClickedUser}) => {
    const [matchProfiles, setMatchProfiles] = useState(null);
    const matchedUserIds = matches.map(({user_id}) => user_id);

    const getMatches = async () =>{
        try{
            await axios.get('http://localhost:8000/users',{
                params: {userIds: JSON.stringify(matchedUserIds)}
            });
            setMatchProfiles(response.data);
        }catch(err){
            console.log(err);
        }
    };
    useEffect(() => {
        getMatches();
    },[]);
    console.log(matchProfiles);
    return (
        <div className="matches-display">
            {matchProfiles?.map((match, index) => (
                <div key={{ index }} className="match-card" onClick={setClickedUser(match)}>
                    <div className="image-container">
                        <img src={match?.url} alt={ match?.first_name + " profile"} />
                    </div>
                    <h3>{match.first_name}</h3>
                </div>
            ))}
        </div>
    )
}
export default MatchesDisplay;

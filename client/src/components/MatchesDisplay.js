import axios from "axios";

const MatchesDisplay = ({matches}) => {
    const matchedUserIds = matches.map(({user_id}) => user_id);
    const getMatches = async () =>{
        try{
            await axios.get('http://localhost:8000/users',{
                params: {userIds: JSON.stringify(matchedUserIds)}
            });
        }catch(err){
            console.log(err);
        }
    };
    return (
        <div className="matches-display">
            <h1>MatchesDisplay</h1>
        </div>
    )
}
export default MatchesDisplay;

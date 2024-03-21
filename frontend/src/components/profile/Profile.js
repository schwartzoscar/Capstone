import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Base from '../../components/base/Base';
import ProfileOverview from "./ProfileOverview";
import ProfileContent from "./ProfileContent";

const ProfileContext = createContext({isMe: true, visitedUser: null});
export const useProfileContext = () => useContext(ProfileContext);

export default function Profile() {

  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useAuthContext();
  const [isMe, setIsMe] = useState(true);
  const [visitedUser, setVisitedUser] = useState(null);

  useEffect(() => {
    if(!params.hasOwnProperty('userId')) {
      setIsMe(true);
    } else if(params.userId === "me" || params.userId === currentUser._id) {
      navigate('/profile');
    } else {
      setIsMe(false);
    }
  }, [params, currentUser]);

  const getVisitedProfile = async() => {
    const post = {visitedId: params?.userId};
    const resp = await apiClient.post('/profile/visited', post);
    handleResp(resp, data => {
      setVisitedUser(data.visited);
    });
  }

  useEffect(() => {
    if(!isMe) getVisitedProfile();
  }, [isMe, params]);

  return(
    <Base>
      <h1>{isMe ? 'My Profile' : `${visitedUser?.username ?? 'Anonymous'}'s Profile`}</h1>
      <ProfileContext.Provider value={{ isMe, visitedUser }}>
        <div className="d-flex g-20 mt-20 h-100">
          <ProfileContent/>
          <ProfileOverview/>
        </div>
      </ProfileContext.Provider>
    </Base>
  );
}

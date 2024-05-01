import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Base from '../../components/base/Base';
import ProfileOverview from "./ProfileOverview";
import ProfileContent from "./ProfileContent";
import FollowButton from '../elements/FollowButton';

const ProfileContext = createContext({isMe: true, visitedUser: null});
export const useProfileContext = () => useContext(ProfileContext);

export default function Profile() {

  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useAuthContext();
  const [isMe, setIsMe] = useState(null);
  const [visitedUser, setVisitedUser] = useState(null);

  useEffect(() => {
    if(!params.hasOwnProperty('userId')) {
      setIsMe(true);
    } else if(params.userId === "me" || params.userId === currentUser._id) {
      navigate('/profile');
    } else {
      setIsMe(false);
    }
  }, [params, currentUser, navigate]);

  const getVisitedProfile = useCallback(async() => {
    const post = {visitedId: params?.userId};
    const resp = await apiClient.post('/profile/visited', post);
    handleResp(resp, data => {
      setVisitedUser(data.visited);
    });
  }, [params]);

  useEffect(() => {
    if(isMe !== null) {
      isMe ? setVisitedUser(currentUser) : getVisitedProfile();
    }
  }, [isMe, params, currentUser, getVisitedProfile]);

  // TODO loading wrapper component
  if(!visitedUser) return null;

  const handleFollow = async () => {
    const route = visitedUser.isFollowing ? 'unfollow' : 'follow';
    const resp = await apiClient.post(`/profile/${route}`, { userId: visitedUser._id });
    handleResp(resp, () => {
      setVisitedUser({ ...visitedUser, isFollowing: !visitedUser.isFollowing });
    });
  };

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <h1>{isMe ? 'My Profile' : `${visitedUser?.username ?? 'Anonymous'}'s Profile`}</h1>
        <ProfileContext.Provider value={{ isMe, visitedUser }}>
          <div className="d-flex flex-wrap-reverse g-20 mt-20">
            <ProfileContent/>
            <ProfileOverview/>
            {!isMe && (
              <div>
                <FollowButton
                  isFollowing={visitedUser.isFollowing}
                  onClick={handleFollow}
                />
              </div>
            )}
          </div>
        </ProfileContext.Provider>
      </div>
    </Base>
  );
}

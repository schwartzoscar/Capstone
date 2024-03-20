import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import Base from '../../components/base/Base';
import ProfileOverview from "./ProfileOverview";
import ProfileContent from "./ProfileContent";

const ProfileContext = createContext({isMe: true});
export const useProfileContext = () => useContext(ProfileContext);

export default function Profile() {

  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useAuthContext();
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    if(!params.hasOwnProperty('userId')) {
      setIsMe(true);
    } else if(params.userId === "me" || params.userId === currentUser._id) {
      navigate('/profile');
    } else {
      setIsMe(false);
    }
  }, [params, currentUser]);

  return(
    <Base>
      <h1>Profile Page</h1>
      <ProfileContext.Provider value={{ isMe }}>
        <div className="d-flex g-20 mt-20 h-100">
          <ProfileContent/>
          <ProfileOverview/>
        </div>
      </ProfileContext.Provider>
    </Base>
  );
}

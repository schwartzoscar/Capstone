import { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Base from '../../components/base/Base';
import ProfileOverview from "./ProfileOverview";
import ProfileContent from "./ProfileContent";

const ProfileContext = createContext({isMe: true});
export const useProfileContext = () => useContext(ProfileContext);

export default function Profile() {

  const params = useParams();
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    const visitor = (params.hasOwnProperty('userId') && params.userId !== "me")
    setIsMe(!visitor)
  }, [params]);

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

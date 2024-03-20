import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import PostList from "../../posts/PostList";

export default function UserPosts() {

  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { isMe } = useProfileContext();
  const [visitedUser, setVisitedUser] = useState(null);

  const getVisitedProfile = async() => {
    // TODO get visited profile
    setVisitedUser({id: "temp", username: "tempUser"});
  }

  useEffect(() => {
    if(!isMe) getVisitedProfile();
  }, [isMe]);

  const header = useMemo(() => {
    return isMe ? "My Posts" : `Posts by ${visitedUser?.username ?? "Anonymous"}`;
  }, [isMe, visitedUser]);

  return(
    <div>
      <p>{header}</p>
      <PostList iSProps={{ postData: {userId: isMe ? currentUser._id : userId} }}/>
    </div>
  );
}

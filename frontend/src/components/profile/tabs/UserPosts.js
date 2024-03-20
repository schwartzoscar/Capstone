import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import PostList from "../../posts/PostList";

export default function UserPosts() {

  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { isMe, visitedUser } = useProfileContext();

  return(
    <div>
      <p className="tab-content-header">
        {isMe ? "My Posts" : `Posts by ${visitedUser?.username ?? "Anonymous"}`}
      </p>
      <PostList iSProps={{ postData: {userId: isMe ? currentUser._id : userId} }}/>
    </div>
  );
}

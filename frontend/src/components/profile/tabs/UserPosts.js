import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import PostList from "../../posts/PostList";

export default function UserPosts() {

  const { currentUser } = useAuthContext();
  const { isMe, visitedUser } = useProfileContext();

  return(
    <div>
      <p className="tab-content-header">
        {isMe ? "My Posts" : `Posts by ${visitedUser?.username ?? "Anonymous"}`}
      </p>
      <PostList height={500} iSProps={{ postData: {userId: isMe ? currentUser._id : visitedUser._id} }}/>
    </div>
  );
}

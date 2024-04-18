import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { getProfileImage } from "../../helpers/imageHelpers";

export default function PostListItem({ post }) {
  return(
    <div className="post-list-item">
      <div className="d-flex justify-content-between">
        <div>
          <h4>{post.title}</h4>
          <ReactTimeAgo date={new Date(post.created_at)}/>
        </div>
        <span className="fas fa-ellipsis-h"/>
      </div>
      <Link to={`/profile/${post.user._id}`} className="d-flex g-4 align-items-center">
        <div className="img-responsive profile-img">
          <img src={getProfileImage(post.user.profile_img)} alt={`${post.user.username}'s Profile Image`}/>
        </div>
        <p>{post.user.username}</p>
      </Link>
      <div className="post-list-item-content">
        {post.content}
      </div>
    </div>
  );
}

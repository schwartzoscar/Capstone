import { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { getProfileImage, getForumProfileImage } from "../../helpers/imageHelpers";
import RichTextReadOnly from "../elements/RichTextReadOnly";

export default function PostListItem({ post }) {

  const { pathname } = useLocation();

  const onForumPage = useMemo(() => pathname.includes('/forum/'), [pathname]);

  return(
    <div className="post-list-item">
      <div className="post-list-item-title">
        <h4>{post.title}</h4>
        <span className="fas fa-ellipsis-h"/>
      </div>
      <div className="post-list-item-content">
        <RichTextReadOnly content={post.content}/>
      </div>
      <div className="post-list-item-signature">
        <span>Posted by</span>
        <Link to={`/profile/${post.user._id}`} className="d-flex g-4 align-items-center">
          <div className="img-responsive profile-img">
            <img src={getProfileImage(post.user.profile_img)} alt={`${post.user.username}'s Profile Image`}/>
          </div>
          <p>{post.user.username}</p>
        </Link>
        <ReactTimeAgo date={new Date(post.created_at)}/>
        {post.forum && !onForumPage && (
          <>
            <span>to</span>
            <Link to={`/forum/${post.forum.name}`} className="d-flex g-4 align-items-center">
              <div className="img-responsive profile-img">
                <img src={getForumProfileImage(post.forum.profile_img)} alt={post.forum.name}/>
              </div>
              <p>{post.forum.name}</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

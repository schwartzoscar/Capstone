import { Link } from "react-router-dom";

export default function PostListItem({ post }) {

  const mockData = {
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    user: {
      _id: "ABCDEFG",
      profile_img: "/images/Defaultprofile.jpg",
      username: "wario"
    }
  }

  return(
    <div className="post-list-item">
      <div className="d-flex justify-content-between">
        <h4>{mockData.title}</h4>
        <span className="fas fa-ellipsis-h"/>
      </div>
      <Link to={`/profile/${mockData.user._id}`} className="d-flex g-4 align-items-center">
        <div className="profile-img">
          <img src={mockData.user.profile_img} alt={`${mockData.user.username}'s Profile Image`}/>
        </div>
        <p>{mockData.user.username}</p>
      </Link>
      <div className="post-list-item-content">
        {mockData.content}
      </div>
    </div>
  );
}

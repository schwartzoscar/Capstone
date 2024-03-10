export default function PostListItem({ post }) {
  return(
    <div className="post-list-item">
      <h5>{post.title}</h5>
      <p>{post.content}</p>
      <h6>{post.poster_id}</h6>
    </div>
  );
}

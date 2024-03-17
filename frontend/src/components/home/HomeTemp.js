import Base from "../base/Base";
import PostList from "../posts/PostList";

export default function HomeTemp() {
  return (
    <div className="page-container">
      <h1>Home Page</h1>
      <Base>
        <div className="d-flex g-20 mt-20">
          <div className="page-section" style={{width: 400}}>
            <p>left panel</p>
          </div>
          <div className="flex-grow-1 page-section">
            <h3>Posts</h3>
            <hr/>
            <PostList/>
          </div>
          <div className="page-section" style={{width: 400}}>
            <p>right panel</p>
          </div>
        </div>
      </Base>
    </div>
  );
}

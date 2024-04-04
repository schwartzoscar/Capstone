
import Base from "../base/Base";
import PostList from "../posts/PostList";
import Button from "../elements/Button";
import InfiniteScroll from "../elements/InfiniteScroll";
import "../../styles/0_base/home.css"

export default function HomeTemp() {
  return (
    <div className="page-container">
      <h1>Welcome To Thridder</h1>
      <Base>
        <div className="d-flex g-20 mt-20">
        <div className="page-section" style={{width: 200, textAlign: 'center'}}>
          <Button to="/profile" className="btn-home">My Profile</Button>
          <br />
          <Button to="/home" className="btn-home">Home</Button>
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

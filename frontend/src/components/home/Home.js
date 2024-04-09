import Base from "../base/Base";
import PostList from "../posts/PostList";
import Button from "../elements/Button";
import InfiniteScroll from "../elements/InfiniteScroll";

export default function Home() {
  return (
    <div className="page-container">
      <Base>
      <hr/>
      <div className="search">
        <div className="search-wrapper">
          <input type="search" id="search" placeholder="SEARCH POSTS" />
        </div>
        <Button to="/logout" className="btn-bar">LOGOUT</Button>
      </div>
      <hr/>
        <div className="d-flex g-20 mt-20">
          <div className="page-section">
            <Button to="/profile" className="btn-home">PROFILE</Button>
            <hr/>
              <Button to="/home" className="btn-home">HOME</Button>
            <hr/>
              <Button to="/news" className="btn-home">NEWS</Button>
            <div style={{ height: '73%'}}></div>
              <Button to="/contentpolicy" className="btn-home-solid">CONTENT POLICY</Button>
            <hr/>
              <Button to="/privacypolicy" className="btn-home-solid">PRIVACY POLICY</Button>
          </div>
          <div className="flex-grow-1 page-section">
            <h3>POSTS</h3>
            <hr/>
            <PostList/>
          </div>
        </div>
      </Base>
    </div>
  );
}

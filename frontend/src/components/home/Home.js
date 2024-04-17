import { useState } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import PostList from "../posts/PostList";
import Button from "../elements/Button";

export default function Home() {

  const { setCurrentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async() => {
    setLoading(true);
    const resp = await apiClient.post('/auth/logout');
    handleResp(resp, () => setCurrentUser(null));
    setLoading(false);
  };

  return (
    <div className="page-container" id="home-page">
      <hr/>
      <div className="nav-home">
        <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto"></img>

        <div className="search-wrapper">
          <input type="search" id="search" placeholder="SEARCH POSTS" />
        </div>
        <Button onClick={handleLogout} loading={loading} className="btn-bar">LOGOUT</Button>
      </div>
      <hr/>
      <div className="d-flex g-20 mt-20 flex-grow-1">
        <div className="page-section d-flex flex-column justify-content-between">
          <div>
            <Button to="/profile" className="btn-home">PROFILE</Button>
            <hr/>
            <Button to="/home" className="btn-home">HOME</Button>
            <hr/>
            <Button to="/news" className="btn-home">NEWS</Button>
          </div>
          <div>
            <Button to="/contentpolicy" className="btn-home-solid">CONTENT POLICY</Button>
            <hr/>
            <Button to="/privacypolicy" className="btn-home-solid">PRIVACY POLICY</Button>
          </div>
        </div>
        <div className="flex-grow-1 page-section">
          <h3>POSTS</h3>
          <hr/>
          <PostList/>
        </div>
      </div>
    </div>
  );
}

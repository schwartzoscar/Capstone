import { useState } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import PostList from "../posts/PostList";
import Button from "../elements/Button";
import ContentModal from "../elements/ContentModal";
import PrivacyModal from "../elements/PrivacyModal";

export default function Home() {

  const [showContentModal, setContentShowModal] = useState(false);

  const handleContentModalButtonClick = () => {
    setContentShowModal(true);
  };

    const [showPrivacyModal, setPrivacyShowModal] = useState(false);

    const handlePrivacyModalButtonClick = () => {
      setPrivacyShowModal(true);
  };

  return (
    <div className="page-container" id="home-page">
      <hr />
      <div className="nav-home">
        <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto"></img>
        <div className="search-wrapper">
          <input type="search" id="search" placeholder="SEARCH POSTS" />
        </div>
        <Button to="/logout" className="btn-bar">LOGOUT</Button>
      </div>
      <hr />
      <div className="d-flex g-20 mt-20 flex-grow-1">
        <div className="page-section d-flex flex-column justify-content-between">
          <div>
            <Button to="/profile" className="btn-home">PROFILE</Button>
            <hr />
            <Button to="/home" className="btn-home">HOME</Button>
            <hr />
            <Button to="/news" className="btn-home">NEWS</Button>
          </div>
          <div>
            <Button onClick={handleContentModalButtonClick} className="btn-home-solid">CONTENT POLICY</Button>
            <ContentModal show={showContentModal} setShow={setContentShowModal} />
            <hr />
            <Button onClick={handlePrivacyModalButtonClick} className="btn-home-solid">PRIVACY POLICY</Button>
            <PrivacyModal show={showPrivacyModal} setShow={setPrivacyShowModal} />
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

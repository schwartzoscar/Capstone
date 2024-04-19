import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

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

  const navigate = useNavigate();
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
        <hr />
        <div className="nav-home">
          <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto"></img>
          <div style={{ width: '200px', height: '50px', backgroundColor: 'transparent' }}></div>
          <div className="search-wrapper">
            <input type="search" id="search" placeholder="SEARCH POSTS" />
          </div>
          <Button onClick={handleLogout} className="btn-bar" loading={loading}>LOGOUT</Button>
        </div>
        <hr />
        <div className="d-flex g-20 mt-20">
          <div className="page-section">
            <Button to="/profile" className="btn-home">PROFILE</Button>
            <hr />
            <Button to="/home" className="btn-home">HOME</Button>
            <hr />
            <Button to="/news" className="btn-home">NEWS</Button>
            <div style={{ height: '73%'}}></div>
            <Button onClick={handleContentModalButtonClick} className="btn-home-solid">CONTENT POLICY</Button>
            <ContentModal show={showContentModal} setShow={setContentShowModal} />
            <hr />
            <Button onClick={handlePrivacyModalButtonClick} className="btn-home-solid">PRIVACY POLICY</Button>
            <PrivacyModal show={showPrivacyModal} setShow={setPrivacyShowModal} />
          </div>
          <div className="flex-grow-1 page-section">
            <h3>POSTS</h3>
            <hr />
            <PostList/>
          </div>
        </div>
    </div>
  );
}

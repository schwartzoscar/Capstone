import React, { useState } from 'react';
import Base from "../base/Base";
import PostList from "../posts/PostList";
import Button from "../elements/Button";
import ContentModal from "../elements/ContentModal";

export default function Home() {
  const [showContentModal, setShowModal] = useState(false);

  const handleModalButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div className="page-container" id="home-page">
      <Base>
        <hr />
        <div className="nav-home">
          <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto"></img>
          <div className="search-wrapper">
            <input type="search" id="search" placeholder="SEARCH POSTS" />
          </div>
          <Button to="/logout" className="btn-bar">LOGOUT</Button>
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
            <Button onClick={handleModalButtonClick} className="btn-home-solid">CONTENT POLICY</Button>
            <ContentModal show={showModal} setShow={setShowModal} />
            <hr />
            <Button onClick={handleModalButtonClick} className="btn-home-solid">CONTENT POLICY</Button>
            <ContentModal show={showModal} setShow={setShowModal} />
          </div>
          <div className="flex-grow-1 page-section">
            <h3>POSTS</h3>
            <hr />
            <PostList/>
          </div>
        </div>
      </Base>
    </div>
  );
}

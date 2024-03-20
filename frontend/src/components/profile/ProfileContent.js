import { useState, useMemo } from 'react';
import Nav from 'react-bootstrap/Nav';
import AccountInfo from "./tabs/AccountInfo";
import PrivacySettings from "./tabs/PrivacySettings";
import UserPosts from "./tabs/UserPosts";

export default function ProfileContent() {

  const [activeTab, setActiveTab] = useState("accountInfo");

  const navContent = useMemo(() => {
    switch(activeTab) {
      case 'accountInfo':
        return <AccountInfo/>;
      case 'userPosts':
        return <UserPosts/>;
      case 'privacySettings':
        return <PrivacySettings/>;
      default: return null;
    }
  }, [activeTab]);

  return(
    <div className="page-section flex-grow-1">
      <Nav variant="tabs" defaultActiveKey="accountInfo" onSelect={setActiveTab}>
        <Nav.Item>
          <Nav.Link eventKey="accountInfo">
            Account Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="userPosts">
            Posts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="privacySettings">
            Privacy Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {navContent}
    </div>
  );
}

import { useState, useMemo } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useProfileContext } from "./Profile";
import AccountInfo from "./tabs/AccountInfo";
import PrivacySettings from "./tabs/PrivacySettings";
import UserPosts from "./tabs/UserPosts";

export default function ProfileContent() {

  const { isMe } = useProfileContext();
  const [activeTab, setActiveTab] = useState("accountInfo");

  const navContent = useMemo(() => {
    switch(activeTab) {
      case 'accountInfo':
        return <AccountInfo/>;
      case 'userPosts':
        return <UserPosts/>;
      case 'privacySettings':
        return isMe ? <PrivacySettings/> : null;
      default: return null;
    }
  }, [activeTab, isMe]);

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
        { isMe &&
          <Nav.Item>
            <Nav.Link eventKey="privacySettings">
              Privacy Settings
            </Nav.Link>
          </Nav.Item>
        }
      </Nav>
      {navContent}
    </div>
  );
}

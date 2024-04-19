import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Button from "../elements/Button";


export default function Base({ children }) {

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
<div className="page-container" id="uni-nav">
    <hr />
    <div className="nav-base">
        <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto" />
        <div style={{ width: '50px', height: '50px', backgroundColor: 'transparent' }}></div>
        <div className="button-container">
  <Button to="/home" className="btn-base">HOME</Button>
  <Button to="/profile" className="btn-base">PROFILE</Button>
  <Button to="/news" className="btn-base">NEWS</Button>
  <Button onClick={handleLogout} className="btn-bar-base" loading={loading}>LOGOUT</Button>
</div>
</div>
    <hr />
    {children}
</div>

  );
}

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
    <div className="nav-home">
        <img src="/images/logo.png" alt="THRIDDER LOGO" className="img-fade" width="200" height="auto" />

        <div className="nav-header">
            <Button to="/home" className="btn-base">HOME</Button>
        </div>

        <Button onClick={handleLogout} className="btn-bar" loading={loading}>LOGOUT</Button>
    </div>
    <hr />
    {children}
</div>

  );
}

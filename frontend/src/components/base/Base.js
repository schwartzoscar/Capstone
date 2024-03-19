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
    <div className="page-container">
      <nav>
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/profile" className="btn btn-primary">Profile</Link>
        <Button onClick={handleLogout} className="btn-primary" loading={loading}>Logout</Button>
      </nav>
      <div>{children}</div>
    </div>
  );
}

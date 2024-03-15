import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import Button from "../elements/Button";

export default function Base({ children }) {

  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    apiClient.post('/auth/logout').then(resp => {
      setTimeout(() => {
        setLoading(false);
        if(resp.data?.message === "OK") {
          setCurrentUser(null);
        } else {
          toast.error('Something went wrong.')
          navigate('/');
        }
      }, 1000);
    });
  };

  return (
    <div>
      <nav>
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/profile" className="btn btn-primary">Profile</Link>
        <Button onClick={handleLogout} className="btn-primary" loading={loading}>Logout</Button>
      </nav>
      <div>{children}</div>
    </div>
  );
}

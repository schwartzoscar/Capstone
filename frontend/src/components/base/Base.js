import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";

export default function Base({ children }) {

  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();

  const handleLogout = async () => {
    const resp = await apiClient.post('/auth/logout');
    if(resp.data?.message === "OK") {
      setCurrentUser(null);
    } else {
      toast.error('Something went wrong.')
      navigate('/');
    }
  };

  return (
    <div>
      <nav>
        <Link to="/home" className="btn btn-primary">Home</Link>
        <Link to="/profile" className="btn btn-primary">Profile</Link>
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </nav>
      <div>{children}</div>
    </div>
  );
}

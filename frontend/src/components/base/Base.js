import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from "../../contexts/AuthContext";

export default function Base({ children }) {
  const [, dispatch] = useAuthContext();

  const handleLogout = async () => {
    try {
      dispatch({ type: 'logout' });
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Could not Logout');
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

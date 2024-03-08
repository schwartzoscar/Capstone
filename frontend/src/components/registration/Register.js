import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
      });

      if (response.data === 'Already registered') {
        alert('E-mail already registered! Please Login to proceed.');
        navigate('/login');
      } else {
        alert('Registered successfully! Please Login to proceed.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to register user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100">
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className='mb-3'>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>

          <p className='container my-2'>Already have an account?</p>
          <Link to='/login' className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
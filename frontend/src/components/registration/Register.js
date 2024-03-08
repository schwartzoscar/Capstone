import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { apiClient } from '../../helpers/requestHelpers';
import { useAuthContext } from '../../contexts/AuthContext';
import { TextField, SubmitButton } from '../elements/FormField';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, dispatch] = useAuthContext();
  const form = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiClient.post('/register', {
        name,
        email,
        password,
      });

      if (response.data === 'Already registered') {
        toast.error('E-mail already registered! Please Login to proceed.');
        navigate('/login');
      } else {
        toast.success('Registered successfully! Please Login to proceed.');
        navigate('/login');
        // Alternatively, you can automatically log in the user after registration
        // by dispatching an action to update the authentication state
        // Example: dispatch({ type: 'login', data: { user: response.data.user, accessToken: response.data.access_token } });
      }
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error('Failed to register user');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100">
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className='mb-3'>Register</h2>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <TextField name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3 text-start">
                <TextField name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3 text-start">
                <TextField name="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <SubmitButton className="btn btn-primary">Register</SubmitButton>
            </form>
          </FormProvider>

          <p className='container my-2'>Already have an account?</p>
          <Link to='/login' className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

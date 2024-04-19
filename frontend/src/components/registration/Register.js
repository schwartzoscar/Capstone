import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { apiClient } from '../../helpers/requestHelpers';
import { useAuthContext } from '../../contexts/AuthContext';
import { TextField, SubmitButton } from '../elements/FormField';
import {handleResp} from "../../helpers/responseHelpers";
import PasswordStrength from '../elements/PasswordStrength'; 
import {useState} from 'react';

const Register = () => {

  const { setCurrentUser } = useAuthContext();
  const form = useForm();

  // State to manage password validation error message
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (data) => {
    // Check if the password meets complexity rules
    if (!isPasswordValid(data.password)) {
      setPasswordError('Password must contain at least 8 characters including uppercase, lowercase, and numbers.');
      return; // Prevent form submission if password is invalid
    }
    const resp = await apiClient.post('/auth/register', data);
    handleResp(resp, data => {
      setCurrentUser(data.user);
    }, () => {
      toast.error('Failed to register user.');
    });
  };
  // Function to check if the password meets complexity rules
  const isPasswordValid = (password) => {
    // Implementation of password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div id="login-page" className="page-container">
      <div className="page-section">
        <h2 className="mb-24">Register</h2>
        <div className="mb-24">
          <FormProvider {...form}>
            <TextField name="username" label="Username" validation={{required: "Name is required."}}/>
            <TextField name="email" label="Email" validation={{required: "Email is required."}}/>
            <TextField name="password" label="Password" type="password" validation={{required: "Password is required."}}/>
            <TextField name="confirm_password" label="Confirm Password" type="password" validation={{required: "Password is required."}}/>
            {passwordError && <span className="text-danger">{passwordError}</span>}
            <PasswordStrength name ="password" />
            <SubmitButton className="btn-primary" onClick={handleSubmit}>Register</SubmitButton>
          </FormProvider>
        </div>
        <div className="text-center">
          <h6 className="m-0">Already have an account? <Link to='/login'>Login</Link></h6>
        </div>
      </div>
    </div>
  );
}

export default Register;

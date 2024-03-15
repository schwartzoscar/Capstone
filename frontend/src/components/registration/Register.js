import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { apiClient } from '../../helpers/requestHelpers';
import { useAuthContext } from '../../contexts/AuthContext';
import { TextField, SubmitButton } from '../elements/FormField';

const Register = () => {

  const { setCurrentUser } = useAuthContext();
  const form = useForm();

  const handleSubmit = async (data) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      if (response.data?.message === 'Success') {
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error('Failed to register user');
    }
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

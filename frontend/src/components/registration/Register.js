import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { apiClient } from '../../helpers/requestHelpers';
import { handleResp } from "../../helpers/responseHelpers";
import { handleFormErrors, setFormError } from "../../helpers/formHelpers";
import { useAuthContext } from '../../contexts/AuthContext';
import { TextField, SubmitButton } from '../elements/FormField';
import PasswordStrength from '../elements/PasswordStrength';
import { PASSWORD_TOOLTIP } from "../elements/Tooltip";

const Register = () => {

  const { setCurrentUser } = useAuthContext();
  const form = useForm();
  const [passValid, setPassValid] = useState(false);

  const handleSubmit = async (data) => {
    // Check if the password meets complexity rules
    if (!passValid) {
      setFormError('password', 'Password does not meet complexity requirements.', form);
      return; // Prevent form submission if password is invalid
    }
    const resp = await apiClient.post('/auth/register', data);
    handleResp(resp, data => {
      setCurrentUser(data.user);
    }, errors => {
      errors ? handleFormErrors(errors, form) : toast.error('Failed to register user.');
    });
  };

  return (
    <div id="login-page" className="page-container">
      <div className="page-section">
        <h2 className="mb-24">Register</h2>
        <div className="mb-24">
          <FormProvider {...form}>
            <TextField name="username" label="Username" validation={{required: "Name is required."}}/>
            <TextField name="email" label="Email" validation={{required: "Email is required."}}/>
            <div className="password-fields">
              <div>
                <TextField name="password" label="Password" type="password" tooltip={PASSWORD_TOOLTIP}
                           validation={{required: "Password is required."}}/>
                <PasswordStrength name="password" setPassValid={setPassValid}/>
              </div>
              <TextField name="confirm_password" label="Confirm Password" type="password"
                         validation={{required: "Password is required."}}/>
            </div>
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

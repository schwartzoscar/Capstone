import { useForm, FormProvider } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import { TextField, SubmitButton } from "../elements/FormField";

export default function Login() {

  const { setCurrentUser } = useAuthContext();
  const form = useForm();

  const handleSubmit = async(data) => {
    const resp = await apiClient.post( '/auth/login', data);
    handleResp(resp, data => {
      setCurrentUser(data.user);
    }, () => {
      toast.error("Invalid credentials. Please try again.");
    });
  }

  return(
    <div id="login-page" className="page-container">
      <div className="page-section">
        <h2 className="mb-24">Login</h2>
        <div className="mb-24">
          <FormProvider {...form}>
            <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
            <TextField name="password" label="Password" type="password" validation={{ required: "Password is required." }}/>
            <SubmitButton className="btn-primary" onClick={handleSubmit}>Login</SubmitButton>
          </FormProvider>
        </div>
        <div className="text-center">
          <h6 className="m-0">Don&apos;t have an account? <Link to='/register'>Register</Link></h6>
        </div>
      </div>
    </div>
  )
}

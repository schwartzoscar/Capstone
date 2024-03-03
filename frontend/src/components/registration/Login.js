import { useForm, FormProvider } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import { useAuthContext } from "../../contexts/AuthContext";
import { TextField, SubmitButton } from "../elements/FormField";

export default function Login() {

  const [, dispatch] = useAuthContext();
  const form = useForm();

  const handleSubmit = data => {
    apiClient.post( '/login', data)
      .then(resp => {
        if(resp.data?.message === "Success"){
          toast.success('Login successful!');
          const authData = {user: resp.data.user, accessToken: resp.data.access_token};
          dispatch({type: 'login', data: authData});
        } else {
          toast.error('Incorrect password! Please try again.');
        }
      })
      .catch(err => console.log(err));
  }

  return(
    <div id="login-page" className="page-container">
      <div className="page-section">
        <h2 className="mb-24">Login</h2>
        <div className="mb-24">
          <FormProvider {...form}>
            <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
            <TextField name="password" label="Password" validation={{ required: "Password is required." }}/>
            <SubmitButton className="btn-primary mt-12" onClick={handleSubmit}>Login</SubmitButton>
          </FormProvider>
        </div>
        <div className="text-center">
          <h6 className="m-0">Don&apos;t have an account? <Link to='/register'>Register Now!</Link></h6>
        </div>
      </div>
    </div>
  )
}

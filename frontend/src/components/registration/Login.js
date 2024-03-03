import { useForm, FormProvider } from "react-hook-form";
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import Button from "../elements/Button";
import { TextField, SubmitButton } from "../elements/FormField";

export default function Login() {

  const form = useForm();

  const handleSubmit = data => {
    apiClient.post( '/login', data)
      .then(result => {
        if(result.data === "Success"){
          toast.success('Login successful!')
        } else {
          toast.error('Incorrect password! Please try again.');
        }
      })
      .catch(err => console.log(err));
  }

  return(
    <div id="login-page" className="page-container">
      <div className="page-section">
        <h2>Login</h2>
        <div>
          <FormProvider {...form}>
            <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
            <TextField name="password" label="Password" validation={{ required: "Password is required." }}/>
            <SubmitButton className="btn-primary" onClick={handleSubmit}>Login</SubmitButton>
          </FormProvider>
        </div>
        <p>Don&apos;t have an account?</p>
        <Button to='/register' className="btn-secondary">Register</Button>
      </div>
    </div>
  )
}

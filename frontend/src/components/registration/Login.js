import { useForm, FormProvider } from "react-hook-form";
import { apiClient } from "../../helpers/requestHelpers";
import Button from "../elements/Button";
import { TextField, SubmitButton } from "../elements/FormField";

export default function Login() {

  const form = useForm();

  const handleSubmit = data => {
    apiClient.post( '/login', data)
      .then(result => {
        if(result.data === "Success"){
          alert('Login successful!')
        } else {
          alert('Incorrect password! Please try again.');
        }
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded" style={{width : '40%'}}>
        <h2 className='mb-3'>Login</h2>
        <div>
          <FormProvider {...form}>
            <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
            <TextField name="password" label="Password" validation={{ required: "Password is required." }}/>
            <SubmitButton className="btn-primary" onClick={handleSubmit}>Login</SubmitButton>
          </FormProvider>
        </div>
        <p className='container my-2'>Don&apos;t have an account?</p>
        <Button to='/register' className="btn-secondary">Register</Button>
      </div>
    </div>
  )
}

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SubmitButton, TextField } from "./elements/FormField";
import Button from "./elements/Button";

export default function TestForm() {

  const form = useForm();
  const [loading, setLoading] = useState(false);

  const submit = data => {
    setLoading(true);
    setTimeout(() => {
      console.log(data);
      setLoading(false);
    }, 3000);
  }

  return(
    <div>
      <div style={{margin: 50, padding: 10, border: "0.5px solid #202020"}}>
        <h1>Test Form</h1>
        <FormProvider {...form}>
          <TextField name="name" label="Name"/>
          <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
          <TextField name="password" label="Password" validation={{ required: "Password is required." }}/>
          <TextField name="confirmPass" label="Confirm Password"/>
          <SubmitButton onClick={submit} loading={loading} className="btn-primary" icon="fa-user"/>
        </FormProvider>
      </div>
      <Button to="/" className="btn-secondary">Home</Button>
    </div>
  );
}

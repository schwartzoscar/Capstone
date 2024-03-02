import { useForm, FormProvider } from 'react-hook-form';
import { SubmitButton, TextField } from "./elements/FormField";

export default function TestForm() {

  const form = useForm();

  const submit = data => {
    console.log(data);
  }

  return(
    <div style={{margin: 50, padding: 10, border: "0.5px solid #202020"}}>
      <h1>Test Form</h1>
      <FormProvider {...form}>
        <TextField name="name" label="Name"/>
        <TextField name="email" label="Email"/>
        <TextField name="password" label="Password"/>
        <TextField name="confirmPass" label="Confirm Password"/>
        <SubmitButton onClick={submit} className="btn-primary" icon="fa-user"/>
      </FormProvider>
    </div>
  );
}

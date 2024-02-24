import { useState } from 'react';
import { EmailField, PasswordField, TextField } from "./elements/FormField";

export default function TestForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return(
    <div style={{margin: 50, padding: 10, border: "0.5px solid #202020"}}>
      <h1>Test Form</h1>
      <TextField label="Name" value={[name, setName]}/>
      <EmailField label="Email" value={[email, setEmail]}/>
      <PasswordField label="Password" value={[password, setPassword]}/>
      <PasswordField label="Confirm Password" value={[confirmPass, setConfirmPass]} confirming={password}/>
    </div>
  );
}

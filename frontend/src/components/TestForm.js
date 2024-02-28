import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { EmailField, PasswordField, TextField } from "./elements/FormField";

export default function TestForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return(
    <div style={{margin: 50, padding: 10, border: "0.5px solid #202020"}}>
      <h1>Test Form</h1>
      <Form>
        <TextField id="name" label="Name" value={[name, setName]}/>
        <EmailField id="email" label="Email" value={[email, setEmail]}/>
        <PasswordField id="password" label="Password" value={[password, setPassword]}/>
        <PasswordField id="confirmPass" label="Confirm Password" value={[confirmPass, setConfirmPass]} confirming={password}/>
      </Form>
    </div>
  );
}

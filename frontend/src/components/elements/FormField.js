import { Form } from 'react-bootstrap';

function FormFieldWrapper(props) {

  const {id, label, isInvalid, errorMessage, children} = props;

  return(
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      {children}
      {isInvalid && <span className="text-danger">{errorMessage}</span>}
    </Form.Group>
  );
}

export function TextField(props) {

  const [value, setValue] = props.value;

  return(
    <FormFieldWrapper {...props}>
      <Form.Control value={value} onChange={setValue}/>
    </FormFieldWrapper>
  );
}

export function EmailField(props) {
  return <TextField {...props}/>;
}

export function PasswordField(props) {
  return <TextField {...props}/>
}

import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Button from "./Button";

function FormFieldLabel(props) {

  let label = null;

  if(props.icon || props.label) {
    const icon = props.icon ? <i className={`fas fa-${props.icon}`}/> : null;
    label = <Form.Label>{icon}{props.label}</Form.Label>;
  }

  return label;
}

function FormFieldError(props) {

  const { formState: { errors } } = useFormContext();

  return errors[props.name] ? <p className="text-danger">{errors[props.name]?.message}</p> : null;
}

export function TextField(props) {

  const { register } = useFormContext();

  return(
    <Form.Group>
      <FormFieldLabel label={props.label} icon={props.icon}/>
      <Form.Control {...register(props.name)}/>
      <FormFieldError name={props.name}/>
    </Form.Group>
  );
}

export function SubmitButton(props) {

  const { onClick, children, ...btnProps } = props;
  const { handleSubmit } = useFormContext();

  return(
    <Button onClick={handleSubmit(onClick)} {...btnProps}>
      {props.children ?? "Submit"}
    </Button>
  );
}

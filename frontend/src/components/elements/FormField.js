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
  return errors[props.name] ? <p className="form-field-error">{errors[props.name]?.message}</p> : null;
}

export function TextField(props) {

  const { register, formState: { errors } } = useFormContext();

  return(
    <Form.Group className="form-field">
      <FormFieldLabel label={props.label} icon={props.icon}/>
      <Form.Control {...register(props.name, props.validation)} type={props.type ?? 'text'}
                    isInvalid={errors[props.name]} aria-invalid={errors[props.name] ? "true" : "false"}/>
      <FormFieldError name={props.name}/>
    </Form.Group>
  );
}

export function SubmitButton(props) {

  const { onClick, children, className, ...btnProps } = props;
  const { handleSubmit } = useFormContext();

  return(
    <Button onClick={handleSubmit(onClick)} className={`submit-btn ${className ?? ''}`} {...btnProps}>
      {props.children ?? "Submit"}
    </Button>
  );
}

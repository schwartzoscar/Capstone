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
  const { name, label, icon, validation, type, ...rest } = props;

  let inputProps = {...rest};
  if(type === 'textarea') inputProps.as = 'textarea';

  return(
    <Form.Group className="form-field">
      <FormFieldLabel label={label} icon={icon}/>
      <Form.Control {...register(name, validation)} type={type ?? 'text'} {...inputProps}
                    isInvalid={errors[name]} aria-invalid={errors[name] ? "true" : "false"}/>
      <FormFieldError name={name}/>
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

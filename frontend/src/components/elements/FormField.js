import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap'
import clsx from "clsx";
import Button from "./Button";
import Tooltip from "./Tooltip";

function FormFieldLabel(props) {

  let label = null;

  if(props.icon || props.label) {
    const icon = props.icon ? <i className={`fas fa-${props.icon}`}/> : null;
    const tooltip = props.tooltip ? (
      <Tooltip id={`tooltip_${props.name}`} className="ml-4">{props.tooltip}</Tooltip>
    ) : null;
    label = <Form.Label>{icon}{props.label}{tooltip}</Form.Label>;
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
    <Form.Group className={clsx(props.className, "form-field")}>
      <FormFieldLabel name={props.name} label={props.label} icon={props.icon} tooltip={props.tooltip}/>
      <Form.Control {...register(props.name, props.validation)} type={props.type ?? 'text'}
                    isInvalid={errors[props.name]} aria-invalid={errors[props.name] ? "true" : "false"}/>
      <FormFieldError name={props.name}/>
    </Form.Group>
  );
}

export function SubmitButton(props) {

  const { onClick, children, className, ...btnProps } = props;
  const { handleSubmit, formState: { isValid } } = useFormContext();

  if(btnProps.hasOwnProperty('disabled')) {
    btnProps.disabled ||= !isValid;
  } else {
    btnProps['disabled'] = !isValid;
  }

  return(
    <Button onClick={handleSubmit(onClick)} className={`submit-btn ${className ?? ''}`} {...btnProps}>
      {props.children ?? "Submit"}
    </Button>
  );
}

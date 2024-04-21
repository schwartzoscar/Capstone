import { useFormContext, Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap'
import clsx from "clsx";
import Button from "./Button";
import RichText from "./RichText";

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
  const { className, name, label, icon, validation, type, ...rest } = props;

  let inputProps = {...rest};
  if(type === 'textarea') inputProps.as = 'textarea';

  return(
    <Form.Group className={clsx(className, "form-field")}>
      <FormFieldLabel label={label} icon={icon}/>
      <Form.Control {...register(name, validation)} type={type ?? 'text'} {...inputProps}
                    isInvalid={errors[name]} aria-invalid={errors[name] ? "true" : "false"}/>
      <FormFieldError name={name}/>
    </Form.Group>
  );
}

export function RichTextField(props) {

  const { control } = useFormContext();
  const { className, name, label, icon, validation, ...rest } = props;

  return(
    <Form.Group className={clsx(className, "form-field")}>
      <FormFieldLabel label={label} icon={icon}/>
      <Controller
        control={control} name={name}
        render={({ field: { onChange } }) => (
          <RichText onChange={onChange} {...rest}/>
        )}
      />
      <FormFieldError name={name}/>
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

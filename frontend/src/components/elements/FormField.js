import { useFormContext, Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap'
import clsx from "clsx";
import Button from "./Button";
import Tooltip from "./Tooltip";
import RichText from "./RichText";
import Select from "./Select";

function FormFieldLabel(props) {

  let label = null;

  if(props.icon || props.label) {
    const icon = props.icon ? <i className={`fas fa-${props.icon}`}/> : null;
    const tooltip = props.tooltip ? (
      <Tooltip id={`tooltip_${props.name}`} className="ml-4">{props.tooltip}</Tooltip>
    ) : null;
    label = (
      <Form.Label className={clsx({'d-inline': props.inline})}>
        {icon}{props.label}{tooltip}
      </Form.Label>
    );
  }

  return label;
}

function FormFieldError(props) {

  const { formState: { errors } } = useFormContext();
  return errors[props.name] ? <p className="form-field-error">{errors[props.name]?.message}</p> : null;
}

export function TextField(props) {

  const { register, formState: { errors } } = useFormContext();
  const { className, name, label, icon, tooltip, validation, type, ...rest } = props;

  let inputProps = {...rest};
  if(type === 'textarea') inputProps.as = 'textarea';

  return(
    <Form.Group className={clsx(className, "form-field")}>
      <FormFieldLabel name={name} label={label} icon={icon} tooltip={tooltip}/>
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

export function SelectField(props) {

  const { control } = useFormContext();
  const { className, name, label, icon, validation, onChangeOverride, ...rest } = props;

  const onSelectChange = (v, onChange) => {
    if(onChangeOverride) {
      onChangeOverride(v, onChange);
    } else {
      onChange(v);
    }
  }

  return(
    <Form.Group className={clsx(className, "form-field")}>
      <FormFieldLabel label={label} icon={icon}/>
      <Controller
        control={control} name={name}
        render={({ field: { onChange } }) => (
          <Select onChange={v => onSelectChange(v, onChange)} {...rest}/>
        )}
      />
      <FormFieldError name={name}/>
    </Form.Group>
  );
}

export function SwitchField(props) {

  const { control } = useFormContext();
  const { className, name, label, icon, tooltip, validation, ...rest } = props;

  return(
    <Form.Group className={clsx(className, "form-field")}>
      <Controller
        control={control} name={name}
        render={({ field: { onChange } }) => (
          <Form.Check type="switch" inline id={name} onChange={onChange}/>
        )}
      />
      <FormFieldLabel label={label} icon={icon} tooltip={tooltip} inline={true}/>
      <FormFieldError name={name}/>
    </Form.Group>
  );
}

export function SubmitButton(props) {

  const { onClick, children, className, disableOnInvalid, ...btnProps } = props;
  const { handleSubmit, formState: { isValid } } = useFormContext();

  if(disableOnInvalid) {
    if(btnProps.hasOwnProperty('disabled')) {
      btnProps.disabled ||= !isValid;
    } else {
      btnProps['disabled'] = !isValid;
    }
  }

  return(
    <Button onClick={handleSubmit(onClick)} className={`submit-btn ${className ?? ''}`} {...btnProps}>
      {props.children ?? "Submit"}
    </Button>
  );
}

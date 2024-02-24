function FormFieldWrapper(props) {
    return(
      <div className="form-field">
        <label>{props.label}</label>
        <p>input here</p>
      </div>
    );
}

export function TextField(props) {
    return(
      <FormFieldWrapper {...props}>
        <p>text field</p>
      </FormFieldWrapper>
    );
}

export function EmailField(props) {
    return <TextField {...props}/>;
}

export function PasswordField(props) {
    return <TextField {...props}/>
}

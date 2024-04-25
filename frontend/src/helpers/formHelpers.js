export function handleFormErrors(errors, form) {
  form.clearErrors();
  Object.entries(errors).forEach(([field, msg]) => {
    setFormError(field, msg, form);
  });
}

export function setFormError(field, msg, form) {
  form.setError(field, {type: 'custom', message: msg});
}

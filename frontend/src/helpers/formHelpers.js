export function handleFormErrors(errors, form) {
  form.clearErrors();
  Object.entries(errors).forEach(([field, msg]) => {
    form.setError(field, {type: 'custom', message: msg});
  });
}

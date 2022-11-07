export const validateRegistrationForm = (
  username,
  password,
  c_password = "",
  errors
) => {
  if (username === "") {
    errors = { ...errors, noUsername: true };
  } else {
    errors = { ...errors, noUsername: false };
  }
  if (password === "") {
    errors = { ...errors, noPassword: true };
  } else {
    errors = { ...errors, noPassword: false };
  }
  if (c_password === "") {
    errors = { ...errors, noC_password: true };
  } else {
    errors = { ...errors, noC_password: false };
  }
  if (password === c_password && password !== "") {
    errors = { ...errors, cPassError: false };
  } else {
    errors = { ...errors, cPassError: true };
  }
  return errors;
};

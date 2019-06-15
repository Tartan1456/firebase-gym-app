export default function validate(values) {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(values.name)) {
    errors.name = 'Name is invalid';
  }


  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 8) {
    errors.password = 'Password should be at least 8 characters'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Your password do not match';
  }
  return errors;
};
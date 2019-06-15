export default function validate(values, form) {
  let errors = {};

  const validateName = () => {
    if (!values.name) {
      return errors.name = 'Name is required';
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(values.name)) {
      return errors.name = 'Name is invalid';
    }
  }

  const validateEmail = () => {
    if (!values.email) {
      return errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      return errors.email = 'Email address is invalid';
    }
  }

  const validatePassword = () => {
    if (!values.password) {
      return errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      return errors.password = 'Password should be at least 8 characters'
    }
  }

  const validateConfirmPassword = () => {
    if (!values.confirmPassword) {
      return errors.confirmPassword = 'Please confirm your password';
    } else if (values.confirmPassword !== values.password) {
      return errors.confirmPassword = 'Your password do not match';
    }
  }

  if (form === 'login') {
    validateEmail();
    validatePassword();
  } else if (form === 'register') {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
  }
  return errors;
};